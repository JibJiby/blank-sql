import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Chapter } from '@/models/chapter'

import { time } from './constants'

export const useChapterQuery = () => {
  const query = useQuery<Chapter[]>({
    queryKey: ['chapters'],
    queryFn: async () => {
      const res = await api('/chapter')
      return res.data
    },
    placeholderData: [],
    staleTime: time.HOUR,
  })

  return query
}
