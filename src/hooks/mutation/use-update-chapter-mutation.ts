import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

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
        const res = await api.patch('/chapter', { chapterId, newChapterName })
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    onSuccess: () => {
      toast.success('📝 해당 챕터를 수정 완료했습니다')

      queryClient.invalidateQueries(['chapters'])
    },
  })

  return mutation
}
