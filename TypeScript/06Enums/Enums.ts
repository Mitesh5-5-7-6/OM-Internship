// const user: (string | number)[] = [1, "3"]

// write in only define type order value
const user: [string, number, boolean] = ["1", 3, false]
// const user: [string, number, boolean] = ["1", 3, "Mitesh"] // given error

let rgb: [number, number, number] = [255, 3, 55]
// let rgb: [number, number, number] = [255, 3, 55, 344] // not define other more values more then 3

type User = [number, string]
const newUser: User = [122, "mi@.com"]

newUser[0] = 3223
newUser[1] = "cdd@.com"
// newUser.push(true)


// Enums
// Centralization – Define your constants in one place.
// Auto-completion & Intellisense – Helpful in IDEs like VSCode.

enum SeatChoice {
    // AISLE = 1,
    // MIDDLE, // 2 by defualt
    // WINDOW = 20,
    // FOURTH // 21 by defualt
    AISLE = "aisle",
    MIDDLE = 3,
    WINDOW = " window",
    // FOURTH, // error string after not define empty value
    FIVE = 4,
    SIX // number define after next variable value not define then not show error
}
const hcSeat = SeatChoice.AISLE



export { }