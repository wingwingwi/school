import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, Platform, KeyboardAvoidingView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isIos, isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import {postCache} from '../../utils/Resquest'
import {URL_DOLOGIN, URL_REGISTER, URL_SEND_CODE} from '../../constant/Url'
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import BasePage from "../BasePage";
import {save} from "../../utils/FileUtil";
import {_token} from "../../constant/Constants";

/**
 * @class Register 注册登录
 */
export default class Register extends BasePage {
    constructor(props) {
        super(props);
        this.state = {isEnable: true, smsText: '发送验证码'}
        this.smsCode = ''
    }

    render() {
        return (
            <View style={{height: size.height}}>
                <Text style={{
                    color: '#000',
                    fontSize: 22,
                    marginTop: Platform.OS == 'ios' ? size.width / 5 + 20 : size.width / 5,
                    marginLeft: 15
                }}
                      onPress={() => Actions.pop()}>注册</Text>
                {/*<KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>*/}
                <View style={{alignItems: 'center', width: size.width, flex: 1, marginTop: 50}}>
                    {this.accountView()}
                    <View style={{width: size.width, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                    {this.codeView()}
                    <View style={{width: size.width, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                    {this.pwdView()}
                    <View style={{width: size.width, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                    <Button onPress={() => {
                        this.register()
                    }} style={{marginTop: 50, marginLeft: 15, marginRight: 15}}>
                        <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={{
                                            height: 45,
                                            width: size.width - 30,
                                            borderRadius: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                            <Text style={{color: '#fff', fontSize: 18}}>注册</Text>
                        </LinearGradient>
                    </Button>
                    <View
                        style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            paddingBottom: isIos ? 20 : 40,
                            width: size.width,
                            bottom: 0,
                            justifyContent: 'center'
                        }}>
                        <Text style={{color: '#A9A9A9', fontSize: 13}}>注册即代表你已同意</Text>
                        <Text style={{color: '#0082ff', fontSize: 13}} onPress={() => {
                        }}>《平台用户协议》</Text>
                    </View>
                </View>
                {/*</KeyboardAvoidingView>*/}
            </View>
        );
    }

    accountView() {
        return <View style={styles.lineView}>
            <Text style={styles.lineText}>手机号</Text>
            <EditView ref={ref => (this.mAccount = ref)} style={styles.lineEdit} placeholder={"请输入您的手机号"}/>
        </View>
    }

    pwdView() {
        return <View style={styles.lineView}>
            <Text style={styles.lineText}>密码</Text>
            <EditView ref={ref => (this.mPwd = ref)} style={styles.lineEdit} placeholder={'密码（6-20位字符/符号/数字不限）'}
                      secureTextEntry={true}/>
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

    register() {
        let passWord = this.mPwd.text();
        let userName = this.mAccount.text();
        let code = this.mCode.text();
        if (!isNotEmpty(userName)) {
            showMsg('请输入账号信息')
        } else if (!this.phoneNum || this.phoneNum != userName) {
            showMsg(this.phoneNum ? "账号信息变更，请重新获取验证码" : "获取验证码未成功")
        } else if (!isNotEmpty(passWord) && passWord.length > 2) {
            showMsg('请输入3至20位密码')
        } else if (!isNotEmpty(this.smsCode) || this.smsCode != code) {
            showMsg('短信验证失败')
        } else {
            this.loadKey = showMsg("注册中...", 3)
            postCache(URL_REGISTER, {userName: userName, passWord: passWord}, (data) => {
                showMsg('', this.loadKey);//关闭
                showMsg("注册成功", 1)
                setTimeout(() => {
                    this.login(userName, passWord)
                }, 800)
            }, false, (error) => {
                showMsg('', this.loadKey);//关闭
                showMsg(error, 2)
            })
        }
    }

    login(userName, passWord) {
        postCache(URL_DOLOGIN, {userName: userName, passWord: passWord}, (data) => {
            showMsg("登录成功", 1)
            data['time']=(new Date()).getTime();
            save('tokenData', JSON.stringify(data));//获取到数据
            save('isPerfect', data.bySource == 2 ? -1 : data.isPerfect);//获取到数据 0未完善 1已完善,-1忽略
            _token.t = data.token;
            _token.isPerfect = data.isPerfect
            _token.bySource = data.bySource
            Actions.reset('attestations',{isGo: true});//去认证
        }, false, (error) => {
            showMsg(error, 2)
        })
    }

    sendSms() {
        let userName = this.mAccount.text();
        if (!isNotEmpty(userName)) {
            showMsg('请输入手机号码')
        } else {
            this.loadKey = showMsg("短信发送中...", 3)
            postCache(URL_SEND_CODE, {mobile: userName}, (data) => {
                showMsg('', this.loadKey);//关闭
                showMsg("短信发送成功", 1)
                this.smsCode = data
                this.phoneNum = userName
                this.startTimeCount()
            }, false, (error) => {
                showMsg('', this.loadKey);//关闭
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