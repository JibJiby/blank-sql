import { useRef, useState } from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

import { Copy } from 'lucide-react'

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

import { useQuizInChapterQuery } from '@/hooks/query/use-quiz-in-chapter-query'

import BaseLayout from '@/layouts/base-layout'

export default function ChapterQuizResolverPage({
  chapterId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { toast } = useToast()
  const [sequence, setSequence] = useState(0)
  const {
    data: quizzesInChapter,
    status,
    error,
  } = useQuizInChapterQuery(chapterId)
  const answerLength =
    quizzesInChapter?.length && status === 'success' && !error
      ? Object.keys(JSON.parse(quizzesInChapter[sequence].answer || '')).length
      : 0
  const inputMapRef = useRef<Map<string, string>>(new Map())

  const onClickCopyBtn = () => navigator.clipboard.writeText(chapterId)

  const onClickNext = async () => {
    if (!quizzesInChapter?.length) {
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

    const quizAnswer = quizzesInChapter.at(sequence)?.answer ?? null
    if (quizAnswer === null) return

    const answer = JSON.parse(quizAnswer)
    if (!matchAnswer(Object.fromEntries(inputMapRef.current), answer)) {
      toast({
        title: '틀렸습니다',
        variant: 'destructive',
      })
      return
    }

    // 정답인 경우 reset
    inputMapRef.current = new Map()

    if (sequence + 1 === quizzesInChapter.length) {
      await router.push('/')
      toast({
        title: '전부 맞추셨습니다! 축하드립니다~',
        className: 'bg-emerald-500',
        duration: 1200,
      })
      return
    }

    setSequence((prev) => prev + 1)
    toast({
      title: '정답 입니다!',
      className: 'bg-emerald-500',
      duration: 1000,
    })
  }

  if (status === 'loading' || status !== 'success') {
    return
  }

  if (!quizzesInChapter.length) {
    return
  }

  return (
    <BaseLayout>
      <div className="flex items-center py-8 space-x-6">
        <span className="select-none">
          퀴즈 ID : {quizzesInChapter.at(sequence)?.id || ''}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="w-[30px] h-[30px]"
          onClick={onClickCopyBtn}
        >
          <Copy width={15} height={15} />
        </Button>
      </div>
      <QuizViewer value={quizzesInChapter.at(sequence)?.quiz} />
      <div className="flex flex-col items-center max-w-[240px]">
        <div className="flex flex-col items-center mt-8">
          {Array.from({
            length: answerLength || 0,
          }).map((_, idx) => (
            <QuizSingleInput
              key={makePrefixKey({
                prefix: `${QUIZ_SINGLE_INPUT_PREFIX}_${chapterId}_${sequence}`,
                keyValue: (idx + 1).toString(),
              })}
              label={(idx + 1).toString()}
            />
          ))}
        </div>
        <div className="flex justify-center w-full pt-8 ">
          <Button className="w-full" onClick={onClickNext}>
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
  const chapterId = context.query.id as string
  return { props: { chapterId } }
}) satisfies GetServerSideProps<{
  chapterId: string
}>
