import type { NextApiRequest, NextApiResponse } from 'next'

import { container } from 'tsyringe'

import { ChapterService } from '@/server/services/chapter.service'

const chapterService = container.resolve(ChapterService)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const chapters = await chapterService.getAllChapters()
    return res.status(200).json(chapters)
  } else if (req.method === 'POST') {
    // ...
  }

  return res.status(400)
}
