const score: Array<number> = [];
const names: Array<string> = [];

function identityOne(val: boolean | number): boolean | number {
    return val
}

function identityTwo(val: any): any {
    return val
}

function identityThree<Type>(val: Type): Type {
    return val
}

identityThree(3) // you pass number so return as a number : (val: 3): 3
identityThree("3")  // you pass number so return as a number : (val: "3"): "3"
identityThree(true)

// Type === T both are same short form Type to T
function identityFoure<T>(val: T): T {
    return val
}

// creating own type and pass object
interface Bottle {
    brand: string,
    type: number
}
identityFoure<Bottle>({ brand: "dd", type: 3 }) // you pass bottle type, return bottle type

function getSearchProducts<T>(products: T[]): T {

    const myIndex = 3
    return products[myIndex];
}

const getMoreSearchProducts = <T>(products: T[]): T => {
    const myIndex = 4
    return products[myIndex]
}


function anotherFunction<T, U>(valOne: T, valTwo: U): object {
    return {
        valOne,
        valTwo
    }
}
anotherFunction(3, '4')

function anotherFunction1<T, U extends number>(valOne: T, valTwo: U): object {
    return {
        valOne,
        valTwo
    }
}
anotherFunction1(3, 3.4) // not use second parameter in string type

function anotherFunction2<T, U extends Bottle>(valOne: T, valTwo: U): object {
    return {
        valOne,
        valTwo
    }
}
anotherFunction2(3, { brand: "dd", type: 3 }) // not use second parameter in type pass only Bottle object type

interface Quiz {
    name: string,
    type: string
}

interface Course {
    name: string,
    auther: string,
    subject: string
}

class Sellable<T> {
    public cart: T[] = []

    addToCart(products: T) {
        this.cart.push(products)
    }
}