import { ReactNode } from 'react'

import { PageHeader } from '@/components/page-header'

import { size } from '@/styles/size'

type Props = {
  children: ReactNode
}

export default function BaseLayout({ children }: Props) {
  return (
    <>
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
