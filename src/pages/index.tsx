import { Inter } from 'next/font/google'

import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      New Blank SQL
    </main>
  )
}
