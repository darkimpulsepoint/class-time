export class Time {
    #secsInMin
    #minsInHour
    #hoursInDay

    #seconds
    #minutes
    #hours

    constructor(hs = 0, mins = 0, secs = 0, secsInMins=60, minsInHour=60, hsInDay=24) {
        if(secsInMins > 0 && Number.isInteger(secsInMins)){
            this.#secsInMin = secsInMins
        } else {
            this.#secsInMin = 60
        }

        if(minsInHour > 0 && Number.isInteger(minsInHour)){
            this.#minsInHour = minsInHour
        } else {
            this.#minsInHour = 60
        }

        if(hsInDay > 0 && Number.isInteger(hsInDay)){
            this.#hoursInDay = hsInDay
        } else {
            this.#hoursInDay = 24
        }

        this.setSeconds(secs)
        this.setMinutes(mins)
        this.setHours(hs)
    }

    #validateParam = (param, min, max) => {
        return param >= min && param <= max
    }

    #normalize = () => {

        const minsToAdd = this.#seconds >= 0
            ? Math.trunc(this.#seconds / this.#secsInMin)
            : 0 - Math.trunc(Math.abs(this.#seconds) / this.#secsInMin) - 1

        this.#seconds -= this.#secsInMin * minsToAdd
        this.#minutes += minsToAdd

        const hoursToAdd = this.#minutes >= 0
            ? Math.trunc(this.#minutes / this.#minsInHour)
            : -Math.trunc(Math.abs(this.#minutes) / this.#minsInHour) - 1

        this.#hours += hoursToAdd
        this.#minutes -= this.#minsInHour * hoursToAdd

        this.#hours = this.#hours >= 0
            ? this.#hours - Math.trunc(this.#hours / this.#hoursInDay)
            : this.#hours + (Math.trunc(Math.abs(this.#hours) / this.#hoursInDay) + 1) * this.#hoursInDay
    }

    static sum = (first, second) => {
        const sum = new Time()

        sum.#seconds = first.#seconds + second.#seconds
        sum.#minutes = first.#minutes + second.#minutes
        sum.#hours = first.#hours + second.#hours
        sum.#normalize()

        return sum
    }

    static subtract = (first, second) => {
        const difference = new Time()

        difference.#seconds = first.#seconds - second.#seconds
        difference.#minutes = first.#minutes - second.#minutes
        difference.#hours = first.#hours - second.#hours
        difference.#normalize()

        return difference
    }

    toString = () => {
        return String(this.#hours).padStart(2, '0') + ":"
            + String(this.#minutes).padStart(2, '0')
            + ":"
            + String(this.#seconds).padStart(2, '0')
    }

    setSeconds = (secs) => {
        if (this.#validateParam(secs, 0, 59)) {
            this.#seconds = secs
        } else {
            throw new Error('Seconds must be from 0 to 59')
        }
    }

    setMinutes = (mins) => {
        if (this.#validateParam(mins, 0, 59)) {
            this.#minutes = mins
        } else {
            throw new Error('Minutes must be from 0 to 59')
        }
    }

    setHours = (hs) => {
        if (this.#validateParam(hs, 0, 23)) {
            this.#hours = hs
        } else {
            throw new Error('Hours must be from 0 to 23')
        }
    }

    getSeconds = () => {
        return this.#seconds
    }

    getMinutes = () => {
        return this.#minutes
    }

    getHours = () => {
        return this.#hours
    }

    addMinutes = (mins) => {
        this.#minutes += Math.trunc(mins)
        this.#normalize()
    }

    addSecs = (secs) => {
        this.#seconds += Math.trunc(secs)
        this.#normalize()
    }

    addHours = (hs) => {
        this.#hours += Math.trunc(hs)
        this.#normalize()
    }

    periodOfDay = () => {
        if (this.#hours >= 22 || this.#hours < 5) {
            return "night"
        } else if (this.#hours >= 17) {
            return "evening"
        } else if (this.#hours >= 12) {
            return "day"
        } else return "morning"
    }

    set = (other) => {
        if (other instanceof Time) {
            this.setSeconds(other.getSeconds())
            this.setMinutes(other.getMinutes())
            this.setHours(other.getHours())
        } else {
            throw new Error("variable must be instance of Time")
        }
    }

    equals = (time) => {
        return this.#seconds === time.#seconds
            && this.#minutes === time.#minutes
            && this.#hours === time.#hours
    }
}
