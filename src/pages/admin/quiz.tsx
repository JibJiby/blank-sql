import { Suspense } from 'react'

import { GetServerSideProps } from 'next'

import { getServerSession } from 'next-auth'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { authOptions } from '@/lib/auth'

import { useChapterQuery } from '@/hooks/query/use-chapter-query'

import BaseLayout from '@/layouts/base-layout'
import { userService } from '@/server/services'

export default function QuizAdminPage() {
  return <BaseLayout>QuizAdminPage</BaseLayout>
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

// TODO: 컴포넌트 분리
function ChapterSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="챕터를 선택해주세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>현재 챕터</SelectLabel>
          <Suspense fallback={null}>
            <ChapterSelectItems />
          </Suspense>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function ChapterSelectItems() {
  const { data: chapters } = useChapterQuery({ suspense: true })

  return chapters?.map((chapter) => (
    <SelectItem key={chapter.id} value={chapter.chapterName}>
      {chapter.chapterName}
    </SelectItem>
  ))
}
