import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// resolve is a function that is called when the promise is resolved


// Use promises instend of callbackes. Promises keep our code more flat.

async function loadPage() {
    try {
        await loadProductsFetch();

        const value = await new Promise((resolve) => {
            loadCart(() => {
                resolve('value3');
            });
        });
    } catch (error) {
        console.log("error", error)
    }
    renderOrderSummary();
    renderPymentSummary();
}
loadPage();

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadProducts(() => {
//             resolve('Products Loaded');
//         });
//     }),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve('Cart Loaded');
//         });
//     })
// ]).then((values) => {
//     console.log(values);
//     renderOrderSummary();
//     renderPymentSummary();
// });

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1');
//     });

// }).then((value) => {
//     console.log("value", value);
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });

// }).then(() => {
//     renderOrderSummary();
//     renderPymentSummary();
// });

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPymentSummary();
//     });
// });