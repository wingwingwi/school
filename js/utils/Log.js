module.exports = {
    m(msg) {
        if (msg != undefined) {
            if (__DEV__) console.log(msg);
        }
    },
    e(msg) {
        if (msg != undefined) {
            if (__DEV__) console.error(msg);
        }
    },
    d(msg) {
        if (msg != undefined) {
           if(__DEV__) console.debug(msg);
        }
    }
}