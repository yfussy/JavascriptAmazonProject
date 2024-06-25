import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
    try {
        // throw 'error1'

        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            // throw 'error2'
            loadCart(() => {
                // reject('error3');
                resolve('value');
            });
        });

    } catch (error) {
        console.log('Unexpected error. Please try again later.');
        console.log(error);
    }
    

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();