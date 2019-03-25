import {post} from './Util'
import {save, getValue} from "./FileUtil";

module.exports = {
    postCache: function (url, formData, successCallback, isCache, failCallback) {
        if (isCache && isCache == true) {
            getValue(url, (str) => {
                if (str) {
                    let data = JSON.parse(str);
                    if (__DEV__) console.log('缓存获取到数据')
                    successCallback(data)
                }
                postUtil(url, formData, (data) => {
                    let json = JSON.stringify(data)
                    if (str != json) {
                        successCallback(data)
                        save(url, json)
                    }
                }, false, (error) => {
                    if (failCallback) failCallback(error)
                })
            })
        } else postUtil(url, formData, successCallback, isCache, failCallback)
    }
}

function postUtil(url, formData, successCallback, isCache, failCallback) {
    post(url, formData, (data) => {
        if (isCache && isCache == true)
            save(url, JSON.stringify(data))
        if (successCallback)
            successCallback(data)
    }, (error) => {
        if (failCallback)
            failCallback(error)
    })
}