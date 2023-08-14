import { useQuery } from '@tanstack/react-query'

import { Chapter } from '@/models/chapter'

export const useChapterQuery = () => {
  const query = useQuery<Chapter[]>({
    queryKey: ['chapters'],
    queryFn: async () => {
      const res = await fetch('/api/chapter')
      return res.json()
    },
    initialData: [],
  })

  return query
}
