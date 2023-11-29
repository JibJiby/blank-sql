import { SelectItem } from '@/components/ui/select'

import { useChapterQuery } from '@/hooks/query/chapter/use-chapter-query'

export function ChapterSelectItems() {
  const { data: chapters, isLoading } = useChapterQuery()

  if (isLoading) {
    return null
  }

  return chapters!.map((chapter) => (
    <SelectItem key={chapter.id} value={chapter.id}>
      {chapter.chapterName}
    </SelectItem>
  ))
}
