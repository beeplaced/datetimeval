const regex = {
    dateRegexDotde: /^\d{2}\.\d{2}\.\d{4}$/,
    dateRegexde: /\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/,
    dateRegexDotdeLazy: /^\d{1,2}.\d{1,2}.\d{2,4}$/,
    dateRegexDotLazyDayMonth: /^\d{1}$/,
    dateRegexDotLazyYear: /^\d{2}$/,
    dateRegexdeShort: /\b(\d{1,2})\.(\d{1,2})\.(\d{2})\b/,
    dateRegexSlash: /^\d{2}\/\d{2}\/\d{4}$/,
    dateRegexMinus: /^\d{2}-\d{2}-\d{4}$/,
    isoDateRegex: /^(\d{4})-(\d{2})-(\d{2}).*$/,
    zuluTimeRegex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
}

module.exports = class {

/**
 * Set country for time Requests
 * @param {string} [country] - The country code ('us' for United States, 'de' for Germany). Default is 'de'.
*/
    constructor(country){
        this.country = country || 'de'
    }

/**
 * Get the current Zulu time (UTC) with an optional country-specific offset.
 * @returns {Date} The current Zulu time.
 */
    zuluTimeNow = () => {
        try {
            let utcDate
            switch (this.country) {
                case 'us':
                utcDate = new Date()
                    break;
                default: //de
                const bTimeZone = 'Europe/Berlin';
                const bDate = new Date().toLocaleString('en-US', { timeZone: bTimeZone });
                utcDate = new Date(bDate);
            }
        const offset = utcDate.getTimezoneOffset()
        const absOffset = Math.abs(offset) / 60
        const newTime = offset < 0
            ? utcDate.getTime() + absOffset * 60 * 60 * 1000
            : utcDate.getTime() - absOffset * 60 * 60 * 1000
        return new Date(newTime)
        } catch (error) {
            console.error(error)
            return new Date()
        }
    }

    /** convertToISOFill
     * @param {string} dateString - The input parameters.
     */
    convertToISOFill = (dateString) => {//de
        try {
        /**
        * @typedef {Object} ConversionResult
        * @property {string|false} valDateString - The converted date string in ISO format ('yyyy-mm-dd'),
        *                                          or false if the input date is invalid.
        * @property {Date|false} dateStringISO - The Date object representing the ISO date,
        *                                       or false if the input date is invalid.
        */
        /** @type {ConversionResult} */
        const res = { valDateString: false, dateStringISO: false }
        if (regex.dateRegexDotdeLazy.test(dateString)) {
            const parts = dateString.split('.')
            let day = regex.dateRegexDotLazyDayMonth.test(parts[0]) ? '0' + parts[0] : parts[0]
            let month = regex.dateRegexDotLazyDayMonth.test(parts[1]) ? '0' + parts[1] : parts[1]
            const year = regex.dateRegexDotLazyYear.test(parts[2]) ? '20' + parts[2] : parts[2]
            if (parseInt(month) > 12) {
                [day, month] = [month, day]
            }
            dateString = `${day}.${month}.${year}`
        }
        if (regex.dateRegexDotde.test(dateString)) {
            const newDateString = new Date(dateString.split('.').reverse().join('-'))
            if (this.isValidISODate(newDateString)) {
                res.valDateString = dateString
                res.dateStringISO = newDateString
            } else {
                res.valDateString = false
                res.dateStringISO = false
            }
        }
        return res
        } catch (error) {
            console.error(error)
            return { valDateString: false, dateStringISO: false }
        }
    }


    isValidISODate(date) {
        return date instanceof Date && !isNaN(date)
    }

 /** isValidDateFormat
 * @param {string} dateString - The input parameters.
 */
    isValidDateFormat = (dateString) => {
        switch (this.country) {
            case 'us':
                break;
            default: //de
                return regex.dateRegexDotde.test(dateString)
        }
    }

/** isValidDateFormat
* @param {string} dateString - The input parameters.
*/
    convertToZulu = (dateString) => {
        if (regex.zuluTimeRegex.test(dateString)) return dateString
        switch (this.country) {
            case 'us':
                break;
        default: //de
            const { dateStringISO } = this.convertToISOFill(dateString)
            return dateStringISO
        }
    }

/** isValidDateFormat
* @param {string} dateString - The input parameters.
*/
    convertFromZulu = (dateString) => {
        try {
        const date = new Date(dateString)
        const day = date.getUTCDate()
        const month = date.getUTCMonth() + 1
        const year = date.getUTCFullYear()
        const dayFormatted = ('0' + day).slice(-2)
        const monthFormatted = ('0' + month).slice(-2)
        switch (this.country) {
            case 'us':
                break;
            default: //de
            return `${dayFormatted}.${monthFormatted}.${year}`
        }
        } catch (error) {
            console.error(error)
        }
    }

/**
 * Calculate a date in the past relative to the current Zulu time (UTC).
 * @param {{ seconds?: number, minutes?: number, days?: number, months?: number }} input - An object specifying the time difference.
 * @returns {Date} The calculated date in the past.
*/
    dbRefTimeAgo(input) {
        try {
        const { seconds = 0, minutes = 0, days = 0, months = 0 } = input;
        const now = this.zuluTimeNow();
        let timeAgo = new Date(now);
        if (months) {
            timeAgo.setMonth(now.getMonth() - months);
        }
        if (days) {
            timeAgo = new Date(timeAgo.getTime() - days * 24 * 60 * 60 * 1000);
        }
        if (minutes) {
            timeAgo = new Date(timeAgo.getTime() - minutes * 60 * 1000);
        }
        if (seconds) {
            timeAgo = new Date(timeAgo.getTime() - seconds * 1000);
        }
        return timeAgo;
        } catch (error) {
            console.error(error)
            return new Date();
        }
    }
}