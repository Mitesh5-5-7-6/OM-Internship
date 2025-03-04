export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}]
// export const deliveryOptions = [{
//     id: '1',
//     deliveryDays: [
//         {
//             dDays: 7,
//             dPrice: 0
//         },
//         {
//             dDays: 3,
//             dPrice: 499
//         },
//         {
//             dDays: 1,
//             dPrice: 999
//         }
//     ],
//     priceCents: 0
// }]

export function getDeliveryOption(deliveeryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveeryOptionId) {
            deliveryOption = option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}