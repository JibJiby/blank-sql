import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex items-start justify-center w-full h-full pt-16">
      {children}
    </main>
  )
}
