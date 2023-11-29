import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { toast } from 'sonner'

import { useChapterTableColumns } from '@/components/columns/chapter'
import { BasicReactTable } from '@/components/common/basic-react-table'

import { useDeleteChapterMutation } from '@/hooks/mutation/use-delete-chapter-mutation'
import { useUpdateChapterMutation } from '@/hooks/mutation/use-update-chapter-mutation'
import { useChapterQuery } from '@/hooks/query/use-chapter-query'

export function AdminChapterTable() {
  const deleteMutation = useDeleteChapterMutation({
    successFeedback: () => toast.success('🗑️ 해당 챕터를 삭제 완료했습니다'),
    errorFeedback: () =>
      toast.error('😭 오류로 인해 챕터를 삭제하지 못했습니다'),
  })
  const updateMutation = useUpdateChapterMutation({
    successFeedback: () => toast.success('📝 해당 챕터를 수정 완료했습니다'),
    errorFeedback: () =>
      toast.error('😭 오류로 인해 챕터를 수정하지 못했습니다'),
  })
  const columns = useChapterTableColumns({
    deleteHandler: (id: string) => {
      deleteMutation.mutate(id)
    },
    editHandler: (id: string, newChapterName: string) => {
      if (newChapterName.trim().length < 3) {
        toast.error('❌ 포멧이 맞지 않습니다')
        throw new Error('edit validation error')
      }

      updateMutation.mutate({ chapterId: id, newChapterName: newChapterName })
    },
  })
  const { data } = useChapterQuery({ suspense: true })

  const table = useReactTable({
    data: data!,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <BasicReactTable table={table} />
}
