import type { NextApiRequest, NextApiResponse } from 'next'

import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library'
import { container } from 'tsyringe'

import { QuizService } from '@/server/services/quiz.service'

const quizService = container.resolve(QuizService)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quizId } = req.query
  if (!quizId || quizId instanceof Array) {
    return res.status(400).end()
  }

  if (req.method === 'HEAD') {
    try {
      await quizService.findQuizById(quizId)
      return res.status(200).end()
    } catch (error) {
      return res.status(404).end()
    }
  } else if (req.method === 'GET') {
    try {
      const quiz = await quizService.findQuizById(quizId)
      res.status(200).json(quiz)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // ...
        return res.status(404).send('PrismaClientKnownRequestError')
      } else if (error instanceof PrismaClientUnknownRequestError) {
        // ...
        return res.status(400).send('PrismaClientUnknownRequestError')
      } else {
        // ...
        return res.status(400).send('Error')
      }
    }
  }
}
