/* eslint-disable react/display-name */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'

import { api } from '@/lib/axios'

import { useAllQuizQuery } from '@/hooks/query/quiz/use-all-quiz-query'

const mockAPI = new MockAdapter(api)

describe('Test useAllQuizQuery Hook', () => {
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
  it('useAllQuizQuery 는 /quiz 로 요청한 응답값을 data 로 사용한다 ', async () => {
    // ARRANGE
    mockAPI.onGet('/quiz').reply(200, [])

    // ACT
    const { result } = renderHook(() => useAllQuizQuery(), {
      wrapper: createWrapper(),
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    // ASSERT
    expect(result.current.data).toEqual([])
  })
})
