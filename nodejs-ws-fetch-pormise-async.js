const data = {
    SQLcounter: 0,
    sendMsgCounter: 0,
    retryDelay: 10000,
    timeout: 35000,
    signInTimeoutID: -1,
    taskTimeoutID: -1
};
data.messages = {
    m1: {},
    m2: {}
};
const getTimeString = () => {
    const now = new Date();
    let timeArr = [
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
    ];
    timeArr = timeArr.map((v) => {
        return v.toString().padStart(2, `0`);
    });
    // yyyy-MM-dd HH:mm:ss
    const timeString = `${timeArr[0]}-${timeArr[1]}-${timeArr[2]} ${timeArr[3]}:${timeArr[4]}:${timeArr[5]}`;
    return timeString;
};

const W3CWebSocket = require('websocket').w3cwebsocket;
function buildWebSocketConnection() {
    return new Promise((resolve, reject) => {
        const ws = new W3CWebSocket('ws://ip:port');
        ws.onopen = (e) => {
            data.ws = ws;
            resolve(`WebSocket connected`);
        };
        ws.onerror = (e) => {
            reject(e);
        };
        ws.onclose = () => {
            clearTimeout(signInTimeoutID);
            clearTimeout(taskTimeoutID);
            console.warn('WebSocket closed');
            setTimeout(init, data.retryDelay);
        };
    });
}
function sendMsg(msg) {
    return new Promise((resolve, reject) => {
        data.ws.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg) {
                resolve();
            } else {
                reject();
            }
        };

        data.ws.send(msg);
        setTimeout(() => {
            reject(`ws response timeout`);
        }, data.timeout);
    });
}

const fetch = require('node-fetch');
async function getInfo() {
    try {
        let url = `http://ip:port/path?queryString`;
        const res = await fetch(url);
        data.info = JSON.parse(await res.text());
    } catch (err) {
        return await Promise.reject(err.errno);
    }
}

const sql = require('mssql');
const config = {
    user: 'sa',
    password: 'pw',
    server: 'ip', // You can use 'localhost\\instance' to connect to named instance
    database: 'db'
};
async function getData() {
    try {
        const pool = await sql.connect(config);
        // let result = await pool.request().query(`query`);
        const q = `query`;
        const result = await pool.request().query(q);
        console.log(result);
    } catch (err) {
        console.error(err);
        return await Promise.reject();
    } finally {
        sql.close();
    }
}

async function init() {
    try {
        await buildWebSocketConnection().then(e => console.log(e));
        signIn();
    } catch (e) {
        console.error(`${e}`);
    }
}
async function signIn() {
    try {
        await getInfo();
        const msg = ``;
        await sendMsg(msg);
        getReady();
    } catch (e) {
        console.warn(e);
        if (data.ws.readyState === 1) {
            data.signInTimeoutID = setTimeout(signIn, data.retryDelay);
        }
    }
}
function getReady() {
    const mm = new Date().getMinutes();
    if (mm !== 0) {
        if (data.ws.readyState === 1) {
            data.taskTimeoutID = setTimeout(start, (61 - mm) * 60000);
        }
    } else {
        start();
    }
}
async function start() {
    try {
        await getCurrentTemperature();
        data.SQLcounter = 0;
        tasks();
        interval();
    } catch (e) {
        data.SQLcounter++;
        if (data.SQLcounter < 5) {
            if (data.ws.readyState === 1) {
                data.taskTimeoutID = setTimeout(start, data.retryDelay);
            } else {
                data.SQLcounter = 0;
            }
        } else {
            data.SQLcounter = 0;
            interval();
        }
    }
}
async function tasks() {
    await execute(data.messages.m1);
    await execute(data.messages.m2);
}
async function execute(msg) {
    try {
        await sendMsg(msg);
    } catch (e) {
        console.error(e);
        data.sendMsgCounter++;
        if (data.sendMsgCounter < 5) {
            if (data.ws.readyState === 1) {
                return execute(cmd);
            } else {
                data.sendMsgCounter = 0;
            }
        } else {
            data.sendMsgCounter = 0;
        }
    }
}
function interval() {
    const mm = new Date().getMinutes();
    if (data.ws.readyState === 1) {
        data.taskTimeoutID = setTimeout(start, (61 - mm) * 60000);
    }
}

init();
