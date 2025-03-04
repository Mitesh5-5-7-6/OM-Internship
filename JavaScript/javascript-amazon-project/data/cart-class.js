// class = design object generator
// class = blueprint for objects

// Easy to create a multiple objects with the same structure or blueprint

// classes have extra features for object-oriented programming (OOP)

// class = better way to generate objects in object-oriented programming
// make private property then use # = it can only be accessed inside the class

class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

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
    };

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

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
    };

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId != productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;
        this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionsId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionsId = deliveryOptionsId;

        this.saveToStorage();
    };

}

const cart = new Cart('cart-oop');
const bussinessCart = new Cart('cart-business-oop');

console.log(bussinessCart instanceof Cart);