import Link from 'next/link'
import { useRouter } from 'next/router'

import { ChevronLeft, Command } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { buttonVariants } from '@/components/ui/button'

import { UserAuthForm } from '@/components/user-auth-form'

import { cn } from '@/lib/utils'

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    // NOTE: For error "React will try to recreate this component tree from scratch using the error boundary you provided, RenderErrorBoundary"
    return null
  }

  if (session) {
    return router.push('/')
  }

  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen">
      <Link
        href="/about"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <>
          <ChevronLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Command className="w-6 h-6 mx-auto" />
          <h1 className="pb-4 text-2xl font-semibold tracking-tight">
            __SQL 로그인
          </h1>
          <p className="text-sm text-muted-foreground">
            SNS 계정으로{' '}
            <strong>
              <u>5초 만에 시작</u>
            </strong>
            해보세요
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}
