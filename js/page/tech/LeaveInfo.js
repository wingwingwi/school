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
import {isNotEmpty, showMsg, size} from "../../utils/Util"; //工具类
import Button from "../../component/Button";
import BasePage from "../BasePage";
import NarBar from "../../component/Narbar";
import BListView from "../../component/BListView";
import src from "../../constant/Src";
import NextView from "../../component/NextView";
import {postCache} from "../../utils/Resquest";
import {URL_LEAVE_DETAILS} from "../../constant/Url";
import ImagesModel from "../../model/ImagesModel";

/**
 * @class Test 是例子
 */
export default class LeaveInfo extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            name: "测试",
            refreshing: false,
            list: [],
            leave: {},
            resumePro: {},
            showImg: false,
            images: [],
            index: 0
        }; //定义属性
    }

    render() {
        var avatar = isNotEmpty(this.props.item.avatarUrl) ? {uri: this.props.item.avatarUrl} :
            '女' == this.props.item.gender ? src.headico_girl : src.headico_boy
        return <View style={{flex: 1}}>
            <NarBar title={this.props.isType != 1 ? '病假' : '事假'} onSelect={() => Actions.pop()}/>
            <ScrollView>
                <View style={{width: size.width, padding: 10, flexDirection: 'row', backgroundColor: '#fff'}}>
                    <Image style={{width: 55, height: 55, borderRadius: 28}} resizeMode={'cover'}
                           source={avatar}/>
                    <View style={{height: 55, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                        <Text style={{
                            color: '#111',
                            fontSize: 15
                        }}>{this.props.item.className + '-' + this.props.item.realName}</Text>
                        <Text style={{color: '#82868B', fontSize: 12, marginTop: 11}}>
                            {`${this.props.item.gender}      ${this.props.item.age}岁`}</Text>
                    </View>
                </View>
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemTech(undefined, "请假时间", this.getDateTime(this.state.leave.startTime), true, false, '')}
                {this.typeView()}
                <View style={{height: 10}}/>
                {this.resumeGoSchool()}
                <View style={{height: 50}}/>
                <Text style={{width: size.width, textAlign: 'center', color: "#0099FF", fontSize: 15}}
                      onPress={() => Actions.sendMsg({item: this.props.item})}>是否发送通知？</Text>
                <View style={{height: 50}}/>
            </ScrollView>
            <ImagesModel show={this.state.showImg} images={this.state.images} index={this.state.index}/>
        </View>
    }

    typeView() {
        var type = this.props.isType
        if (type != 1) {//病假
            return <View>
                {NextView.getSettingImgItemTech(undefined, "发病时间", this.getDateTime(this.state.leave.fallTime), false, false, '')}
                {NextView.getSettingImgItemTech(undefined, "主要症状", this.state.illnessState, true, false, '')}
                {NextView.getSettingImgItemTech(undefined, "疾病名称", this.state.illnessName, false, false, '')}
                {NextView.getSettingImgItemTech(undefined, "病例以及相关材料", '', true, false, '')}
                <View style={{backgroundColor: '#fff', flexDirection: 'row', padding: 10, flexWrap: 'wrap'}}>
                    {this.state.leave && this.state.leave.files ? this.state.leave.files.map((item, idx) => {
                            let positionIndex = idx;
                            return <Button
                                onPress={() => {
                                    this.setState({
                                        showImg: true,
                                        images: this.state.leave.files,
                                        index: positionIndex
                                    })
                                }}
                                key={positionIndex}><Image
                                style={{width: 50, height: 50, marginRight: 10}}
                                source={{uri: item.fileUrl}}
                            /></Button>
                        }
                    ) : null}
                </View>
                {NextView.getSettingImgItemTech(undefined, "住院医院", this.props.item.remk, false, false, '')}
            </View>
        } else {
            return <View>
                {NextView.getSettingImgItemTech(undefined, "请假事由", '', true, false, '')}
                <Text style={{
                    padding: 15,
                    color: '#333',
                    fontSize: 14,
                    minHeight: 80,
                    backgroundColor: '#fff',
                    width: size.width
                }}>{this.props.item.remk}</Text>
            </View>
        }
    }

    typeView2() {
        var type = this.props.isType
        if (type != 1) {//病假
            return <View key={100}>
                {NextView.getSettingImgItemTech(undefined, "是否痊愈", this.state.resumePro && this.state.resumePro.isRecovery == 1 ? "是" : "否", true, false, '')}
                {NextView.getSettingImgItemTech(undefined, "是否有医院证明", this.state.resumePro && this.state.resumePro.inProve == 1 ? "是" : "否", true, false, '')}
                {NextView.getSettingImgItemTech(undefined, "医院诊断说明", '', true, false, '')}
                <View style={{backgroundColor: '#fff', flexDirection: 'row', padding: 10, flexWrap: 'wrap'}}>
                    {this.state.resumePro && this.state.resumePro.files ? this.state.resumePro.files.map((item, idx) => {
                            let positionIndex = idx + 100;
                            return <Button
                                onPress={() => {
                                    this.setState({
                                        showImg: true,
                                        images: this.state.resumePro.files,
                                        index: positionIndex - 100
                                    })
                                }}
                                key={positionIndex}><Image
                                style={{width: 50, height: 50, marginRight: 10}}
                                source={{uri: item.fileUrl}}
                            /></Button>
                        }
                    ) : null}
                </View>
            </View>
        } else return null;
    }

    /**恢复上课*/
    resumeGoSchool() {
        var view = [];
        if (1 == this.state.leave.resumeStatus || "1" == this.state.leave.resumeStatus) {
            view.push(<View key={10}>{NextView.getSettingImgItemTech(undefined, "复课时间", this.state.resumePro.resumeTime, true, false, '')}</View>)
            view.push(this.typeView2())
        }
        return view;
    }

    componentDidMount() {
        this.loadKey = showMsg('加载中...', 3)
        this.timeout = setTimeout(() => {
            postCache(URL_LEAVE_DETAILS, {id: this.props.item.id}, (data) => {
                showMsg('', this.loadKey)
                let leave = data.leavePro;
                let resume = data.resumePro;
                this.setData(leave, resume)
            }, false, (error) => {
                showMsg('', this.loadKey, error)
            })
        }, 200)
    }

    setData(data, resume) {
        var illnessName = ''
        var illnessState = ''
        if (isNotEmpty(data.diseases) && data.diseases.length > 0)
            for (var i = 0; i < data.diseases.length; i++) {
                if (data.diseases[i].diseaselb == 1) {//症状
                    illnessState = !isNotEmpty(illnessState) ? data.diseases[i].diseaseName : `${illnessState},${data.diseases[i].diseaseName}`
                } else if (data.diseases[i].diseaselb == 2) {//名称
                    illnessName = !isNotEmpty(illnessName) ? data.diseases[i].diseaseName : `${illnessName},${data.diseases[i].diseaseName}`
                }
            }
        this.setState({leave: data, resumePro: resume, illnessState: illnessState, illnessName: illnessName})
    }

    getDateTime(time) {
        return time && time.length >= 19 ? time.substring(0, 16) : time
    }

}