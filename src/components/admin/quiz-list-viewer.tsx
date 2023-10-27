import { useContext } from 'react'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { BasicReactTable } from '@/components/admin/basic-react-table'
import { useQuizTableColumns } from '@/components/columns/quiz'

import { useDeleteQuizMutation } from '@/hooks/mutation/use-delete-quiz-mutation'
import { useQuizInfinityQuery } from '@/hooks/query/use-quiz-infinity-query'

import { ChapterFilterContext } from '@/pages/admin/quiz'

export function QuizListViewer() {
  const { filterChapterId } = useContext(ChapterFilterContext)!
  const deleteMutation = useDeleteQuizMutation({
    successFeedback: () => toast.success('🗑️ 해당 챕터를 삭제 완료했습니다'),
    errorFeedback: () =>
      toast.error('😭 서버 오류로 챕터를 삭제하지 못했습니다'),
  })
  const columns = useQuizTableColumns({
    deleteHandler: (id: string) => {
      deleteMutation.mutate(id)
    },
  })
  const { data, isLoading, fetchNextPage } = useQuizInfinityQuery({
    size: 10,
  })

  const table = useReactTable({
    data: data?.pages.flat() || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: { chapterId: false },
      columnFilters: [{ id: 'chapterId', value: filterChapterId }],
    },
  })

  // FIXME: fetchNextPage 이후 컴포넌트 무한 리렌더링
  const handleLoadMore = () => {
    fetchNextPage()
    // ...
  }

  if (isLoading) {
    return null
  }

  return (
    <>
      <BasicReactTable table={table} />
      <div className="flex items-center justify-center py-4">
        <Button
          variant="outline"
          onClick={handleLoadMore}
          disabled={!data?.pages.at(-1)?.length}
        >
          더 가져오기
        </Button>
      </div>
    </>
  )
}
