/* eslint-disable react/display-name */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'

import { api } from '@/lib/axios'

import { useSingleQuizQuery } from '@/hooks/query/quiz/use-single-quiz-query'

const mockAPI = new MockAdapter(api)

describe('Test useSingleQuizQuery Hook', () => {
  let createWrapper: () => ({
    children,
  }: {
    children: React.ReactNode
  }) => JSX.Element

  /**
   * -----------------------------------------------------
   * Test Setting
   * -----------------------------------------------------
   */
  beforeEach(() => {
    createWrapper = () => {
      const queryClient = new QueryClient({
        logger: {
          log: console.log,
          warn: console.warn,
          error: console.error,
        },
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
      return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    }
  })
  afterEach(() => {
    mockAPI.resetHandlers()
  })

  /**
   * -----------------------------------------------------
   * Test Case
   * -----------------------------------------------------
   */
  it('useSingleQuizQuery 는 quizId 데이터를 /quiz/[quizID] 에서 가져온다', async () => {
    // ARRANGE
    const mockQuizId = '1'
    mockAPI.onGet(`/quiz/${mockQuizId}`).reply(200, {
      id: mockQuizId,
      quiz: '',
      answer: '',
      priority: 50000,
      chapterId: null,
    })

    // ACT
    const { result } = renderHook(() => useSingleQuizQuery(mockQuizId), {
      wrapper: createWrapper(),
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // ASSERT
    expect(result.current.data).toEqual({
      id: '1',
      quiz: '',
      answer: '',
      priority: 50000,
      chapterId: null,
    })
  })
})
