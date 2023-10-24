import type { NextApiRequest, NextApiResponse } from 'next'

import { container } from 'tsyringe'

import { UserService } from '@/server/services/user.service'

const userService = container.resolve(UserService)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // const quizzes = await userService.getAllQuizzes()
    // return res.status(200).json(quizzes)
  } else if (req.method === 'POST') {
    // ...
  }

  return res.status(400)
}
