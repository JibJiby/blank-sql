import { useQuery } from '@tanstack/react-query'

import { Quiz } from '@/models/quiz'

export const useChapterQuizQuery = (chapterId: string) => {
  const query = useQuery<Quiz[]>({
    queryKey: ['chapter', chapterId],
    queryFn: async () => {
      const res = await fetch(`/api/chapter/${chapterId}`)
      return res.json()
    },
    enabled: !!chapterId,
    staleTime: 1000 * 60 * 30,
    initialData: undefined,
  })

  return query
}
