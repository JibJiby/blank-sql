import type { NextApiRequest, NextApiResponse } from 'next'

import { chapterService } from '@/server/services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const chapters = await chapterService.getAllChapters()
    return res.status(200).json(chapters)
  }

  return res.status(400)
}
