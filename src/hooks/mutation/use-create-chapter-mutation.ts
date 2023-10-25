import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export const useCreateChapterMutation = () => {
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
    },
  })

  return mutation
}
