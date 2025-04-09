import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js'
import { renderPymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {

  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionsId = cartItem?.deliveryOptionsId;

    const deliveryOption = getDeliveryOption(deliveryOptionsId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption?.deliveryDays, 'day').format('dddd, MMMM D');

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${deliveryDate}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
              ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <select id="options" class="js-order-option" name="options">
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </select>
            </div>
          </div>
        </div>
        `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOptions) => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOptions.deliveryDays, 'day').format('dddd, MMMM D');

      const priceString = deliveryOptions.priceCents === 0 ? 'FREE Shipping' : `$${(deliveryOptions.priceCents / 100)} - Shipping Charge`;

      const isChecked = deliveryOptions.id === cartItem.deliveryOptionsId;

      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-options-id="${deliveryOptions.id}">
        <input type="radio" ${isChecked ? 'checked' : null} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>
      `
    })
    deliveryOptions.forEach((deliveryOptions) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOptions.deliveryDays, 'day').format('dddd, MMMM D');
      const priceString = deliveryOptions.priceCents === 0 ? 'FREE Shipping' : `$${(deliveryOptions.priceCents / 100)} - Shipping Charge`;

      html += `
      <div class="js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-options-id="${deliveryOptions.id}">
        <option value="${deliveryOptions.id}"  name="delivery-option-${matchingProduct.id}"> ${deliveryOptions.deliveryDays} days - ${priceString}</option > 
      </div>  `
    })

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderPymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionsId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionsId);
      renderOrderSummary();
      renderPymentSummary();
    })
  })

}