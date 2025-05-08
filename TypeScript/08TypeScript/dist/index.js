"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    email;
    name;
    city = "Anand";
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
}
const mitesh = new User("m@.com", "Mitesh");
class User1 {
    email;
    name;
    _courseCount = 1;
    _courseCounts = 1;
    city = "Anand";
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
    deleteToken() {
        console.log("Token deleted");
    }
    get getAppleEmail() {
        return `apple${this.email}`;
    }
    get courseCount() {
        return this._courseCount;
    }
    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("Coursecount should be more than 1");
        }
        this._courseCount = courseNum;
    }
}
class SubUser extends User1 {
    isFamilt = true;
    changeCoureCount() {
        this._courseCounts = 4;
    }
}
const mitesh1 = new User1("m@.com", "Mitesh");
