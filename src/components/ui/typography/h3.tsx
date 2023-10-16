import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface Props {
  children: ReactNode
  className?: string
}

export default function TypographyH3({ className, children }: Props) {
  return (
    <h3 className={cn('text-2xl font-semibold tracking-tight', className)}>
      {children}
    </h3>
  )
}
