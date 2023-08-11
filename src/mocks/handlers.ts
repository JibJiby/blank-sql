import { rest } from 'msw'
import { nanoid } from 'nanoid'
import { z } from 'zod'

// TODO: model 디렉토리로 분리
// ----
const ChapterSchema = z.object({
  chapterId: z.string(),
  chapterName: z
    .string()
    .min(3, '최소 3글자 이상이어야 합니다')
    .max(40, '최대 40글자 이내로 작성해야 합니다'),
})
type Chapter = z.infer<typeof ChapterSchema>
// ----

const chapterListMock: Array<Chapter> = [
  { chapterId: nanoid(), chapterName: '기초 개념' },
  { chapterId: nanoid(), chapterName: '기본 문법 SQL' },
]

export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    )
  }),

  /**
   * ----------------------------------------------------
   * Chapter
   * ----------------------------------------------------
   */

  // 모든 챕터 목록
  rest.get('/api/chapter', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(chapterListMock))
  }),
  // 챕터 생성
  rest.post('/api/chapter', async (req, res, ctx) => {
    const { chapterName } = await req.json<Pick<Chapter, 'chapterName'>>()

    const validationResult = ChapterSchema.pick({
      chapterName: true,
    }).safeParse({
      chapterName,
    })
    if (!validationResult.success) {
      return res(ctx.status(400), ctx.text(validationResult.error.message))
    }

    const newChapter = {
      chapterId: nanoid(),
      chapterName,
    }
    chapterListMock.push(newChapter)

    return res(ctx.status(201), ctx.json(newChapter))
  }),
]
