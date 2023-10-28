import * as React from 'react'

import AceEditor from 'react-ace'
import ReactAce from 'react-ace/lib/ace'

import 'ace-builds/src-noconflict/mode-mysql'
import 'ace-builds/src-noconflict/theme-monokai'

import { size } from '@/styles/size'

const QuizEditor = React.forwardRef<
  React.ElementRef<typeof ReactAce>,
  React.ComponentPropsWithoutRef<typeof ReactAce>
>(({ className, ...props }, ref) => (
  <AceEditor
    ref={ref}
    mode="mysql"
    theme="monokai"
    fontSize={20}
    showPrintMargin={true}
    showGutter={true}
    highlightActiveLine={true}
    style={{
      height: size.quizViewerHeight,
      borderRadius: size.quizViewerBorderRadius,
    }}
    {...props}
  />
))

QuizEditor.displayName = 'QuizEditor'

export default QuizEditor
