import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'
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
      <main className={`w-[100vw] h-[100vh] ${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider {...pageProps}>
            <Component {...pageProps} />
          </ClerkProvider>
        </QueryClientProvider>
      </main>
      <Toaster />
    </ThemeProvider>
  )
}
