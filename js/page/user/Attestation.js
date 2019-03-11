import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import NextView from "../../component/NextView";

/**
 * @class
 */
export default class Attestation extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"认证学生"} onSelect={() => Actions.pop()}/>
                {NextView.getSettingImgItemL(() => Actions.pop(), "姓名", undefined, "请输入学生真实姓名", true, true)}
                {NextView.getSettingImgItemL(() => Actions.pop(), "班级", undefined, "请选择学生班级", true, true)}
                {NextView.getSettingImgItemL(() => Actions.pop(), "年龄", undefined, "性别", true, true)}
                {NextView.getSettingImgItemL(() => Actions.pop(), "性别", undefined, "女", true, true)}
            </View>);
    }
}