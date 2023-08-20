import { z } from 'zod'

export const QuizSchema = z.object({
  quizId: z.string(),
  quizQuery: z.string(),
  answerObj: z.string(),
  answerLength: z.number(),
  priority: z.number().default(50_000).optional(),
  chapterId: z.optional(z.string()),
})
export type Quiz = z.infer<typeof QuizSchema>
