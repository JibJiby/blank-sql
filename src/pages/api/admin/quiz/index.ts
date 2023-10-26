import type { NextApiRequest, NextApiResponse } from 'next'

import { auth } from '@/lib/auth'

import { QuizSchema } from '@/models/quiz'
import { quizService, userService } from '@/server/services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // role check with session
  const session = await auth(req, res)
  if (!session) {
    return res.status(401).end()
  }
  const role = await userService.getRole(session.user.id)
  if (!role || role !== 'Admin') {
    return res.status(401).end()
  }

  // TODO: API Request, Response 데이터 타입 분리

  if (req.method === 'POST') {
    const { chapterId, quiz, answer } = req.body
    const isValid = QuizSchema.pick({
      chapterId: true,
      quiz: true,
      answer: true,
    }).safeParse({
      chapterId,
      quiz,
      answer,
    }).success

    if (!isValid) {
      return res.status(400).send(null)
    }

    const newQuiz = await quizService.createQuiz(chapterId, quiz, answer)
    return res.status(201).json(newQuiz)
  } else if (req.method === 'DELETE') {
    const quizId = req.body
    const deletedQuiz = await quizService.deleteQuiz(quizId)
    return res.status(200).json(deletedQuiz)
  } else if (req.method === 'PATCH') {
    const { quizId, quiz, answer, chapterId } = req.body
    const updatedQuiz = await quizService.updateQuiz(
      quizId,
      quiz,
      answer,
      chapterId
    )

    return res.status(200).json(updatedQuiz)
  }

  return res.status(400)
}
