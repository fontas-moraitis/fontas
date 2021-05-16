import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'

/**
 * @function createDaysForCurrentMonth -- Returns an array of Objects for each day.
 * accepts:
 * @param {String} year -- selected year
 * @param {String} month -- selected month
 *
 * @returns {Array} -- returns an array of days:
 * @property {Object} day -- everyday is an object with:
 * @property {Date} date -- Date of each day
 * @property {String} dayOfMonth -- The number of the day
 * @property {Boolean} isCurrentMonth -- if day belongs to the current month
 *
 * @function createDaysForPreviousMonth -- Returns an array of Objects
 * for each visible day of previous month.
 * @returns {Array} -- returns an array of visible days
 *
 * @function createDaysForNextMonth -- Returns an array of Objects
 * for each visible day of next month.
 * @returns {Array} -- returns an array of visible days
 */

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

const getNumberOfDaysInMonth = (year, month) => dayjs(`${year}/${month}/1`).daysInMonth()
const getWeekday = date => dayjs(date).weekday()

export const normalizeDate = date => dayjs(date).format('YYYY/MM/DD')
export const stylizeDate = date => dayjs(date).format('DD MMMM, YYYY')

export const getMonthDays = (year, month) =>
    [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => ({
        date: normalizeDate(`${year}/${month}/${index + 1}`),
        dayOfMonth: index + 1,
        isCurrentMonth: true
    }))

export const createDaysForPreviousMonth = (year, month, monthDays) => {
    const monthFirstDay = getWeekday(monthDays[0].date)
    const previousMonth = dayjs(`${year}/${month}/1`).subtract(1, 'month')
    const numOfDaysFromPrevMonth = monthFirstDay ? monthFirstDay - 1 : 6
    const prevMonthLastMondayOfMonth = dayjs(monthDays[0].date)
        .subtract(numOfDaysFromPrevMonth, 'day')
        .date()

    return [...Array(numOfDaysFromPrevMonth)].map((day, index) => {
        return {
            date: normalizeDate(
                `${previousMonth.year()}/${previousMonth.month() + 1}/${prevMonthLastMondayOfMonth + index}`
            ),
            dayOfMonth: prevMonthLastMondayOfMonth + index,
            isCurrentMonth: false
        }
    })
}

export const createDaysForNextMonth = (year, month, monthDays) => {
    const monthLastDay = getWeekday(`${year}/${month}/${monthDays.length}`)
    const numOfDaysFromNextMonth = monthLastDay ? 7 - monthLastDay : monthLastDay

    return [...Array(numOfDaysFromNextMonth)].map((day, index) => {
        return {
            date: normalizeDate(`${year}/${Number(month) + 1}/${index + 1}`),
            dayOfMonth: index + 1,
            isCurrentMonth: false
        }
    })
}
