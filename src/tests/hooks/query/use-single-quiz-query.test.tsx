/* eslint-disable react/display-name */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useSingleQuizQuery } from '@/hooks/query/use-single-quiz-query'

describe('Test useSingleQuizQuery Hook', () => {
  let createWrapper: () => ({
    // eslint-disable-next-line no-unused-vars
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

  /**
   * -----------------------------------------------------
   * Test Case
   * -----------------------------------------------------
   */
  it('useSingleQuizQuery 의 initialData 는 undefined 입니다', async () => {
    // ARRANGE
    const mockQuizId = ''
    const { result } = renderHook(() => useSingleQuizQuery(mockQuizId), {
      wrapper: createWrapper(),
    })

    // ACT
    await waitFor(() => result.current.isSuccess)

    // ASSERT
    expect(result.current.data).toBeUndefined()
  })
})
