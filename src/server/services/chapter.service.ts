import { PrismaClient } from '@prisma/client'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ChapterService {
  // eslint-disable-next-line no-unused-vars
  constructor(@inject('PrismaClient') private db: PrismaClient) {}

  public getAllChapters = async () => {
    const chapters = await this.db.chapter.findMany()
    return chapters
  }

  public findQuizzesByChapterId = async (chapterId: string) => {
    const quizzes = await this.db.quiz.findMany({
      where: {
        chapterId,
      },
    })

    return quizzes
  }

  public getChaptersPagination = async (skip: number, size: number) => {
    const chapters = await this.db.chapter.findMany({
      skip: 0,
      take: size,
    })
    return chapters
  }

  public createChapter = async (newChapterName: string) => {
    const newChapter = await this.db.chapter.create({
      data: {
        chapterName: newChapterName,
      },
    })

    return newChapter
  }
}
