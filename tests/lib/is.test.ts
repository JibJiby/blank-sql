import { isAllNotEmptyInput, isEmptyObject } from '@/lib/is'

describe('Test Function isAllNotEmptyInput', () => {
  it('빈 문자열이 아니면 true를 반환한다.', () => {
    const str = 'SELECT'
    expect(isAllNotEmptyInput(str)).toBe(true)
  })

  it('가변 파라미터를 받는다.', () => {
    expect(isAllNotEmptyInput('a', 'b', 'c')).toBeTruthy()
  })

  it('빈 문자열이 하나라도 있다면 false를 반환한다.', () => {
    expect(isAllNotEmptyInput('a', '', 'c')).toBeFalsy()
  })
})

describe('Test Function isEmptyObject', () => {
  it('객체 리터럴은 True를 반환한다.', () => {
    expect(isEmptyObject({})).toBeTruthy()
  })

  it('객체 프로퍼티가 하나라도 있다면 false를 반환한다.', () => {
    const obj = {
      name: 'object',
    }

    expect(isEmptyObject(obj)).toBeFalsy()
  })
})
