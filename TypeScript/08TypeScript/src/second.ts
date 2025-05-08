interface TakePhoto {
    cameraMode: string
    filter: string
    burst: number
}

interface Story {
    createStory(): void
}

class Instagram implements TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number,
    ) { }
}

class Youtube implements TakePhoto, Story {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number,
        public short: string
    ) { }

    createStory(): void {
        console.log("Story was creted")
    }
}

// getter and setter, abstrac method, Narrowing Learn...
enum ancc {
    a = 2,
    b = "Mitesh",
    c = 3
}


// abstract method
interface PerObj {
    name: string;
    age: number;
}
const Person: PerObj = {
    name: "mitesh",
    age: 22
}
const Person1: PerObj = {
    name: "Jay",
    age: 23
}
const Person2: PerObj = {
    name: "Jayyogi",
    age: 23
}

// but multiple class in use same thing than use abstract method...
abstract class PerObj1 {
    name!: string;
    age!: number;
    // name?: string; name:string = '';
    // age?: number;  age:number = 0;
}

class Person4 extends PerObj1 {
    constructor() {
        super();
        this.name = "Mitesh";
        this.age = 22;
    }
}

class Person5 extends PerObj1 {
    constructor() {
        super();
        this.name = "Jay";
        this.age = 23;
    }
}

class Person6 extends PerObj1 {
    constructor() {
        super();
        this.name = "Jayyogi";
        this.age = 23;
    }
}

//
abstract class PerObj2 {
    // public name: string;
    // protected age: number;

    // constructor(name: string, age: number) {
    //     this.name = name;
    //     this.age = age;
    // }

    // best practice...
    constructor(public name: string, protected color: string) { }

    abstract calculateArea(): number; // this property are required, not write otherwise show error.
    abstract displayArea: () => void; // this property are required
}

class Person7 extends PerObj2 {
    constructor(protected radius: number) {
        super("Circle", "Red"); // pass values to parent class constructor
    }

    public calculateArea(): number {
        return Math.PI * this.radius * this.radius
    }

    displayArea: () => void = (): void => {
        console.log(`This is a ${this.color}  ${this.name} with radius ${this.radius}`)
    }
}

const person7 = new Person7(25)
person7.displayArea;


// Date
let date: Date = new Date()

// as keyword : it is used to override the data type of the variable.
let l: unknown = "saycheze";
console.log(l);

let leng: number = (l as string).length;
console.log(leng);

// 2.
interface student {
    n: string
    id: number
}

function getstudent() {
    let name: string = "yash";
    return {
        n: name,
        id: 89
    };
}

let student = getstudent() as student;


// Decorators

// Sealed Decorator
function sealed(constructor: Function) {
    // Prevent adding new properties or methods to the class
    Object.seal(constructor); // Seal the constructor itself (no new properties on class)
    Object.seal(constructor.prototype); // Seal the prototype (no new methods on instances)
}

@sealed
class studentes {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    print() {
        return "Hello, " + this.name;
    }
}

// Create an instance of student
const stud = new studentes("John");

// Calling print method
console.log(stud.print()); // Output: Hello, John

// Trying to add a new property or method will result in an error
// stud.age = 22; // This will not work because the class is sealed

// console.log(stud.age); // undefined


// TypeScript Utility Types
// 1. Partial<T> -> optional types define
interface Person {
    name: string;
    age: number;
}

const partialPerson: Partial<Person> = {
    name: "John",
};  // OK, age is optional now

// 2. Required<T>
interface Person2 {
    name?: string;
    age?: number;
}

const person: Required<Person2> = {
    name: "John",
    age: 0,
};  // OK, both properties are required now, you write optinal property but this are required oterwise given error.


// 3. Readonly<T> : not edit this property

// 4. Record<K, T> : K means key John:string and T means value 30:number
type AgeRecord = Record<string, number>;

const ages: AgeRecord = {
    John: 30,
    Alice: 25,
};

// 5. Omit<T, K> -> T means: Person Type, K means: person in which field not required
interface Person {
    name: string;
    age: number;
    address?: string;
}

const personWithoutAddress: Omit<Person, "address"> = {
    name: "John",
    age: 30,
};  // OK, 'address' is omitted


class abc {
    name?: string;
    age?: string;
    constructor(name, age) {
        // this.name = name;
        // this.age = age;
    }
}
const ABCD = new abc(123, "true");
console.log(ABCD.name?.toUpperCase());
