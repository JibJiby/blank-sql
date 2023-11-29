import { generateMock } from '@anatine/zod-mock'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { QuizInputForm } from '@/components/common/quiz-input-form'

import { Quiz, QuizSchema } from '@/models/quiz'

import { delay } from '../delay'

describe('QuizInputForm Component', () => {
  let mockQuiz: Quiz

  /**
   * -----------------------------------------------------
   * Test Setting
   * -----------------------------------------------------
   */
  beforeEach(() => {
    mockQuiz = generateMock(QuizSchema, {
      stringMap: {
        answer: () => JSON.stringify({ 0: '*' }),
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /**
   * -----------------------------------------------------
   * Test Case
   * -----------------------------------------------------
   */
  it('quiz 객체의 빈칸 개수(quiz.answer) 만큼 input 태그가 생성된다', async () => {
    // ARRANGE
    const quizAnswerObject = { 0: '*', 1: 'users' }
    const quiz = generateMock(QuizSchema, {
      stringMap: {
        answer: () => JSON.stringify(quizAnswerObject),
      },
    })
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
    expect(
      (await screen.findAllByPlaceholderText<HTMLInputElement>(/번째 빈칸/))
        .length
    ).toBe(Object.keys(quizAnswerObject).length)
  })

  it('유저 입력이 빈칸이면 validation error 를 표시한다', async () => {
    // ARRANGE
    const handleSuccess = jest.fn()
    const handleFailure = jest.fn()

    // ACT
    const { container } = render(
      <QuizInputForm
        quiz={mockQuiz}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    )
    const submitButtonEl = container.querySelector('button[type="submit"]')!
    await userEvent.click(submitButtonEl)
    await delay(1000)

    // ASSERT
    expect(submitButtonEl).toBeInTheDocument()
    expect(screen.queryByText('비어 있습니다!')).toBeInTheDocument()
  })

  it('유저 입력이 정답과 틀리면 onFailure 콜백함수를 호출한다', async () => {
    // ARRANGE
    const handleSuccess = jest.fn()
    const handleFailure = jest.fn()

    // ACT
    const { container } = render(
      <QuizInputForm
        quiz={mockQuiz}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    )
    const inputEl = container.querySelector<HTMLInputElement>('form input')!
    await userEvent.type(inputEl, '오답')

    const submitButtonEl = container.querySelector('button[type="submit"]')!
    await userEvent.click(submitButtonEl)
    await delay(1000)

    // ASSERT
    expect(inputEl).toBeInTheDocument()
    expect(handleFailure).toBeCalled()
    expect(handleFailure).toBeCalledTimes(1)
    expect(handleSuccess).not.toBeCalled()
  })

  it('유저 입력이 정답을 입력하면 onSuccess 콜백함수를 호출한다', async () => {
    // ARRANGE
    const handleSuccess = jest.fn()
    const handleFailure = jest.fn()

    // ACT
    const { container } = render(
      <QuizInputForm
        quiz={mockQuiz}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    )
    const inputEl = container.querySelector<HTMLInputElement>('form input')!
    await userEvent.type(inputEl, '*')

    const submitButtonEl = container.querySelector('button[type="submit"]')!
    await userEvent.click(submitButtonEl)
    await delay(1000)

    // ASSERT
    expect(inputEl).toBeInTheDocument()
    expect(handleFailure).not.toBeCalled()
    expect(handleSuccess).toBeCalled()
    expect(handleSuccess).toBeCalledTimes(1)
  })
})
