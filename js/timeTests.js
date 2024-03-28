import {Time} from "./Time.js";

console.log(`Empty time: ${new Time()}`)

console.log()

console.log(`Time with args (1, 1, 1): ${new Time(1, 1, 1)}`)

console.log()

try {
    console.log("Time with args (-1, -1, -1):")
    console.log(new Time(-1, -1, -1).toString());
} catch (e) {
    console.log("Error!", e.message)
}

console.log()

try {
    console.log("Time with args (24, 25, 26):")
    console.log(new Time(24, 25, 26).toString());
} catch (e) {
    console.log("Error!", e.message)
}

console.log()

const firstTime = new Time(1, 2, 3)
const secondTime = new Time(6, 7, 8)

console.log(`first time: ${firstTime}, second time: ${secondTime}`)

console.log(`time 1 + time 2: ${Time.sum(firstTime, secondTime)}`)
console.log(`time 2 - time 1: ${Time.subtract(secondTime, firstTime)}`)
console.log(`time 1 - time 2: ${Time.subtract(firstTime, secondTime)}`)

console.log()

firstTime.addSecs(10)
console.log(`time 1 += 10 secs: ${firstTime}`)

console.log()

firstTime.addMinutes(10)
console.log(`time 1 += 10 mins: ${firstTime}`)

console.log()

firstTime.addHours(1)
console.log(`time 1 += 1 hour: ${firstTime}`)

console.log()

console.log(`time 1 (${firstTime}), period of day: ${firstTime.periodOfDay()}`)
console.log(`time 2 (${secondTime}), period of day: ${secondTime.periodOfDay()}`)

console.log()

console.log("setting params of time 2 to time 1")
firstTime.set(secondTime)
console.log(`now time 1 is ${firstTime}`)

console.log()

console.log("trying to call method set(other) with arg 465")

try {
    firstTime.set(465)
} catch (e) {
    console.log("Error!", e.message)
}

console.log()

console.log(`time 1 (${firstTime}) === time 2 (${secondTime}):`)
console.log(firstTime.equals(secondTime))

console.log()

const thirdTime = new Time(10, 11, 12)

console.log(`time 1 (${firstTime}) === time 3 (${thirdTime}):`)
console.log(firstTime.equals(thirdTime))
