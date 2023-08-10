import { useEffect } from 'react'

import { PageHeader } from '@/components/page-header'

import { size } from '@/styles/size'

export default function Home() {
  useEffect(() => {
    ;(async function () {
      const res = await fetch('/api/user')
      console.log(res.ok)
    })()
  }, [])

  return (
    <>
      <PageHeader />
      <main
        style={{
          paddingTop: size.headerHeight + 15,
        }}
        className={`flex min-h-screen flex-col items-center justify-between`}
      >
        New Blank SQL
      </main>
    </>
  )
}
