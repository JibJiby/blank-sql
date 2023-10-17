import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { container } from 'tsyringe'

import BaseLayout from '@/layouts/base-layout'
import { Chapter } from '@/models/chapter'
import { ChapterService } from '@/server/services/chapter.service'

// TODO: react-query 해당 SIZE 이후로 pagination 으로 client 에서 불러오기
// const VISIALBE_CHAPTERS_MIN_SIZE = 5

export default function ChapterQuizPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const chapters = JSON.parse(data)

  const renderChapterList = (chapterList: Chapter[]) => {
    if (!chapterList.length) {
      return
    }

    return chapterList.map((chapter) => (
      <Link
        key={`chapter-${chapter.id}`}
        href={router.asPath + `/${chapter.id}`}
        className="w-full px-4 py-6 font-semibold text-center transition-all ease-in border rounded-md cursor-pointer hover:bg-secondary"
      >
        {chapter.chapterName}
      </Link>
    ))
  }

  return (
    <BaseLayout>
      <div className="flex flex-col items-center w-[85%] max-w-md space-y-8 max-h-[450px] overflow-scroll scrollbar-hide">
        {renderChapterList(chapters)}
      </div>
    </BaseLayout>
  )
}

export const getStaticProps = (async () => {
  const chapterService = container.resolve(ChapterService)
  const chapters = await chapterService.getAllChapters()
  // const chapters = await chapterService.getChaptersPagination(
  //   0,
  //   VISIALBE_CHAPTERS_MIN_SIZE
  // )

  return {
    props: {
      data: JSON.stringify(chapters),
    },
  }
}) satisfies GetStaticProps<{
  // data: Chapter[]
  data: string
}>
