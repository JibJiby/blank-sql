import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { toast } from 'sonner'

import { Skeleton } from '@/components/ui/skeleton'

import { QuizInputForm } from '@/components/common/quiz-input-form'

import { useSingleQuizQuery } from '@/hooks/query/use-single-quiz-query'

import { size } from '@/styles/size'

import BaseLayout from '@/layouts/base-layout'

const QuizEditor = dynamic(() => import('@/components/common/quiz-editor'), {
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
  const singleQuizId = router.query.id as string
  const { data, status } = useSingleQuizQuery(singleQuizId)

  const handleSuccess = async () => {
    await router.push('/')
    toast.success('정답 입니다!', {
      duration: 1200,
    })
  }

  const handleFailure = async () => {
    toast.error('틀렸습니다', {
      duration: 1200,
    })
    return
  }

  if (status === 'loading' || status !== 'success') {
    return
  }

  return (
    <>
      <Head>
        <title>단일 퀴즈 풀기</title>
      </Head>
      <BaseLayout>
        <QuizEditor readOnly value={data.quiz} />
        <QuizInputForm
          quiz={data}
          onSuccess={handleSuccess}
          onFailure={handleFailure}
        />
      </BaseLayout>
    </>
  )
}
