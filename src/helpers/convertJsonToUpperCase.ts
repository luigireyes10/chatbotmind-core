import { ParameterList } from '../constants/types'

export const convertJsonToUpperCase = (jsonObject: unknown): unknown => {
  const newJson: ParameterList = {}
  Object.keys(jsonObject).forEach(function (key) {
    if (typeof jsonObject[key] !== 'string') {
      newJson[key] = jsonObject[key]
    }
    newJson[key] = jsonObject[key].toString().toUpperCase()
  })

  return newJson
}
