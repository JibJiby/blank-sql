import type { NextApiRequest, NextApiResponse } from 'next'

import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library'
import { container } from 'tsyringe'

import { ChapterService } from '@/server/services/chapter.service'

const chapterService = container.resolve(ChapterService)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chapterId } = req.query
  if (!chapterId || chapterId instanceof Array) {
    return res.status(400).end()
  }

  if (req.method === 'GET') {
    try {
      const quizzes = await chapterService.findQuizzesByChapterId(chapterId)
      return res.status(200).json(quizzes)
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
