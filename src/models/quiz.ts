import { z } from 'zod'

export const QuizSchema = z.object({
  id: z.string(),
  quiz: z.string(),
  answer: z.string(),
  priority: z.number().default(50_000).optional(),
  chapterId: z.optional(z.string()),
})
export type Quiz = z.infer<typeof QuizSchema>
