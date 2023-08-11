export function isAllNotEmptyInput(...args: string[]) {
  return args.every((v) => v.trim() !== '')
}

export function isEmptyObject(obj: object) {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true
  }

  return false
}
