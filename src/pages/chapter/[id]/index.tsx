import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'

import { matchAnswer } from '@/lib/match-answer'

import { useSingleQuizQuery } from '@/hooks/query/useSingleQuizQuery'

import { size } from '@/styles/size'

import BaseLayout from '@/layouts/base-layout'

const QuizViewer = dynamic(import('@/components/quiz-viewer'), {
  ssr: false,
  loading: () => (
    <Skeleton
      style={{
        height: size.quizViewerHeight,
        width: size.quizViewerWidth,
      }}
    />
  ),
})

export default function ChapterQuizResolvePage() {
  const router = useRouter()
  const [quizId, setQuizId] = useState('')
  const { data } = useSingleQuizQuery(quizId)
  const { toast } = useToast()

  const onClickCopyBtn = () => navigator.clipboard.writeText(quizId)

  const onClickSubmitBtn = () => {
    toast({
      title: 'title',
    })
    if (!data) {
      return
    }

    const quizAnswerString = data.answerObj
    const quizAnswerObj = JSON.parse(quizAnswerString)

    //   // TODO: input 값을 어떻게 가져올것인가 처리해야함
    //   if (matchAnswer(answerArray, quizAnswerObj)) {
    //     router.push('/')
    //     // notifySuccess('정답', '알맞게 채우셨어요!')
    //   } else {
    //     // notifyDanger('오답', '다시 맞춰주세요.')
    //   }
  }

  useEffect(() => {
    setQuizId(router.asPath.split('/').at(-1) || '')
  }, [router])

  console.log('data : ', data)

  return (
    <BaseLayout>
      <div className="flex items-center py-8 space-x-6">
        <span className="select-none">퀴즈 ID : {quizId}</span>
        <Button
          variant="outline"
          size="icon"
          className="w-[30px] h-[30px]"
          onClick={onClickCopyBtn}
        >
          <Copy width={15} height={15} />
        </Button>
      </div>
      <QuizViewer value={data?.quizQuery} />
      <div className="flex flex-col items-center max-w-[240px]">
        <div className="flex flex-col items-center mt-8">
          {/* FIXME: idx 대신 key 값 지정 */}
          {Array.from({ length: data?.answerLength || 0 }).map((item, idx) => (
            <div key={idx} className="flex flex-row items-center space-x-4">
              <Label htmlFor={idx.toString()}>{idx + 1}</Label>
              <Input id={idx.toString()} />
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full pt-8 ">
          <Button className="w-full" onClick={onClickSubmitBtn}>
            제출
          </Button>
        </div>
      </div>
    </BaseLayout>
  )
}
