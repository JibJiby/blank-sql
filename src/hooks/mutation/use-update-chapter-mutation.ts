import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

export const useUpdateChapterMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async ({
      chapterId,
      newChapterName,
    }: {
      chapterId: string
      newChapterName: string
    }) => {
      try {
        const res = await api.patch('/admin/chapter', {
          chapterId,
          newChapterName,
        })
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
