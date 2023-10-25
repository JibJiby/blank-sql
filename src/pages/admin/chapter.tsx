import { Suspense } from 'react'

import { GetServerSideProps } from 'next'

import { getServerSession } from 'next-auth'

import { Skeleton } from '@/components/ui/skeleton'

import { ChapterGenerator } from '@/components/admin/chapter-generator'
import { ChapterListViewer } from '@/components/admin/chapter-list-viewer'

import { authOptions } from '@/lib/auth'

import BaseLayout from '@/layouts/base-layout'
import { userService } from '@/server/services'

export default function ChapterAdminPage() {
  return (
    <BaseLayout>
      <div className="flex flex-col max-w-2xl  w-[80%] border rounded-md">
        <div className="overflow-x-auto scrollbar-hide max-h-[400px]">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <ChapterListViewer />
          </Suspense>
        </div>
        <div>
          <ChapterGenerator />
        </div>
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

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
