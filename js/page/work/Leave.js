import React, {Component} from 'react';

import {
    View,
    Text, Alert,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    ScrollView,
    InteractionManager, DeviceEventEmitter
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getArrStr, getDateTime, isNotEmpty, showMsg, size, upload} from '../../utils/Util';
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
import {postCache} from "../../utils/Resquest";
import {URL_LEAVE_ILLNESS, URL_LEAVE_MATTER, URL_QUERY_DISEASE, URL_UPLOAD} from "../../constant/Url";
import BasePage from "../BasePage";

/**
 * @class
 */
export default class Leave extends BasePage {
    constructor(props) {
        super(props);
        this.state = {//设置初值
            tab: 0,
            open: false,
            inpatient: false,
            picture: false,
            showTime: false,
            startTime: '',
            endTime: '',
            timeType: 0,
            startBTime: '',
            endBTime: '',
            bName: '',
            bState: '',
            hospital: '',
            jiuzheng: '',
            showC: false,
            list: [],
            showH: false,
            listH: []
        };
        this.pics = [];
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
                        if (this.state.timeType == 4) {//症状
                            this.zyzzIds = data.id
                            if (data.isHasOther) {
                                this.setState({showC: false, bState: data.name})
                                Actions.inputPage({
                                    event: eventType,
                                    eventName: 'bState'
                                })
                            } else this.setState({showC: false, bState: data.name})
                        } else if (this.state.timeType == 5) {//疾病名称
                            this.jbmcIds = data.id
                            if (data.isHasOther) {//自定义数据
                                this.setState({showC: false, bName: data.name})
                                Actions.inputPage({
                                    event: eventType,
                                    eventName: 'bName'
                                })
                            } else this.setState({showC: false, bName: data.name})
                        } else this.setState({showC: false})
                    } else this.setState({showC: false})
                }}/>
                <PickerModel show={this.state.showH} list={this.state.listH} closeModal={(item) => {
                    if (item) this.setState({hospital: item})
                    this.setState({showH: false})
                }}/>
            </View>);
    }

    leave() {
        return <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{flex: 1}}>
            <View style={{height: 10}}/>
            <View style={{width: size.width}}>
                {NextView.getSettingImgItemS(() => {
                    this.setState({showTime: true, timeType: 0})
                }, "开始时间", this.state.startTime, true, true, "请选择")}
                {/*{NextView.getSettingImgItemS(() => {*/}
                {/*this.setState({showTime: true, timeType: 1})*/}
                {/*}, "结束时间", this.state.endTime, true, true, "请选择")}*/}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemL(() => {
                }, "请假事由", undefined, "", true, false)}
            </View>
            <TouchableOpacity activeOpacity={1}
                              style={{backgroundColor: '#fff', height: 120, padding: 15}}
                              onPress={() => this.mContent.focus()}>
                <EditView ref={ref => (this.mContent = ref)} style={styles.lineEdit}
                          placeholder={'请输入请假事由'} multiline={true}/>
            </TouchableOpacity>
            <Button onPress={() => {
                this.commitLeave()
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
        return <ScrollView contentContainerStyle={{alignItems: 'center'}} style={{flex: 1}}>
            <View style={{height: 10}}/>
            <View style={{width: size.width}}>
                {NextView.getSettingImgItemS(() => {
                    this.setState({showTime: true, timeType: 2})
                }, "请假时间", this.state.startBTime, true, true, '请选择')}
                {NextView.getSettingImgItemS(() => {
                    this.setState({showTime: true, timeType: 3})
                }, "发病时间", this.state.endBTime, true, true, '请选择')}
                <View style={{height: 10}}/>
                {NextView.getSettingImgItemS(() => {
                    this.setState({showC: true, list: disease1, timeType: 4})
                }, "主要症状", this.state.bState, true, true, '请选择')}

                <View style={{height: 5}}/>
                <CheckView title={"是否就医"} style={{padding: 10, marginTop: 2}}
                           changeCheck={(check) => this.setState({open: check})}/>
                {this.state.open ? NextView.getSettingImgItemS(() => {
                    this.setState({showC: true, list: disease2, timeType: 5})
                }, "疾病名称", this.state.bName, true, true, '请选择') : null}
                {this.state.open ? NextView.getSettingImgItemS(() => Actions.inputPage({
                    event: eventType, eventName: 'jiuzheng', text: this.state.jiuzheng
                }), "就诊医院", this.state.jiuzheng, true, true, "请输入") : null}
                <CheckView title={"上传病例以及相关材料"} style={{padding: 10, marginTop: 2}}
                           changeCheck={(check) => this.setState({picture: check})}/>
                {this.state.picture ? <ImgsView ref={ref => this.imgsView = ref}/> : null}
                <CheckView title={"是否住院"} style={{padding: 10, marginTop: 2}}
                           changeCheck={(check) => this.setState({inpatient: check})}/>
                {this.state.inpatient ? NextView.getSettingImgItemS(() => Actions.inputPage({
                    event: eventType, eventName: 'hospital', text: this.state.hospital
                }), "住院医院", this.state.hospital, true, true, "请输入") : null}
            </View>
            <Button onPress={() => {
                this.commitSickLeave();
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
            <View style={{height: 50}}/>
        </ScrollView>
    }

    setPic() {
        setTimeout(() => {
        }, 100)
    }

    commitLeave() {
        var param = {}
        param.startTime = this.state.startTime
        param.remk = this.mContent.text()
        if (!isNotEmpty(param.startTime)) {
            showMsg('请提交完整假单')
        } else {
            param.startTime = param.startTime
            this.request(URL_LEAVE_MATTER, param)
        }

    }

    commitSickLeave() {
        var param = {}
        param.fallTime = this.state.endBTime//发病时间
        param.inHospital = this.state.inpatient ? 1 : 0//0=未住院 1=已住院
        param.isJbmc = !isNotEmpty(this.jbmcIds) ? 1 : 0//疾病名称 0=非自定义 1=自定义
        param.isZyzz = !isNotEmpty(this.zyzzIds) ? 1 : 0//0=非自定义 1=自定义
        param.jbmcIds = isNotEmpty(this.jbmcIds) ? this.jbmcIds : this.state.bName//疾病名称数据集,1.如果isJbmc=0,传id(多个用,隔开） 2.如果isJbmc=1,传自定义文本
        param.remk = this.state.hospital//备注，医院信息 **********
        param.seeDoctor = this.state.open ? 1 : 0//0=未就医 1=已就医
        param.startTime = this.state.startBTime//请假日期
        param.inpatientHospital = this.state.hospital//住院医院 **********
        param.visitHospital = this.state.jiuzheng//就诊医院 **********
        //param.urls = ''//相关材料照片(多张用,隔开) ***********
        param.zyzzIds = isNotEmpty(this.zyzzIds) ? this.zyzzIds : this.state.bState//主要症状数据集,1.如果isZyzz=0,传id(多个用,隔开） 2.如果isZyzz=1,传自定义文本
        console.log(JSON.stringify(param))
        if (!isNotEmpty(param.fallTime) || !isNotEmpty(param.startTime) || !isNotEmpty(this.state.bState)) {
            showMsg(!isNotEmpty(this.state.bState) ? '输入病状信息' : "选择时间")
        } else {
            if (this.state.open && !(this.imgsView && this.imgsView.getPic().length > 0)) {
                showMsg("就医需要上传相关报告图片")
            }
            // param.fallTime = param.fallTime
            // param.startTime = param.startTime
            this.uploadImg = []
            this._upload(0, param)
        }
    }

    /**上传图片*/
    _upload(times, param) {
        if (this.imgsView && times < this.imgsView.getPic().length && param.seeDoctor == 1) {
            if (this.imgsView.getPic().length > 1) {
                this.loadKey = showMsg('上传第' + times + '张', 3);
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
            if (param.seeDoctor == 1 && this.uploadImg.length > 0)
                param.urls = getArrStr(this.uploadImg)
            if (this.isNotFinish)
                this.request(URL_LEAVE_ILLNESS, param)
        }
    }

    request(url, param) {
        this.loadKey = showMsg("正在提交假条...", 3)
        postCache(url, param, (data) => {
            showMsg('', this.loadKey, '提交成功')
            Actions.pop()
            // Alert.alert('提交成功', '请选择复课时间', [{
            //     text: '复课', onPress: () => {
            //         Actions.replace("leaveList", {resumeStatus: 0})
            //     }
            // }, {
            //     text: '先等等', onPress: () => {
            //         Actions.pop()
            //     }
            // }])
        }, false, (err) => showMsg('', this.loadKey, err))
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.requestList()
        })
        this.isNotFinish = true
    }

    componentWillMount() {
        super.componentWillMount()
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {
            var param = {};
            console.log(JSON.stringify(item))
            if (item.key == 'bState') {//症状
                this.zyzzIds = this.zyzzIds ? `${this.zyzzIds},${item.text}` : `${item.text}`
                param[item.key] = this.state.bState ? `${this.state.bState},${item.text}` : `${item.text}`
            } else if (item.key == 'bName') {//疾病名称
                this.jbmcIds = this.jbmcIds ? `${this.jbmcIds},${item.text}` : `${item.text}`
                param[item.key] = this.state.bName ? `${this.state.bName},${item.text}` : `${item.text}`
            } else
                param[item.key] = item.text;
            this.setState(param)
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.isNotFinish = false
        this.listener && this.listener.remove();
    }

    requestList() {
        //症状
        postCache(URL_QUERY_DISEASE, {lb: 1}, (data) => {
            disease1 = data;
        }, true)
        //疾病
        postCache(URL_QUERY_DISEASE, {lb: 2}, (data) => {
            disease2 = data;
        }, false)
    }
}

var disease1 = [];
var disease2 = [];
const list1 = [{name: '发热'}, {name: '咳嗽'}, {name: '头痛'}, {name: '脚痛'}, {name: '屁股痛'}, {name: '鸡冻'}, {name: '自定义'}]
const list2 = [{name: '医院'}, {name: '医院2'}, {name: '医院'}, {name: '医院4'}, {name: '医院5'}, {name: '医院6'}, {name: '医院7'}, {name: '医院8'}]
const list3 = [{name: '感冒'}, {name: '扁桃体发炎'}, {name: '手足口病'}, {name: '水痘'}, {name: '风疹'}, {name: '麻疹'}, {name: '腮腺炎'}
    , {name: '猩红热'}
    , {name: '肺结核'}
    , {name: '甲肝'}
    , {name: '其他传染病'}
    , {name: '其他非传染病'}
    , {name: '原因不明疾病'}
    , {name: '自定义11'}
]

const eventType = 'userInfo'
const eventName = 'userName'

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