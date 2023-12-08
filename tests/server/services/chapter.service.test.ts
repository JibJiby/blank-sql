import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'

import { ChapterService } from '@/server/services/chapter.service'

import { Context, MockContext, createMockContext } from '../context'

let mockCtx: MockContext
let ctx: Context
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

  chapterService = container.createChildContainer().resolve(ChapterService)
})

it('create chapter', async () => {
  // ARRANGE
  const chapter = {
    id: '1',
    chapterName: 'first-chapter',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockCtx.prisma.chapter.create.mockResolvedValue(chapter)

  // ACT
  let allChapters = await chapterService.getAllChapters()
  // ASSERT
  expect(allChapters).toBe(undefined)

  // ACT
  const newchapter = await chapterService.createChapter(chapter.chapterName)
  // ASSERT
  expect(newchapter.chapterName).toEqual('first-chapter')

  // ARRANGE
  mockCtx.prisma.chapter.findMany.mockResolvedValue([chapter])
  // ACT
  allChapters = await chapterService.getAllChapters()
  // ASSERT
  expect(allChapters).toHaveLength(1)
})
