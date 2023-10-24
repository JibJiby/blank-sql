import 'reflect-metadata'

import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { Toaster } from 'sonner'

import { AppProvider } from '@/components/app-provider'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <AppProvider session={session}>
        <main className={`w-[100vw] h-[100vh] ${inter.className}`}>
          <Component {...pageProps} />
        </main>
      </AppProvider>
      <Toaster richColors />
    </>
  )
}
