# Request

## XMLHttpRequest

### [Interface XMLHttpRequest](https://xhr.spec.whatwg.org/#xmlhttprequest)

```js
const xhr = new XMLHttpRequest();
```

### onreadystatechange

```js
function onReadyStateChange(evt) {
  const { readyState, status } = evt.target;
  switch (readyState) {
    // cases: 0, 1, 2, 3, 4
    case XMLHttpRequest.UNSENT:
      break;
    case XMLHttpRequest.OPENED:
      break;
    case XMLHttpRequest.HEADERS_RECEIVED:
      break;
    case XMLHttpRequest.LOADING:
      break;
    case XMLHttpRequest.DONE:
      handleStatus(status);
      break;
  }
}

function handleStatus(status) {
  switch (status) {
    case 200:
      break;
  }
}

// xhr.onreadystatechange

xhr.addEventListener(`readystatechange`, onReadyStateChange);
```

### error & timeout

```js
function onError(evt) {
  console.log(evt);
}
function onTimeout(evt) {
  console.log(evt);
}

const handler = {
  error: onError,
  timeout: onTimeout,
};

function addListener(xhr, handler) {
  Object.keys(handler).forEach((key) =>
    xhr.addEventListener(key, handler[key]),
  );
}

addListener(xhr, handler);
```

### request

```js
const method = `POST`;
const url = ``;
xhr.open(method, url);

const name = `Content-Type`;
const value = ``;
xhr.setRequestHeader(name, value);

const mimeType = `text/plain`;
xhr.overrideMimeType(mimeType);

// XMLHttpRequestResponseType
xhr.responseType = ``;

const body = null;
xhr.send(body);
```

### progress & abort

[Examples](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event#Examples)

## Fetch

### [RequestInit](https://fetch.spec.whatwg.org/#requestinit)

```js
const method = `POST`;
const headers = new Headers();
headers.append(`Content-Type`, ``);
const mode = `cors`;
const cache = `default`;

let body = ``;

const init = {
  method,
  headers,
  mode,
  cache,
  body,
};
```

### [Request](https://fetch.spec.whatwg.org/#request)

```js
const url = ``;
const input = new Request(url, init);
```

```js
function onRes(res) {
  return res.json();
}

let p = fetch(input);

p.then(onRes);
```

### abort

```js
const controller = new AbortController();
fetch(input, { ...init, signal: controller.signal });
controller.abort();
```

## Server-sent events
