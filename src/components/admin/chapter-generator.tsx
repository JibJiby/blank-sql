import { zodResolver } from '@hookform/resolvers/zod'
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

import { useCreateChapterMutation } from '@/hooks/mutation/use-create-chapter-mutation'

import { ChapterSchema } from '@/models/chapter'

type FormValue = Pick<z.infer<typeof ChapterSchema>, 'chapterName'>

export function ChapterGenerator() {
  const form = useForm<FormValue>({
    resolver: zodResolver(ChapterSchema.pick({ chapterName: true })),
    defaultValues: { chapterName: '' },
  })
  const mutation = useCreateChapterMutation({
    successFeedback: () => {
      toast.success('🎉 성공적으로 새로운 챕터를 생성했습니다!')
      form.reset()
    },
    errorFeedback: () => toast.error('😢 서버 에러로 인해 생성하지 못했습니다'),
  })

  const handleSubmit = (value: FormValue) => {
    mutation.mutate(value.chapterName)
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
