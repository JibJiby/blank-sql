import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
}

export default function TypographyH1({ className, children }: Props) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
    >
      {children}
    </h3>
  )
}
