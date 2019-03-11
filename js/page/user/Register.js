import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";

/**
 * @class Register 注册登录
 */
export default class Register extends Component<Props> {
    constructor(props) {
        super(props);
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
            <Button style={{backgroundColor: '#0099FF', borderRadius: 5}}>
                <Text style={{padding: 5, fontSize: 12, color: '#fff'}}>发送验证码</Text>
            </Button>
        </View>
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