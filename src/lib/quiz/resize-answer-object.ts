type AnswerObjectType = Record<string, string>

type Params = {
  oldObject: AnswerObjectType
  updatedSize: number
}

export function resizeAnswerObject({ oldObject, updatedSize }: Params) {
  const newAnswerObj: AnswerObjectType = {}
  for (let i = 0; i < updatedSize; i++) {
    newAnswerObj[i] = oldObject[i]
  }

  return newAnswerObj
}
