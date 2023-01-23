export const AuthTypes = Object.freeze({
  1: 'email',
  2: 'phone',
})

export const getAuthTypeKey = (
  valueToFind: typeof AuthTypes[keyof typeof AuthTypes],
): number => {
  const entries = Object.entries(AuthTypes)
  for (const [ key, value ] of entries) {
    if (valueToFind === value) {
      return Number(key)
    }
  }
  throw new Error(`AuthType key is not found from value - ${valueToFind}`)
}

export const getAuthTypeValue = (
  keyToFind: keyof typeof AuthTypes,
): typeof AuthTypes[keyof typeof AuthTypes] => {
  const entries = Object.entries(AuthTypes)
  for (const [ key, value ] of entries) {
    if (keyToFind.toString() === key) {
      return value
    }
  }
  throw new Error(`AuthType value is not found from key - ${keyToFind}`)
}
