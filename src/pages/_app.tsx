import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/ui/toaster'

import { ThemeProvider } from '@/components/theme-provider'

import { useMSW } from '@/hooks/useMSW'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const shouldRender = useMSW()

  if (!shouldRender) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </main>
      <Toaster />
    </ThemeProvider>
  )
}
