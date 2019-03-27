import React, {Component} from 'react';

import {
    View, Text, StyleSheet, Image, TextInput, ImageBackground, Alert, ScrollView,
    TouchableOpacity,DeviceEventEmitter
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getArrStr, isNotEmpty, showMsg, size, upload} from '../../utils/Util';
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
import {URL_ILLNESS_RESUME, URL_MATTER_RESUME, URL_UPLOAD} from "../../constant/Url";
import BasePage from "../BasePage";


/**
 * @class
 */
export default class ResumeStudy extends BasePage {
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
                <NarBar title={"我要复课" + (this.props.lb == 1 ? "(事假)" : "(病假)")} onSelect={() => Actions.pop()}/>
                {/*<TextBar list={["事假", "病假"]} changeTab={(index) => {*/}
                {/*this.setState({tab: index})*/}
                {/*}}/>*/}
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
                }), "复课时间", this.state.resumeTime, true, true, "请选择")}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemL(() => {
                }, "备注", undefined, "", true, false)}
            </View>
            <TouchableOpacity activeOpacity={1}
                              style={{backgroundColor: '#fff', height: 120, padding: 15}}
                              onPress={() => this.mContent.focus()}>
                <EditView ref={ref => (this.mContent = ref)} style={styles.lineEdit} numberOfLines={4}
                          placeholder={'请输入备注内容'} multiline={true}/></TouchableOpacity>
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
        return <ScrollView contentContainerStyle={{ alignItems: 'center'}} style={{flex: 1}}>
            <View style={{width: size.width}}>
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemS(() => this.setState({
                    showTime: true,
                    isIll: 1
                }), "复课时间", this.state.illnessTime, true, true, "请选择")}
                <View style={{height: 10}}/>
                <CheckView title={"是否痊愈"} style={{padding: 10, marginTop: 5}} ref={ref => this.check1 = ref}/>
                <CheckView title={"是否有医院证明"} style={{padding: 10, paddingTop: 0, marginTop: 5}}
                           changeCheck={(check) => this.setState({inpatient: check})} ref={ref => this.check2 = ref}/>
                {this.state.inpatient ?
                    <Text style={{backgroundColor: '#fff', padding: 10, width: size.width}}>上传病例以及相关材料</Text> : null}
                {this.state.inpatient ? <ImgsView ref={ref => this.imgsView = ref}/> : null}
                <Text style={{color: '#E64340', fontSize: 12, padding: 10, lineHeight: 18}}>{notice}</Text>
                {NextView.getSettingImgItemL(() => {
                }, "备注", undefined, "", true, false)}
                <TouchableOpacity activeOpacity={1}
                                  style={{backgroundColor: '#fff', height: 120, padding: 15}}
                                  onPress={() => this.mContent.focus()}>
                    <EditView ref={ref => (this.mContent1 = ref)} style={styles.lineEdit} numberOfLines={4}
                              placeholder={'请输入备注内容'} multiline={true}/></TouchableOpacity>
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


    /**上传图片*/
    _upload(times, param) {
        if (this.imgsView&&times < this.imgsView.getPic().length && param.inProve == 1) {
            if (this.imgsView.getPic().length > 1) {
                var index=times+1;
                this.loadKey = showMsg(`上传第${index}张`, 3);
            } else
                this.loadKey = showMsg('上传中...', 3);
            var arr = this.imgsView.getPic();
            var pic = arr[times].img.uri;
            upload(URL_UPLOAD, pic, (data) => {
                showMsg('', this.loadKey);
                this.uploadImg.push(data.fileUrl);
                if (this.isNotFinish)
                    this._upload(times + 1, param);
            }, (error) => {
                showMsg('', this.loadKey, error);
            })
        } else {
            if (param.inProve == 1 && this.uploadImg.length > 0)
                param.urls = getArrStr(this.uploadImg)
            if (this.isNotFinish){
                //console.log(JSON.stringify(param))
                this.request(URL_ILLNESS_RESUME, param)
            }


        }
    }

    matterResume() {
        if (!isNotEmpty(this.state.resumeTime) || !isNotEmpty(this.mContent.text())) {
            showMsg('请输入时间和备注信息')
            return
        }
        var param = {endTime: this.state.resumeTime , remk: this.mContent.text()};
        this.request(URL_MATTER_RESUME, param);
    }

    illnessResume() {
        if (!isNotEmpty(this.state.illnessTime)) {
            showMsg('请输入时间')
            return
        }
        var param = {
            endTime: this.state.illnessTime ,
            inProve: this.check2.check() ? 1 : 0,
            isRecovery: this.check1.check() ? 1 : 0,
            remk: this.mContent1.text(),
        };
        this.uploadImg = []
        this._upload(0, param)
    }

    request(url, param) {
        this.loadKey = showMsg("提交申请中...", 3)
        param["leaveProId"] = this.props.id;
        postCache(url, param, (data) => {
            showMsg('', this.loadKey, '提交成功')
            DeviceEventEmitter.emit('leavelist', '')
            Actions.pop()
            //Alert.alert('提交成功', '稍后你会得到班主任的回复消息')
        }, false, (err) => showMsg('', this.loadKey, err))
    }

    componentDidMount() {
        this.isNotFinish = true
    }
    componentWillMount(){
        super.componentWillMount();
        this.setState({tab: (this.props.lb == 1 ? 0 : 1)})
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.isNotFinish = false
    }

}
const notice = '* 手足口为国家法定传染病，需持有校医（保健老师）出具的复课证需持有校医（保健老师）出具的复课证明或持有医院开具的痊愈证明方可复课明或持有医院开具的痊愈证明方可复课。'
const styles = StyleSheet.create({
    lineText: {
        fontSize: 17, color: '#333', width: 80, marginTop: 10, marginLeft: 10
    },
    lineEdit: {
        width: size.width - 30,
        fontSize: 15,
        maxHeight: 90,
        lineHeight: 22,
        textAlign: 'auto'
    }
});