import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'

import { QuizInputForm } from '@/components/quiz-input-form'
import QuizViewer from '@/components/quiz-viewer'

import { useQuizInChapterQuery } from '@/hooks/query/use-quiz-in-chapter-query'

import BaseLayout from '@/layouts/base-layout'

export default function ChapterQuizResolverPage() {
  const router = useRouter()
  const { id } = router.query
  const [chapterId, setChapterId] = useState('')
  const { toast } = useToast()
  const [sequence, setSequence] = useState(0)
  const { data: quizzesInChapter, status } = useQuizInChapterQuery(chapterId)

  const quizzesInChapterLength = quizzesInChapter ? quizzesInChapter.length : 0
  const quiz =
    quizzesInChapter && quizzesInChapter.at(sequence)
      ? quizzesInChapter[sequence]
      : null

  const handleCopyButton = () => {
    if (quiz) {
      navigator.clipboard.writeText(quiz.id)
    }
  }

  const handleSuccess = async () => {
    if (sequence + 1 === quizzesInChapterLength) {
      await router.push('/')
      toast({
        title: '전부 맞추셨습니다! 축하드립니다~',
        className: 'bg-emerald-500',
        duration: 1200,
      })
      return
    }

    setSequence((prev) => prev + 1)
    toast({
      title: '정답 입니다!',
      className: 'bg-emerald-500',
      duration: 1000,
    })
  }

  const handleFailure = async () => {
    toast({
      title: '틀렸습니다',
      variant: 'destructive',
    })
    return
  }

  useEffect(() => {
    if (!id) {
      return
    }
    setChapterId(id as string)
  }, [id])

  if (status === 'loading' || status !== 'success') {
    return
  }

  if (!quizzesInChapter || !quizzesInChapter.length) {
    return
  }

  return (
    <BaseLayout>
      <div className="flex items-center py-8 space-x-6">
        <span className="select-none">
          퀴즈 ID : {quizzesInChapter.at(sequence)?.id || ''}
        </span>
        <CopyButton onCopy={handleCopyButton} />
      </div>
      <QuizViewer value={quizzesInChapter.at(sequence)?.quiz} />
      <QuizInputForm
        quiz={quizzesInChapter[sequence]}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </BaseLayout>
  )
}

type CopyButtonProps = {
  onCopy: () => void
}

function CopyButton({ onCopy }: CopyButtonProps) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="w-[30px] h-[30px]"
            onClick={onCopy}
          >
            <Copy width={15} height={15} />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>복사하기</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
