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
async function fn() {
  for (let i = 0; i < arr.length; i++) {
    let e = arr[i];
    let p = new Promise((resolve) => {
      setTimeout(resolve, e, e);
    });
    console.log(`as you see`);
    await p.then(console.log);
  }
}

fn();

// as you see
// 3000
// as you see
// 1000
