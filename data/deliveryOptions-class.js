import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

class Delivery {
    deliveryLists;

    constructor(deliveryOptions) {
        this.deliveryLists = deliveryOptions;
    }

    getDeliveryOptionId (deliveryOptionId) {
        let deliveryOption;
    
        this.deliveryLists.forEach(option => {
            if (option.id === deliveryOptionId) {
            deliveryOption = option;
            }
        });
    
        return deliveryOption || this[0];
    }

    validDeliveryOption(deliveryOptionId) {
        let exist = false;
    
        this.deliveryLists.forEach(option => {
            if (option.id === deliveryOptionId) {
                exist = true;
            }
        });
    
        return exist;
    }

    isWeekend(date) {
        const day = date.format('dddd');
        return day === 'Saturday' || day === 'Sunday';
    }

    calDeliveryDate(deliveryOption) {
        let {deliveryDays} = deliveryOption;
        let deliveryDate = dayjs();
        
        while (deliveryDays > 0) {
            deliveryDate = deliveryDate.add(1, 'day');
            if (this.isWeekend(deliveryDate)) {          
                continue;
            }
            deliveryDays--;
        }
    
        return deliveryDate.format('dddd, MMMM D');
    }


}

export const deliveryOptions = new Delivery([{
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
}]);

console.log(deliveryOptions);