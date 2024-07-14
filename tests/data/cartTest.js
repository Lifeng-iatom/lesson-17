import { cart } from "../../data/cart-class.js";

describe('Test suite:add to cart',()=>{

      const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      beforeEach(()=>{
            spyOn(localStorage,'setItem');
            
      })

      it('adds an existing product to the cart',()=>{
            
          
          cart.cartItems = [{
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }]
            
            
        
            cart.addToCart(productId1);
            expect(cart.cartItems.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify(
                  [
                        {
                              productId: productId1,
                              quantity:2,
                              deliveryOptionId:'1'    
                        }
                  ]
            ));
            expect(cart.cartItems[0].productId).toEqual(productId1);
            expect(cart.cartItems[0].quantity).toEqual(2);
           




      });

      it('add a new product to the cart',()=>{
            

          cart.cartItems = [];
            
         

            cart.addToCart(productId1);
            expect(cart.cartItems.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify(
                  [
                        {
                              productId: productId1,
                              quantity:1,
                              deliveryOptionId:'1'    
                        }
                  ]
            ));
            expect(cart.cartItems[0].productId).toEqual(productId1);
            expect(cart.cartItems[0].quantity).toEqual(1);
      });


});


describe('new suite: remove item from cart',()=>{


      const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      beforeEach(()=>{
            spyOn(localStorage,'setItem');
            
      })
      
      it('remove a product in the cart',()=>{
            cart.cartItems =[
            {
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }];
            
            
           
            cart.removeFromCart(productId1);
            expect(cart.cartItems.length).toEqual(0);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify(
                  [                  ]
            ));
           

      })

      it('remove a product not in the cart',()=>{
            cart.cartItems = [  {
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }]
          
            
          
            cart.removeFromCart('item-not-in-cart');
            expect(cart.cartItems.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify(
                  [         {
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }         ]
            ));
            expect(cart.cartItems[0].productId).toEqual(productId1);
            expect(cart.cartItems[0].quantity).toEqual(1);

      })
});


describe('new suite: update delivery option in cart',()=>{


      const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      beforeEach(()=>{
            spyOn(localStorage,'setItem');
            
      })
      it('cart item check',()=>{
            cart.cartItems = [{
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }]
            
            
            cart.updateDeliveryOption(productId1,'3');

            expect(cart.cartItems.length).toEqual(1);
            expect(cart.cartItems[0].productId).toEqual(productId1);
            expect(cart.cartItems[0].quantity).toEqual(1);
            expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',JSON.stringify(
                  [         {
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'3'
                  }         ]
            ));

      })

      it('update delivery option that product not in cart',()=>{
            cart.cartItems = [{
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }];
            
            cart.updateDeliveryOption('item-not-in-cart','3');

            expect(cart.cartItems.length).toEqual(1);
            expect(cart.cartItems[0].productId).toEqual(productId1);
            expect(cart.cartItems[0].quantity).toEqual(1);
            expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
            expect(localStorage.setItem).toHaveBeenCalledTimes(0);
           

      })

      it('update delivery option is not in Deliveryoptions',()=>{
           cart.cartItems = [{
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }]
            
            cart.updateDeliveryOption(productId1,'4');

            expect(cart.cartItems.length).toEqual(1);
            expect(cart.cartItems[0].productId).toEqual(productId1);
            expect(cart.cartItems[0].quantity).toEqual(1);
            expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
            expect(localStorage.setItem).toHaveBeenCalledTimes(0);
           

      })

});