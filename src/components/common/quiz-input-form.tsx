import { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'
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

import { QuizAnswer, matchAnswer } from '@/lib/quiz/match-answer'
import { range } from '@/lib/utils'

import { Quiz } from '@/models/quiz'

// ref : https://stackoverflow.com/questions/75373940/how-do-i-create-a-zod-object-with-dynamic-keys
const inputFormSchema = z.record(
  z.string().min(1, { message: '비어 있습니다!' })
)

type Props = {
  quiz: Quiz
  onFailure: () => void
  onSuccess: () => void
}

export const QuizInputForm = ({ quiz, onSuccess, onFailure }: Props) => {
  const answer = useMemo(
    () => JSON.parse(quiz.answer || '') as Record<string, string>,
    [quiz]
  )
  const defaultValues = useMemo(
    () => Object.keys(answer).reduce((acc, cur) => ({ ...acc, [cur]: '' }), {}),
    [answer]
  )
  const length = useMemo(() => Object.keys(answer).length, [answer])
  const form = useForm<z.infer<typeof inputFormSchema>>({
    resolver: zodResolver(inputFormSchema),
    defaultValues,
  })

  const handleCompositionSubmit = (data: Object) => {
    if (!matchAnswer(data as QuizAnswer, answer)) {
      onFailure()
      return
    }

    onSuccess()
    form.reset()
  }

  return (
    <div className="flex flex-col items-center max-w-[400px]">
      <div className="flex flex-col items-center mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCompositionSubmit)}>
            <QuizInputFormFields form={form} length={length} />

            <div className="flex justify-center w-full pt-4">
              <Button className="w-full" type="submit">
                제출
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

type QuizInputFormFieldsProps = {
  length: number
  form: UseFormReturn<z.infer<typeof inputFormSchema>, any, undefined>
}

function QuizInputFormFields({ length, form }: QuizInputFormFieldsProps) {
  return range(length).map((_, idx) => (
    <FormField
      key={`generateFormFields-${idx + 1}`}
      name={idx.toString()}
      control={form.control}
      defaultValue=""
      render={({ field }) => (
        <FormItem className="pb-4 min-h-[90px]">
          <div className="inline-flex items-center">
            <FormLabel className="min-w-[26px] p-2 select-none">
              {idx + 1}
            </FormLabel>
            <FormControl>
              <Input
                className="mt-0 ml-4 max-sm:text-base"
                placeholder={`${idx + 1} 번째 빈칸`}
                {...field}
              />
            </FormControl>
          </div>
          {form.formState.errors[idx]?.message && (
            <div className="flex flex-row-reverse pr-2">
              <FormMessage />
            </div>
          )}
        </FormItem>
      )}
    />
  ))
}
