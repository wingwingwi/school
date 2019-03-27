import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    TextInput,
    InteractionManager,
    BackHandler
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size, isNotEmpty, isIos} from '../../utils/Util';
import {save, getValue, deleteKey} from '../../utils/FileUtil'
import {postCache} from '../../utils/Resquest'
import {URL_DOLOGIN, URL_LIST} from '../../constant/Url'

import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import {_token} from "../../constant/Constants";
import BasePage from "../BasePage";

/**
 * @class Login 注册登录
 */
export default class Login extends BasePage {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        super.componentWillMount()
        if (!isIos)
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {//清空数据
            console.log('清理数据信息')
            deleteKey(URL_LIST)
            deleteKey('tokenData')
            _token.t = ''
        })
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        if (!isIos)
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        console.log('退出APP')
        BackHandler.exitApp();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <NarBar title={""}/>
                <View style={{alignItems: 'center', width: size.width, flex: 1}}>
                    <Image style={{
                        width: size.width / 4,
                        height: size.width / 4,
                        marginTop: size.width / 10,
                        marginBottom: 30
                    }}
                           source={src.logo_pic}/>
                    <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
                        {this.accountView()}
                        <View style={{width: size.width - 20, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                        {this.pwdView()}
                        <View style={{width: size.width - 20, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                    </KeyboardAvoidingView>
                    <Button onPress={() => {
                        this.login()
                    }} style={{marginTop: 50, marginLeft: 15, marginRight: 15}}>
                        <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={{
                                            height: 45,
                                            width: size.width - 30,
                                            borderRadius: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                            <Text style={{color: '#fff', fontSize: 18}}>登录</Text>
                        </LinearGradient>
                    </Button>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: size.width - 30,
                            margin: 15,
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{color: '#333', fontSize: 13}} onPress={() => {
                            Actions.register();
                        }}>注册</Text>
                        <Text style={{color: '#0082ff', fontSize: 13}} onPress={() => {
                            Actions.setPwd();
                        }}>忘记密码？</Text>
                    </View>
                </View>
            </View>
        );
    }

    accountView() {
        return <View style={styles.lineView}>
            <Image style={styles.lineImage} source={src.zhanghao_icon}/>
            <Text style={styles.lineText}>账号</Text>
            <EditView ref={ref => (this.mAccount = ref)} style={styles.lineEdit} placeholder={"请输入您的账号"}/>
        </View>
    }

    pwdView() {
        return <View style={styles.lineView}>
            <Image style={styles.lineImage} source={src.mima_icon}/>
            <Text style={styles.lineText}>密码</Text>
            <EditView ref={ref => (this.mPwd = ref)} style={styles.lineEdit} secureTextEntry={true}
                      placeholder={'请输入您的密码'}/>
        </View>
    }

    login() {
        let passWord = this.mPwd.text();
        let userName = this.mAccount.text();
        if (!isNotEmpty(userName)) {
            showMsg('请输入账号信息')
        } else if (!isNotEmpty(passWord) && passWord.length > 2) {
            showMsg('请输入3至20位密码')
        } else {
            this.loadKey = showMsg("登录中...", 3)
            postCache(URL_DOLOGIN, {userName: userName, passWord: passWord}, (data) => {
                showMsg('', this.loadKey)
                //isPerfect:’是否完善了学生信息 0未完善 1已完善,如果bySource=2可忽略’
                showMsg("登录成功", 1)
                data['time']=(new Date()).getTime();
                save('tokenData', JSON.stringify(data));//获取到数据
                save('isPerfect', data.bySource == 2 ? -1 : data.isPerfect);//获取到数据 0未完善 1已完善,-1忽略
                _token.t = data.token;
                _token.isPerfect = data.isPerfect
                _token.bySource = data.bySource
                setTimeout(() => {
                    if (data.bySource == 2) {
                        Actions.reset('techPage')
                    } else
                        Actions.reset('root1')
                }, 800);
            }, false, (error) => {
                showMsg('', this.loadKey);//关闭
                showMsg(error, 2)
            })
        }
    }
}
const styles = StyleSheet.create({
    lineView: {
        width: null, marginLeft: 10, marginRight: 10, marginTop: 15, flexDirection: 'row', alignItems: 'center'
    },
    lineImage: {
        width: 20, height: 20
    },
    lineText: {
        fontSize: 17, color: '#333', marginLeft: 10
    },
    lineEdit: {
        flex: 1, width: null, marginLeft: 10, fontSize: 17, textAlign: 'left', paddingRight: 30,
    }
});