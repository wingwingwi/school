import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, KeyboardAvoidingView, TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import {postCache} from "../../utils/Resquest";
import {URL_DOLOGIN, URL_SEND_CODE, URL_UPDATE} from "../../constant/Url";
import BasePage from "../BasePage";

/**
 * @class
 */
export default class AmendPwd extends BasePage {
    constructor(props) {
        super(props);
        this.state = {isEnable: true, smsText: '发送验证码'}
        this.smsCode = ''
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"修改密码"} onSelect={() => Actions.pop()}/>
                {/*<KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>*/}
                    <View style={{alignItems: 'center', width: size.width, flex: 1}}>
                        <View style={{backgroundColor: '#fff'}}>
                            {this.accountView()}
                            <View style={{width: size.width, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                            {this.codeView()}
                            <View style={{width: size.width, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                            {this.pwdView()}
                            <View style={{width: size.width, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                        </View>
                        <Button onPress={() => {
                            this.amend()
                        }} style={{marginTop: 90, marginLeft: 15, marginRight: 15}}>
                            <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={{
                                                height: 45,
                                                width: size.width - 30,
                                                borderRadius: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                <Text style={{color: '#fff', fontSize: 18}}>修改密码</Text>
                            </LinearGradient>
                        </Button>
                    </View>
                            {/*</KeyboardAvoidingView>*/}
            </View>);
    }

    accountView() {
        return <View style={styles.lineView}>
            <Text style={styles.lineText}>手机号</Text>
            <EditView ref={ref => (this.mAccount = ref)} style={styles.lineEdit} placeholder={"请输入您的手机号"}/>
        </View>
    }

    pwdView() {
        return <View style={styles.lineView}>
            <Text style={styles.lineText}>新密码</Text>
            <EditView ref={ref => (this.mPwd = ref)} style={styles.lineEdit} placeholder={'密码（6-20位字符/符号/数字不限）'}/>

        </View>
    }

    codeView() {
        return <View style={styles.lineView}>
            <Text style={styles.lineText}>验证码</Text>
            <EditView ref={ref => (this.mCode = ref)} style={styles.lineEdit} placeholder={'请输入短信验证码'}/>
            <Button style={{backgroundColor: this.state.isEnable ? '#0099FF' : '#aaa', borderRadius: 5}}
                    onPress={() => {
                        if (this.state.isEnable) this.sendSms()
                    }}>
                <Text style={{
                    padding: 5,
                    fontSize: 12,
                    width: 90,
                    textAlign: 'center',
                    color: '#fff'
                }}>{this.state.smsText}</Text>
            </Button>
        </View>
    }

    amend() {
        let passWord = this.mPwd.text();
        let userName = this.mAccount.text();
        let code = this.mCode.text();
        if (!isNotEmpty(userName)) {
            showMsg('请输入账号信息')
        } else if (!isNotEmpty(passWord) && passWord.length > 2) {
            showMsg('请输入3至20位密码')
        } else if (!isNotEmpty(this.smsCode) || this.smsCode != code) {
            showMsg('短信验证失败')
        } else {
            this.loadKey = showMsg("修改中...", 3)
            postCache(URL_UPDATE, {userName: userName, passWord: passWord}, (data) => {
                showMsg('', this.loadKey);//关闭
                showMsg("修改成功", 1)
                setTimeout(() => {
                    Actions.pop()
                }, 800)
            }, false, (error) => {
                showMsg('', this.loadKey);//关闭
                showMsg(error, 2)
            })
        }
    }

    sendSms() {
        let userName = this.mAccount.text();
        if (!isNotEmpty(userName)) {
            showMsg('请输入手机号码')
        } else {
            this.loadKey = showMsg("短信发送中...", 3)
            postCache(URL_SEND_CODE, {mobile: userName}, (data) => {
                showMsg('', this.loadKey);
                ;//关闭
                showMsg("短信发送成功", 1)
                this.smsCode = data
                this.startTimeCount()
            }, false, (error) => {
                showMsg('', this.loadKey);
                ;//关闭
                showMsg(error, 2)
            })
        }
    }

    startTimeCount() {
        this.timeCount = 60
        this.timeCountView(this.timeCount)
        this.interval = setInterval(() => {
            this.timeCount = this.timeCount - 1
            if (this.timeCount <= 0) {
                this.interval && clearInterval(this.interval)
            }
            this.timeCountView(this.timeCount)
        }, 1000);
    }

    timeCountView(num) {
        this.setState({isEnable: num < 1, smsText: num < 1 ? '发送验证码' : (`${num}S再次点击`)})
    }


    componentWillUnmount() {
        super.componentWillUnmount()
        this.interval && clearInterval(this.interval)
        this.setState = (state, callback) => {
            return;
        };
    }
}
const styles = StyleSheet.create({
    lineView: {
        width: null, marginLeft: 15, marginRight: 15, marginTop: 15, flexDirection: 'row', alignItems: 'center'
    },
    lineText: {
        fontSize: 17, color: '#333', width: 80
    },
    lineEdit: {
        flex: 1, width: null, fontSize: 17
    }
});