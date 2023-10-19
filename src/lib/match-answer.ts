export type QuizAnswer = Record<string, string>

export const matchAnswer = (userObj: QuizAnswer, answerObj: QuizAnswer) => {
  if (answerObj === null) {
    return false
  }

  // 하나라도 빈칸 있는 경우
  if (
    Object.entries(userObj).some((v: [string, string]) => v[1].trim() === '')
  ) {
    return false
  }

  // 길이가 다른 경우
  if (Object.keys(userObj).length !== Object.keys(answerObj).length) {
    return false
  }

  const boolResult = Object.keys(answerObj).map((i) =>
    answerObj[i].trim().toLowerCase().replaceAll(/\s/gi, '') ===
    userObj[i].trim().toLowerCase().replaceAll(/\s/gi, '')
      ? true
      : false
  )

  const totalBoolResult = boolResult.every((v) => v)

  return totalBoolResult
}
