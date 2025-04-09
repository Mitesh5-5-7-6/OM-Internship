// const person = {
//     personName: "Mitesh",
//     personAge: 22,

//     name: function () {
//         console.log(`my name is ${this.personName}`)
//     },
//     age: function () {
//         console.log(`my age is ${this.personAge}`)
//     }
// }

// person.name()
// person.age()

var pName = "Mitesh"

var person1 = {
    personName: "Mitesh",
    personAge: 22,

    pNames: function () {
        console.log(`my p name is ${this.pName}`) // undefine
        console.log(`my p name is ${window.pName}`) // Mitesh
    },

    name: function () {
        console.log(`my name is ${this.personName}`)
    },
    age: function () {
        console.log(`my age is ${this.personAge}`)
    }
}

person1.pNames()
person1.name()
person1.age()

function abc() {
    this.name = "Mitesh",
        this.age = 23
}
const abcd = new abc();
console.log(abcd.prototype)