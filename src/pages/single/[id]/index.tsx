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

export default function SingleQuizResolverPage() {
  const router = useRouter()
  const { data } = useSingleQuizQuery(router.asPath.at(-1) || '')

  return (
    <BaseLayout>
      <QuizViewer value={data?.quizQuery} />
      <div className="flex flex-col items-center max-w-[240px]">
        <div className="flex flex-col items-center mt-8">
          {Array.from({ length: data?.answerLength || 0 }).map((_, idx) => (
            <div key={idx} className="flex flex-row items-center space-y-4">
              <Label htmlFor={idx.toString()}>{idx + 1}</Label>
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
