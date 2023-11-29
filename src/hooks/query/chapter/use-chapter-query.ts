import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Chapter } from '@/models/chapter'

import { time } from '../constants'

type Options = Pick<UseQueryOptions, 'suspense'> | undefined

export const useChapterQuery = (options: Options = undefined) => {
  const query = useQuery<Chapter[]>({
    queryKey: ['chapters'],
    queryFn: async () => {
      const res = await api('/chapter')
      return res.data
    },
    placeholderData: [],
    staleTime: time.HOUR,

    // override
    suspense: !!options?.suspense,
  })

  return query
}
