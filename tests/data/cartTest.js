import { cart, addToCart, loadFromStorage, removeFromCart} from "../../data/cart.js";

describe('Test suite:add to cart',()=>{
      const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      beforeEach(()=>{
            spyOn(localStorage,'setItem');
            
      })

      it('adds an existing product to the cart',()=>{
            
          
            spyOn(localStorage,'getItem').and.callFake(()=>{
                  return JSON.stringify([{
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }]);
            });
            
            loadFromStorage();
            addToCart(productId1);
            expect(cart.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
                  [
                        {
                              productId: productId1,
                              quantity:2,
                              deliveryOptionId:'1'    
                        }
                  ]
            ));
            expect(cart[0].productId).toEqual(productId1);
            expect(cart[0].quantity).toEqual(2);
           




      });

      it('add a new product to the cart',()=>{
            

            spyOn(localStorage,'getItem').and.callFake(()=>{
                  return JSON.stringify([]);
            });

            
            loadFromStorage();

            addToCart(productId1);
            expect(cart.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
                  [
                        {
                              productId: productId1,
                              quantity:1,
                              deliveryOptionId:'1'    
                        }
                  ]
            ));
            expect(cart[0].productId).toEqual(productId1);
            expect(cart[0].quantity).toEqual(1);
      });


      

});

describe('new suite: remove item from cart',()=>{


      const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
      beforeEach(()=>{
            spyOn(localStorage,'setItem');
            
      })
      
      it('remove a product in the cart',()=>{
            spyOn(localStorage,'getItem').and.callFake(()=>{
                  return JSON.stringify([{
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }]);
            });
            
            loadFromStorage();
            removeFromCart(productId1);
            expect(cart.length).toEqual(0);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
                  [                  ]
            ));
           

      })

      it('remove a product not in the cart',()=>{
            spyOn(localStorage,'getItem').and.callFake(()=>{
                  return JSON.stringify([{
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }]);
            });
            
            loadFromStorage();
            removeFromCart('item-not-in-cart');
            expect(cart.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(
                  [         {
                        productId: productId1,
                        quantity:1,
                        deliveryOptionId:'1'
                  }         ]
            ));
            expect(cart[0].productId).toEqual(productId1);
            expect(cart[0].quantity).toEqual(1);

      })
})