import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import { container } from 'tsyringe'

import BaseLayout from '@/layouts/base-layout'
import { Chapter } from '@/models/chapter'
import { ChapterService } from '@/server/services/chapter.service'

export default function ChapterQuizPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const chapters = JSON.parse(data)

  const handleChapterIdInput = (chapterId: string) => {
    return () => {
      router.push(router.asPath + `/${chapterId}`)
    }
  }

  const renderChapterList = (chapterList: Chapter[]) => {
    if (!chapterList.length) {
      return
    }

    return chapterList.map((chapter) => (
      <div
        onClick={handleChapterIdInput(chapter.id)}
        key={`chapter-${chapter.id}`}
        className="w-full px-4 py-6 font-semibold text-center transition-all ease-in border rounded-md cursor-pointer hover:bg-secondary"
      >
        {chapter.chapterName}
      </div>
    ))
  }

  return (
    <BaseLayout>
      <div className="flex flex-col items-center w-[85%] max-w-md space-y-8">
        {renderChapterList(chapters)}
      </div>
    </BaseLayout>
  )
}

export const getStaticProps = (async () => {
  const chapterService = container.resolve(ChapterService)
  const chapters = await chapterService.getAllChapters()

  return {
    props: {
      data: JSON.stringify(chapters),
    },
  }
}) satisfies GetStaticProps<{
  // data: Chapter[]
  data: string
}>
