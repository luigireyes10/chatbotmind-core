export const stringToBuffer = (stringData: string): Buffer => {
  if (!stringData) {
    return null
  }

  return Buffer.from(stringData, 'base64')
}
