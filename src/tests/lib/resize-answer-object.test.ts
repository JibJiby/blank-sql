import { resizeAnswerObject } from '@/lib/quiz/resize-answer-object'

describe('resizeAnswerObject 함수', () => {
  it('updatedSize 가 0 인 경우, 빈 객체를 반환한다.', () => {
    // arrange
    const oldAnswerObject = {
      0: 'SELECT',
    }
    const updatedSize = 0

    // act
    const newAnswerObject = resizeAnswerObject({
      oldObject: oldAnswerObject,
      updatedSize,
    })

    // assert
    expect(Object.keys(newAnswerObject).length).toBe(0)
    expect(newAnswerObject).toEqual({})
  })

  it('updatedSize 값만큼 newAnswerObject 키값을 보존된다.', () => {
    // arrange
    const oldAnswerObject = {
      0: 'SELECT',
      1: 'FROM',
      2: '*',
    }
    const updatedSize = 2

    // act
    const newAnswerObject = resizeAnswerObject({
      oldObject: oldAnswerObject,
      updatedSize,
    })
    // assert
    expect(updatedSize).toBe(Object.keys(newAnswerObject).length)
    expect(newAnswerObject).toEqual({
      0: 'SELECT',
      1: 'FROM',
    })
  })
})
