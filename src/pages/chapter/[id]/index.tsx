import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { useQuery } from '@tanstack/react-query'
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

import { useChapterQuizQuery } from '@/hooks/query/useChatperQuizQuery'

import BaseLayout from '@/layouts/base-layout'

export default function ChapterQuizResolverPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [sequence, setSequence] = useState(0)
  const [chapterId, setChapterId] = useState('')
  const { data } = useChapterQuizQuery(chapterId)
  const inputMapRef = useRef<Map<string, string>>(new Map())

  // TODO: 복사 완료 메시지 띄우기
  const onClickCopyBtn = () => navigator.clipboard.writeText(chapterId)

  const onClickNext = async () => {
    if (!data) {
      return
    }

    for (const idx of range(Number(data.at(sequence)?.answerLength))) {
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

    const quizAnswer = data.at(sequence)?.answerObj ?? null
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

    if (sequence + 1 === data.length) {
      await router.push('/')
      toast({
        title: '전부 맞추셨습니다! 축하드립니다~',
        className: 'bg-emerald-500',
        duration: 1000,
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

  useEffect(() => {
    setChapterId(router.asPath.split('/').at(-1) || '')
  }, [router])

  return (
    <BaseLayout>
      <div className="flex items-center py-8 space-x-6">
        <span className="select-none">
          퀴즈 ID : {data?.at(Number(sequence))?.quizId || ''}
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
      <QuizViewer value={data && data.at(Number(sequence))?.quizQuery} />
      <div className="flex flex-col items-center max-w-[240px]">
        <div className="flex flex-col items-center mt-8">
          {data &&
            Array.from({
              length: data?.at(Number(sequence))?.answerLength || 0,
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
