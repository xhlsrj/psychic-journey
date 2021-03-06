async function fn(resolve = data => data) {
    let data = {};
    if (conditions) {
        let p = new Promise(resolve => {
            setTimeout(fn, 1000, resolve);
        });
        data = await p.then(data => data);
    }
    return resolve(data);
}
