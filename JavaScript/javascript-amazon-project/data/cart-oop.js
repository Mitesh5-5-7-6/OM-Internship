// Easy to create a multiple objects with the same structure or blueprint

function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        // Function inside an object = method
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems) {
                this.cartItems = [{
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionsId: "1"
                }, {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionsId: "2"
                }];
            }
        },
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        addToCart(productId) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            if (matchingItem) {
                matchingItem.quantity += 1;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionsId: '1'
                })
            }
            this.saveToStorage();
        },
        removeFromCart(productId) {
            const newCart = [];
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId != productId) {
                    newCart.push(cartItem);
                }
            });

            this.cartItems = newCart;
            this.saveToStorage();
        },
        updateDeliveryOption(productId, deliveryOptionsId) {
            let matchingItem;

            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.deliveryOptionsId = deliveryOptionsId;

            this.saveToStorage();
        }
    };
    return cart;
}

const cart = Cart('cart-oop');
const bussinessCart = Cart('bussiness-cart-oop');


cart.loadFromStorage();
bussinessCart.loadFromStorage();