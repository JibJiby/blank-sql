import { useRouter } from 'next/router'

import { useChapterQuery } from '@/hooks/query/useChapterQuery'

import BaseLayout from '@/layouts/base-layout'
import { Chapter } from '@/models/chapter'

export default function ChapterQuizPage() {
  const router = useRouter()
  const { data, isLoading, status } = useChapterQuery()

  const onClickChapter = (chapterId: string) => {
    return () => {
      router.push(router.asPath + `/${chapterId}`)
    }
  }

  const renderChapterList = (chapterList: Chapter[]) => {
    return data?.map((chapter) => (
      <div
        onClick={onClickChapter(chapter.chapterId)}
        key={`chapter-${chapter.chapterId}`}
        className="w-full px-4 py-6 font-semibold text-center transition-all ease-in border rounded-md cursor-pointer hover:bg-secondary"
      >
        {chapter.chapterName}
      </div>
    ))
  }

  return (
    <BaseLayout>
      <div className="flex flex-col items-center w-[85%] max-w-md space-y-8">
        {!isLoading && status === 'success' && renderChapterList(data)}
      </div>
    </BaseLayout>
  )
}
