import crypto from 'crypto'

export const getCryptoRandom = (
  randomBytesLength: number,
  bufferEncoding: BufferEncoding,
): Promise<string> => new Promise((resolve) => {
  const randomString = crypto.randomBytes(randomBytesLength).toString(bufferEncoding)
  resolve(randomString)
})
