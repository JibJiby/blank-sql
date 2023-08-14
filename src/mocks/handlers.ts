import { rest } from 'msw'
import { nanoid } from 'nanoid'

import { Chapter } from '@/models/chapter'
import { Quiz } from '@/models/quiz'

const chapterListMock: Array<Chapter> = [
  { chapterId: nanoid(), chapterName: '기초 개념' },
  { chapterId: nanoid(), chapterName: 'SELECT와 FROM' },
  { chapterId: nanoid(), chapterName: 'WHERE 으로 원하는 데이터만 가져오기' },
]

const quizListMock: Array<Quiz> = [
  {
    quizId: nanoid(),
    quizQuery: 'SELECT\n\t____\nFROM\n\tMY_DB.USERS',
    answerObj: '{"0":"*"}',
    answerLength: 1,
    priority: 50000,
  },
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
  /**
   * ----------------------------------------------------
   * Quiz
   * ----------------------------------------------------
   */
  rest.get('/api/quiz/:id', (req, res, ctx) => {
    // const { id } = req.params
    return res(ctx.status(200), ctx.json(quizListMock[0]))
  }),
]
