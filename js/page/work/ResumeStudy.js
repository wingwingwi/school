import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, ImageBackground, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
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
import {postCache} from "../../utils/Resquest";
import {URL_ILLNESS_RESUME, URL_MATTER_RESUME} from "../../constant/Url";


/**
 * @class
 */
export default class ResumeStudy extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {//设置初值
            tab: 0,
            inpatient: false,
            showTime: false,
            resumeTime: '',
            illnessTime: '',
            isIll: 0,
            remk: '',
            illnessRemk: ''
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"我要复课"} onSelect={() => Actions.pop()}/>
                <TextBar list={["事假", "病假"]} changeTab={(index) => {
                    this.setState({tab: index})
                }}/>
                {this.state.tab == 0 ? this.leave() : this.sickLeave()}
                <DateModel show={this.state.showTime} closeModal={(date) => {
                    var item = {}
                    if (date) {
                        if (this.state.isIll == 0)
                            item.resumeTime = date
                        else item.illnessTime = date
                    }
                    item.showTime = false;
                    this.setState(item);
                }}/>
            </View>);
    }

    leave() {
        return <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
            <View style={{height: 10}}/>
            <View style={{width: size.width}}>
                {NextView.getSettingImgItemS(() => this.setState({
                    showTime: true,
                    isIll: 0
                }), "结束时间", this.state.resumeTime, true, true, "请选择")}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemL(() => {
                }, "备注", undefined, "", true, false)}
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <EditView ref={ref => (this.mContent = ref)} style={styles.lineEdit} numberOfLines={4}
                          placeholder={'请输入备注内容'} multiline={true}/>
            </View>
            <Button onPress={() => {
                this.matterResume()
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
            <View style={{width: size.width}}>
                {NextView.getSettingImgItemS(() => this.setState({
                    showTime: true,
                    isIll: 1
                }), "结束时间", this.state.illnessTime, true, true, "请选择")}
                <View style={{height: 10}}/>
                <CheckView title={"是否痊愈"} style={{padding: 10, marginTop: 5}} ref={ref => this.check1 = ref}/>
                <CheckView title={"是否有医院证明"} style={{padding: 10, paddingTop: 0, marginTop: 5}}
                           changeCheck={(check) => this.setState({inpatient: check})} ref={ref => this.check2 = ref}/>
                {this.state.inpatient ?
                    <Text style={{backgroundColor: '#fff', padding: 10, width: size.width}}>上传病例以及相关材料</Text> : null}
                {this.state.inpatient ? <ImgsView/> : null}
                <Text style={{color: '#E64340', fontSize: 12, padding: 10, lineHeight: 18}}>{notice}</Text>
                {NextView.getSettingImgItemL(() => {
                }, "备注", undefined, "", true, false)}
                <View style={{backgroundColor: '#fff'}}>
                    <EditView ref={ref => (this.mContent1 = ref)} style={styles.lineEdit} numberOfLines={4}
                              placeholder={'请输入备注内容'} multiline={true}/>
                </View>
            </View>
            <Button onPress={() => {
                this.illnessResume()
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

    matterResume() {
        if (!isNotEmpty(this.state.resumeTime) || !isNotEmpty(this.mContent.text())) {
            showMsg('请输入时间和备注信息')
            return
        }
        this.loadKey = showMsg('提交申请中...', 3)
        postCache(URL_MATTER_RESUME, {endTime: this.state.resumeTime + ':00', remk: this.mContent.text()}, (data) => {
            showMsg('', this.loadKey, '提交成功')
        }, false, error => showMsg('', this.loadKey, error))
    }

    illnessResume() {
        if (!isNotEmpty(this.state.illnessTime)) {
            showMsg('请输入时间')
            return
        }
        this.loadKey = showMsg('提交申请中...', 3)
        postCache(URL_ILLNESS_RESUME, {
            endTime: this.state.illnessTime + ':00',
            inProve: this.check2.check() ? 1 : 0,
            isRecovery: this.check1.check() ? 1 : 0,
            remk: this.mContent1.text(),
        }, (data) => {
            showMsg('', this.loadKey, '提交成功')
        }, false, error => showMsg('', this.loadKey, error))
    }


}
const notice = '* 手足口为国家法定传染病，需持有校医（保健老师）出具的复课证需持有校医（保健老师）出具的复课证明或持有医院开具的痊愈证明方可复课明或持有医院开具的痊愈证明方可复课。'
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