import { useEffect, useState } from 'react'

/**
 * Client Rendering 을 위한 Hook
 */
export function useCSR() {
  const [isClient, setIsClient] = useState(false) // state for client-rendering

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
