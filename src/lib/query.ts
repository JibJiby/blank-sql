import { QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    // ref : https://tkdodo.eu/blog/react-query-error-handling#the-global-callbacks
    onError: (error, query) => {
      // TODO: 추후 에러 따로 적재
      // ex) sentry
      // console.error(error)

      // 유저를 위한 UI 에러 피드백
      if (query.meta?.errorMessage) {
        toast.error(query.meta.errorMessage as string, {
          duration: 2000,
        })
      }
    },
  }),
})
