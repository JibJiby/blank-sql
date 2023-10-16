import { useRouter } from 'next/router'

import { useChapterQuery } from '@/hooks/query/useChapterQuery'

import BaseLayout from '@/layouts/base-layout'
import { Chapter } from '@/models/chapter'

export default function ChapterQuizPage() {
  const router = useRouter()
  const { data, isLoading, status } = useChapterQuery()

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

  if (isLoading || status !== 'success') {
    return
  }

  return (
    <BaseLayout>
      <div className="flex flex-col items-center w-[85%] max-w-md space-y-8">
        {renderChapterList(data)}
      </div>
    </BaseLayout>
  )
}
