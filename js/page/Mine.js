import React, {Component} from 'react';

import {
    View, Text, StyleSheet, ScrollView, RefreshControl, Image,
    TouchableOpacity, ImageBackground, NativeModules
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from "../component/Button";
import {size, showMsg} from '../utils/Util'
import src from '../constant/Src'
import NextView from "../component/NextView";

/**
 *
 *
 * @export
 * @class Mine
 * @extends {Component<Props>}
 */
export default class Mine extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={{flex: 1}}>
            <ImageBackground style={{width: size.width, height: size.width * 320 / 750}}
                             source={src.wodebenjing_pic}>
                <Button onPress={() => Actions.userInfo()}
                        style={{
                            flexDirection: 'row',
                            padding: 15,
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 10
                        }}>
                    <Image style={{width: 66, height: 66, borderRadius: 33, padding: 1, backgroundColor: '#fff'}}
                           source={src.banzhurenxiaoxi_btn}/>
                    <Text style={{color: '#fff', fontSize: 21, marginLeft: 10}}>王大锤</Text>
                </Button>
            </ImageBackground>
            <ImageBackground style={{width: size.width - 30, margin: 15, height: (size.width - 30) * 85 / 345}}
                             source={src.banner_pic}></ImageBackground>
            <View style={{backgroundColor: '#fff'}}>
                {NextView.getSettingImgItemL(() => Actions.attestation(), "认证学生", src.renzhengxuesheng_icon, "", true, true)}
                {NextView.getSettingImgItemL(() => Actions.amendPwd(), "修改密码", src.xiugaimima_icon, "", true, true)}
                {NextView.getSettingImgItemL(() => Actions.feedback(), "意见反馈", src.yijianfankui_icon, "", true, true)}
                {NextView.getSettingImgItemL(() => Actions.aboutUs(), "关于我们", src.guanyuwomen_icon, "400-1234-5678", false, true)}
            </View>
        </View>
    }
}
