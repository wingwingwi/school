module.exports = {
    m(msg) {
        if (msg != undefined) {
            console.log(msg);
        }
    },
    e(msg) {
        if (msg != undefined) {
            console.error(msg);
        }
    },
    d(msg) {
        if (msg != undefined) {
            console.debug(msg);
        }
    }
}