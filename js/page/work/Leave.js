import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, ImageBackground, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import TextBar from "../../component/TextBar";
import NextView from "../../component/NextView";
import ImgsView from "../../component/ImgsView";
import CheckView from "../../component/CheckView";
import DateModel from "../../model/DateModel";
import ChooseIModel from "../../model/ChooseIModel";
import PickerModel from "../../model/PickerModel";

/**
 * @class
 */
export default class Leave extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {//设置初值
            tab: 0, open: false, inpatient: false, showTime: false, startTime: '', endTime: '', timeType: 0,
            startBTime: '', endBTime: '', bName: '', bState: '', hospital: '', showC: false, list: [],
            showH: false, listH: []
        }
        ;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"我要请假"} onSelect={() => Actions.pop()}/>
                <TextBar list={["事假", "病假"]} changeTab={(index) => {
                    this.setState({tab: index})
                }}/>
                {this.state.tab == 0 ? this.leave() : this.sickLeave()}
                <DateModel show={this.state.showTime} closeModal={(date) => {
                    var item = {}
                    if (date) {
                        if (this.state.timeType == 0) item.startTime = date
                        else if (this.state.timeType == 1) item.endTime = date
                        else if (this.state.timeType == 2) item.startBTime = date
                        else if (this.state.timeType == 3) item.endBTime = date
                    }
                    item.showTime = false;
                    this.setState(item);
                }}/>
                <ChooseIModel show={this.state.showC} list={this.state.list} closeModal={(data) => {
                    if (data) {

                    }
                    this.setState({showC: false})
                }}/>
                <PickerModel show={this.state.showH} list={this.state.listH} closeModal={(item) => {
                    if(item) this.setState({hospital:item})
                    this.setState({showH: false})
                }}/>
            </View>);
    }

    leave() {
        return <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
            <View style={{height: 10}}/>
            <View style={{width: size.width}}>
                {NextView.getSettingImgItemS(() => {
                    this.setState({showTime: true, timeType: 0})
                }, "开始时间", this.state.startTime, true, true, "请选择")}
                {NextView.getSettingImgItemS(() => {
                    this.setState({showTime: true, timeType: 1})
                }, "结束时间", this.state.endTime, true, true, "请选择")}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemL(() => {
                }, "请假事由", undefined, "", true, false)}
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <EditView ref={ref => (this.mContent = ref)} style={styles.lineEdit} numberOfLines={4}
                          placeholder={'请输入请假事由'} multiline={true}/>
            </View>
            <Button onPress={() => {
            }} style={{marginTop: 70, marginLeft: 15, marginRight: 15}}>
                <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={{
                                    height: 45,
                                    width: size.width - 30,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                    <Text style={{color: '#fff', fontSize: 18}}>提交</Text>
                </LinearGradient>
            </Button>
        </ScrollView>
    }

    sickLeave() {
        return <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
            <View style={{height: 10}}/>
            <View style={{width: size.width}}>
                {NextView.getSettingImgItemS(() => {
                    this.setState({showTime: true, timeType: 2})
                }, "开始时间", this.state.startBTime, true, true, '请选择')}
                {NextView.getSettingImgItemS(() => {
                    this.setState({showTime: true, timeType: 3})
                }, "结束时间", this.state.endBTime, true, true, '请选择')}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemS(() => {
                    this.setState({showC: true, list: list1, timeType: 4})
                }, "主要症状", this.state.bState, true, true, '请选择')}
                {NextView.getSettingImgItemS(() => {
                    this.setState({showC: true, list: list3, timeType: 5})
                }, "疾病名称", this.state.bName, true, true, '请选择')}
                <View style={{height: 5}}/>
                <CheckView title={"是否就医"} style={{padding: 10, marginTop: 5}}
                           changeCheck={(check) => this.setState({open: check})}/>
                {this.state.open ?
                    <Text style={{backgroundColor: '#fff', padding: 10, width: size.width}}>上传病例以及相关材料</Text> : null}
                {this.state.open ? <ImgsView/> : null}
                <CheckView title={"是否住院"} style={{padding: 10, marginTop: 5}}
                           changeCheck={(check) => this.setState({inpatient: check})}/>
                {this.state.inpatient ? NextView.getSettingImgItemS(() => {
                    this.setState({showH: true, list: list2, timeType: 6})
                }, "就诊医院", this.state.hospital, true, true, "请选择") : null}
            </View>
            <Button onPress={() => {
            }} style={{marginTop: 70, marginLeft: 15, marginRight: 15}}>
                <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={{
                                    height: 45,
                                    width: size.width - 30,
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                    <Text style={{color: '#fff', fontSize: 18}}>提交</Text>
                </LinearGradient>
            </Button>
            <View style={{height: 20}}/>
        </ScrollView>
    }
}
const list1 = [{name: '发热'}, {name: '咳嗽'}, {name: '头痛'}, {name: '脚痛'}, {name: '屁股痛'}, {name: '鸡冻'}, {name: '自定义'}]
const list2 = [{name: '医院'}, {name: '医院2'}, {name: '医院'}, {name: '医院4'}, {name: '医院5'}, {name: '医院6'}, {name: '医院7'}, {name: '医院8'}]
const list3 = [{name: '感冒'}, {name: '扁桃体发炎'}, {name: '手足口病'}, {name: '水痘'}, {name: '风疹'}, {name: '麻疹'}, {name: '腮腺炎'}
    , {name: '猩红热'}
    , {name: '肺结核'}
    , {name: '甲肝'}
    , {name: '其他传染病'}
    , {name: '其他非传染病'}
    , {name: '原因不明疾病'}
    , {name: '自定义'}
]
const styles = StyleSheet.create({
    lineText: {
        fontSize: 17, color: '#333', width: 80, marginTop: 10, marginLeft: 10
    },
    lineEdit: {
        width: size.width,
        fontSize: 15,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 5,
        height: 100,
        lineHeight: 22,
        textAlign: 'left'
    }
});