export class Order {
    orderLists;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.orderLists = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }
    
    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orderLists));
    }

    addOrder(order) {
        this.orderLists.unshift(order);
        this.saveToStorage();
    }    

    getOrder(orderId) {
        let matchingOrder;
    
        this.orderLists.forEach(order => {
            if (order.id === orderId) {
                matchingOrder = order;
            }
        });
    
        return matchingOrder;
    }
}

export const orders = new Order('orders-oop');