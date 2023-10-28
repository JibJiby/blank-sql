import { PrismaClient } from '@prisma/client'
import { inject, singleton } from 'tsyringe'

@singleton()
export class QuizService {
  constructor(@inject('PrismaClient') private db: PrismaClient) {}

  public getAllQuiz = async () => {
    const quizzes = await this.db.quiz.findMany({
      include: {
        chapter: {
          select: {
            chapterName: true,
          },
        },
      },
    })

    return quizzes
  }

  public getQuizPagination = async (page: number, size: number) => {
    const quizzes = await this.db.quiz.findMany({
      skip: (page - 1) * size,
      take: size,
      include: {
        chapter: {
          select: {
            chapterName: true,
          },
        },
      },
    })
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
    // TODO: chapterId 존재 유무 확인

    const newQuiz = await this.db.quiz.create({
      data: {
        chapterId,
        quiz,
        answer,
      },
    })
    return newQuiz
  }

  public deleteQuiz = async (quizId: string) => {
    const deletedQuiz = await this.db.quiz.delete({
      where: {
        id: quizId,
      },
    })

    return deletedQuiz
  }

  public updateQuiz = async (
    quizId: string,
    quiz: string,
    answer: string,
    chapterId: string
  ) => {
    const updatedQuiz = await this.db.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        quiz,
        answer,
        chapterId,
      },
    })
    return updatedQuiz
  }
}
