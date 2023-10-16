import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Quiz } from '@/models/quiz'

import { time } from './constants'

export const useQuizInChapterQuery = (chapterId: string) => {
  const query = useQuery<Quiz[]>({
    queryKey: ['chapter', chapterId],
    queryFn: async () => {
      const res = await api.get(`/chapter/${chapterId}`)
      return res.data
    },
    enabled: !!chapterId,
    staleTime: time.MINUTE * 30,
    initialData: undefined,
  })

  return query
}
