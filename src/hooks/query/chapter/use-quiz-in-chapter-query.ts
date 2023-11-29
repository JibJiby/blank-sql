import { useEffect } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Quiz } from '@/models/quiz'

import { time } from '../constants'

export const useQuizInChapterQuery = (chapterId: string) => {
  const queryClient = useQueryClient()
  const query = useQuery<Quiz[]>({
    queryKey: ['chapter', chapterId],
    queryFn: async () => {
      try {
        const res = await api.get(`/chapter/${chapterId}`)
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    meta: {
      errorMessage: '해당 챕터의 퀴즈를 불러오는데 오류가 발생했습니다',
    },
    enabled: !!chapterId,
    staleTime: time.DAY,
    cacheTime: Infinity,
    initialData: undefined,
  })

  useEffect(() => {
    if (query.data) {
      for (const quiz of query.data) {
        queryClient.setQueryData(['quizzes', quiz.id], quiz)
      }
    }
  }, [query.data, queryClient])

  return query
}
