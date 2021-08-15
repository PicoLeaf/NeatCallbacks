### Neat.js

Before:
```js
function* before() {
    console.log("A,");

    setTimeout(() => {
        console.log("B,");
    }, 1000);

    console.log("C.");
}

before();
// would output:
// A, C. B,
```

With Neat.js:

```js
const after = (function* () {
    console.log("A,");

    yield Timeout(1000);

    console.log("B,");
    console.log("C.");

}).toAsyncFunction();

after();
// would output:
// A, B, C.
```

You have to imagine yield like a `await` keyword, just outside of an async function.

For exemple:

```js
// The default way to do it:

const request = new Promise((url) => {
    fetch(url).then()
});

var image;

request("./flower.png").then(data => {
    image = data;
});


// With neat it is much cleaner; 

const request = (function* (url) {
    return yield fetch(url);
}).toAsyncFunction();

const image = request("./flower.png");

// Or using XMLHttpRequest

const request = toAsyncFunction(function* (url, method = "get") {
    var req = new XMLHttpRequest();

    yield new Promise((resolve) => {

        req.open(method, url, true);
        req.send();

        req.onload = () => {
            resolve(req.responseText);
        };
    });

    return req;
});
```

## Installing

`npm i neat.js`

## Usage

As you might have noticed earlier, I have used a helper function called `Timeout`.

For now there is only one helper function, which pause the function for a set amount of miliseconds.

#### Exemple:

```js
const timer = toAsyncFunction(function* (Seconds = 0) {
    console.log("Timer started");
    yield Timeout(Seconds * 1000);
    console.log("Time's up!");
});

timer(3);
```

### License

MIT