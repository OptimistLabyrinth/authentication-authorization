export const AuthTypes = Object.freeze({
  email: 1,
  phone: 2,
})

export const getAuthTypeKey = (
  valueToFind: typeof AuthTypes[keyof typeof AuthTypes],
) => {
  const entries = Object.entries(AuthTypes)
  for (const [ key, value ] of entries) {
    if (valueToFind === value) {
      return key as keyof typeof AuthTypes
    }
  }
  throw new Error(`AuthType key is not found from value - ${valueToFind}`)
}

export const getAuthTypeValue = (
  keyToFind: keyof typeof AuthTypes,
) => {
  const entries = Object.entries(AuthTypes)
  for (const [ key, value ] of entries) {
    if (keyToFind.toString() === key) {
      return value
    }
  }
  throw new Error(`AuthType value is not found from key - ${keyToFind}`)
}
