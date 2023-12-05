import { CSSProperties, ReactNode } from 'react'

import Head from 'next/head'

import { PageHeader } from '@/components/common/page-header'

import { size } from '@/styles/size'

type Props = {
  children: ReactNode
}

const mainContentStyle: CSSProperties = {
  paddingTop: size.headerHeight + 30,
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
        style={mainContentStyle}
        className={`flex min-h-screen flex-col items-center max-sm:justify-start sm:justify-center`}
      >
        {children}
      </main>
    </>
  )
}
