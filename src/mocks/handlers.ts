import { rest } from 'msw'

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
    chapterId: '1',
  },
  {
    quizId: '2',
    quizQuery: 'SELECT\n\t____\nFROM\n\tMY_DB.____',
    answerObj: JSON.stringify({ 0: '*', 1: 'USERS' }),
    answerLength: 2,
    chapterId: '1',
  },
  {
    quizId: '3',
    quizQuery: '____\n\t*\nFROM\n\tMY_DB.USERS',
    answerObj: JSON.stringify({ 0: 'SELECT' }),
    answerLength: 1,
    chapterId: '2',
  },
  {
    quizId: '4',
    quizQuery: '____\n\t*\n____\n\tMY_DB.USERS',
    answerObj: JSON.stringify({ 0: 'SELECT', 1: 'FROM' }),
    answerLength: 2,
    chapterId: '2',
  },
  {
    quizId: '5',
    quizQuery: 'SELECT\n\t*\nFROM\n\tMY_DB.USERS WHERE AGE ____ 20',
    answerObj: JSON.stringify({ 0: '=' }),
    answerLength: 1,
    chapterId: '3',
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
  rest.get('/api/chapter/:id', (req, res, ctx) => {
    const { id } = req.params
    const quizzesFoundByChapter = quizListMock.filter(
      (quiz) => quiz.chapterId && quiz.chapterId === id
    )
    return res(ctx.status(200), ctx.json(quizzesFoundByChapter))
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

    const foundQuizIdx = quizListMock.findIndex((quiz) => quiz.quizId === id)
    if (foundQuizIdx === -1) {
      return res(ctx.status(403))
    }

    const quiz = quizListMock.at(foundQuizIdx)
    return res(ctx.status(200), ctx.json(quiz))
  }),
]
