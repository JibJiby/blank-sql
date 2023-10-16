import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// TODO: 원하시는 seeding 처리로 변경하시면 됩니다.
async function main() {
  const chapter = await prisma.chapter.create({
    data: {
      chapterName: '기초 SQL 다지기',
    },
  })
  console.log('chapter')
  console.log(chapter)

  const quiz = await prisma.quiz.create({
    data: {
      quiz: 'SELECT\n\t____\nFROM\n\tMY_DB.USERS',
      answer: JSON.stringify({ 0: '*' }), // '{"0": "*"}'
      chapterId: chapter.id,
    },
  })
  console.log('quiz')
  console.log(quiz)

  const quiz02 = await prisma.quiz.create({
    data: {
      quiz: 'SELECT\n\t____\nFROM\n\tMY_DB.____',
      answer: JSON.stringify({ 0: '*', 1: 'USERS' }),
      chapterId: chapter.id,
    },
  })

  console.log('quiz02')
  console.log(quiz02)
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
