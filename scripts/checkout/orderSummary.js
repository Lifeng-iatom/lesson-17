import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";  
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js' 
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from  '../../data/deliveryOption.js'
import { rendorPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";







const today = dayjs();



const deliveryDate=today.add(7,'days');
deliveryDate.format('dddd, MMMM D')

export function renderOrderSummary(){

let cartSummaryHTML='';


// updateCartQuantity();

cart.forEach((cartItem)=>{

      const productId = cartItem.productId;
      const matchingProduct = getProduct(productId);

      const deliveryOptionId =cartItem.deliveryOptionId;

      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const dateString = calculateDeliveryDate(deliveryOption);
      
      cartSummaryHTML +=`
            <div class="cart-item-container  js-cart-item-container
            js-cart-item-container-${matchingProduct.id}">  
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                  ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id} ">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options  ">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

               ${deliveryOptionsHTML(matchingProduct,cartItem)}
                
              
              </div>
            </div>
          </div>
      `;

} );

function deliveryOptionsHTML(matchingProduct, cartItem){
let html =''

  deliveryOptions.forEach((deliveryOption)=>{
      
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceStrings = deliveryOption.priceCents === 0
       ? 'FREE'
      :  `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=  `
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}"
        >
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                      name="delivery-option-${matchingProduct.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceStrings} Shipping
                    </div>
        </div>
        </div>
        `
  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-update-quantity-link')
.forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');

    })
})

document.querySelectorAll('.js-save-quantity-link')
.forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId =link.dataset.productId;
       
        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(quantityInput.value);
        if(newQuantity<0 || newQuantity>1000){
          alert('wrong number');
          return;
        }
        updateQuantity(productId,newQuantity);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity;
        //updateCartQuantity();
        renderCheckoutHeader();
        rendorPaymentSummary();
        
    })
})

document.querySelectorAll('.js-delete-link')

.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    removeFromCart(productId);
    renderOrderSummary();  
    renderCheckoutHeader();
       
    rendorPaymentSummary();
    //updateCartQuantity();
  });
})

/*
 function updateCartQuantity(){
      const cartQuantity=calculateCartQuantity();

      if(cartQuantity>1){
            document.querySelector('.js-return-to-home-link').innerHTML =`${cartQuantity} items`;
            }else{
              document.querySelector('.js-return-to-home-link').innerHTML =`${cartQuantity} item`;
            }
  }
            */

document.querySelectorAll('.js-delivery-option')
.forEach((element)=>{

  element.addEventListener('click',()=>{

    const {productId,deliveryOptionId}= element.dataset;

    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary();
    rendorPaymentSummary();
  })
})


}

