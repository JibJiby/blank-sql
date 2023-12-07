import { CSSProperties } from 'react'

import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'

import { Skeleton } from '@/components/ui/skeleton'

import { ChapterGenerator } from '@/components/admin/chapter-generator'

import { auth } from '@/lib/auth'

import BaseLayout from '@/layouts/base-layout'
import { userService } from '@/server/services'

const QUIZ_LIST_VIEWER_HEIGHT = 450
const viewerStyle: CSSProperties = { height: QUIZ_LIST_VIEWER_HEIGHT }

const AdminChapterTable = dynamic(
  () =>
    import('@/components/admin/admin-chapter-table').then(
      (mod) => mod.AdminChapterTable
    ),
  {
    loading: () => <Skeleton className="w-full" style={viewerStyle} />,
    ssr: false,
  }
)

export default function ChapterAdminPage() {
  return (
    <BaseLayout>
      <div className="flex flex-col max-w-2xl  w-[80%] border rounded-md">
        <div className="overflow-x-auto scrollbar-hide" style={viewerStyle}>
          <AdminChapterTable />
        </div>
        <div>
          <ChapterGenerator />
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
