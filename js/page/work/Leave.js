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

/**
 * @class
 */
export default class Leave extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {//设置初值
            tab: 0, open: false, inpatient: false
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"我要请假"} onSelect={() => Actions.pop()}/>
                <TextBar list={["事假", "病假"]} changeTab={(index) => {
                    this.setState({tab: index})
                }}/>
                {this.state.tab == 0 ? this.leave() : this.sickLeave()}
            </View>);
    }

    leave() {
        return <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
            <View style={{height: 10}}/>
            <View style={{width: size.width}}>
                {NextView.getSettingImgItemL(() => {
                }, "开始时间", undefined, "2019-02-21 18:00", true, true)}
                {NextView.getSettingImgItemL(() => {
                }, "结束时间", undefined, "请选择", true, true)}
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
                {NextView.getSettingImgItemL(() => {
                }, "开始时间", undefined, "2019-02-21 18:00", true, true)}
                {NextView.getSettingImgItemL(() => {
                }, "结束时间", undefined, "请选择", true, true)}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemL(() => {
                }, "主要症状", undefined, "请选择", true, true)}
                {NextView.getSettingImgItemL(() => {
                }, "疾病名称", undefined, "扁桃体发炎", true, true)}
                <View style={{height: 5}}/>
                <CheckView title={"是否就医"} style={{padding: 10, marginTop: 5}}
                           changeCheck={(check) => this.setState({open: check})}/>
                {this.state.open ?
                    <Text style={{backgroundColor: '#fff', padding: 10, width: size.width}}>上传病例以及相关材料</Text> : null}
                {this.state.open ? <ImgsView/> : null}
                <CheckView title={"是否住院"} style={{padding: 10, marginTop: 5}}
                           changeCheck={(check) => this.setState({inpatient: check})}/>
                {this.state.inpatient ? NextView.getSettingImgItemL(() => {
                }, "就诊医院", undefined, "请选择", true, true) : null}
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