var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class Instagram {
    cameraMode;
    filter;
    burst;
    constructor(cameraMode, filter, burst) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
    }
}
class Youtube {
    cameraMode;
    filter;
    burst;
    short;
    constructor(cameraMode, filter, burst, short) {
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
        this.short = short;
    }
    createStory() {
        console.log("Story was creted");
    }
}
var ancc;
(function (ancc) {
    ancc[ancc["a"] = 2] = "a";
    ancc["b"] = "Mitesh";
    ancc[ancc["c"] = 3] = "c";
})(ancc || (ancc = {}));
const Person = {
    name: "mitesh",
    age: 22
};
const Person1 = {
    name: "Jay",
    age: 23
};
const Person2 = {
    name: "Jayyogi",
    age: 23
};
class PerObj1 {
    name;
    age;
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
class PerObj2 {
    name;
    color;
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
class Person7 extends PerObj2 {
    radius;
    constructor(radius) {
        super("Circle", "Red");
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
    displayArea = () => {
        console.log(`This is a ${this.color}  ${this.name} with radius ${this.radius}`);
    };
}
const person7 = new Person7(25);
person7.displayArea;
let date = new Date();
let l = "saycheze";
console.log(l);
let leng = l.length;
console.log(leng);
function getstudent() {
    let name = "yash";
    return {
        n: name,
        id: 89
    };
}
let student = getstudent();
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
let studentes = class studentes {
    name;
    constructor(name) {
        this.name = name;
    }
    print() {
        return "Hello, " + this.name;
    }
};
studentes = __decorate([
    sealed
], studentes);
const stud = new studentes("John");
console.log(stud.print());
const partialPerson = {
    name: "John",
};
const person = {
    name: "John",
    age: 0,
};
const ages = {
    John: 30,
    Alice: 25,
};
const personWithoutAddress = {
    name: "John",
    age: 30,
};
class abc {
    name;
    age;
    constructor(name, age) {
    }
}
const ABCD = new abc(123, "true");
console.log(ABCD.name?.toUpperCase());
