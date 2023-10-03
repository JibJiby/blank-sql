import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// TODO: 원하시는 seeding 처리로 변경하시면 됩니다.
async function main() {
  // const firstUser = await prisma.user.findFirst({
  //   where: {
  //     email: {
  //       startsWith: 'newblanksql',
  //     },
  //   },
  // })

  // if (firstUser) {
  //   const randomId = Math.random().toString(36).substring(2, 11)
  //   const user = await prisma.user.create({
  //     data: {
  //       email: `${randomId}@newblanksql.io`,
  //     },
  //   })
  //   console.log(user)
  // } else {
  //   const user = await prisma.user.create({
  //     data: {
  //       email: 'newblanksql@newblanksql.io',
  //     },
  //   })
  //   console.log(user)
  // }

  // --------------------------------------------------------------

  const newChapterID = Math.random().toString(36).substring(2, 11)

  const chapter = await prisma.chapter.create({
    data: {
      chapterId: newChapterID,
      chapterName: '기초',
    },
  })
  console.log('chapter')
  console.log(chapter)

  const quiz = await prisma.quiz.create({
    data: {
      quizId: '1',
      quizQuery: 'SELECT\n\t____\nFROM\n\tMY_DB.USERS',
      answerObj: JSON.stringify({ 0: '*' }),
      answerLength: 1,
      chapterId: newChapterID,
    },
  })
  console.log('quiz')
  console.log(quiz)
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
