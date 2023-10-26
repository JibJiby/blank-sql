import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Quiz } from '@/models/quiz'

import { time } from './constants'

type Options = Pick<UseQueryOptions, 'enabled'> | undefined

export const useSingleQuizQuery = (
  quizId: string,
  options: Options = undefined
) => {
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
    enabled:
      options && options.enabled === false ? false : quizId !== undefined,
    staleTime: time.DAY,
    cacheTime: Infinity,
    initialData: undefined,
  })

  return query
}
