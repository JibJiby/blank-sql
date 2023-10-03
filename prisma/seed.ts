import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// TODO: 원하시는 seeding 처리로 변경하시면 됩니다.
async function main() {
  const firstUser = await prisma.user.findFirst({
    where: {
      email: {
        startsWith: 'newblanksql',
      },
    },
  })

  if (firstUser) {
    const randomId = Math.random().toString(36).substring(2, 11)
    const user = await prisma.user.create({
      data: {
        email: `${randomId}@newblanksql.io`,
      },
    })
    console.log(user)
  } else {
    const user = await prisma.user.create({
      data: {
        email: 'newblanksql@newblanksql.io',
      },
    })
    console.log(user)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
