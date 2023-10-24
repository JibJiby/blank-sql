import { singleton } from 'tsyringe'

import { db } from '@/lib/db'

@singleton()
export class QuizService {
  public getAllQuizzes = async () => {
    const quizzes = await db.quiz.findMany()
    return quizzes
  }

  public getQuizzesByChapterId = async (chapterId: string) => {
    const quizzes = await db.quiz.findMany({
      where: {
        chapterId,
      },
    })

    return quizzes
  }

  public findQuizById = async (quizId: string) => {
    const foundQuiz = await db.quiz.findFirstOrThrow({
      where: {
        id: quizId,
      },
    })

    return foundQuiz
  }
}
