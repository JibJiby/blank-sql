import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Quiz } from '@/models/quiz'

type Params = {
  successFeedback: () => void
  errorFeedback: () => void
}

export const useUpdateQuizMutation = ({
  successFeedback,
  errorFeedback,
}: Params) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({
      id,
      quiz,
      answer,
      chapterId,
    }: Pick<Quiz, 'id' | 'quiz' | 'answer' | 'chapterId'>) => {
      try {
        const res = await api.patch('/admin/quiz', {
          quizId: id,
          quiz,
          answer,
          chapterId,
        })
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quizzes'], {
        type: 'all',
      })
      successFeedback()
    },
    onError: () => {
      errorFeedback()
    },
  })

  return mutation
}
