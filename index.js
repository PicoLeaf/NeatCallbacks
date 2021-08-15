/**
 * 
 * @param {*} func 
 * @returns 
 * @author @PicoLeaf
 */
function toAsyncFunction(func) {
    var _this = this;
    if (func) {
        _this = func;
    }

    function handlePromises(iterator, value) {
        var next;
        if (value) next = iterator.next(value);
        else next = iterator.next();

        if (!next.done && next.value instanceof Promise) {
            next.value
                .then(data => handlePromises(iterator, data))
                .catch(iterator.throw);
        }
    }

    return (...args) => handlePromises(_this(...args));
}

Object.getPrototypeOf(function*(){}).toAsyncFunction = toAsyncFunction;

const Timeout = (ms = 0) =>  new Promise(resolve => setTimeout(resolve, ms));