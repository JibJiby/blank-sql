import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'

import { ChapterSelectItems } from '@/components/admin/chapter-select-items'

import { resizeAnswerObject } from '@/lib/quiz/resize-answer-object'
import { range } from '@/lib/utils'

import { useCreateQuizMutation } from '@/hooks/mutation/quiz/use-create-quiz-mutation'
import { useUpdateQuizMutation } from '@/hooks/mutation/quiz/use-update-quiz-mutation'
import { useSingleQuizQuery } from '@/hooks/query/quiz/use-single-quiz-query'

import { size } from '@/styles/size'

import { Quiz } from '@/models/quiz'

const QuizEditor = dynamic(() => import('@/components/common/quiz-editor'), {
  loading: () => (
    <Skeleton
      style={{
        height: size.quizViewerHeight,
        width: size.quizViewerWidth,
      }}
    />
  ),
})

const answerSchema = z.record(z.string().min(1))
type FormValue = Pick<Quiz, 'chapterId' | 'quiz'> & {
  answer: z.infer<typeof answerSchema>
}

type QuizEditFormProps = {
  quizId?: string
}

export function QuizEditForm({ quizId }: QuizEditFormProps) {
  const router = useRouter()
  const form = useForm<FormValue>({
    defaultValues: { chapterId: '', quiz: '', answer: {} },
    // resolver: zodResolver(QuizSchema.merge(z.object({ answer: answerSchema }))),
  })
  const [blankCount, setBlankCount] = useState(0)
  const {
    data: quizData,
    isSuccess: isSuccessSingleQuiz,
    refetch,
  } = useSingleQuizQuery(quizId || '')
  const createMutation = useCreateQuizMutation({
    successFeedback: () => {
      toast.success('🎉 퀴즈를 정상적으로 생성했습니다!')
      router.push('/admin/quiz')
    },
    errorFeedback: () => {
      toast.error('😢 퀴즈 생성을 정상적으로 마치지 못했습니다')
    },
  })
  const updateMutation = useUpdateQuizMutation({
    successFeedback: () => {
      toast.success('🎉 퀴즈를 정상적으로 수정했습니다!')
      router.push('/admin/quiz')
    },
    errorFeedback: () => {
      toast.error('😢 퀴즈 수정을 정상적으로 마치지 못했습니다')
    },
  })

  const handleExtractBlank = () => {
    const values = form.getValues()
    const quizString = values.quiz

    const identifiedBlankCount = quizString.match(/_{4}/g)?.length || 0
    const newAnswerObj = resizeAnswerObject({
      oldObject: values.answer,
      updatedSize: identifiedBlankCount,
    })
    form.setValue('answer', newAnswerObj)

    setBlankCount(identifiedBlankCount)
  }

  const handleSubmit = (data: FormValue) => {
    // validation
    if (!data.chapterId) {
      return toast.error('❌ 챕터를 정해주세요')
    }
    if (data.quiz.trim() === '') {
      return toast.error('❌ 문제를 입력해주세요')
    }
    if (!answerSchema.safeParse(data.answer).success) {
      return toast.error('❌ 빈칸 정답을 모두 채워주세요')
    }
    if (!(Object.keys(data.answer).length > 0)) {
      return toast.error('❌ 빈칸이 하나 이상 있어야 합니다')
    }

    if (quizId) {
      updateMutation.mutate({
        id: quizId,
        quiz: data.quiz,
        answer: JSON.stringify(data.answer),
        chapterId: data.chapterId,
      })
    } else {
      createMutation.mutate({
        chapterId: data.chapterId,
        quiz: data.quiz,
        answer: JSON.stringify(data.answer),
      })
    }
  }

  useEffect(() => {
    if (isSuccessSingleQuiz) {
      form.setValue('chapterId', quizData.chapterId)
      form.setValue('quiz', quizData.quiz)

      const answer = JSON.parse(quizData.answer)
      form.setValue('answer', answer)
      setBlankCount(Object.keys(answer).length)
    }
  }, [form, quizData, isSuccessSingleQuiz])

  useEffect(() => {
    if (!!quizId) {
      refetch()
    }
    // just one time fetching while editing (not creating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (
    form.formState.isLoading ||
    createMutation.isSuccess ||
    updateMutation.isSuccess
  ) {
    return null
  }

  return (
    <div className="flex flex-col justify-center max-w-2xl  w-[80%] border rounded-md pt-4 pb-6">
      <div className="flex items-center justify-center p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="px-4 py-6 space-y-6"
          >
            {/* TODO: 합성 컴포넌트여서 각각 응집도는 좋지만 좀 더 간결한 방식 고려 필요 */}
            <FormField
              control={form.control}
              name="chapterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-4">챕터 ID</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue=""
                      // 생성시엔 value props 사용 X / 수정시엔 기존 내용 채우기 위해 field.value 로 넣어주기
                      value={quizId ? field.value : undefined}
                    >
                      <SelectTrigger className="w-[300px]">
                        <SelectValue
                          placeholder="챕터를 선택해주세요"
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>현재 챕터</SelectLabel>
                          <ChapterSelectItems />
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quiz"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-4">문제 SQL</FormLabel>
                  <FormControl>
                    <QuizEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ExtractedQuizAnswerInput form={form} blankCount={blankCount} />

            <div className="flex flex-row-reverse gap-2">
              <Button type="submit">{quizId ? '수정하기' : '만들기'}</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleExtractBlank}
              >
                빈칸 추출
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

function ExtractedQuizAnswerInput({
  form,
  blankCount,
}: {
  form: UseFormReturn<FormValue, any, undefined>
  blankCount: number
}) {
  return (
    <div className="flex flex-col p-4 space-y-2">
      {range(blankCount).map((_, idx) => (
        <div key={`answer_${idx}`} className="flex justify-between">
          <div className="flex items-center justify-center p-4 pl-1">
            <Label htmlFor={`answer.${idx}`}>{idx + 1}</Label>
          </div>
          <Input {...form.register(`answer.${idx}`)} />
        </div>
      ))}
    </div>
  )
}
