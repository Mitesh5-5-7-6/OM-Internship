// type Alice
type Users = {
    name: string;
    email: string;
    isActive: boolean;
}
function createUsers(user: Users): Users {
    return { name: "", email: "", isActive: true }
}
createUsers({ name: "", email: "", isActive: true })


type User = {
    readonly _id: string
    name: string;
    email: string;
    isActive: boolean;
    isCreditCard?: boolean // ? make optional field
}

let myUser: User = {
    _id: "32432432",
    name: "h",
    email: "h@h.com",
    isActive: false
}

// myUser._id = "49937473"; this are given error not change value this are only readonly
myUser.name = "Mitesh";  // this are change beacuse this are not readonly


type cardNumber = {
    cardNumber: string
}

type cardDate = {
    cardDate: string
}

// this cardDetails is combination of cardNumber, cardDate and cvv
type cardDetails = cardNumber & cardDate & { cvv: number }
let cardDetails: cardDetails

// Type Vs. Interface
// 1. Using type
type UserType = {
    readonly id: number;
    name: string;
    age: number;
    googleId?: string;
    // startTriall: () => string, return only string value
    startTriall(): string
};

// Using interface
interface UserInterface {
    readonly id: number;
    name: string;
    age: number;
    googleId?: string
    startTriall: (name: string) => number // startTriall(): string, return only number value
}

// 2. type using intersection
type AdminType = UserType & { role: string };

// interface using extends
interface AdminInterface extends UserInterface {
    role: string;
}


// 3. interface can merge
interface Book {
    title: string;
}
interface Book {
    author: string;
}

const book: Book = { title: "TS Handbook", author: "Anders" };

// type cannot merge
type Car = {
    model: string;
};

// ❌ Error: Duplicate identifier
// type Car = {
//   price: number;
// };



// 4. type supports primitives
type ID = number | string;

// interface ❌ does not support primitives
// interface ID = number | string; ❌ Error
interface ID1 { id: number | string }

// type supports intersection
type Employee = { id: number } & { department: string };


// both can be used
interface Animal {
    name: string;
}

type Plant = {
    name: string;
};

class Dog implements Animal {
    name = "Doggo";
}

class Tree implements Plant {
    name = "Maple";
}


// 7. Tuples, Arrays, and Functions (type only)
// tuple
type Point = [number, number];

// array
type Names = string[];

// function
type Greet = (name: string) => string;

export { }