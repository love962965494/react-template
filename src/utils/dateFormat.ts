/**
 * @function: DateFormat 时间格式化函数
 * @description:
 *   对传入的时间进行格式化，主要解决通过JSON.stringify()后时间提前8小时bug
 *
 * @param {(string | number | Date)} date
 * @returns {string}
 */
export const requestDateFormat = (date: string | number | Date): string => {
  return new Date(new Date(date).getTime() + 8 * 60 * 60 * 1000).toISOString()
}

export const formatDate = (date: string | number | Date) => {
  if (!date) {
    return ''
  }
  let formatDateValue = ''
  try {
    formatDateValue = new Date(new Date(date).getTime() + 8 * 60 * 60 * 1000)
      .toISOString()
      .replace('T', ' ')
      .split('.')[0]
  } catch (err) {
    console.log(err)
  }

  return formatDateValue
}

export const formatTime = (date: string | number | Date) => {
  return new Date(new Date(date).getTime() + 8 * 60 * 60 * 1000)
    .toISOString()
    .replace('T', ' ')
    .split('.')[0]
}
