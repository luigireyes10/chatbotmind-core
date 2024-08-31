/**
 * @description Conversion de fecha
 * @param date 
 * @returns 
 */
export const convertDate = (date: Date): string => {
    const today = new Date(date)
    const day = checkZero(`${today.getDate()} `)
    const month = checkZero(`${today.getMonth() + 1} `)
    const year = checkZero(`${today.getFullYear()} `)
    const hour = checkZero(`${today.getHours()} `)
    const minutes = checkZero(`${today.getMinutes()} `)
    const seconds = checkZero(`${today.getSeconds()} `)
  
    return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`
  
    function checkZero(data) {
      if (data.length === 1) {
        data = '0' + data
      }
      return data
    }
  }
  