import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

type Params = {
  successFeedback: () => void
  errorFeedback: () => void
}

export const useDeleteQuizMutation = ({
  successFeedback,
  errorFeedback,
}: Params) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (quizId: string) => {
      try {
        const res = await api.delete('/admin/quiz', { data: quizId })
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    onSuccess: () => {
      successFeedback()

      queryClient.invalidateQueries(['paging', 'quizzes'])
    },
    onError: () => {
      errorFeedback()
    },
  })

  return mutation
}
