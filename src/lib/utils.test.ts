import { makePrefixKey, range } from './utils'

describe('makePrefixKey 함수', () => {
  it('underbar로 prefix, keyValue를 나눈다', () => {
    const prefix = 'test'
    const keyValue = 'first'

    const result = makePrefixKey({ prefix, keyValue })
    expect(result).toBe('test_first')
  })

  it('', () => {
    const prefix = 'test'
    const keyValue = 'first'

    const result = makePrefixKey({ prefix, keyValue })
    expect(result.split('_')).toStrictEqual(['test', 'first'])
  })
})

describe('range 함수', () => {
  it('range 길이', () => {
    const start = 1
    expect(range(start).length).toBe(1)
  })

  it('start 부터 시작하고 end 이전 값까지 출력', () => {
    expect(range(3, 5)).toStrictEqual([3, 4])
    expect(range(1, 7)).toStrictEqual([1, 2, 3, 4, 5, 6])
  })
})
