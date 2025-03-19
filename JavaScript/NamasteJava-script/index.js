var x = 7;

function getName() {
    console.log("Namaste javascript");
}

getName();
console.log(x)
console.log(getName);

// var x = 1;
// a();
// b();

// function a() {
//     var x = 10;
//     console.log(x);
// }

// function b() {
//     var x = 100;
//     console.log(x);
// }

// console.log(abc);
var abc = 10;
console.log(abc);

if (abc === undefined) {
    console.log("abc is undefined")
} else {
    console.log("abc is not undefined")
}

var aq;
console.log(aq);
aq = 10;
console.log(aq);
aq = "maiw";
console.log(aq);

// console.log("A", aaa);
// console.log("b", abcc);
// console.log("c", cicw);
let aaa = 10;
var abcc = 100;
const cicw = 120;

{
    var a = 10;
    let b = 20;
    const c = 30;
    console.log(a);
    console.log(b);
    console.log(c);
}
console.log(a);
console.log(b);
console.log(c);