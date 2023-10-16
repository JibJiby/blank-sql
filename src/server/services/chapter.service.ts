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
}
