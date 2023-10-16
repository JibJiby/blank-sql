import { rest } from 'msw'

import { Chapter } from '@/models/chapter'
import { Quiz } from '@/models/quiz'

const chapterListMock: Array<Chapter> = [
  { id: '1', chapterName: '기초 개념' },
  { id: '2', chapterName: 'SELECT와 FROM' },
  { id: '3', chapterName: 'WHERE 으로 원하는 데이터만 가져오기' },
]

const quizListMock: Array<Quiz> = [
  {
    id: '1',
    quiz: 'SELECT\n\t____\nFROM\n\tMY_DB.USERS',
    answer: JSON.stringify({ 0: '*' }),
    chapterId: '1',
  },
  {
    id: '2',
    quiz: 'SELECT\n\t____\nFROM\n\tMY_DB.____',
    answer: JSON.stringify({ 0: '*', 1: 'USERS' }),
    chapterId: '1',
  },
  {
    id: '3',
    quiz: '____\n\t*\nFROM\n\tMY_DB.USERS',
    answer: JSON.stringify({ 0: 'SELECT' }),
    chapterId: '2',
  },
  {
    id: '4',
    quiz: '____\n\t*\n____\n\tMY_DB.USERS',
    answer: JSON.stringify({ 0: 'SELECT', 1: 'FROM' }),
    chapterId: '2',
  },
  {
    id: '5',
    quiz: 'SELECT\n\t*\nFROM\n\tMY_DB.USERS WHERE AGE ____ 20',
    answer: JSON.stringify({ 0: '=' }),
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

    const foundQuizIdx = quizListMock.findIndex((quiz) => quiz.id === id)
    if (foundQuizIdx === -1) {
      return res(ctx.status(403))
    }

    const quiz = quizListMock.at(foundQuizIdx)
    return res(ctx.status(200), ctx.json(quiz))
  }),
]
