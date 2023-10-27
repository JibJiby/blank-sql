import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

type Params = {
  successFeedback: () => void
  errorFeedback: () => void
}

export const useDeleteChapterMutation = ({
  successFeedback,
  errorFeedback,
}: Params) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (chapterId: string) => {
      try {
        const res = await api.delete('/admin/chapter', { data: chapterId })
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['chapters'])
      successFeedback()
    },
    onError: () => {
      errorFeedback()
    },
  })

  return mutation
}
