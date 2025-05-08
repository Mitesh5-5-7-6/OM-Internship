class Persons {
    name;
    hobbies;
    _age;
    constructor(name, hobbies) {
        this.name = name;
        this.hobbies = hobbies;
    }
    set age(age) {
        if (age > 150 || age < 0) {
            console.log("Age is not valid");
            return;
        }
        this._age = age;
    }
    get age() {
        if (this._age === undefined) {
            console.log("Age is not defined");
            return 0;
        }
        return this._age;
    }
    introduceParent() {
        return `Hi, I'm ${this.name} and I'm ${this._age} years old.
        I Love ${this.hobbies.join(",")}`;
    }
}
const person1 = new Persons("Vinod", ["reading", "games"]);
person1.age = 12;
class user {
    username;
    constructor(username) {
        this.username = username;
        this.username = username;
    }
    logMe() {
        console.log(`Username: ${this.username}`);
    }
    static createId() {
        return `123`;
    }
}
const mitesh = new user("Mitesh");
