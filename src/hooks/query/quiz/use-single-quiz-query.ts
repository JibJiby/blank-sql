import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Quiz } from '@/models/quiz'

import { time } from '../constants'

export const useSingleQuizQuery = (quizId: string) => {
  const query = useQuery<Quiz>({
    queryKey: ['quizzes', quizId],
    queryFn: async () => {
      try {
        const res = await api(`/quiz/${quizId}`)
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    meta: {
      errorMessage: '퀴즈 데이터를 서버로부터 가져오지 못했습니다.',
    },
    enabled: !!quizId,
    staleTime: time.DAY,
    cacheTime: Infinity,
    initialData: undefined,
  })

  return query
}
