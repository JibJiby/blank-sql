import { container } from 'tsyringe'

import { ChapterService } from '@/server/services/chapter.service'
import { QuizService } from '@/server/services/quiz.service'
import { UserService } from '@/server/services/user.service'

export const userService = container.resolve(UserService)
export const chapterService = container.resolve(ChapterService)
export const quizService = container.resolve(QuizService)
