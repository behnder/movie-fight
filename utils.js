const debounce = (callback, delay = 1000) => {
    let timeoutId;

    return (...arg) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, arg);
        }, delay);
    }
}