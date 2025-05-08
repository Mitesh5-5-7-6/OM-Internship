// get method doen't take anu parameters, and the set method takes only one parameter.
// get and set are not function, this are property.
class Persons {
    private _age: number | undefined;
    constructor(public name: string, protected hobbies: string[]) { }

    public set age(age: number) {
        if (age > 150 || age < 0) {
            console.log("Age is not valid");
            return;
        }
        this._age = age;
    }

    public get age(): number {
        if (this._age === undefined) {
            console.log("Age is not defined");
            return 0;
        }
        return this._age;
    }

    introduceParent(): string {
        return `Hi, I'm ${this.name} and I'm ${this._age} years old.
        I Love ${this.hobbies.join(",")}`
    }
}

const person1: Persons = new Persons("Vinod", ["reading", "games"]);

person1.age = 12;

// static keyword
class user {
    constructor(public username: string) {
        this.username = username;
    }

    logMe() {
        console.log(`Username: ${this.username}`)
    }

    static createId() {
        return `123`
    }
}

const mitesh = new user("Mitesh");
// console.log(mitesh.createId())// this are not access anyone this bydefault

// Dynamic Type and Static type

//