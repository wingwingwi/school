import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import {postCache} from "../../utils/Resquest";
import {URL_ADD_OPINION, URL_MY_DATA} from "../../constant/Url";
import BasePage from "../BasePage";

/**
 * @class
 */
export default class Feedback extends BasePage{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"意见反馈"} onSelect={() => Actions.pop()}/>
                <View style={{backgroundColor: '#fff'}}>
                    <Text style={styles.lineText}>标题</Text>
                    <View style={{width: size.width, height: 1, marginTop: 10, backgroundColor: '#eee'}}/>
                    <EditView ref={ref => (this.mContent = ref)} style={styles.lineEdit} numberOfLines={4}
                              placeholder={'请输入意见反馈'} multiline={true}/>
                </View>

                <Button onPress={() => {
                    this.feedback();
                }} style={{marginTop: 120, marginLeft: 15, marginRight: 15}}>
                    <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={{
                                        height: 45,
                                        width: size.width - 30,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                        <Text style={{color: '#fff', fontSize: 18}}>提交</Text>
                    </LinearGradient>
                </Button>
            </View>);
    }

    feedback() {
        const remk = this.mContent.text();
        if (isNotEmpty(remk)) {
            this.loadKey = showMsg("正在发送中...", 3)
            postCache(URL_ADD_OPINION, {remk: remk}, (data) => {
                showMsg('', this.loadKey);
                showMsg("意见发送成功", 1)
                setTimeout(() => {
                    Actions.pop()
                }, 800)
            }, false, (error) => {
                showMsg('', this.loadKey);
                showMsg(error, 2)
            })
        } else showMsg('请输入反馈意见')

    }
}
const styles = StyleSheet.create({
    lineText: {
        fontSize: 17, color: '#333', width: 80, marginTop: 10, marginLeft: 10
    },
    lineEdit: {
        width: size.width,
        fontSize: 15,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 5,
        height: 100,
        lineHeight: 22,
        textAlign: 'left'
    }
});