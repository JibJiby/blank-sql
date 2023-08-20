import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import QuizViewer from '@/components/quiz-viewer'

import { useSingleQuizQuery } from '@/hooks/query/useSingleQuizQuery'

import BaseLayout from '@/layouts/base-layout'

export default function SingleQuizResolverPage() {
  const router = useRouter()
  const { data } = useSingleQuizQuery(router.asPath.at(-1) || '')

  // const onClick = () => {
  //   const quizAnswer = targetQuizData?.answerObj ?? null
  //   if (quizAnswer === null) return
  //   const quizAnswerObj = JSON.parse(quizAnswer)

  //   if (matchAnswer(answerArray, quizAnswerObj)) {
  // }

  return (
    <BaseLayout>
      <QuizViewer value={data?.quizQuery} />
      <div className="flex flex-col items-center max-w-[240px]">
        <div className="flex flex-col items-center mt-8">
          {Array.from({ length: data?.answerLength || 0 }).map((_, idx) => (
            <div key={idx} className="flex flex-row items-center mt-4">
              <Label htmlFor={idx.toString()} className="p-2 select-none">
                {idx + 1}
              </Label>
              <Input id={idx.toString()} className="ml-4" />
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full pt-8 ">
          <Button className="w-full" onClick={() => {}}>
            제출
          </Button>
        </div>
      </div>
    </BaseLayout>
  )
}
