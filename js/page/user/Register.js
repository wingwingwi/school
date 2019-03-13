import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import {postCache} from '../../utils/Resquest'
import {URL_DOLOGIN, URL_REGISTER, URL_SEND_CODE} from '../../constant/Url'
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";

/**
 * @class Register 注册登录
 */
export default class Register extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {isEnable: true, smsText: '发送验证码'}
        this.smsCode = ''
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{color: '#000', fontSize: 22, marginTop: Platform.OS == 'ios' ? 100 : 80, marginLeft: 15}}
                      onPress={() => Actions.pop()}>注册</Text>
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
                            bottom: 10,
                            width: size.width,
                            margin: 15,
                            justifyContent: 'center'
                        }}>
                        <Text style={{color: '#A9A9A9', fontSize: 13}}>注册即代表你已同意</Text>
                        <Text style={{color: '#0082ff', fontSize: 13}} onPress={() => {
                        }}>《平台用户协议》</Text>
                    </View>
                </View>
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

    register() {
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
            this.loadKey = showMsg("注册中...", 3)
            postCache(URL_REGISTER, {userName: userName, passWord: passWord}, (data) => {
                showMsg('',this.loadKey);//关闭
                showMsg("注册成功", 1)
                setTimeout(() => {
                    Actions.pop()
                }, 800)
            }, false, (error) => {
                showMsg('',this.loadKey);//关闭
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
            postCache(URL_SEND_CODE, {mobile : userName}, (data) => {
                showMsg('',this.loadKey);//关闭
                showMsg("短信发送成功", 1)
                this.smsCode=data
                this.startTimeCount()
            }, false, (error) => {
                showMsg('',this.loadKey);//关闭
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