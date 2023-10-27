import { useEffect } from 'react'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { toast } from 'sonner'

import { useChapterTableColumns } from '@/components/columns/chapter'

import { useDeleteChapterMutation } from '@/hooks/mutation/use-delete-chapter-mutation'
import { useUpdateChapterMutation } from '@/hooks/mutation/use-update-chapter-mutation'
import { useChapterQuery } from '@/hooks/query/use-chapter-query'

import { BasicReactTable } from './basic-react-table'

export function ChapterListViewer() {
  const deleteMutation = useDeleteChapterMutation()
  const updateMutation = useUpdateChapterMutation()
  const columns = useChapterTableColumns({
    deleteHandler: (id: string) => {
      deleteMutation.mutate(id)
    },
    editHandler: (id: string, newChapterName: string) => {
      // TODO: zod schema 를 이용한 validation 으로 변경
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

  // UI side effect AFTER Updating
  useEffect(() => {
    if (updateMutation.isSuccess) {
      toast.success('📝 해당 챕터를 수정 완료했습니다')
    }
  }, [updateMutation.isSuccess])

  useEffect(() => {
    if (updateMutation.isError) {
      toast.error('😭 서버 오류로 챕터를 수정하지 못했습니다')
    }
  }, [updateMutation.isError])

  // UI side effect AFTER Deleting
  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success('🗑️ 해당 챕터를 삭제 완료했습니다')
    }
  }, [deleteMutation.isSuccess])

  useEffect(() => {
    if (deleteMutation.isError) {
      toast.error('😭 서버 오류로 챕터를 삭제하지 못했습니다')
    }
  }, [deleteMutation.isError])

  return <BasicReactTable table={table} />
}
