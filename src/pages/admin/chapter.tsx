import { Suspense, useEffect } from 'react'

import { GetServerSideProps } from 'next'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { getServerSession } from 'next-auth'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { getColumns } from '@/components/columns/chapter'

import { authOptions } from '@/lib/auth'

import { useCreateChapterMutation } from '@/hooks/mutation/use-create-chapter-mutation'
import { useDeleteChapterMutation } from '@/hooks/mutation/use-delete-chapter-mutation'
import { useUpdateChapterMutation } from '@/hooks/mutation/use-update-chapter-mutation'
import { useChapterQuery } from '@/hooks/query/use-chapter-query'

import BaseLayout from '@/layouts/base-layout'
import { ChapterSchema } from '@/models/chapter'
import { userService } from '@/server/services'

export default function ChapterAdminPage() {
  return (
    <BaseLayout>
      <div className="flex flex-col max-w-2xl  w-[80%] border rounded-md">
        <div className="overflow-x-auto scrollbar-hide max-h-[400px]">
          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            <ChapterListViewer />
          </Suspense>
        </div>
        <div>
          <ChapterGenerator />
        </div>
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = (async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session?.user) {
    const role = await userService.getRole(session?.user.id)

    if (role === 'Admin') {
      return { props: {} }
    }
  }

  return {
    props: {},
    redirect: {
      destination: '/',
    },
  }
}) satisfies GetServerSideProps<{}>

/**
 * -------------------------------------------------
 * TODO: 컴포넌트 분리
 * -------------------------------------------------
 */

function ChapterListViewer() {
  const deleteMutation = useDeleteChapterMutation()
  const updateMutation = useUpdateChapterMutation()
  const columns = getColumns({
    deleteHandler: (id: string) => {
      deleteMutation.mutate(id)
    },
    editHandler: (id: string, newChapterName: string) => {
      // TODO: zod schema 를 이용한 validation 으로 변경
      if (newChapterName.trim().length < 3) {
        toast.error('포멧이 맞지 않습니다')
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

//
type FormValue = Pick<z.infer<typeof ChapterSchema>, 'chapterName'>

function ChapterGenerator() {
  const form = useForm<FormValue>({
    resolver: zodResolver(ChapterSchema.pick({ chapterName: true })),
    defaultValues: { chapterName: '' },
  })
  const mutation = useCreateChapterMutation()

  const handleSubmit = (value: FormValue) => {
    mutation.mutate(value.chapterName)
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      // 기존 onSuccess 에서 UI 로직을 useEffect 로 분리
      toast.success('🎉 성공적으로 새로운 챕터를 생성했습니다!')
      form.reset()
    }
  }, [form, mutation.isSuccess])

  useEffect(() => {
    if (mutation.isError) {
      toast.error('😢 서버 에러로 인해 생성하지 못했습니다')
    }
  }, [mutation.isError])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="px-4 py-6 space-y-10"
      >
        <FormField
          control={form.control}
          name="chapterName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pb-4">새로운 챕터명</FormLabel>
              <FormControl>
                <Input placeholder="챕터명" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse">
          <Button type="submit">만들기</Button>
        </div>
      </form>
    </Form>
  )
}
