import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'

import { ChapterService } from '@/server/services/chapter.service'
import { QuizService } from '@/server/services/quiz.service'

import { Context, MockContext, createMockContext } from '../context'

let mockCtx: MockContext
let ctx: Context
let quizService: QuizService
let chapterService: ChapterService

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context

  // ref : https://vhiairrassary.com/engineer/2020-07-18-overriding-singletons-from-tsyringe-within-jest-tests/
  container.clearInstances()
  // @/server/services/index.ts 의 ` import './db/prisma.symbol' ` 부분에 대응
  container.register<PrismaClient>('PrismaClient', {
    useValue: mockCtx.prisma,
  })

  quizService = container.createChildContainer().resolve(QuizService)
  chapterService = container.createChildContainer().resolve(ChapterService)
})

describe('QuizService Test', () => {
  it('create quiz', async () => {
    // ARRANGE
    const chapter = {
      id: '1',
      chapterName: 'first-chapter',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockCtx.prisma.chapter.findMany.mockResolvedValue([chapter])
    const quiz = {
      id: '1',
      chapterId: '1',
      priority: 50000,
      quiz: '',
      answer: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // ARRANGE
    mockCtx.prisma.quiz.create.mockResolvedValue(quiz)
    // ACT
    const newQuiz = await quizService.createQuiz(
      quiz.chapterId,
      quiz.quiz,
      quiz.answer
    )
    // ASSERT
    expect(newQuiz).toEqual(quiz)

    // ARRANGE
    mockCtx.prisma.quiz.findMany.mockResolvedValue([quiz])
    // ACT
    const allQuiz = await quizService.getAllQuiz()
    // ASSERT
    expect(allQuiz).toHaveLength(1)
  })
})
