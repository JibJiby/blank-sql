import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui/toaster'

import { ThemeProvider } from '@/components/theme-provider'

import { useMSW } from '@/hooks/use-msw'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const shouldRender = useMSW()

  if (!shouldRender) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className={`w-[100vw] h-[100vh] ${inter.className}`}>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </SessionProvider>
      </main>
      <Toaster />
    </ThemeProvider>
  )
}
