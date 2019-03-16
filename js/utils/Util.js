/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
import Dimensions from "Dimensions";
import React, {
    PixelRatio,
    Alert,
    ToastAndroid,
    NativeModules,
    AsyncStorage,
    Platform
} from "react-native";
import {Toast, Portal} from "@ant-design/react-native";
import Log from "./Log.js";
import {_token} from '../constant/Constants';
import {getDateTime} from "./DateUtil";
import {save, getValue} from "./FileUtil";


module.exports = {
    /*最小线宽*/
    pixel: 1 / PixelRatio.get(),
    isIos: Platform.OS == "ios",
    /*屏幕尺寸*/
    size: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    /**得到整数*/
    getInt(distance) {
        if (distance != "" && distance != undefined) {
            try {
                return parseInt(distance);
            } catch (error) {
                return 0;
            }
        }
        return -1;
    },
    /**快速弹出*/
    showMsg(msg, type, defaultMsg) {
        if (msg != undefined && msg != "") {
            Log.m("msg:" + msg);
            if (type == undefined)
            //普通提示
                return Toast.show(msg, 1.5);
            else if (type == 1) {
                //成功提示
                return Toast.success(msg, 2);
            } else if (type == 2) {
                //失败提示
                return Toast.fail(msg, 2);
            } else if (type == 3) {
                //loading提示，需要主动关闭
                return Toast.loading(msg, 0);
            }
        } else if (type != undefined) {
            Portal.remove(type)
            if (defaultMsg)
                Toast.show(defaultMsg, 1.5);
        }
    },

    /**得到分数*/
    getStore(num) {
        if (num == undefined) return "";
        var n = "" + num;
        if (n.length == 1) {
            return n + ".0";
        }
        return n;
    },
    /**计算百分比*/
    getPercent(num, total) {
        var store = 0;
        if (num !== undefined && total !== undefined && total !== 0)
            store = parseInt((num / total) * 100);
        return store + "%";
    },
    /**得到距离*/
    getSize(num) {
        if (num === undefined || num === "" || num === "0") return "";
        var n = 0 + num;
        if (n > 10000) {
            return parseInt(n / 1000) + "km";
        } else if (n < 1000) {
            return parseInt(n) + "m";
        } else {
            var f = n / 1000;
            return f.toFixed(1) + "km";
        }
    },
    /**时间戳转时间*/
    longToTime(num) {
        if (num != undefined && num != 0) {
            var date = new Date(parseInt(num));
            var Y = date.getFullYear() + "-";
            var M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            var D =
                (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
            var h =
                (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
            var m =
                (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
                "";
            var s =
                date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m;
        }
        return "";
    },
    /**date=>yyyy-mm-dd hh:mm*/
    dateToString(date) {
        var Y = date.getFullYear() + "-";
        var M =
            (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "-";
        var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h =
            (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        var m =
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
            "";
        var s =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m;
    },
    /**将String，转为数字*/
    _getTextNum(text, type) {
        if (text == undefined || text == "" || text == null) return 0;
        try {
            if (type == 1) {
                //输出整数
                return parseInt(text);
            } else {
                //输出二位小数
                if (text.indexOf(".") > 0) {
                    return parseFloat(text).toFixed(2);
                }
                return parseInt(text);
            }
        } catch (error) {
            return 0;
        }
    },
    /**时间转化[]===>String*/
    getDayTime(times) {
        if (times != undefined && times.length > 0) {
            var time = "";
            for (let i = 0; i < times.length; i++) {
                var data = times[i];
                time =
                    ("" === time ? "" : time + "\n") +
                    data.openTime +
                    (data.acrossDay === 1 ? "-次日" : "-") +
                    data.closeTime +
                    "（" +
                    this.translateDays(data.day) +
                    "）";
            }
            return time;
        }
        return "";
    },
    /**判断是不是空,名字写错了，之后使用这个方法*/
    isNotEmpty(value) {
        if (value == undefined || value == null || value == "" || value == "null") {
            return false;
        } else {
            var regu = "^[ ]+$"; //判断空格
            var re = new RegExp(regu);
            return !re.test(value);
        }
        return true;
    },
    /**得到时间，String->date*/
    parseDate(date) {
        var isoExp, parts;
        isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s(\d\d):(\d\d):(\d\d)\s*$/;
        try {
            parts = isoExp.exec(date);
        } catch (e) {
            return null;
        }
        if (parts) {
            date = new Date(
                parts[1],
                parts[2] - 1,
                parts[3],
                parts[4],
                parts[5],
                parts[6]
            );
        } else {
            return null;
        }
        return date;
    },
    /**
     * 将2018-04-16 09：12：30 字符串格式转为时间格式
     * @param date
     * @returns {Date}
     */
    getDateTime(date) {
        //转换时间
        let regEx = new RegExp("\\-", "gi");
        let validDateStr = date.replace(regEx, "/");
        let milliseconds = Date.parse(validDateStr);
        var sendTime = new Date(milliseconds);
        return sendTime;
    },
    /**
     * 将2018-04-16 09：12：30 获取当月的日子
     * @param date
     * @returns {Date}
     */
    getDateList(year, month) {
        var dateStr = year + "-" + month + "-01 00:01:00"; //一个月的第一天
        var dateStr2 = year + "-" + month + "-30 00:01:00"; //一个月的最后一天
        var month2 = month == 1 ? 12 : month - 1; //上个月份
        var bigM = [1, 3, 5, 7, 8, 10, 12];
        var days = 30;
        var days2 = 30;
        // console.log(dateStr);
        // console.log(dateStr2);
        if (bigM.indexOf(month) > -1) {
            dateStr2 = year + "-" + month + "-31 00:01:00"; //一个月的最后一天
            days = 31;
        } else if (month == 2) {
            days = 28;
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                dateStr2 = year + "-" + month + "-29 00:01:00";
                days = 29;
            } else dateStr2 = year + "-" + month + "-28 00:01:00";
        }
        if (bigM.indexOf(month2) > -1) {
            days2 = 31;
        } else if (month2 == 2) {
            var year2 = year - 1;
            days2 = 28;
            if ((year2 % 4 == 0 && year2 % 100 != 0) || year2 % 400 == 0) {
                days2 = 29;
            }
        }
        //console.log(days + "--" + days2);
        var dateOne = getDateTime(dateStr);
        var dateTwo = getDateTime(dateStr2);
        var weekO = dateOne.getDay(); //0-6
        var weekT = dateTwo.getDay();
        var monthDays = weekO + days + (6 - weekT); //总共返回的数据
        if (monthDays == 35) {
            if (weekO == 0) weekO = 6;
            else weekT = weekT + 7;
            monthDays = 42;
        }
        var list = [];
        //console.log(weekO + "--" + weekT + "--" + monthDays);
        for (var i = 0; i < monthDays; i++) {
            var item = {};
            if (i < weekO) {
                //上个月的日子
                item.day = days2 - weekO + i + 1;
                item.type = -1;
            } else if (i >= weekO + days) {
                //下个月日子
                item.day = i - (weekO + days) + 1;
                item.type = 1;
            } else {
                item.day = i - weekO + 1; //z
                item.type = 0;
            }
            item.m = month;
            item.y = year;
            list.push(item);
        }
        //console.log(JSON.stringify(list));
        return list;
    },
    twoText(num) {
        return num < 10 ? "0" + num : num;
    },
    /**
     * 获取时间距离当前时间差值（天数）
     * @param date Date格式时间
     * @returns {number}
     */
    getDayTimeDifference(date) {
        //当前时间
        var nowTime = new Date();
        //差值
        var date3 = date - nowTime;
        //天
        var days = Math.floor(date3 / (24 * 3600 * 1000));
        return days;
    },
    getDayTimeDifferenceTwo(date) {
        //当前时间
        var nowTime = new Date();
        //差值
        var date3 = date - nowTime;
        if (date3 > 0 && date3 < 24 * 3600 * 1000) {
            if (date3 < 3600 * 1000) {
                return Math.floor(date3 / (60 * 1000)) + "分钟";
            }
            return Math.floor(date3 / (3600 * 1000)) + "小时";
        } else if (date3 <= 0) {
            return "已结束";
        }
        //天
        var days = Math.floor(date3 / (24 * 3600 * 1000));
        return days + "天";
    },
    /**周日转化模式*/
    translateDays(str) {
        let wekDaty = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        let fmtWeekly = str.split(",").sort(function (a, b) {
            return a - b;
        });
        // 全天
        if (fmtWeekly.length === 7) {
            return "周一至周日";
        }
        if (fmtWeekly.length === 1) {
            return wekDaty[fmtWeekly[0] - 1];
        } else {
            if (this.isSerial(fmtWeekly)) {
                if (fmtWeekly.length === 5 && fmtWeekly[fmtWeekly.length - 1] === 5) {
                    return "工作日";
                }
                if (fmtWeekly.length === 2 && fmtWeekly[fmtWeekly.length - 1] === 7) {
                    return "双休日";
                }
                return (
                    wekDaty[fmtWeekly[0] - 1] +
                    "至" +
                    wekDaty[fmtWeekly[fmtWeekly.length - 1] - 1]
                );
            } else {
                let timeStr = "";
                for (let i = 0; i < fmtWeekly.length; i++) {
                    timeStr += wekDaty[fmtWeekly[i] - 1] + ",";
                }
                return timeStr.substring(0, timeStr.length - 1);
            }
        }
    },
    /**转换unicode*/
    encodeUnicode(str) {
        return encodeURIComponent(str);
    },
    getArrStr(arr) {
        var str = "";
        arr.map(item => {
            str = str == "" ? item : str + "," + item;
        });
        return str;
    },
    /**
     * 基于fetch的get方法
     * @method post
     * @param {string} url
     * @param {function} successCallback 请求成功回调
     * @param {function} failCallback 请求失败回调
     */
    get: function (url, params, successCallback, failCallback) {
        if (params) {
            let paramsArray = []; //拼接参数
            Object.keys(params).forEach(key =>
                paramsArray.push(key + "=" + params[key])
            );
            if (url.search(/\?/) === -1) {
                url += "?" + paramsArray.join("&");
            } else {
                url += "&" + paramsArray.join("&");
            }
        }
        Log.m("请求:" + url);
        fetch(url, {method: "GET", headers: {token: _token.t}})
            .then(response => response.text())
            .then(responseText => {
                Log.m("responseText=" + responseText);
                try {
                    let result = JSON.parse(responseText);
                    successCallback(result);
                } catch (err) {
                    Log.m("err=" + err);
                    failCallback("找不到服务器君");
                }
            })
            .catch(function (err) {
                failCallback(err);
            });
    },
    /**
     * 基于fetch的post方法
     * @method post
     * @param {string} url
     * @param {string} body

     普通表单提交
     *  let formData = new FormData();
     formData.append("name","admin");
     formData.append("password","admin123");

     图片
     'Content-Type':'multipart/form-data',
     let file = {uri: uri, type: 'multipart/form-data', name: 'a.jpg'};
     formData.append("images",file);

     * @param {function} successCallback 请求成功回调
     * @param {function} failCallback 请求失败回调
     */
    post: function (url, formData, successCallback, failCallback) {
        var formDataMap = new FormData();
        var params = `${url}?token=${_token.t}&`;
        if (formData)
            Object.keys(formData).forEach((key) => {
                formDataMap.append(key, formData[key]);
                params = params + key + '=' + formData[key] + '&'
            });
        else formDataMap.append("token", _token.t);
        Log.m("请求:" + params);
        fetch(url, {
            method: "POST",
            headers: {
                token: _token.t
            },
            body: formDataMap
        })
            .then(function (response) {
                if (response.status == 200) return response.text();
                else throw new Error("服务器当掉了，运维人员");
            })
            .then(function (response) {
                Log.m("response:" + response);
                let data = JSON.parse(response);
                if (data.code == 200) {
                    if (successCallback)
                        successCallback(data.data);
                } else {
                    if (failCallback)
                        failCallback(data.msg)
                }
            })
            .catch(function (error) {
                Log.e("err:" + error);
                if (failCallback)
                    failCallback(err);
            });
    },
    /**上传文件*/
    upload: function (url, filePath, successCallback, failCallback) {
        let formData = new FormData();
        let file = {
            uri: filePath,
            type: "multipart/form-data",
            name: "image.png"
        };
        formData.append("file", file);
        Log.m(file);
        /**上传*/
        fetch(url, {
            method: "POST",
            headers: {
                Authorization: _token.t,
                "Content-Type": "multipart/form-data"
            },
            body: formData
        })
            .then(function (response) {
                if (response.status == 200) return response.text();
                else failCallback("请稍后请求");
            })
            .then(function (response) {
                try {
                    console.log(response);
                    let data = JSON.parse(response);
                    if (data.code = 200) {
                        successCallback(data.data);
                    } else failCallback(data.msg)

                } catch (e) {
                    failCallback("请稍后请求");
                }
            })
            .catch(function (error) {
                Log.e(error);
                failCallback(err);
            });
    },
    /**使用post请求，这个一般用于常用的请求返回*/
    async request(url, formData, successCallback, failCallback) {
        try {
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(formData)
            });
            let responseJson = await response.json();
            if (responseJson.state == 0) {
                //正确返回
                successCallback(responseJson.data);
            } else {
                //错误返回
                failCallback(responseJson.error_code, responseJson.msg);
            }
        } catch (error) {
            Log.e(error);
            failCallback(0, "请稍后再试");
        }
    }
};
