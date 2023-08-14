import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

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

  useEffect(() => {
    setQuizId(router.asPath.split('/').at(-1) || '')
  }, [router])

  console.log('data : ', data)

  return (
    <BaseLayout>
      <div className="py-8">퀴즈 ID : {quizId}</div>
      <QuizViewer value={data?.quizQuery} />
      <div className="flex flex-col items-center mt-8">
        {/* FIXME: idx 대신 key 값 지정 */}
        {Array.from({ length: data?.answerLength || 0 }).map((item, idx) => (
          <div key={idx} className="flex flex-row items-center space-x-4">
            <Label htmlFor={idx.toString()}>{idx + 1}</Label>
            <Input id={idx.toString()} />
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full pt-8 max-w-[240px]">
        <Button className="w-full">제출</Button>
      </div>
    </BaseLayout>
  )
}
