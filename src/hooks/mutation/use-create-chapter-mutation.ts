import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

type Params = {
  successFeedback: () => void
  errorFeedback: () => void
}

export const useCreateChapterMutation = ({
  successFeedback,
  errorFeedback,
}: Params) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (newChapterName: string) => {
      try {
        const res = await api.post('/admin/chapter', { newChapterName })
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
