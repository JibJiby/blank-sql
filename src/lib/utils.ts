import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * prefix 와 keyValue를 조합하여 반환
 */
export function makePrefixKey({
  prefix,
  keyValue,
}: {
  prefix: string
  keyValue: string
}) {
  return `${prefix}_${keyValue}`
}

export function range(start: number, end?: number) {
  if (!end) {
    return Array.from({ length: start }, (_, idx) => idx)
  }

  return Array.from({ length: end - start }, (_, idx) => start + idx - 1)
}
