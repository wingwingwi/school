import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
    ImageBackground,
    NativeModules
} from "react-native"; //基本架构

import {Actions} from "react-native-router-flux"; //路由
import {showMsg, size} from "../../utils/Util"; //工具类
import Button from "../../component/Button";
import BasePage from "../BasePage";
import NarBar from "../../component/Narbar";
import BListView from "../../component/BListView";
import src from "../../constant/Src";
import NextView from "../../component/NextView";

/**
 * @class Test 是例子
 */
export default class LeaveInfo extends BasePage {
    constructor(props) {
        super(props);
        this.state = {name: "测试", refreshing: false, list: []}; //定义属性
    }

    render() {
        return <View style={{flex: 1}}>
            <NarBar title={this.props.item.type ? '病假' : '事假'} onSelect={() => Actions.pop()}/>
            <ScrollView>
                <View style={{width: size.width, padding: 10, flexDirection: 'row', backgroundColor: '#fff'}}>
                    <Image style={{width: 55, height: 55, borderRadius: 22}} resizeMode={'cover'}
                           source={this.props.item.img}/>
                    <View style={{height: 55, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                        <Text style={{color: '#111', fontSize: 15}}>{this.props.item.title}</Text>
                        <Text style={{color: '#82868B', fontSize: 12, marginTop: 11}}>{'男   9岁'}</Text>
                    </View>
                </View>
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemTech(undefined, "开始时间", '2019-02-21 18:00', true, false, '请选择')}
                {NextView.getSettingImgItemTech(undefined, "结束时间", '2019-02-21 18:00', true, false, '请选择')}
                <View style={{height: 10}}/>
                {this.typeView()}
                <View style={{height: 50}}/>
                <Text style={{width: size.width, textAlign: 'center', color: "#0099FF", fontSize: 15}}
                      onPress={() => Actions.sendMsg({item: this.props.item})}>是否发送通知？</Text>
                <View style={{height: 50}}/>
            </ScrollView>
        </View>
    }

    typeView() {
        var type = this.props.item.type
        if (type) {//病假
            return <View>
                {NextView.getSettingImgItemTech(undefined, "发病时间", '2019-02-21 18:00', false, false, '请选择')}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemTech(undefined, "主要症状", '2019-02-21 18:00', true, false, '请选择')}
                {NextView.getSettingImgItemTech(undefined, "疾病名称", '2019-02-21 18:00', false, false, '请选择')}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemTech(undefined, "病例以及相关材料", '', true, false, '')}
                <View style={{backgroundColor: '#fff', flexDirection: 'row', padding: 10, flexWrap: 'wrap'}}>
                    {this.state.list.map((item, idx) => <Image style={{width: 50, height: 50, marginRight: 10}}
                                                               key={idx}/>)}
                </View>
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemTech(undefined, "就诊医院", '', false, false, '')}

            </View>
        } else {
            return <View>
                {NextView.getSettingImgItemTech(undefined, "请假事由", '', true, false, '')}
                <Text style={{
                    padding: 15,
                    color: '#333',
                    fontSize: 14,
                    backgroundColor: '#fff',
                    width: size.width
                }}></Text>
            </View>
        }

    }

}