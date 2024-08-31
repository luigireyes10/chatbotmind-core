export type searchCondition = [
  {
    field: string
    dataType: string
    operator: string
    condition: string
  }
]

export const searchConditionToQuery = (
  searchCondition: searchCondition
): string => {
  let query = ''

  for (const condition of searchCondition) {
    if (condition.dataType === 'VARCHAR2' && condition.operator === 'LIKE') {
      query += ` AND upper(${replaceSpecialCharacters(
        condition.field,
        'F'
      )}) LIKE 
                       UPPER('%${replaceSpecialCharacters(
                         condition.condition,
                         'C'
                       )}%')\n`
    } else if (condition.dataType === 'VARCHAR2') {
      query += ` AND UPPER(${replaceSpecialCharacters(condition.field, 'F')}) ${
        condition.operator
      } UPPER('${replaceSpecialCharacters(condition.condition, 'C')}')\n`
    } else if (condition.dataType === 'NUMBER') {
      query += ` AND ${condition.field} ${condition.operator} ${condition.condition}\n`
    } else if (condition.dataType === 'DATE') {
      query += ` AND to_char(${condition.field}, 'dd/mm/yyyy') ${condition.operator}  '${condition.condition}' \n`
    }
  }

  return query
}

const replaceSpecialCharacters = (text: string, type: string): string => {
  const specialCharacters: [string, string][] = [
    ['í', 'i'],
    ['ó', 'o'],
    ['á', 'a'],
    ['é', 'e'],
    ['ü', 'u'],
    ['ñ', 'n'],
    ['ú', 'u'],
    ['Í', 'I'],
    ['Ó', 'O'],
    ['Á', 'A'],
    ['É', 'E'],
    ['Ü', 'U'],
    ['Ñ', 'N'],
    ['Ú', 'U'],
    [' ', '%'],
  ]

  let replacedText = text
  let replace = ''
  let replacedCharacters = ''
  specialCharacters.forEach((character) => {
    if (type === 'C') {
      replacedText = replacedText.replace(character[0], character[1])
    } else {
      replace += 'replace('
      replacedCharacters += `, '${character[0]}', '${character[1]}')`
    }
  })

  if (type === 'F') {
    replacedText = `${replace}${text}${replacedCharacters}`
  }

  return replacedText
}
