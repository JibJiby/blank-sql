import type { NextApiRequest, NextApiResponse } from 'next'

import { container } from 'tsyringe'

import { ChapterService } from '@/server/services/chapter.service'

const chapterService = container.resolve(ChapterService)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chapterId } = req.query
  if (!chapterId || chapterId instanceof Array) {
    return res.status(400)
  }

  const quizzes = chapterService.findQuizzesByChapterId(chapterId)

  res.status(200).json(quizzes)
}
