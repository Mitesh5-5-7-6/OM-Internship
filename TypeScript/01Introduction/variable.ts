let greetings: string = "Hello Mitesh";

// this are not allowed because this variable are string and you assign number.
// greetings = 6 

greetings.toLowerCase();
console.log(greetings)

// Number
let userId: number = 33445566

// This are valid number are allwoed int and float values
userId = 33.45

// boolean
let isLoggedIn: boolean = false


// any
// This are not good practice
// TypeScript also has a special type any, that you can use whenever you don't want a particular value to cause typechecking errors.
// You usually want to avoid this, though, because any isn't type-checked. Use the compiler flag noImplicitAny. to flag any implicit any as an error.


let hero: string;

function getHero() {
    return 'throw'
}

hero = getHero()

// add Types in function
function addTwo(num: number) { // add type num:number
    return num + 2
}
// addTwo("ew") // this are not allowed
addTwo(5)


function getUpper(val: string) {
    return val.toUpperCase()
}
getUpper("Mitesh")


function signUpUser(id: number, email: string, isPaid: boolean) {

}
signUpUser(1, "mitesh@gmail.com", false)


// arrow function
let loginUser = (id: number, email: string, isPaid = false) => {

}
loginUser(1, "mitesh")


function addOne(num: number) {
    // return num + 2;
    return "Aad"  // This are allwod return string
}
addOne(3);

// This method call implecit type
function addOne1(num: number): number {
    return num + 2;
    // return "Aad"    Type 'string' is not assignable to type 'number'.
}
addOne1(3);


const getHello = (s: string): string => {
    return ""
}

// const heros = ["thor", "sipderman", "ironman"]
const heros = [1, 2, true, "4"]

heros.map((hero): string => {
    return `hero is ${hero}`
})

// void means retuen nothing
function consoleError(errormsg: string): void {
    console.log(errormsg);
}

// never : some function never returna value
// the never type represents values which are never observed.
// In a return type, this means that the funtion throws an exception or terminates execution of the program.
function handleError(errormsg: string): never {
    throw new Error(errormsg)
}

export { }


// Differences Between Static Typing and Dynamic Typing

// Static Typing : 
// Type checking is done at compile time.
// Ex :
let age: number = 25;
let name: string = "Alice";
let isActive: boolean = true;

type Person = {
    name: string;
    age: number;
};

const person: Person = {
    name: "John",
    age: 30
};


// Dynamic Typing : Type checking is done at runtime.
// any type(disables type checking) and unknown type(better than any) are use
let data: any = 10;
data = "Now I'm a string";
data = { key: "value" };

let value: unknown = "Hello";

if (typeof value === "string") {
    console.log(value.toUpperCase());
}


// Type casting
let someValue: unknown = "Hello, world!";
let strLength = (someValue as string).length;

let someValue1: unknown = "Hello, world!";
let strLength1 = (<string>someValue1).length;

type User = {
    name: string;
    age: number;
};
const data2: unknown = {
    name: "John",
    age: 25
};
const user = data2 as User;

const ajsbh = "123" as never as number;
console.log(typeof ajsbh)


// Arrow Functions in a Class
class employee {
    empno: number;
    empname: string;
    constructor(no: number, name: string) {
        this.empname = name;
        this.empno = no;
    }
    myfunction = () => console.log(" Employee no: " + this.empno + '\nEmployee Name: ' + this.empname)
}
let stud = new employee(21303, 'YASH AGARWAL');
stud.myfunction();