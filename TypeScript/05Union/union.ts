// you can make two type in combine

let score: number | string = 33;
score = 34
score = "Mitesh"
// score = true  // given error because boolean are not difine

type User = {
    name: string
    id: number
}
type Admin = {
    username: string;
    id: number
}

let mitesh: User | Admin = { name: "Mitesh", id: 334 }
mitesh = { username: "sd", id: 334 } // make a admin

// in function
function getDbId(id: number | string) { // define id string or number

    // Union work in both type valid
    // id.toLowerCase()  // this are not valid beacuse id is not string 

    if (typeof id === "string") {
        id.toLowerCase();
    }
}



// array

const data: number[] = [1, 2, 3]
const data1: string[] = ["1", "2", "3"]

const data2: string[] | number[] = ["1", "2", "3"] // use only string or number value [1,2,3]

const data3: (string | number | boolean)[] = [1, "2", true] // use mix of string, number and boolen


let seatAllotment: "left" | "middle" | "window"
// seatAllotment = "right" // given error becuase "right" are not difine in