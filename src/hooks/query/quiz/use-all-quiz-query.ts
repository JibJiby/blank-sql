import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Chapter } from '@/models/chapter'
import { Quiz } from '@/models/quiz'

import { time } from '../constants'

export const useAllQuizQuery = () => {
  const query = useQuery<(Quiz & { chapter: Chapter })[]>({
    queryKey: ['quizzes'],
    queryFn: async () => {
      try {
        const res = await api.get(`/quiz`)
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    meta: {
      errorMessage: '퀴즈 목록을 가져오는데 문제가 발생했습니다',
    },
    staleTime: time.DAY,
    cacheTime: Infinity,
  })

  return query
}
