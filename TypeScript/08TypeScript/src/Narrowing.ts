// in Operator narrowing
// "value" in x

type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        return animal.swim();
    }
    return animal.fly();
}
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined
}
function getFood(pet: Fish | Bird) {
    if (isFish(pet)) {
        pet
        return "Fish Food"
    } else {
        pet
        return "Bird Food"
    }
}



interface User {
    name: string
    email: string
}

interface Admin {
    name: string
    email: string
    isAdmin: boolean
}

function isAdminAccount(account: User | Admin) {
    if ("isAdmin" in account) {
        return account.isAdmin
    }
    return false
}

type Fish1 = { swim: () => void };
type Bird1 = { fly: () => void };
type Human1 = { swim?: () => void; fly?: () => void }

function move1(animal: Fish1 | Bird1 | Human1) {
    if ("swim" in animal) {
        animal;  // swmin fish and human both
    } else {
        animal;  // fly bird and human both
    }
}


// instanceof
function LogValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toUpperCase())
    }
}


// use Never type
interface Circle {
    kind: "circle",
    radius: number
}
interface Square {
    kind: "square",
    side: number
}
interface Rectangle {
    kind: "rectangle",
    length: number,
    width: number
}

type Shape = Circle | Square | Rectangle

// function getTrueShape(shape: Shape) {
//     if (shape.kind === "circle") {
//         return Math.PI * shape.radius ** 2
//     }
//     return shape.side * shape.side
// }
function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2
        case "square":
            return shape.side * shape.side
        case "rectangle":
            return shape.length * shape.width
        default:
            const _defaultforshape: never = shape
            return _defaultforshape
    }
}