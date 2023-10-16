import { ReactNode } from 'react'

import Head from 'next/head'

import { PageHeader } from '@/components/page-header'

import { size } from '@/styles/size'

type Props = {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  return (
    <>
      <Head>
        {/* for google user image (http response 403)  */}
        <meta name="referrer" content="no-referrer" />
      </Head>
      <PageHeader />
      <main
        style={{
          paddingTop: size.headerHeight + 15,
        }}
        className={`flex min-h-screen flex-col items-center justify-center`}
      >
        {children}
      </main>
    </>
  )
}
