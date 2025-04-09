function name1() {
    var name = "Mitesh"
    function name2() {
        console.log("name2", name)
        function name3() {
            console.log("name3", name)
        }
        name3()
    }
    name2()
}
name1()


function a() {
    var x = 4;
    function b() {
        console.log(x)
        // console.log(y) show ReferenceError because y value is not define but use this.y or window.y then not show error but show undefine
        function c() {
            var y = 5;
            console.log(x)
        }
        c();
    }
    b();
}
a();

// rest parameter only asign in last parameter like b not asign in a (...a,b) this are wrong
function test(a, ...b) {
    console.log(a)
    console.log(b)
}
test(1, 2, 3, 4)


const users =
{
    name: "Mitesh",
    age: 22
}

function userCredintial({ name, age }) {
    console.log(name)
    console.log(age)
}
userCredintial(users)


// Callback function : second function pass as a argument in first function is called callback function
function second(name) {
    console.log(name)
}
function first(names) {
    names('Alex')
}
first(second)


const perosn1 = new Set(['1', '2', '3']);
perosn1.add('4') //  add in last index
console.log(perosn1)
perosn1.delete('3') // remove pacific element
console.log(perosn1)
perosn1.has('2') //  chack value are existet or not
console.log(perosn1)
perosn1.clear() // clear all data
console.log(perosn1)

const person = new Map();
person.get() // get a data
console.log(person)
person.set('name', "mitesh") // set a data
console.log(person)
// delete, has, clear or keys