import { useEffect } from 'react'

import BaseLayout from '@/layouts/base-layout'

export default function ChapterQuizPage() {
  // TODO: server state로 빼기
  useEffect(() => {
    ;(async function () {
      const res = await fetch('/api/chapter')
      console.log(await res.json())
    })()
  }, [])

  return <BaseLayout>chapter quiz page</BaseLayout>
}
