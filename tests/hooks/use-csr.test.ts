import { renderHook, waitFor } from '@testing-library/react'

import { useCSR } from '@/hooks/use-csr'

it('useCSR hook', async () => {
  const { result } = renderHook(() => useCSR())

  expect(result.current).toBe(true)
})
