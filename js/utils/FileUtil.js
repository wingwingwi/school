/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
import Dimensions from 'Dimensions';
import React, {AsyncStorage} from 'react-native';
import {isNotEmpty} from './Util'

module.exports = {
    /**保存信息*/
    save(key, value) {
        if (value) {
            return AsyncStorage.setItem(key, JSON.stringify(value));
        }
    },
    /**取数据*/
    getValue(key, callback) {
        AsyncStorage.getItem(key).then((value) => {
            var jsonValue;
            if (isNotEmpty(value)) {
                jsonValue = JSON.parse(value);
                callback(JSON.parse(value));
            } else {
                callback();
            }
        });
    }, /**取数据*/
    getValueAsync(key) {
        return AsyncStorage.getItem(key).then((value) => {
            var jsonValue = {}
            if (isNotEmpty(value)) {
                jsonValue = JSON.parse(value);
            }
            return jsonValue;
        });
    },
    /**删除信息*/
    deleteKey(key) {
        return AsyncStorage.removeItem(key);
    },
};
