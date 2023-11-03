import { KeyboardEvent, useEffect, useRef } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TypographyH3 from '@/components/ui/typography/h3'

import { api } from '@/lib/axios'

import BaseLayout from '@/layouts/base-layout'

export default function SingleQuizPage() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleQuizIdInput()
    }
  }

  const handleQuizIdInput = async () => {
    const path = router.asPath
    if (!inputRef.current) {
      return
    }
    const quizId = inputRef.current.value

    const cachedQueryData = queryClient.getQueryData(['quizzes', quizId])
    if (cachedQueryData) {
      router.push(path + `/${quizId}`)
      return
    }

    try {
      await api.head(`/quiz/${quizId}`)
      router.push(path + `/${quizId}`)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          toast.error('입력하신 퀴즈 ID가 존재하지 않습니다.', {
            duration: 1000,
          })
        }
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <Head>
        <title>퀴즈 검색</title>
      </Head>
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
          <Button className="w-full" onClick={handleQuizIdInput}>
            풀러가기
          </Button>
        </div>
      </BaseLayout>
    </>
  )
}
