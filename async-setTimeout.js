async function fn(resolve = () => { }) {
    if (conditions) {
        return resolve();
    }
    let p = new Promise((resolve) => {
        setTimeout(fn, 1000, resolve);
    });
    await p.then(() => { });
    resolve();
}
