import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import TypographyH3 from '@/components/ui/typography/h3'

import { cn } from '@/lib/utils'

export default function Custom404() {
  return (
    <main className="flex items-center justify-center w-screen min-h-screen">
      <div className="flex flex-col justify-center space-y-4">
        <TypographyH3>찾으시는 페이지가 존재하지 않습니다 😭</TypographyH3>
        <div className="flex justify-center mt-6">
          <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  )
}
