function toAsyncFunction(func) {
    var _this = this;
    if (func) {
        _this = func;
    }
    
    function handlePromises(iterator) {
        var next = iterator.next();
        var lastDat;
        
        while (!next.done) {
            if (next.value instanceof Promise) {
                next.value
                .then(data => {
                    lastDat = data;
                    next = iterator.next(lastDat);
                })
                .catch(iterator.throw);
            }else {
                next = iterator.next(lastDat);
                lastDat = next.value;
            }
        }
        
        return lastDat;
    }
    
    return (...args) => handlePromises(_this(...args));
}

Object.getPrototypeOf(function*(){}).toAsyncFunction = toAsyncFunction;

const Timeout = (ms = 0) =>  new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    Timeout,
    toAsyncFunction
}