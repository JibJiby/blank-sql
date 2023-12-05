import 'reflect-metadata'

import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import { Toaster } from 'sonner'

import { AppProvider } from '@/components/common/app-provider'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <AppProvider session={session}>
        <main className={`w-[100vw] h-[100vh] ${inter.className}`}>
          <Component {...pageProps} />
        </main>
      </AppProvider>
      <Toaster richColors />
    </>
  )
}
