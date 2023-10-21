import { generateMock } from '@anatine/zod-mock'
import { render, screen } from '@testing-library/react'

import { QuizInputForm } from '@/components/quiz-input-form'

import { Quiz, QuizSchema } from '@/models/quiz'

describe('QuizInputForm Component', () => {
  let quiz: Quiz

  beforeEach(() => {
    quiz = generateMock(QuizSchema)
    quiz.answer = JSON.stringify({ 0: '*' })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('form element 존재', async () => {
    // ARRANGE
    const handleSuccess = jest.fn()
    const handleFailure = jest.fn()

    // ACT
    render(
      <QuizInputForm
        quiz={quiz}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    )

    // ASSERT
    expect(
      await screen.findByPlaceholderText<HTMLInputElement>('1 번째 빈칸')
    ).toBeInTheDocument()
  })
})
