import { singleton } from 'tsyringe'

// FIXME: db 의존성 주입 처리에 관한 이슈 해결 필요
import { db } from '@/lib/db'

@singleton()
export class UserService {
  public getAllUser = async () => {
    const users = await db.user.findMany()
    return users
  }

  public getRole = async (userId: string) => {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return user.role
  }
}
