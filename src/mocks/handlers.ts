import { rest } from 'msw'
import { nanoid } from 'nanoid'

import { Chapter } from '@/models/chapter'

const chapterListMock: Array<Chapter> = [
  { chapterId: nanoid(), chapterName: '기초 개념' },
  { chapterId: nanoid(), chapterName: 'SELECT와 FROM' },
  { chapterId: nanoid(), chapterName: 'WHERE 으로 원하는 데이터만 가져오기' },
]

export const handlers = [
  /**
   * ----------------------------------------------------
   * Chapter
   * ----------------------------------------------------
   */
  rest.get('/api/chapter', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(chapterListMock))
  }),
]
