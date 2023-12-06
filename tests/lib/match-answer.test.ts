import { matchAnswer } from '@/lib/quiz/match-answer'

describe('matchAnswer 함수', () => {
  // answerObject
  it('두번째 인자인 answerObj parameter가 null 인 경우, false를 반환한다.', () => {
    const result = matchAnswer({}, null as any)
    expect(result).toBeFalsy()
  })

  // userObj
  it('userObj 에 하나라도 빈칸 있는 경우, false를 반환한다.', () => {
    const userObj = {
      0: 'SELECT',
      1: '',
    }
    const answerObj = {
      0: 'SELECT',
      1: 'FROM',
    }

    const result = matchAnswer(userObj, answerObj)
    expect(result).toBeFalsy()
  })

  it('userObj 와 answerObj 길이가 다를 경우, false를 반환한다.', () => {
    const userObj = {
      0: 'SELECT',
      1: '',
    }
    const answerObj = {
      0: 'SELECT',
      1: 'FROM',
      2: 'WHERE',
    }

    const result = matchAnswer(userObj, answerObj)
    expect(result).toBeFalsy()
  })

  it('키값에 맞게 값이 모두 동일하면, true를 반환한다.', () => {
    const userObj = {
      0: 'SELECT',
      1: 'FROM',
    }
    const answerObj = {
      0: 'SELECT',
      1: 'FROM',
    }

    const result = matchAnswer(userObj, answerObj)
    expect(result).toBeTruthy()
  })

  it('userObj 값 모두 공백 제거된 후 비교된다.', () => {
    const userObj = {
      0: 'SELECT      ',
      1: '      FROM',
      2: '      WHERE                ',
    }
    const answerObj = {
      0: 'SELECT',
      1: 'FROM',
      2: 'WHERE',
    }

    const result = matchAnswer(userObj, answerObj)
    expect(result).toBeTruthy()
  })
})
