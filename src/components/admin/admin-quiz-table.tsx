import { Table as ReactTableType } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { toast } from 'sonner'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { ChapterSelectItems } from '@/components/admin/chapter-select-items'
import { useQuizTableColumns } from '@/components/admin/columns/quiz'
import { BasicReactTable } from '@/components/common/basic-react-table'

import { useDeleteQuizMutation } from '@/hooks/mutation/quiz/use-delete-quiz-mutation'
import { useAllQuizQuery } from '@/hooks/query/quiz/use-all-quiz-query'

export function AdminQuizTable() {
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
  const { data, isLoading } = useAllQuizQuery()

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnVisibility: { chapterId: false },
    },
  })

  if (isLoading) {
    return null
  }

  return (
    <>
      <div className="px-6 py-4">
        <AdminQuizTableFilter table={table} />
      </div>
      <BasicReactTable table={table} />
    </>
  )
}

type Props<TData> = {
  table: ReactTableType<TData>
}

function AdminQuizTableFilter<TData>({ table }: Props<TData>) {
  const handleValueChanged = (chapterId: string) => {
    if (chapterId === 'all') {
      table.resetColumnFilters()
      return
    }
    table.setColumnFilters([{ id: 'chapterId', value: chapterId }])
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
