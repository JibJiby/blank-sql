import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-mysql'
import 'ace-builds/src-noconflict/theme-monokai'

import { size } from '@/styles/size'

interface Props {
  value?: string
  onChange?: any
}

function QuizViewer({ value = '', onChange }: Props) {
  return (
    <AceEditor
      mode="mysql"
      theme="monokai"
      fontSize={20}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      readOnly={true}
      onChange={onChange}
      value={value}
      style={{
        height: size.quizViewerHeight,
        borderRadius: size.quizViewerBorderRadius,
      }}
    />
  )
}

export default QuizViewer
