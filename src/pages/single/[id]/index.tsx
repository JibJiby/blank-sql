import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { toast } from 'sonner'

import { Skeleton } from '@/components/ui/skeleton'

import { QuizInputForm } from '@/components/quiz-input-form'

import { useSingleQuizQuery } from '@/hooks/query/use-single-quiz-query'

import { size } from '@/styles/size'

import BaseLayout from '@/layouts/base-layout'

const QuizViewer = dynamic(() => import('@/components/quiz-viewer'), {
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
    <BaseLayout>
      <QuizViewer value={data.quiz} />
      <QuizInputForm
        quiz={data}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </BaseLayout>
  )
}

// // FIXME: Server RunTimeError (EMFILE: too many open files ...)
// export const getServerSideProps = (async (context) => {
//   // 직접 접근시 해당 데이터 없을 때,
//   const quizId = context.query.id as string
//   const quizService = container.resolve(QuizService)

//   try {
//     await quizService.findQuizById(quizId)
//   } catch (err) {
//     if (err instanceof PrismaClientKnownRequestError) {
//       return {
//         notFound: true,
//       }
//     }
//   }

//   return {
//     props: {},
//   }
// }) satisfies GetServerSideProps<{}>
