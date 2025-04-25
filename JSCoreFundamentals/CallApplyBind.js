let name1 = {
    firtname: 'Mitesh',
    lastname: "Sonagra",
}

let printFullName = function (hometown, state, country) {
    console.log(this.firstname + " " + this.lastname + " from " + hometown + " " + state + " " + country)
}

printFullName.call(name1, 'Nadiad', "Gujarat")

let name2 = {
    firstname: "Jay",
    lastname: "Patel"
}

// function borrowing
printFullName.call(name2, 'Nadiad', "Gujarat")

// apply same as a call method only difference is second parameter is pass in array list
printFullName.apply(name2, ['Nadiad', "Gujarat"]);


// bind method don't invoce a direct a function it's copy of function then write invoce function

// bind method - it's create a copy of printFullName and bind name2 object return.
//  after invoce a function( means call a function )
let printMyName = printFullName.bind(name2, "Mumbai", "Maharashtra");
console.log(printMyName);
printMyName();


// Polyfill for bind method
Function.prototype.mybind = function (...args) {
    let obj = this,
        params = args.slice(1);
    console.log("obj", obj) // print -> printFullName function
    console.log("args", args)
    // args (3) [{…}, 'Dehraddddddun', 'Uttarakhand'] 
    // 0: {firstname: 'Jay', lastname: 'Patel'}
    // 1: "Dehraddddddun"
    // 2: "Uttarakhand"
    console.log("params", params) // params (2) ['Dehraddddddun', 'Uttarakhand']
    return function (...args2) {
        obj.apply(args[0], [...params, ...args2]);
    }
}

let printMyName2 = printFullName.mybind(name2, "Dehraddddddun", "Uttarakhand");
printMyName2("India");