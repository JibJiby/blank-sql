import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { ThemeProvider } from '@/components/theme-provider'

import { queryClient } from '@/lib/query'

type AppProviderProps = {
  children: React.ReactNode
  session: Session
}

export const AppProvider = ({ children, session }: AppProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
