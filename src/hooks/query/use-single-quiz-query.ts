import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Quiz } from '@/models/quiz'

import { time } from './constants'

export const useSingleQuizQuery = (quizId: string) => {
  const query = useQuery<Quiz>({
    queryKey: ['quizzes', quizId],
    queryFn: async () => {
      const res = await api(`/quiz/${quizId}`)
      return res.data
    },
    enabled: quizId !== undefined,
    staleTime: time.DAY,
    cacheTime: Infinity,
    initialData: undefined,
  })

  return query
}
