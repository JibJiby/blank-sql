import { injectable } from 'tsyringe'

// FIXME: db 의존성 주입 처리에 관한 이슈 해결 필요
import { db } from '@/lib/db'

@injectable()
export class UserService {
  constructor() {
    this.getAllUser = this.getAllUser.bind(this)
  }

  public async getAllUser() {
    const users = await db.user.findMany()
    return users
  }
}
