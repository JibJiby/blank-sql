import { useRef } from 'react'

import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { container } from 'tsyringe'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

import {
  QUIZ_SINGLE_INPUT_PREFIX,
  QuizSingleInput,
} from '@/components/quiz-single-input'
import QuizViewer from '@/components/quiz-viewer'

import { isAllNotEmptyInput } from '@/lib/is'
import { matchAnswer } from '@/lib/match-answer'
import { makePrefixKey, range } from '@/lib/utils'

import { useSingleQuizQuery } from '@/hooks/query/use-single-quiz-query'

import BaseLayout from '@/layouts/base-layout'
import { QuizService } from '@/server/services/quiz.service'

export default function SingleQuizResolverPage() {
  const router = useRouter()
  const singleQuizId = router.query.id as string
  const { data, status, error } = useSingleQuizQuery(singleQuizId)
  const answerLength =
    data?.answer && status === 'success' && !error
      ? Object.keys(JSON.parse(data.answer || '')).length
      : 0
  const inputMapRef = useRef<Map<string, string>>(new Map())
  const { toast } = useToast()

  const onSubmit = async () => {
    if (!data) {
      return
    }

    for (const idx of range(answerLength)) {
      const inputText = findInputValueByLabelNumber(idx)

      if (!inputText) {
        return toast({
          title: '빠짐없이 입력해주세요',
          variant: 'destructive',
          duration: 1500,
        })
      }

      inputMapRef.current.set(idx.toString(), inputText)
    }

    if (!isAllNotEmptyInput(...Array.from(inputMapRef.current.values()))) {
      return
    }

    const quizAnswer = data.answer ?? null
    if (quizAnswer === null) return

    const answer = JSON.parse(quizAnswer)
    if (!matchAnswer(Object.fromEntries(inputMapRef.current), answer)) {
      toast({
        title: '틀렸습니다',
        variant: 'destructive',
      })
      return
    }

    await router.push('/')
    toast({
      title: '정답 입니다!',
      className: 'bg-emerald-500',
      duration: 1000,
    })
  }

  if (status === 'loading' || status !== 'success') {
    return
  }

  return (
    <BaseLayout>
      <QuizViewer value={data.quiz} />
      <div className="flex flex-col items-center max-w-[240px]">
        <div className="flex flex-col items-center mt-8">
          {data &&
            Array.from({ length: answerLength }).map((_, idx) => (
              <QuizSingleInput
                key={makePrefixKey({
                  prefix: QUIZ_SINGLE_INPUT_PREFIX,
                  keyValue: (idx + 1).toString(),
                })}
                label={(idx + 1).toString()}
              />
            ))}
        </div>
        <div className="flex justify-center w-full pt-8 ">
          <Button className="w-full" onClick={onSubmit}>
            제출
          </Button>
        </div>
      </div>
    </BaseLayout>
  )
}

function findInputValueByLabelNumber(labelNumber: number): string {
  const inputText =
    (
      document.getElementById(
        makePrefixKey({
          prefix: QUIZ_SINGLE_INPUT_PREFIX,
          keyValue: (labelNumber + 1).toString(),
        })
      ) as HTMLInputElement
    )?.value || ''

  return inputText
}

export const getServerSideProps = (async (context) => {
  // 직접 접근시 해당 데이터 없을 때,
  const quizId = context.query.id as string
  const quizService = container.resolve(QuizService)

  try {
    await quizService.findQuizById(quizId)
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return {
        notFound: true,
      }
    }
  }

  return {
    props: {},
  }
}) satisfies GetServerSideProps<{}>
