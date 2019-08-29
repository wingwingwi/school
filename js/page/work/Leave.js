import React from 'react';

import {
    DeviceEventEmitter,
    InteractionManager,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getArrStr, isNotEmpty, showMsg, size, tailoringTime, upload} from '../../utils/Util';
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
import {_token} from "../../constant/Constants";

/**
 * 请假页面
 * @class
 */
export default class Leave extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0, open: false, cwj: false, inpatient: false, picture: false, showTime: false,
            startTime: '', endTime: '', timeType: 0, startBTime: '', endBTime: '', bName: '',
            bState: '', hospital: '', jiuzheng: '', showC: false,
            list: [], showH: false, listH: [], pageTitle: '我要请假', commitText: '提交'
        };
    }

    /**主布局*/
    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={this.state.pageTitle} onSelect={() => {
                    Actions.pop()
                }}/>
                <TextBar list={["事假", "病假"]} changeTab={(index) => {
                    this.setState({tab: index})
                }} ref={ref => this.textBar = ref}/>
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
                                Actions.inputPage({event: eventType, eventName: 'bState'})//症状信息
                            } else this.setState({showC: false, bState: data.name})
                        } else if (this.state.timeType == 5) {//疾病名称
                            this.jbmcIds = data.id
                            if (data.isHasOther) {//自定义数据
                                this.setState({showC: false, bName: data.name})
                                Actions.inputPage({event: eventType, eventName: 'bName'})//疾病信息
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

    /**事假View展示*/
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
                    <Text style={{color: '#fff', fontSize: 18}}>{this.state.commitText}</Text>
                </LinearGradient>
            </Button>
        </ScrollView>
    }

    /**病假View展示*/
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
                <CheckView title={"是否学校老师发现生病并通知家长"} style={{padding: 10, marginTop: 2}}
                           ref={ref => this.checkCwj = ref}
                           changeCheck={(check) => this.setState({cwj: check})}/>
                <CheckView title={"是否就医"} style={{padding: 10, marginTop: 2}}
                           ref={ref => this.checkHosptail = ref}
                           changeCheck={(check) => this.setState({open: check})}/>
                {this.state.open ? NextView.getSettingImgItemS(() => {
                    this.setState({showC: true, list: disease2, timeType: 5})
                }, "疾病名称", this.state.bName, true, true, '请选择') : null}
                {this.state.open ? NextView.getSettingImgItemS(() => {
                    Actions.inputPage({event: eventType, eventName: 'jiuzheng', text: this.state.jiuzheng})//获取就诊医院
                }, "就诊医院", this.state.jiuzheng, true, true, "请输入") : null}
                <CheckView title={"上传病历以及相关材料"} style={{padding: 10, marginTop: 2}}
                           ref={ref => this.checkFiles = ref}
                           changeCheck={(check) => this.setState({picture: check})}/>
                {this.state.picture ? <ImgsView ref={ref => this.imgsView = ref}/> : null}
                <CheckView title={"是否住院"} style={{padding: 10, marginTop: 2}}
                           ref={ref => this.checkInpatient = ref}
                           changeCheck={(check) => this.setState({inpatient: check})}/>
                {this.state.inpatient ? NextView.getSettingImgItemS(() => {
                    Actions.inputPage({event: eventType, eventName: 'hospital', text: this.state.hospital})//获取住院信息
                }, "住院医院", this.state.hospital, true, true, "请输入") : null}
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
                    <Text style={{color: '#fff', fontSize: 18}}>{this.state.commitText}</Text>
                </LinearGradient>
            </Button>
            <View style={{height: 50}}/>
        </ScrollView>
    }

    /**提交事假假资料*/
    commitLeave() {
        var param = {}
        if (this.props.item != undefined && this.props.item.lb != undefined) {
            param.id = this.props.item.id;
        }
        param.targetId = _token.t;
        param.startTime = this.state.startTime
        param.remk = this.mContent.text()
        if (!isNotEmpty(param.startTime)) {
            showMsg('请提交完整假单')
        } else {
            param.startTime = param.startTime
            this.request(URL_LEAVE_MATTER, param)
        }

    }

    /**初始化传入参数数据*/
    creatData() {
        var data = this.props.item;//获取相关数据
        if (data.lb != 1) {//病假
            this.setState({
                startBTime: tailoringTime(data.startTime),
                endBTime: tailoringTime(data.fallTime),
                inpatient: data.inHospital == 1,
                open: data.seeDoctor == 1,
                bState: data.zyzz,//症状信息
                hospital: data.inpatientHospital,
                jiuzheng: data.visitHospital,
                bName: data.jbmc,
                picture: data.fileList.length == 0 ? 0 : 1,
            })
        } else {//事假
            console.log('time========' + tailoringTime(data.startTime))
            this.setState({startTime: tailoringTime(data.startTime)})
        }
    }

    /**初始化组件view状态数据*/
    creatViewData() {
        this.zyzzIds = ''//症状ID
        this.jbmcIds = ''//疾病ID
        if (this.props.item != undefined && this.props.item.lb != undefined) {//获取当前传入的数据
            this.textBar.clock()
            if (this.props.item.lb != 1) {//属于病假
                this.textBar.tab(1)//跟新标题
                this.checkInpatient.check(this.state.inpatient)////是否住院
                this.checkHosptail.check(this.state.open)//是否就医
                this.checkFiles.check(this.state.picture)//是否有图片
                this.checkCwj.check(false)//是否通知家长知晓
                if (this.imgsView) this.imgsView.setPic(this.props.item.fileList)//设置网络图片
                //设置症状和疾病名称
                if (this.props.item.diseaseList != undefined && this.props.item.diseaseList.length > 0)
                    for (var i = 0; i < this.props.item.diseaseList.length; i++) {
                        if (this.props.item.diseaseList[i].diseaselb == 1) {//症状，获取他的ID
                            if (!isNotEmpty(this.props.item.diseaseList[i].id))
                                this.zyzzIds = this.zyzzIds != '' ? (',' + this.props.item.diseaseList[i].id) : this.props.item.diseaseList[i].id
                        } else if (this.props.item.diseaseList[i].diseaselb == 2) {//疾病名称，获取他的ID
                            if (!isNotEmpty(this.props.item.diseaseList[i].id)) {
                                this.jbmcIds = this.jbmcIds != '' ? (',' + this.props.item.diseaseList[i].id) : this.props.item.diseaseList[i].id
                            }
                        }
                    }
            } else {
                this.mContent.text(this.props.item.remk)
            }
        }
    }

    /**整合病假参数*/
    commitSickLeave() {
        var param = {}
        if (this.props.item != undefined && this.props.item.lb != undefined) {
            param.id = this.props.item.id;
        }
        param.targetId = _token.t;
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
                //showMsg("就医需要上传相关报告图片")
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
            if (pic.indexOf('http') != -1) {//已经是网络图片了，就不需要上传机制
                this.uploadImg.push(pic);
                showMsg('', this.loadKey);//清理对话框
                if (this.isNotFinish)
                    this._upload(times + 1, param);
            } else
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

    /**发起请求*/
    request(url, param) {
        this.loadKey = showMsg("正在提交假条...", 3)
        postCache(url, param, (data) => {
            showMsg('', this.loadKey, '提交成功')
            if (this.props.item != undefined && this.props.item.lb != undefined) {
                DeviceEventEmitter.emit('leaveList', {isRefresh: true});//通知数据刷新
            }
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
            this.requestList()//获取配置信息
            this.creatViewData()//设置view
        })
        this.isNotFinish = true
    }

    componentWillMount() {
        super.componentWillMount()
        if (this.props.item != undefined && this.props.item.lb != undefined) {//获取当前传入的数据
            console.log(JSON.stringify(this.props.item))
            if (this.props.item.lb != 1) {//属于病假
                this.setState({tab: 1, pageTitle: '修改申请', commitText: '确认'})//设定显示内容
            } else this.setState({pageTitle: '修改申请', commitText: '确认'})
            this.creatData()
        }
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {
            var param = {};
            console.log(JSON.stringify(item))
            if (item.key == 'bState') {//症状，在后面添加
                this.zyzzIds = ''//this.zyzzIds ? `${this.zyzzIds},${item.text}` : `${item.text}`
                param[item.key] = this.state.bState ? `${this.state.bState},${item.text}` : `${item.text}`
            } else if (item.key == 'bName') {//疾病名称，在后面添加信息
                this.jbmcIds = ''//this.jbmcIds ? `${this.jbmcIds},${item.text}` : `${item.text}`
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
        showMsg('', this.loadKey);//清理对话框
    }

    /**获取配置参数*/
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
