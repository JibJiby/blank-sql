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
    // TODO: role 체크
    const { newChapterName } = req.body
    if (!newChapterName) {
      return res.status(400).send(null)
    }

    const newChapter = await chapterService.createChapter(newChapterName)

    return res.status(201).json(newChapter)
  }

  return res.status(400)
}
