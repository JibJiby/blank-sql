import { useInfiniteQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Chapter } from '@/models/chapter'
import { Quiz } from '@/models/quiz'

import { time } from './constants'

type Params = {
  size: number
}

export const useQuizInfinityQuery = ({ size }: Params) => {
  const query = useInfiniteQuery<
    (Quiz & { chapter: Pick<Chapter, 'chapterName'> })[]
  >({
    queryKey: ['paging', 'quizzes'],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const res = await api.get(`/quiz?page=${pageParam}&size=${size}`)
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    getNextPageParam: (lastPage, pages) => pages.length + 1,
    meta: {
      errorMessage: '퀴즈 목록을 가져오는데 문제가 발생했습니다',
    },
    // enabled: !!page,
    staleTime: time.DAY,
    cacheTime: Infinity,
  })

  return query
}
