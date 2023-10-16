import type { NextApiRequest, NextApiResponse } from 'next'

import { container } from 'tsyringe'

import { QuizService } from '@/server/services/quiz.service'

const quizService = container.resolve(QuizService)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const quizzes = await quizService.getAllQuizzes()
    return res.status(200).json(quizzes)
  } else if (req.method === 'POST') {
    // ...
  }

  return res.status(400)
}
