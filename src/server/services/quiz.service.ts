import { PrismaClient } from '@prisma/client'
import { inject, singleton } from 'tsyringe'

@singleton()
export class QuizService {
  constructor(@inject('PrismaClient') private db: PrismaClient) {}

  public getAllQuizzes = async () => {
    const quizzes = await this.db.quiz.findMany()
    return quizzes
  }

  public getQuizzesByChapterId = async (chapterId: string) => {
    const quizzes = await this.db.quiz.findMany({
      where: {
        chapterId,
      },
    })

    return quizzes
  }

  public findQuizById = async (quizId: string) => {
    const foundQuiz = await this.db.quiz.findFirstOrThrow({
      where: {
        id: quizId,
      },
    })

    return foundQuiz
  }

  public createQuiz = async (
    chapterId: string,
    quiz: string,
    answer: string
  ) => {
    const newQuiz = await this.db.quiz.create({
      data: {
        chapterId,
        quiz,
        answer,
      },
    })
    return newQuiz
  }
}
