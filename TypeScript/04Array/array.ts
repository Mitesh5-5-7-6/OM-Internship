const superHerros: string[] = []
const heroPower: Array<number>[] = []

superHerros.push("spiderman")
heroPower.push([2])

type User = {
    name: string,
    isActive: boolean
}
const allUsers: User[] = []
allUsers.push({ name: "Mitesh", isActive: true })


const MLModels: number[][] = [
    [255, 255, 255], []
]


let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];

let numbers1: Array<number> = [1, 2, 3];
let names1: Array<string> = ["Alice", "Bob"];

//  2. Array of Objects
type User1 = {
    id: number;
    name: string;
};
let users: User1[] = [
    { id: 1, name: "Alex" },
    { id: 2, name: "Jamie" },
];
console.log(users)


let number: number[] = [1, 2, 3];

number.map((n) => n * 2); // inferred as number
number.push(4); // ✅ ok
// number.push("hi"); // ❌ error


//  6. Readonly Arrays
let readonlyNums: readonly number[] = [1, 2, 3];
// readonlyNums.push(4); // ❌ Error: Property 'push' does not exist


// 7. Generics with Arrays
function getFirst<T>(arr: T[]): T {
    return arr[0];
}
const first = getFirst<string>(["a", "b", "c"]); // "a"


// 8. Filtering and Type Narrowing
let items: (number | string)[] = [1, "two", 3];

const onlyNumbers = items.filter(
    (item): item is number => typeof item === "number"
); // Type: number[]


// 9. Optional Elements in Tuple
let data: [string, number?] = ["value"]; // second value is optional


// Array of union types
let arr1: (number | string)[] = [1, "two"]; // ✅ Mixed values allowed

// Union of arrays
let arr2: number[] | string[] = [1, 2, 3]; // ✅ OR ["a", "b"]

export { }