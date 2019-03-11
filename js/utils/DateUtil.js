module.exports = {
  getDateTime(date) {
    //转换时间
    let regEx = new RegExp("\\-", "gi");
    let validDateStr = date.replace(regEx, "/");
    let milliseconds = Date.parse(validDateStr);
    var sendTime = new Date(milliseconds);
    return sendTime;
  }
};
