import React, {Component} from 'react';

import {
    View, Text, StyleSheet, ScrollView, RefreshControl, Image,
    TouchableOpacity, ImageBackground, NativeModules, InteractionManager, DeviceEventEmitter
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from "../component/Button";
import {size, showMsg, post, isNotEmpty} from '../utils/Util'
import {URL_LIST, URL_MY_DATA} from '../constant/Url'
import src from '../constant/Src'
import NextView from "../component/NextView";
import {postCache} from "../utils/Resquest";

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
        this.state = {phone: '', uesrName: '', avatarUrl: src.headico_boy, showView: 0}
    }

    render() {
        return <View style={{flex: 1}}>
            <ImageBackground style={{width: size.width, height: size.width * 320 / 750}}
                             source={src.wodebenjing_pic}>
                <Button onPress={() => Actions.userInfo({user: this.user})}
                        style={{
                            flexDirection: 'row',
                            padding: 15,
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 10
                        }}>
                    <Image style={{width: 66, height: 66, borderRadius: 33, padding: 1, backgroundColor: '#fff'}}
                           source={this.state.avatarUrl}/>
                    <Text style={{color: '#fff', fontSize: 21, marginLeft: 10}}>{this.state.uesrName}</Text>
                </Button>
            </ImageBackground>
            {this.state.showView == 0 ? < Button onPress={() => {
                Actions.attestation()
            }}>< ImageBackground
                style={{width: size.width - 30, margin: 15, height: (size.width - 30) * 85 / 345}}
                source={src.banner_pic}></ImageBackground></Button> : <View style={{height: 20}}/>}
            <View style={{backgroundColor: '#fff'}}>
                {NextView.getSettingImgItemL(() => Actions.attestation(), "认证学生", src.renzhengxuesheng_icon, "", true, true)}
                {NextView.getSettingImgItemL(() => Actions.recordList(), "个人档案", src.gerendangan_icon, "", true, true)}
                {NextView.getSettingImgItemL(() => Actions.amendPwd(), "修改密码", src.xiugaimima_icon, "", true, true)}
                {NextView.getSettingImgItemL(() => Actions.feedback(), "意见反馈", src.yijianfankui_icon, "", true, true)}
                {NextView.getSettingImgItemL(() => Actions.aboutUs(), "关于我们", src.guanyuwomen_icon, this.state.phone, false, false)}
            </View>
        </View>
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            postCache(URL_LIST, {type: '1'}, (data) => {
                this.setState({phone: data})
            }, true)
            postCache(URL_MY_DATA, undefined, (data) => {
                //{"avatarUrl":null,"userName":"15215608650","gender":null,"nickname":null,"moblie":"15215608650","bySource":1,"isPerfect":0,"student":null}
                this.user = data;
                var avatar = isNotEmpty(data.avatarUrl) ? {uri: data.avatarUrl} :
                    '女' == data.gender ? src.headico_girl : src.headico_boy
                this.setState({
                    uesrName: isNotEmpty(data.nickname) ? data.nickname : data.userName,
                    avatarUrl: avatar, showView: data.bySource == 2 ? -1 : data.isPerfect
                })
            }, true, (error) => {
            })
        })
    }

    componentWillMount() {
        this.listener = DeviceEventEmitter.addListener('Mine', (data) => {
            var avatar = isNotEmpty(data.avatarUrl) ? {uri: data.avatarUrl} :
                '女' == data.gender ? src.headico_girl : src.headico_boy
            this.setState({
                uesrName: isNotEmpty(data.nickname) ? data.nickname : data.userName,
                avatarUrl: avatar, showView: data.bySource == 2 ? -1 : data.isPerfect
            })
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

}
