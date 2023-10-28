import { useRouter } from 'next/router'

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

import { Quiz } from '@/models/quiz'

const columnsWithoutAction: ColumnDef<Quiz>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <div className="font-bold text-center">퀴즈 ID</div>,
  },
  {
    id: 'chapter.chapterName',
    accessorKey: 'chapter.chapterName',
    header: () => <div className="font-bold text-center">챕터명</div>,
  },
  {
    id: 'chapterId',
    accessorKey: 'chapterId',
  },
]

type Params = {
  deleteHandler: (id: string) => void
}

export function useQuizTableColumns({ deleteHandler }: Params) {
  const columns: ColumnDef<Quiz>[] = [
    ...columnsWithoutAction,
    {
      id: 'editAction',
      cell: QuizEditButtonCell,
    },
    {
      id: 'deleteAction',
      cell: (props) => (
        <QuizDeleteButtonCell {...props} deleteHandler={deleteHandler} />
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
type QuizEditButtonCellProps = CellContext<Quiz, unknown>

function QuizEditButtonCell({ row }: QuizEditButtonCellProps) {
  const router = useRouter()

  const handleClick = () =>
    router.push(`/admin/quiz/write?id=${row.original.id}`)

  return (
    <div className="flex items-center justify-center">
      <Button variant="ghost" size="sm" onClick={handleClick}>
        <Pencil width={16} />
      </Button>
    </div>
  )
}

type QuizDeleteButtonCellProps = CellContext<Quiz, unknown> & {
  deleteHandler: (chapterId: string) => void
}

function QuizDeleteButtonCell({
  row,
  deleteHandler,
}: QuizDeleteButtonCellProps) {
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
            <AlertDialogTitle>해당 퀴즈를 삭제하시겠습니까?</AlertDialogTitle>
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
