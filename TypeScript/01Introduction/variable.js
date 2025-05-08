"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greetings = "Hello Mitesh";
// this are not allowed because this variable are string and you assign number.
// greetings = 6 
greetings.toLowerCase();
console.log(greetings);
// Number
var userId = 33445566;
// This are valid number are allwoed int and float values
userId = 33.45;
// boolean
var isLoggedIn = false;
// any
// This are not good practice
// TypeScript also has a special type any, that you can use whenever you don't want a particular value to cause typechecking errors.
// You usually want to avoid this, though, because any isn't type-checked. Use the compiler flag noImplicitAny. to flag any implicit any as an error.
var hero;
function getHero() {
    return 'throw';
}
hero = getHero();
// add Types in function
function addTwo(num) {
    return num + 2;
}
// addTwo("ew") // this are not allowed
addTwo(5);
function getUpper(val) {
    return val.toUpperCase();
}
getUpper("Mitesh");
function signUpUser(id, email, isPaid) {
}
signUpUser(1, "mitesh@gmail.com", false);
// arrow function
var loginUser = function (id, email, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
};
loginUser(1, "mitesh");
function addOne(num) {
    // return num + 2;
    return "Aad"; // This are allwod return string
}
addOne(3);
// This method call implecit type
function addOne1(num) {
    return num + 2;
    // return "Aad"    Type 'string' is not assignable to type 'number'.
}
addOne1(3);
var getHello = function (s) {
    return "";
};
var heros = ["thor", "sipderman", "ironman"];
// const heros = [1, 2, 3, 4]
heros.map(function (hero) {
    return "hero is ".concat(hero);
});
