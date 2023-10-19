import { useRouter } from 'next/router'

import { useToast } from '@/components/ui/use-toast'

import { QuizInputForm } from '@/components/quiz-input-form'
import QuizViewer from '@/components/quiz-viewer'

import { useSingleQuizQuery } from '@/hooks/query/use-single-quiz-query'

import BaseLayout from '@/layouts/base-layout'

export default function SingleQuizResolverPage() {
  const router = useRouter()
  const singleQuizId = router.query.id as string
  const { data, status } = useSingleQuizQuery(singleQuizId)
  const { toast } = useToast()

  const handleSuccess = async () => {
    await router.push('/')
    toast({
      title: '정답 입니다!',
      className: 'bg-emerald-500',
      duration: 1000,
    })
  }

  const handleFailure = async () => {
    toast({
      title: '틀렸습니다',
      variant: 'destructive',
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
