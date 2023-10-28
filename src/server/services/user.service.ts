import { PrismaClient } from '@prisma/client'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UserService {
  constructor(@inject('PrismaClient') private db: PrismaClient) {}

  public getAllUser = async () => {
    const users = await this.db.user.findMany()
    return users
  }

  public getRole = async (userId: string) => {
    const user = await this.db.user.findFirst({
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
