import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, InteractionManager, DeviceEventEmitter} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, post, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import NextView from "../../component/NextView";
import {save} from "../../utils/FileUtil";
import {URL_ADD_STUDENT, URL_LIST, URL_MY_DATA, URL_UPDATE_MENBER} from "../../constant/Url";
import {postCache} from "../../utils/Resquest";
import BottomCModel from "../../model/BottomCModel";
import PickerModel from "../../model/PickerModel";

/**
 * @class
 */
export default class UserInfo extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {user: this.props.user ? this.props.user : {}, show: false, showModel: false}
        this.sex = [{name: '男', value: '1'}, {name: '女', value: '2'}]
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"个人信息"} onSelect={() => Actions.pop()}/>
                {NextView.getSettingImgItemBig(() => Actions.pop(), src.banzhurenxiaoxi_btn, "修改头像", true, true)}
                {NextView.getSettingImgItemS(() => Actions.inputPage({
                    event: eventType, eventName: eventName, text: this.state.user.nickname
                }), "昵称", this.state.user.nickname, true, true, "请输入")}
                {NextView.getSettingImgItemS(() => this.setState({showModel: true}), "性别", this.state.user.gender, true, true, '请选择')}
                <Button onPress={() => {
                    this.setState({show: true})
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
                <BottomCModel show={this.state.show} list={[{name: '注销账号'}]} closeModal={(data) => {
                    this.setState({show: false})
                    if (data) Actions.replace('login')
                }}/>
                <PickerModel list={this.sex} closeModal={(index) => {
                    if (index) {
                        var idx = parseInt(index)
                        var user = this.state.user
                        user.gender = this.sex[idx].name
                        this.setState({user: user, showModel: false});
                        this.amendInfo();
                    } else this.setState({showModel: false})
                }} show={this.state.showModel}/>
            </View>);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            postCache(URL_MY_DATA, undefined, (data) => {
                //{"avatarUrl":null,"userName":"15215608650","gender":null,"nickname":null,"moblie":"15215608650","bySource":1,"isPerfect":0,"student":null}
                this.setState({user: data})
            }, true, (data) => {
            })
        })
    }

    componentWillMount() {
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {
            var user = this.state.user
            user['nickname'] = item[eventName]
            this.setState({userName: user})
            this.amendInfo()
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }


    amendInfo() {
        var user = this.state.user
        postCache(URL_UPDATE_MENBER, user)
        DeviceEventEmitter.emit('Mine', user)
    }
}
const eventType = 'userInfo'
const eventName = 'userName'