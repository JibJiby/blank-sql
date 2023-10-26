import {
  Dispatch,
  SetStateAction,
  Suspense,
  createContext,
  useContext,
  useState,
} from 'react'

import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import { ChapterSelectItems } from '@/components/admin/chapter-select-items'

import { auth } from '@/lib/auth'

import BaseLayout from '@/layouts/base-layout'
import { userService } from '@/server/services'

const QUIZ_LIST_VIEWER_HEIGHT = 450

const QuizListViewer = dynamic(
  () =>
    import('@/components/admin/quiz-list-viewer').then(
      (mod) => mod.QuizListViewer
    ),
  {
    loading: () => (
      <Skeleton
        className="w-full"
        style={{ height: QUIZ_LIST_VIEWER_HEIGHT }}
      />
    ),
    ssr: false,
  }
)

export default function QuizAdminPage() {
  const [filterChapterId, setFilterChapterId] = useState('')

  return (
    <ChapterFilterContext.Provider
      value={{ filterChapterId, setFilterChapterId }}
    >
      <BaseLayout>
        <div className="flex flex-col justify-center max-w-2xl max-h-[550px] w-[80%] border rounded-md pb-6">
          <div className="px-6 py-4">
            <ChapterFilter />
          </div>
          <div
            className="overflow-x-auto scrollbar-hide"
            style={{ height: QUIZ_LIST_VIEWER_HEIGHT }}
          >
            <QuizListViewer />
          </div>
          <div className="flex flex-row-reverse px-10 py-6">
            <Button>
              <Link href="/admin/quiz/write">퀴즈 생성</Link>
            </Button>
          </div>
        </div>
      </BaseLayout>
    </ChapterFilterContext.Provider>
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

/**
 * ------------------------------------------------
 * TODO: 분리
 * ------------------------------------------------
 */

type ChapterFilterContextType = {
  filterChapterId: string
  setFilterChapterId: Dispatch<SetStateAction<string>>
}

const ChapterFilterContext = createContext<ChapterFilterContextType | null>(
  null
)

function ChapterFilter() {
  const { setFilterChapterId } = useContext(ChapterFilterContext)!

  const handleValueChanged = (chapterId: string) => {
    setFilterChapterId(chapterId)
  }

  return (
    <Select onValueChange={handleValueChanged}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="챕터 목록" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>챕터 목록</SelectLabel>
          <SelectItem value="all">ALL</SelectItem>
          <ChapterSelectItems />
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
