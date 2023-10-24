import type { NextApiRequest, NextApiResponse } from 'next'

import { quizService } from '@/server/services'

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
