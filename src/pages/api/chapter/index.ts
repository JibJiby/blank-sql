import type { NextApiRequest, NextApiResponse } from 'next'

import { chapterService } from '@/server/services'

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
  } else if (req.method === 'DELETE') {
    const chapterId = req.body
    const deletedChapter = await chapterService.deleteChapter(chapterId)
    return res.status(204).json(deletedChapter)
  }

  return res.status(400)
}
