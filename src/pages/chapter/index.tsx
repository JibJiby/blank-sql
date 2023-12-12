import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Prisma } from '@prisma/client'

import { cn } from '@/lib/utils'

import BaseLayout from '@/layouts/base-layout'
import { chapterService } from '@/server/services'

export default function ChapterQuizPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const chapters = JSON.parse(data)

  const renderChapterList = (chapterList: Prisma.ChapterSelect[]) => {
    if (!chapterList.length) {
      return
    }

    const commonCN =
      'w-full px-4 py-6 font-semibold text-center transition-all ease-in border rounded-md'

    return chapterList.map((chapter) =>
      chapter.isActive ? (
        <Link
          key={`chapter-${chapter.id}`}
          href={router.asPath + `/${chapter.id}`}
          className={cn(commonCN, 'cursor-pointer hover:bg-secondary')}
        >
          {chapter.chapterName}
        </Link>
      ) : (
        <div
          key={`chapter-${chapter.id}`}
          className={cn(commonCN, 'cursor-not-allowed opacity-50')}
        >
          {chapter.chapterName}
        </div>
      )
    )
  }

  return (
    <>
      <Head>
        <title>챕터 목록</title>
      </Head>
      <BaseLayout>
        <div className="flex items-center justify-center w-full h-[75vh]">
          <div className="flex flex-col items-center w-[85%] max-w-md space-y-8 max-h-[450px] overflow-scroll scrollbar-hide">
            {renderChapterList(chapters)}
          </div>
        </div>
      </BaseLayout>
    </>
  )
}

export const getStaticProps = (async () => {
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
