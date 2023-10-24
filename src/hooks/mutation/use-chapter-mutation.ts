import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export const useChapterMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (newChapterName: string) => {
      try {
        const res = await api.post('/chapter', { newChapterName })
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    onSuccess: () => {
      // UI 피드백은 parameter 로 받아서 caller component 에서 결정하도록 해야할까
      toast.success('🎉 새로운 챕터를 생성하였습니다!')

      queryClient.invalidateQueries(['chapters'])
    },
  })

  return mutation
}
