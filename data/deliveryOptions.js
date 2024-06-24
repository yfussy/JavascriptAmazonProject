import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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
}];

export function getDeliveryOptionId (deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach(option => {
        if (option.id === deliveryOptionId) {
        deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function calDeliveryDate(deliveryOption) {
    let {deliveryDays} = deliveryOption;
    let deliveryDate = dayjs();
    
    while (deliveryDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        if (isWeekend(deliveryDate)) {          
            continue;
        }
        deliveryDays--;
    }

    return deliveryDate.format('dddd, MMMM D');
}

export function isWeekend(date) {
    const day = date.format('dddd');
    return day === 'Saturday' || day === 'Sunday'
}