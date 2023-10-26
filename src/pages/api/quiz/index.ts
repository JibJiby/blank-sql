import type { NextApiRequest, NextApiResponse } from 'next'

import { quizService } from '@/server/services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { page, size } = req.query as { [key: string]: string }
    const quizzes = await quizService.getAllQuizzes(
      parseInt(page, 10),
      parseInt(size, 10)
    )
    return res.status(200).json(quizzes)
  } else if (req.method === 'POST') {
    // ...
  }

  return res.status(400)
}
