import { useEffect, useState } from 'react'

export const useMSW = () => {
  const isMSWMode = !!process.env.NEXT_PUBLIC_API_MOCKING
  const [isCompletedMSWMode, setIsCompletedMSWMode] = useState(!isMSWMode)

  useEffect(() => {
    if (isMSWMode) {
      import('../mocks').then(async ({ initMocks }) => {
        await initMocks()
        setIsCompletedMSWMode(true)
      })
    }
  }, [isMSWMode])

  return isCompletedMSWMode
}
