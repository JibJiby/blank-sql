import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Quiz } from '@/models/quiz'

export const useCreateQuizMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({
      chapterId,
      quiz,
      answer,
    }: Pick<Quiz, 'chapterId' | 'quiz' | 'answer'>) => {
      try {
        const res = await api.post('/admin/quiz', {
          chapterId,
          quiz,
          answer,
        })
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['paging', 'quizzes'], {
        type: 'all',
      })
    },
  })

  return mutation
}
