import { useInfiniteQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Chapter } from '@/models/chapter'
import { Quiz } from '@/models/quiz'

import { time } from './constants'

type Params = {
  page: number
  size: number
}

export const useQuizInfinityQuery = ({ page, size }: Params) => {
  // TODO: DTO 로 ResponseData Type 관리 필요
  const query = useInfiniteQuery<
    (Quiz & { chapter: Pick<Chapter, 'chapterName'> })[]
  >({
    // NOTE: paging 으로 또 따로 나누는게 좋을지 고려
    queryKey: ['paging', 'quizzes', page],
    queryFn: async () => {
      try {
        const res = await api.get(`/quiz?page=${page}&size=${size}`)
        return res.data
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    select: (data) => {
      // chapterName 최상위 프로퍼티로 올리기

      const newData = {
        pages: [
          ...data.pages.map((page) =>
            page.map((quiz) => ({
              ...quiz,
              chpaterName: quiz.chapter.chapterName,
            }))
          ),
        ],
        pageParams: [...data.pageParams],
      }
      // console.log('select : ', newData)
      return newData
    },
    meta: {
      errorMessage: '퀴즈 목록을 가져오는데 문제가 발생했습니다',
    },
    enabled: !!page,
    staleTime: time.DAY,
    cacheTime: Infinity,
  })

  return query
}
