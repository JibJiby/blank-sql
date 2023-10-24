import { Suspense } from 'react'

import { GetServerSideProps } from 'next'

import { zodResolver } from '@hookform/resolvers/zod'
import { getServerSession } from 'next-auth'
import { useForm } from 'react-hook-form'
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

import { authOptions } from '@/lib/auth'

import { useChapterMutation } from '@/hooks/mutation/use-chapter-mutation'
import { useChapterQuery } from '@/hooks/query/use-chapter-query'

import BaseLayout from '@/layouts/base-layout'
import { ChapterSchema } from '@/models/chapter'
import { userService } from '@/server/services'

export default function ChapterAdminPage() {
  return (
    <BaseLayout>
      <div className="flex flex-col max-w-2xl  w-[80%] border rounded-md">
        <div className="overflow-x-auto scrollbar-hide max-h-[400px]">
          <ChapterListViewer />
        </div>
        <div>
          <ChapterGenerator />
          {/* TODO: ChapterEditor 추가 */}
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left w-[30%]">ID</TableHead>
          <TableHead className="text-center">챕터명</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO: react-error-boundary ErrorBoundary 로 감싸기 */}
        <Suspense fallback={<Skeleton className="w-full min-h-[220px]" />}>
          <ChapterList />
        </Suspense>
      </TableBody>
    </Table>
  )
}

function ChapterList() {
  const { data: chapters } = useChapterQuery({ suspense: true })

  return chapters!.map((chapter) => (
    <TableRow key={chapter.id}>
      <TableCell>{chapter.id}</TableCell>
      <TableCell>{chapter.chapterName}</TableCell>
    </TableRow>
  ))
}

//
type FormValue = Pick<z.infer<typeof ChapterSchema>, 'chapterName'>

function ChapterGenerator() {
  const form = useForm<FormValue>({
    resolver: zodResolver(ChapterSchema.pick({ chapterName: true })),
    defaultValues: { chapterName: '' },
  })
  const mutation = useChapterMutation()

  const handleSubmit = (value: FormValue) => {
    mutation.mutate(value.chapterName)
    form.reset()
  }

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
