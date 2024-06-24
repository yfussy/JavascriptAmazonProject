import formatCurrency from "../scripts/utils/money.js";

console.log('Test Suite: formateCurrency')

console.log('converts -> dollars')
if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('converts 0');
if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('round up');
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('failed');
}

console.log('round down')
if (formatCurrency(2000.4) === '20.00') {
    console.log('passed');
} else {
    console.log('failed');
}