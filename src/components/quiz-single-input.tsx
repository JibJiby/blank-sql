import { ChangeEventHandler, ComponentProps, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { makePrefixKey } from '@/lib/utils'

interface Props extends ComponentProps<'div'> {
  label: string
}

export function QuizSingleInput({ label }: Props) {
  const labelId = makePrefixKey({
    prefix: QUIZ_SINGLE_INPUT_PREFIX,
    keyValue: label,
  })
  const [value, setValue] = useState('')
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="flex flex-row items-center mt-4">
      <Label htmlFor={labelId} className="p-2 select-none">
        {label}
      </Label>
      <Input id={labelId} className="ml-4" value={value} onChange={onChange} />
    </div>
  )
}

export const QUIZ_SINGLE_INPUT_PREFIX = 'quiz-single-input'
