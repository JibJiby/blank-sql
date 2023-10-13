import { renderHook, waitFor } from '@testing-library/react'

import { useCSR } from '@/hooks/useCSR'

it('useCSR hook', async () => {
  const { result } = renderHook(() => useCSR())

  expect(result.current).toBe(true)
})
