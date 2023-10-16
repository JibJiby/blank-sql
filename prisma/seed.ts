import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// TODO: 원하시는 seeding 처리로 변경하시면 됩니다.
async function main() {
  const newChapterID = Math.random().toString(36).substring(2, 11)

  const chapter = await prisma.chapter.create({
    data: {
      chapterName: '기초',
    },
  })
  console.log('chapter')
  console.log(chapter)

  const quiz = await prisma.quiz.create({
    data: {
      quizQuery: 'SELECT\n\t____\nFROM\n\tMY_DB.USERS',
      answerObj: JSON.stringify({ 0: '*' }),
      // TODO: 추후 제거
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
