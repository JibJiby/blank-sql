import { rest } from 'msw'

const chapterListMock = [
  { id: 1, chapterName: '기초 개념' },
  { id: 2, chapterName: '기본 문법 SQL' },
]

export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    )
  }),

  /**
   * Chapter
   */
  rest.get('/api/chapter', (req, res, ctx) => {
    // 모든 챕터 목록
    return res(ctx.status(200), ctx.json(chapterListMock))
  }),
  rest.post('/api/chapter', async (req, res, ctx) => {
    const { chapterName } = await req.json()

    // 챕터 생성
    const newChapter = {
      id: chapterListMock.length,
      chapterName,
    }
    chapterListMock.push(newChapter)

    return res(ctx.status(201), ctx.json(newChapter))
  }),
]
