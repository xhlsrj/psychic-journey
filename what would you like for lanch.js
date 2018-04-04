let menu = [
    {
        name: 'pizza',
        rate: 4
    }, {
        name: 'hamburg',
        rate: 3
    }, {
        name: 'sandwich',
        rate: 3
    }, {
        name: 'others',
        rate: 2
    }
];

menu = menu.sort((a, b) => b.rate - a.rate);

let sum = 0;
menu.forEach(v => sum += v.rate);

let order = [];
for (let i = 0; i < sum; i++) {
    order[i] = { No: i };
}

let arr = [];
menu.forEach((v, i) => {
    let rate = v.rate;
    let offset = order.length % rate;
    let step = (order.length - offset) / rate;

    let spliceArr = Array(rate - 1).fill(step);
    for (let i = 0; i < offset; i++) {
        spliceArr[i] += 1;
    }
    for (let i = 1; i < spliceArr.length; i++) {
        spliceArr[i] = spliceArr[i - 1] + spliceArr[i];
    }
    spliceArr.unshift(0);
    for (let i = 0; i < spliceArr.length; i++) {
        let obj = order.splice(spliceArr[i], 1, null)[0];
        obj.name = v.name;
        arr.push(obj);
    }
    order = order.filter(v => v !== null);
});

arr.sort((a, b) => a.No - b.No);

console.log(arr);
