import {
  Table as ReactTableType,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useQuizTableColumns } from '@/components/columns/quiz'

import { useDeleteQuizMutation } from '@/hooks/mutation/use-delete-quiz-mutation'
import { useQuizInfinityQuery } from '@/hooks/query/use-quiz-infinity-query'

export function QuizListViewer() {
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
  })

  const handleLoadMore = async () => {
    await fetchNextPage()
    // ...
  }

  if (isLoading) {
    return null
  }

  return (
    <>
      <QuizListViewerTable table={table} />
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

function QuizListViewerTable<TData>({
  table,
}: {
  table: ReactTableType<TData>
}) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="text-center">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
