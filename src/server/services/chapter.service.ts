import { singleton } from 'tsyringe'

import { db } from '@/lib/db'

@singleton()
export class ChapterService {
  public getAllChapters = async () => {
    const chapters = await db.chapter.findMany()
    return chapters
  }

  public findQuizzesByChapterId = async (chapterId: string) => {
    const quizzes = db.quiz.findMany({
      where: {
        chapterId,
      },
    })

    return quizzes
  }

  public getChaptersPagination = async (skip: number, size: number) => {
    const chapters = db.chapter.findMany({
      skip: 0,
      take: size,
    })
    return chapters
  }

  public createChapter = async (newChapterName: string) => {
    const newChapter = db.chapter.create({
      data: {
        chapterName: newChapterName,
      },
    })

    return newChapter
  }
}
