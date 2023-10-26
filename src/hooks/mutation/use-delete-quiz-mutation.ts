import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export const useDeleteQuizMutation = () => {
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
      queryClient.invalidateQueries(['paging', 'quizzes'])
    },
  })

  return mutation
}
