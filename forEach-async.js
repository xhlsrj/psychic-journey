let arr = [3000, 1000];
arr.forEach(async (e) => {
    let p = new Promise((resolve) => {
        setTimeout(resolve, e, e);
    });
    console.log(`as you see`);
    await p.then(console.log);
});

// as you see
// as you see
// 1000
// 3000

// use for
