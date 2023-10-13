import { injectable } from 'tsyringe'

import { db } from '@/lib/db'

@injectable()
export class ChapterService {
  constructor() {
    this.getAllChapters = this.getAllChapters.bind(this)
  }

  public async getAllChapters() {
    const chapters = await db.chapter.findMany()
    return chapters
  }
}
