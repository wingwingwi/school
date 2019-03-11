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
export default class UserInfo extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"个人信息"} onSelect={() => Actions.pop()}/>
                {NextView.getSettingImgItemBig(() => Actions.pop(), src.banzhurenxiaoxi_btn, "修改头像", true, true)}
                {NextView.getSettingImgItemL(() => Actions.pop(), "昵称", undefined, "王大锤", true, true)}
                {NextView.getSettingImgItemL(() => Actions.pop(), "性别", undefined, "女", true, true)}
                <Button onPress={() => {
                    Actions.login()
                }} style={{marginTop: 50, marginLeft: 15, marginRight: 15}}>
                    <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={{
                                        height: 45,
                                        width: size.width - 30,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                        <Text style={{color: '#fff', fontSize: 18}}>退出登录</Text>
                    </LinearGradient>
                </Button>
            </View>);
    }
}