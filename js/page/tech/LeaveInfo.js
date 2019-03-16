import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
    ImageBackground,
    NativeModules
} from "react-native"; //基本架构

import {Actions} from "react-native-router-flux"; //路由
import {showMsg, size} from "../../utils/Util"; //工具类
import Button from "../../component/Button";
import BasePage from "../BasePage";
import NarBar from "../../component/Narbar";
import BListView from "../../component/BListView";
import src from "../../constant/Src";

/**
 * @class Test 是例子
 */
export default class LeaveInfo extends BasePage {
    constructor(props) {
        super(props);
        this.state = {name: "测试", refreshing: false}; //定义属性
    }

    render() {
        return <View>
            <NarBar title={'请假列表'} onSelect={() => Actions.pop()}/>

        </View>
    }
}