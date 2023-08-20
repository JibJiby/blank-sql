import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-mysql'
import 'ace-builds/src-noconflict/theme-monokai'

import { Skeleton } from '@/components/ui/skeleton'

import { useCSR } from '@/hooks/useCSR'

import { size } from '@/styles/size'

interface Props {
  value?: string
}

export function QuizViewer({ value = '' }: Props) {
  const isClient = useCSR()

  if (!isClient) {
    return (
      <Skeleton
        style={{
          height: size.quizViewerHeight,
          width: size.quizViewerWidth,
        }}
      />
    )
  }

  return (
    <AceEditor
      mode="mysql"
      theme="monokai"
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      readOnly={true}
      value={value}
      style={{
        height: size.quizViewerHeight,
        borderRadius: size.quizViewerBorderRadius,
      }}
    />
  )
}

export default QuizViewer
