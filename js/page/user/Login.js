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

/**
 * @class Login 注册登录
 */
export default class Login extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <NarBar title={""}/>
                <View style={{alignItems: 'center', width: size.width, flex: 1}}>
                    <Image style={{width: 100, height: 100, marginTop: 80, marginBottom: 30}}
                           source={src.banzhurenxiaoxi_btn}/>
                    {this.accountView()}
                    <View style={{width: size.width - 20, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                    {this.pwdView()}
                    <View style={{width: size.width - 20, height: 1, marginTop: 10, backgroundColor: '#DBDBDB'}}/>
                    <Button onPress={() => {
                        Actions.pop()
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
                        style={{flexDirection: 'row', width: size.width-30, margin: 15, justifyContent: 'space-between'}}>
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
            <EditView ref={ref => (this.mPwd = ref)} style={styles.lineEdit} placeholder={'请输入您的密码'}/>
        </View>
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
        flex: 1, width: null, marginLeft: 10, fontSize: 17, textAlign: 'center', paddingRight: 100
    }
});