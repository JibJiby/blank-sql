import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export const useDeleteChapterMutation = () => {
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
    },
  })

  return mutation
}
