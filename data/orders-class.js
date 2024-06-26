class Order {
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
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orders));
    }

    getOrder(orderId) {
        let matchingOrder;
    
        this.orders.forEach(order => {
            if (order.id === orderId) {
                matchingOrder = order;
            }
        });
    
        return matchingOrder;
    }
}

export const orders = new Order('orders-oop');