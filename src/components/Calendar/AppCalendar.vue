<template>
    <div class="calendar">
        <!-- The calendar header -->
        <div class="calendar__btn-container">
            <button
                v-if="selectedStartDay && selectedEndDay"
                aria-label="clearDatesBtn"
                name="clearDatesBtn"
                class="calendar__btn-container__btn"
                data-test="clearDatesButton"
                type="button"
                @click="clearDates"
            >
                <img width="18" height="18" src="@/assets/icons/cross.svg" alt="closeIcon" />
            </button>
        </div>
        <section class="calendar__header">
            <!-- Month navigation previous -->
            <button
                id="previous-month-selector"
                aria-label="previousMonthBtn"
                name="previousMonthBtn"
                class="calendar__header__btn"
                type="button"
                @click="getMonth('previous')"
            >
                <img
                    width="10"
                    height="16"
                    src="@/assets/icons/arrow-left.svg"
                    alt="back"
                />
            </button>
            <!-- Month name, styled MMMM, YYYY -->
            <div class="calendar__header__month">
                {{ computedSelectedMonth }}
            </div>
            <!-- Month navigation next -->
            <button
                id="next-month-selector"
                aria-label="nextMonthBtn"
                name="nextMonthBtn"
                class="calendar__header__btn"
                type="button"
                @click="getMonth('next')"
            >
                <img
                    width="10"
                    height="16"
                    src="@/assets/icons/arrow-right.svg"
                    alt="arrowRight"
                />
            </button>
        </section>

        <!-- Calendar subheader, simply displays days of the week ('Mon', 'Tue', etc) -->
        <ol class="weekdays" role="none">
            <li v-for="(weekday, index) in $options.weekDays" :key="index" class="weekdays__day" role="none">
                {{ weekday }}
            </li>
        </ol>

        <!-- Calendar grid, all days including disabled dates from prev and next month -->
        <ul class="days-grid" role="none">
            <li
                v-for="(day, index) in calendarDays"
                :key="index"
                :class="[
                    getDayClass(day),
                    getPeriodClass(day),
                    day.date === today && day.isCurrentMonth ? 'days-grid__calendar-day--today' : ''
                ]"
                class="days-grid__calendar-day"
                role="button"
                tabindex="0"
                @click="onSelectDay(day)"
                @keydown.enter.prevent="onSelectDay(day)"
            >
                <div class="days-grid__calendar-day__number">{{ day.dayOfMonth }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { getMonthDays, createDaysForPreviousMonth, createDaysForNextMonth, normalizeDate } from '@/utils/calendar'

// Sounds
import closeSound from '@/assets/sounds/switch_005.ogg'
import selectSound from '@/assets/sounds/impactMetal_004.ogg'
import { playSound } from '@/utils/playSound'

/**
 * Components uses dayjs library for formatting Strings to Dates. Safari and Firefox
 * can not process all date formats like Chrome and Edge so 'YYYY/MM/DD' is used as
 * the most compatible one.
 */

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

export default {
    name: 'AppCalendar',
    props: {
        /**
         * Disabled dates if one on them is null the other covers all dates from or up to that
         * date respectively. (if { from: Date, to: null } then all dates from disabledDates.from
         * will be disabled)
         * @property {Object} disabledDates -- Can be passed as a prop to disable certain dates.
         * @example
         * disabledDates: {
         *     from: Date,
         *     to: Date
         * }
         * @property {String} predefinedStart -- Could be passed to show a preselected start day
         * @property {String} predefinedEnd -- Could be passed to show a preselected end day
         */
        disabledDates: {
            type: Object,
            required: false
        },
        predefinedStart: {
            type: String,
            default: null
        },
        predefinedEnd: {
            type: String,
            default: null
        }
    },
    data: () => ({
        monthDays: null,
        previousMonthDays: null,
        nextMonthDays: null,
        calendarDays: null,
        today: null,
        selectedMonth: null,
        selectedStartDay: null,
        selectedEndDay: null
    }),
    created () {
        /**
         * Component initializes with translated titles for weekdays.
         * Current month, year and day. Selected start and end days are
         * also set if provided from props.
         *
         * The arrays of days from current month
         * with visible days from previous and next month
         * are destructured in:
         * @property {Array} calendarDays -- all days to be displayed.
         *
         * @function isDateDisabled -- Checks if date falls in the period of disabledDates
         * @param {Date} date
         *
         * NAVIGATION:
         * @function createCalendar -- re-initiates the calculation of days
         * @function getMonth -- sets selectedMonth
         * @param {String} type -- if next then selectedMonth = selectedMonth + 1 otherwise selectedMonth - 1
         * and calls createCalendar function.
         *
         * @function onSelectDay -- first click set selectedStartDay, subsequent clicks set selectedEndDay
         * @property {Date} selectedStartDay
         * @property {Date} selectedEndDay
         * @function clearDates -- sets selectedStartDay & selectedEndDay to null
         * and emits custom event 'clearDates'
         */

        this.$options.weekDays = weekdays

        // Init calendar with current month and year
        const initYear = dayjs().format('YYYY')
        const initMonth = dayjs().format('M')
        this.today = dayjs().format('YYYY/MM/DD')

        // Get calendar visible days
        this.monthDays = getMonthDays(initYear, initMonth)
        this.previousMonthDays = createDaysForPreviousMonth(initYear, initMonth, this.monthDays)
        this.nextMonthDays = createDaysForNextMonth(initYear, initMonth, this.monthDays)
        this.calendarDays = [...this.previousMonthDays, ...this.monthDays, ...this.nextMonthDays]

        // Set selected
        this.selectedMonth = dayjs(`${initYear}/${initMonth}`)
        this.selectedStartDay = this.predefinedStart
        this.selectedEndDay = this.predefinedEnd
    },
    computed: {
        computedSelectedMonth () {
            return dayjs(this.selectedMonth).format('MMMM YYYY')
        }
    },
    methods: {
        createCalendar (year, month) {
            this.selectedMonth = dayjs(`${year}/${month}/1`)
            this.monthDays = getMonthDays(year, month)
            this.previousMonthDays = createDaysForPreviousMonth(year, month, this.monthDays)
            this.nextMonthDays = createDaysForNextMonth(year, month, this.monthDays)
        },
        getMonth (type) {
            this.selectedMonth =
                type === 'next'
                    ? dayjs(this.selectedMonth).add(1, 'month')
                    : dayjs(this.selectedMonth).subtract(1, 'month')
            this.createCalendar(this.selectedMonth.format('YYYY'), this.selectedMonth.format('M'))
        },
        getDayClass (day) {
            return this.isDateDisabled(day.date)
                ? 'days-grid__calendar-day--disabled'
                : !day.isCurrentMonth
                ? 'days-grid__calendar-day--not-current'
                : ''
        },
        isDateDisabled (date) {
            const normalizeDateFrom = normalizeDate(this.disabledDates?.from)
            const normalizeDateTo = normalizeDate(this.disabledDates?.to)
            return (
                (!this.disabledDates?.to && this.disabledDates?.from && date >= normalizeDateFrom) ||
                (this.disabledDates?.to && !this.disabledDates?.from && date < normalizeDateTo) ||
                (this.disabledDates?.from &&
                    this.disabledDates?.to &&
                    date <= normalizeDateTo &&
                    date >= normalizeDateFrom)
            )
        },
        getPeriodClass (day) {
            const normalizedStartDay = normalizeDate(this.selectedStartDay)
            const normalizedEndDay = normalizeDate(this.selectedEndDay)
            const classPrefix = 'days-grid__calendar-day'
            return this.selectedEndDay && day.date < normalizedEndDay && day.date > normalizedStartDay
                ? `${classPrefix}--period`
                : day.date === normalizedStartDay
                ? `${classPrefix}--selected`
                : day.date === normalizedEndDay
                ? `${classPrefix}--selected ${classPrefix}--selected--end`
                : this.selectedStartDay && day.date < normalizedStartDay
                ? `${classPrefix}--not-current`
                : ''
        },
        onSelectDay (day) {
            const selectedDay = day.dayOfMonth
            const currentMonth = dayjs(day.date).format('MM')
            const currentYear = dayjs(day.date).format('YYYY')
            const selectedDate = normalizeDate(`${currentYear}/${currentMonth}/${selectedDay}`)

            if (
                this.selectedStartDay &&
                !this.isDateDisabled(selectedDate) &&
                dayjs(selectedDate) > dayjs(this.selectedStartDay)
            ) {
                this.selectedEndDay = selectedDate
                this.$emit('endDaySelected', this.selectedEndDay)
                playSound(selectSound)
            } else if (!this.selectedStartDay && !this.isDateDisabled(selectedDate)) {
                this.selectedStartDay = selectedDate
                this.$emit('startDaySelected', this.selectedStartDay)
                playSound(selectSound)
            }
        },
        clearDates () {
            this.selectedStartDay = null
            this.selectedEndDay = null
            this.$emit('clearDates')
            playSound(closeSound)
        }
    },
    watch: {
        monthDays () {
            this.calendarDays = [...this.previousMonthDays, ...this.monthDays, ...this.nextMonthDays]
        }
    }
}
</script>

<style lang="scss" scoped>
$app-calendar-day-size: 22px;
$app-calendar-width: 420px;
$app-calendar-height: 320px;

$app-calendar-color-white: #efeeee;
$app-calendar-selected-color: #D8D1CF;
$app-calendar-color-grey: #575757;
$app-calendar-color-slategrey: #8691a0;
$app-calendar-color-grey-light: #d3d3d3;
$app-calendar-color-whiteoff: #dbdbdb;
$app-calendar-color-black: #242a33;

$app-calendar-box-shadow-3: 3px 3px 8px rgba(155, 154, 154, 0.25);
$app-calendar-border-1-grey: 1px solid $app-calendar-color-grey;

.calendar {
    @include shadow-out;
    position: relative;
    width: $app-calendar-width;
    height: $app-calendar-height;
    background-color: $app-calendar-color-white;
    border-radius: 20px;
    font-size: $xfine-text;
    padding: 8px;
    &__btn-container {
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: flex-end;
        &__btn {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          cursor: pointer;
          &:active,
          &:hover {
            @include shadow-in;
          }
        }
    }
    &__header {
        /* Month indicator and selectors positioning */
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: $app-calendar-color-white;
        padding: 0 4% 8px 4%;
        &__btn {
          cursor: pointer;
        }
        &__month {
            color: $color-text-dark;
            font-size: $fine-text;
            font-weight: $bold-text;
            margin-bottom: 5px;
        }
    }
}
.weekdays,
.days-grid {
    /* 7 equal columns for weekdays and days cells */
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 1px;
    place-items: center;
    border-radius: 8px;
    overflow: hidden;
}

.weekdays {
    /* | Mon | Tue | Wed | Thu | Fri | Sat | Sun | */
    color: $color-text-dark;
    font-size: $xfine-text;
    font-weight: $bold-text;
    background-color: $app-calendar-color-white;
    padding-bottom: 4px;
    padding-top: 8px;
    &__day {
        /* Position the weekday label within the cell */
        text-align: center;
    }
}

.days-grid {
    height: 70%;
    &__calendar-day {
        position: relative;
        width: 85%;
        height: 75%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $xfine-text;
        background-color: $app-calendar-color-white;
        color: $app-calendar-color-grey;
        padding: 4px;
        cursor: pointer;
        &:focus {
            outline: none;
        }
        &:hover > &__number,
        &:focus-visible > &__number {
            border: $app-calendar-border-1-grey;
        }
        &--not-current {
            color: $app-calendar-color-slategrey;
            background: transparent;
        }
        &--disabled {
            color: $app-calendar-color-grey-light;
            text-decoration: line-through;
            background: transparent;
            pointer-events: none;
        }
        &--today {
            text-decoration: underline;
            background: transparent;
        }
        &--period {
            background-color: $app-calendar-color-whiteoff;
            border-radius: 0;
            position: relative;
        }
        &--selected {
            & > .days-grid__calendar-day__number {
              @include shadow-out;
              background-color: $app-calendar-color-black;
              color: $app-calendar-color-whiteoff;
              border: 1px solid white;
            }
            &--end {
                background: linear-gradient(90deg, $app-calendar-color-whiteoff, $app-calendar-color-white);
                border-radius: 0 50px 50px 0;
            }
        }
        &--period,
        &--selected--end {
            /*
                Creates a highlight around start day, was not placed on start day
                because it needs to be visible only if a period selection exists
            */
            &::before {
                content: '';
                position: absolute;
                width: 75%;
                height: 100%;
                left: -75%;
                background-color: $app-calendar-color-whiteoff;
                border-radius: 50px 0 0 50px;
            }
        }
        &__number {
            height: $app-calendar-day-size;
            width: $app-calendar-day-size;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
        }
    }
}
</style>
