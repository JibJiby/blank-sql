import { KeyboardEvent, useEffect, useRef } from 'react'

import { useRouter } from 'next/router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TypographyH3 from '@/components/ui/typography/h3'

import BaseLayout from '@/layouts/base-layout'

export default function SingleQuizPage() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick()
    }
  }

  const onClick = () => {
    const path = router.asPath
    if (!inputRef.current) {
      return
    }
    const quizId = inputRef.current.value

    router.push(path + `/${quizId}`)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <BaseLayout>
      <div className="flex flex-col space-y-8 min-w-[350px]">
        <TypographyH3 className="text-center select-none">
          퀴즈 <strong className="text-accent-foreground">ID</strong> 를
          입력해주세요
        </TypographyH3>
        <Input
          ref={inputRef}
          className="text-center"
          placeholder="퀴즈 ID"
          onKeyDown={onKeyDown}
        />
        <Button className="w-full" onClick={onClick}>
          풀러가기
        </Button>
      </div>
    </BaseLayout>
  )
}
