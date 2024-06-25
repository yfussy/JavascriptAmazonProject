import { cart } from "../../data/cart-class.js";

describe('Test Suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to the cart', () => {
        cart.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }];

        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', 
            JSON.stringify(
                [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
        }]));
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);

    });

    it('adds a new product to the cart', () => {
        cart.cartItems = [];

        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.cartItems.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', 
            JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
        }]));

        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(1);
    });
});

describe('Test Suite: removeFromCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        cart.cartItems = [{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: '1'
        }];
    });

    it('remove a productId that is in the cart', () =>{
        cart.removeFromCart(productId1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', 
            JSON.stringify([]));

        expect(cart.cartItems.length).toEqual(0);
    });

    it('remove a productId that is "not" in the cart', () =>{
        cart.removeFromCart(productId2);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', 
            JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }]));

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(1);
    });
    
    
});

describe('Test Suite: updateDeliveryOption', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        cart.cartItems = [{
            productId: productId1,
            quantity: 1,
            deliveryOptionId: '1'
        }];
    });

    it('update delivery option', () =>{
        cart.updateDeliveryOption(productId1, '3');

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', 
            JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '3'
            }]));

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    });

    it('does not update delivery option for a non-existing product in the cart', () =>{
        cart.updateDeliveryOption(productId2, '3');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    });

    it('does not update delivery option for a non-existing deliveryOptionId', () => {
        cart.updateDeliveryOption(productId1, '4');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].quantity).toEqual(1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    });
});