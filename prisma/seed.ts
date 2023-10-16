import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// TODO: 원하시는 seeding 처리로 변경하시면 됩니다.
async function main() {
  const newChapterListResult: string[] = []
  const seededChapterList: Prisma.ChapterCreateArgs['data'][] = [
    { chapterName: '기초 SQL 다지기' },
    { chapterName: 'WHERE 으로 원하는 데이터만 가져오기' },
  ]

  for await (const newChapter of seededChapterList) {
    const result = await prisma.chapter.create({
      data: newChapter,
    })
    newChapterListResult.push(result.id)
  }
  console.log('-'.repeat(15), 'seededChapterList', '-'.repeat(15))
  console.log(seededChapterList)

  // -------------------------------------------------------------
  const seededQuizList: Prisma.QuizCreateArgs['data'][] = [
    {
      quiz: 'SELECT\n\t____\nFROM\n\tMY_DB.USERS',
      answer: JSON.stringify({ 0: '*' }),
      chapterId: newChapterListResult[0],
    },
    {
      quiz: 'SELECT\n\t____\nFROM\n\tMY_DB.____',
      answer: JSON.stringify({ 0: '*', 1: 'USERS' }),
      chapterId: newChapterListResult[0],
    },
    {
      quiz: 'SELECT\n\t____\nFROM\n\tMY_DB.____',
      answer: JSON.stringify({ 0: '*', 1: 'USERS' }),
      chapterId: newChapterListResult[1],
    },
  ]

  for await (const newQuiz of seededQuizList) {
    await prisma.quiz.create({
      data: newQuiz,
    })
  }

  console.log('-'.repeat(15), 'seededQuizList', '-'.repeat(15))
  console.log(seededQuizList)
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
