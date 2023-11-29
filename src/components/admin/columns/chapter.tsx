import { useRef } from 'react'

import { CellContext, ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Chapter } from '@/models/chapter'

const columnsWithoutAction: ColumnDef<Chapter>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <div className="font-bold text-center">챕터 ID</div>,
  },
  {
    id: 'chapterName',
    accessorKey: 'chapterName',
    header: () => <div className="font-bold text-center">챕터명</div>,
  },
]

type Params = {
  editHandler: (id: string, newChapterName: string) => void
  deleteHandler: (id: string) => void
}

export function useChapterTableColumns({ editHandler, deleteHandler }: Params) {
  const columns: ColumnDef<Chapter>[] = [
    ...columnsWithoutAction,
    {
      id: 'editAction',
      cell: (props) => (
        <ChapterEditButtonCell {...props} editHandler={editHandler} />
      ),
    },
    {
      id: 'deleteAction',
      cell: (props) => (
        <ChapterDeleteButtonCell {...props} deleteHandler={deleteHandler} />
      ),
    },
  ]

  return columns
}

/**
 * ------------------------------------------------------
 * 내부 컴포넌트
 * ------------------------------------------------------
 */

type ChapterEditButtonCellProps = CellContext<Chapter, unknown> &
  Pick<Params, 'editHandler'>

function ChapterEditButtonCell({
  row,
  editHandler,
}: ChapterEditButtonCellProps) {
  const chapterId = row.original.id
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handler = () => {
    if (!inputRef.current) {
      return
    }
    const newChapterInput = inputRef.current.value.trim()
    try {
      editHandler(chapterId, newChapterInput)
      inputRef.current.value = ''
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Pencil width={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-sm:w-[80%]">
          <AlertDialogHeader>
            <AlertDialogTitle>챕터명을 수정하시겠습니까?</AlertDialogTitle>
          </AlertDialogHeader>
          <div>
            <Input ref={inputRef} />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handler}>수정</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

type ChapterDeleteButtonCellProps = CellContext<Chapter, unknown> &
  Pick<Params, 'deleteHandler'>

function ChapterDeleteButtonCell({
  row,
  deleteHandler,
}: ChapterDeleteButtonCellProps) {
  const chapterId = row.original.id
  const handler = () => deleteHandler(chapterId)

  return (
    <div className="flex items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Trash2 width={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-sm:w-[80%]">
          <AlertDialogHeader>
            <AlertDialogTitle>해당 챕터를 삭제하시겠습니까?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handler}>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
