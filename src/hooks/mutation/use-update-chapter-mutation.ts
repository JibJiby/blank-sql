import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

type Params = {
  successFeedback: () => void
  errorFeedback: () => void
}

export const useUpdateChapterMutation = ({
  successFeedback,
  errorFeedback,
}: Params) => {
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
      successFeedback()
    },
    onError: () => {
      errorFeedback()
    },
  })

  return mutation
}
