import { z } from 'zod'

export const ChapterSchema = z.object({
  id: z.string(),
  chapterName: z
    .string()
    .min(3, '최소 3글자 이상이어야 합니다')
    .max(40, '최대 40글자 이내로 작성해야 합니다'),
})
export type Chapter = z.infer<typeof ChapterSchema>
