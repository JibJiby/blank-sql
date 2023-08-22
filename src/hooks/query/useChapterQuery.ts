import { useQuery } from '@tanstack/react-query'

import { Chapter } from '@/models/chapter'

import { time } from './constants'

export const useChapterQuery = () => {
  const query = useQuery<Chapter[]>({
    queryKey: ['chapters'],
    queryFn: async () => {
      const res = await fetch('/api/chapter')
      return res.json()
    },
    placeholderData: [],
    staleTime: time.HOUR,
  })

  return query
}
