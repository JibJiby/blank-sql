import { useRouter } from 'next/router'

import BaseLayout from '@/layouts/base-layout'

export default function SingleQuizResolverPage() {
  const router = useRouter()

  console.log('asPath : ', router.asPath)

  return (
    <BaseLayout>
      <div>SingleQuizResolverPage</div>
    </BaseLayout>
  )
}
