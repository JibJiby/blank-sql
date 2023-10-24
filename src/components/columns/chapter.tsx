import { ColumnDef } from '@tanstack/react-table'
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
  // editHandler: (id: string) => void
  deleteHandler: (id: string) => void
}

export function getColumns({ deleteHandler }: Params) {
  const columns: ColumnDef<Chapter>[] = [
    ...columnsWithoutAction,
    /**
     * 수정
     */
    // {
    //   id: 'editAction',
    //   cell: ({ row }) => {
    //     const chapterId = row.original.id
    //     const handler = () => editHandler(chapterId)

    //     return (
    //       <div className="flex items-center justify-center">
    //         <AlertDialog>
    //           <AlertDialogTrigger asChild>
    //             <Button
    //               variant="ghost"
    //               size="sm"
    //               className="hover:bg-slate-300"
    //             >
    //               <Trash2 width={16} />
    //             </Button>
    //           </AlertDialogTrigger>
    //           <AlertDialogContent className="max-sm:w-[80%]">
    //             <AlertDialogHeader>
    //               <AlertDialogTitle>
    //                 해당 유저를 삭제하시겠습니까?
    //               </AlertDialogTitle>
    //             </AlertDialogHeader>
    //             <AlertDialogFooter>
    //               <AlertDialogCancel>취소</AlertDialogCancel>
    //               <AlertDialogAction onClick={handler}>확인</AlertDialogAction>
    //             </AlertDialogFooter>
    //           </AlertDialogContent>
    //         </AlertDialog>
    //       </div>
    //     )
    //   },
    // },
    /**
     * 삭제
     */
    {
      id: 'deleteAction',
      cell: ({ row }) => {
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
                  <AlertDialogTitle>
                    해당 챕터를 삭제하시겠습니까?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction onClick={handler}>삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      },
    },
  ]

  return columns
}
