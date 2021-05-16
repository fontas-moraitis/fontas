<template>
    <div class="date-picker-container" v-click-outside="hideCalendar">
        <!-- Title of component, displayed above the date display -->
        <div v-if="label" class="date-picker-container__label">{{ label }}</div>
        <!-- Date display "startDate" to "endDate" -->
        <div
            aria-label="openCalendarBtn"
            title="openCalendarBtn"
            class="date-picker-container__display"
            role="button"
            tabindex="0"
            @click="toggleCalendar"
            @keydown.enter.prevent="toggleCalendar"
        >
            <svg
                role="img"
                aria-labelledby="calendarIcon"
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M18.216 2H17.204V0H15.18V2H5.06V0H3.036V2H2.024C0.9108 2 0 2.9 0 4V20C0 21.1 0.9108 22 2.024 22H18.216C19.3292 22 20.24 21.1 20.24 20V4C20.24 2.9 19.3292 2 18.216 2ZM18.216 20H2.024V7H18.216V20Z"
                    fill="#0A588B"
                />
            </svg>
            <div class="date-picker-container__display__dates">
                <div class="date-picker-container__display__dates__date">
                    {{ startDay || displayDate(predefinedStart) || 'selectFromDate' }}
                </div>
                <span class="np-margin-x-16 np-text--bold">
                    {{ 'to' }}
                </span>
                <div class="date-picker-container__display__dates__date">
                    {{ endDay || displayDate(predefinedEnd) || 'selectUntilDate' }}
                </div>
            </div>
        </div>
        <transition name="fade">
            <AppCalendar
                v-if="showCalendar"
                :disabled-dates="disabledDates"
                :predefined-start="startDay"
                :predefined-end="endDay"
                @startDaySelected="handleStartDaySelected"
                @endDaySelected="handleEndDaySelected"
                @clearDates="clearSelection"
            />
        </transition>
        <div v-if="datesSelected && showCalendar" class="date-picker-container__btn-container">
            <button
                class="np-btn date-picker-container__btn-container__accept-btn"
                type="button"
                @click="acceptSelection"
            >
                {{ 'accept' }}
            </button>
        </div>
    </div>
</template>

<script>
import { normalizeDate, stylizeDate } from '@/utils/calendar'

// Components
import AppCalendar from './AppCalendar'

/**
 * DatePicker component displays from and until dates.
 * Set by the AppCalendar component.
 *
 * PROPS
 * @property {String} label -- Displays a title above the component.
 * @property {Date} predefinedStart -- Displays a preset date
 * @property {Date} predefinedEnd -- Displays a preset date
 * @property {Object} disabledDates -- Passed through to AppCalendar
 */

export default {
    name: 'DatePicker',
    components: { AppCalendar },
    props: {
        label: {
            type: String,
            default: ''
        },
        predefinedStart: Date,
        predefinedEnd: Date,
        disabledDates: {
            type: Object,
            required: false
        }
    },
    data: () => ({
        showCalendar: false,
        startDay: null,
        endDay: null,
        datesSelected: false
    }),
    methods: {
        handleStartDaySelected (date) {
            this.startDay = stylizeDate(date)
        },
        handleEndDaySelected (date) {
            this.endDay = stylizeDate(date)
            this.datesSelected = true
        },
        hideCalendar () {
            !this.startDay && !this.endDay && this.clearSelection()
        },
        toggleCalendar () {
            !this.showCalendar ? (this.showCalendar = true) : this.hideCalendar()
        },
        clearSelection () {
            this.showCalendar = false
            this.datesSelected = false
            this.startDay = null
            this.endDay = null
            this.$emit('selectedPeriod', { from: null, until: null })
        },
        acceptSelection () {
            this.$emit('selectedPeriod', {
                from: normalizeDate(this.startDay),
                until: normalizeDate(this.endDay)
            })
            this.showCalendar = false
            this.datesSelected = false
        },
        displayDate (date) {
            return date && stylizeDate(date)
        }
    }
}
</script>

<style lang="scss" scoped>
.date-picker-container {
    position: relative;
    width: 280px;
    &__label {
        font-size: $fine-text;
        font-weight: $bold-text;
        margin-bottom: 12px; // Margin placed here so it can be removed with the element.
    }
    &__display {
        width: 280px;
        height: 35px;
        border: 1px solid black;
        margin: 0 0 4px 0;
        display: flex;
        align-items: center;
        padding: 0 16px;
        cursor: pointer;
        &:focus-visible {
            outline: $color-text-dark;
        }
        &__dates {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 8px 0 20px;
            font-size: 14px;
            font-weight: $thin-text;
            &__date {
                width: 100%;
                text-align: center;
            }
        }
    }
    &__btn-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
        padding: 0 8px;
        &__accept-btn {
            height: 20px;
            font-size: 12px;
            background-color: $color-text-dark;
            color: #fff;
            box-shadow: 3px 3px 5px $color-shadow-dark;
            &:active {
                box-shadow: inset 3px 3px 5px $color-shadow-light;
                color: $color-cream-white;
            }
            &:focus,
            &:hover {
                background-color: yellow;
                color: $color-text-dark;
            }
        }
    }
}
</style>
