import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type CopyButtonProps<TData extends string> = {
  data: TData
  // optional
  text?: string
  iconSize?: number
  buttonSize?: number
  onSuccess?: () => void
  onError?: () => void
}

export function CopyButton<TData extends string>({
  data,
  text,
  iconSize = 15,
  buttonSize = 30,
  onSuccess,
  onError,
}: CopyButtonProps<TData>) {
  const handleCopy = async () => {
    try {
      if (!data) {
        return
      }

      await navigator.clipboard.writeText(data)
      onSuccess && onSuccess()
    } catch (err) {
      console.error(err)
      onError && onError()
    }
  }

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`w-[${buttonSize}px] h-[${buttonSize}px]`}
            onClick={handleCopy}
          >
            <Copy width={iconSize} height={iconSize} />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>{text || '복사하기'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
