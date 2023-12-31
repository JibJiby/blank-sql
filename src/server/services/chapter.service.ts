import { PrismaClient } from '@prisma/client'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ChapterService {
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
      orderBy: {
        priority: 'asc',
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

  public deleteChapter = async (chapterId: string) => {
    const deleted = await this.db.chapter.delete({
      where: {
        id: chapterId,
      },
    })

    return deleted
  }

  public updateChapter = async (chapterId: string, newChapterName: string) => {
    const updated = await this.db.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        chapterName: newChapterName,
      },
    })

    return updated
  }
}
