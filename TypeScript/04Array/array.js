"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var superHerros = [];
var heroPower = [];
superHerros.push("spiderman");
heroPower.push([2]);
var allUsers = [];
allUsers.push({ name: "Mitesh", isActive: true });
var MLModels = [
    [255, 255, 255], []
];
var numbers = [1, 2, 3];
var names = ["Alice", "Bob"];
var numbers1 = [1, 2, 3];
var names1 = ["Alice", "Bob"];
var users = [
    { id: 1, name: "Alex" },
    { id: 2, name: "Jamie" },
];
console.log(users);
var number = [1, 2, 3];
number.map(function (n) { return n * 2; }); // inferred as number
number.push(4); // ✅ ok
// number.push("hi"); // ❌ error
//  6. Readonly Arrays
var readonlyNums = [1, 2, 3];
// readonlyNums.push(4); // ❌ Error: Property 'push' does not exist
// 7. Generics with Arrays
function getFirst(arr) {
    return arr[0];
}
var first = getFirst(["a", "b", "c"]); // "a"
// 8. Filtering and Type Narrowing
var items = [1, "two", 3];
var onlyNumbers = items.filter(function (item) { return typeof item === "number"; }); // Type: number[]
// 9. Optional Elements in Tuple
var data = ["value"]; // second value is optional
// Array of union types
var arr1 = [1, "two"]; // ✅ Mixed values allowed
// Union of arrays
var arr2 = [1, 2, 3]; // ✅ OR ["a", "b"]
