import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'

import { useMSW } from '@/hooks/useMSW'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const shouldRender = useMSW()

  if (!shouldRender) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}
