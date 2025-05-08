const score = [];
const names = [];
function identityOne(val) {
    return val;
}
function identityTwo(val) {
    return val;
}
function identityThree(val) {
    return val;
}
identityThree(3);
identityThree("3");
identityThree(true);
function identityFoure(val) {
    return val;
}
identityFoure({ brand: "dd", type: 3 });
function getSearchProducts(products) {
    const myIndex = 3;
    return products[myIndex];
}
const getMoreSearchProducts = (products) => {
    const myIndex = 4;
    return products[myIndex];
};
function anotherFunction(valOne, valTwo) {
    return {
        valOne,
        valTwo
    };
}
anotherFunction(3, '4');
function anotherFunction1(valOne, valTwo) {
    return {
        valOne,
        valTwo
    };
}
anotherFunction1(3, 3.4);
function anotherFunction2(valOne, valTwo) {
    return {
        valOne,
        valTwo
    };
}
anotherFunction2(3, { brand: "dd", type: 3 });
class Sellable {
    cart = [];
    addToCart(products) {
        this.cart.push(products);
    }
}
