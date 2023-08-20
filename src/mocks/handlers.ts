import { rest } from 'msw'
import { nanoid } from 'nanoid'

import { Chapter } from '@/models/chapter'
import { Quiz } from '@/models/quiz'

const chapterListMock: Array<Chapter> = [
  { chapterId: '1', chapterName: '기초 개념' },
  { chapterId: '2', chapterName: 'SELECT와 FROM' },
  { chapterId: '3', chapterName: 'WHERE 으로 원하는 데이터만 가져오기' },
]

const quizListMock: Array<Quiz> = [
  {
    quizId: '1',
    quizQuery: 'SELECT\n\t____\nFROM\n\tMY_DB.USERS',
    answerObj: JSON.stringify({ 0: '*' }),
    answerLength: 1,
    priority: 50000,
  },
  {
    quizId: '2',
    quizQuery: 'SELECT\n\t____\nFROM\n\tMY_DB.____',
    answerObj: JSON.stringify({ 0: '*', 1: 'USERS' }),
    answerLength: 2,
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
  rest.get('/api/quiz', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(quizListMock))
  }),

  rest.get('/api/quiz/:id', (req, res, ctx) => {
    const { id } = req.params

    const findQuizIdx = quizListMock.findIndex((quiz) => quiz.quizId === id)
    if (findQuizIdx === -1) {
      return res(ctx.status(403))
    }

    const quiz = quizListMock.at(findQuizIdx)
    return res(ctx.status(200), ctx.json(quiz))
  }),
]
