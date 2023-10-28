import { CSSProperties } from 'react'

import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { auth } from '@/lib/auth'

import BaseLayout from '@/layouts/base-layout'
import { userService } from '@/server/services'

const QUIZ_LIST_VIEWER_HEIGHT = 450
const viewerStyle: CSSProperties = { height: QUIZ_LIST_VIEWER_HEIGHT }

const AdminQuizTable = dynamic(
  () =>
    import('@/components/admin/admin-quiz-table').then(
      (mod) => mod.AdminQuizTable
    ),
  {
    loading: () => <Skeleton className="w-full" style={viewerStyle} />,
    ssr: false,
  }
)

export default function QuizAdminPage() {
  return (
    <BaseLayout>
      <div className="flex flex-col justify-center max-w-2xl max-h-[550px] w-[80%] border rounded-md pb-6">
        <div className="overflow-x-auto scrollbar-hide" style={viewerStyle}>
          <AdminQuizTable />
        </div>
        <div className="flex flex-row-reverse px-10 py-6">
          <Button>
            <Link href="/admin/quiz/write">퀴즈 생성</Link>
          </Button>
        </div>
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = (async (context) => {
  const session = await auth(context.req, context.res)

  if (session?.user) {
    const role = await userService.getRole(session?.user.id)

    if (role === 'Admin') {
      return { props: {} }
    }
  }

  return {
    props: {},
    redirect: {
      destination: '/',
    },
  }
}) satisfies GetServerSideProps<{}>
