import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Check, CheckCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import BaseLayout from '@/layouts/base-layout'

const singleQuiz = 'single'
const chapterQuiz = 'chapter'

export default function Home() {
  const router = useRouter()

  const handleClick = () => {
    const el = document.querySelector('button[data-state="checked"]')
    if (!el) {
      return
    }
    const selectedValue = el.getAttribute('value')!
    router.push(selectedValue)
  }

  return (
    <>
      <Head>
        <title>Blank SQL</title>
      </Head>
      <BaseLayout>
        <Card>
          <CardHeader>
            <CardTitle>문제 유형</CardTitle>
            <CardDescription className="break-words">
              하나씩 풀어보고 싶다면 &apos;<strong>퀴즈 하나만 풀기</strong>
              &apos; 를 선택하시면 됩니다!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue={singleQuiz}
              className="grid grid-cols-2 gap-4 max-sm:grid-rows-2 max-sm:grid-cols-1"
            >
              <Label
                htmlFor={singleQuiz}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value={singleQuiz}
                  id={singleQuiz}
                  className="sr-only"
                />
                <Check className="w-6 h-6 mb-3" />
                퀴즈 하나만 풀기
                <Link href="/single" className="invisible w-0 h-0" />
              </Label>
              <Label
                htmlFor={chapterQuiz}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <RadioGroupItem
                  value={chapterQuiz}
                  id={chapterQuiz}
                  className="sr-only"
                />
                <CheckCheck className="w-6 h-6 mb-3" />
                챕터별 문제풀기
                <Link href="/chapter" className="invisible w-0 h-0" />
              </Label>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleClick}>
              확인
            </Button>
          </CardFooter>
        </Card>
      </BaseLayout>
    </>
  )
}
