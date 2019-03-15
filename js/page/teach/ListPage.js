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
 *
 *
 * @export
 * @class TeachMain
 * @extends {Component<Props>}
 */
export default class ListPage extends Component<Props> {
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
                <NarBar title={"请假列表"} onSelect={() => Actions.pop()}/>
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

    headerComponent() {
        var h = (size.width - 20) * 290 / 690
        return <View style={{backgroundColor: '#fff'}}>
            <View style={{marginLeft: 10, marginRight: 10}}>
                <Swiper style={{width: null, height: h}}>
                    <Button onPress={()=>{Actions.webPage()}}>
                        <Image style={{width: null, height: h}} source={src.banner_pic2}/>
                    </Button>
                </Swiper>
            </View>
            <View style={{top:10, marginLeft: 9,marginRight: 9, flexDirection: 'row', padding: 5, alignItems: 'center',backgroundColor: '#FFEDD3'}}>
                <Image style={{height: 16, width: 16}} source={src.teachnotice}/>
                <Text style={{color: '#333333', fontSize: 11, marginLeft: 10}}>近期学生生病人数较多，请老师注意学生健康状况</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', margin:10}}>
                {this.itemView(src.teachbingjia, "病假", () => Actions.resumeStudy())}
                {this.itemView(src.teachshijia, "事假", () => Actions.message())}
            </View>
            <View style={{backgroundColor: '#f5f5f5', height: 12}}/>
            <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                <View style={{height: 16, width: 3, backgroundColor: '#0099FF'}}/>
                <Text style={{color: '#0099FF', fontSize: 17, marginLeft: 10}}>今日出勤概况</Text>
            </View>
            <View style={{width: null, height: 1, backgroundColor: '#e5e5e5'}}/>
            <Text style={{padding:15,color: '#333333', fontSize: 15, marginLeft: 10}}>应到35人，实到25人</Text>
            <View style={{backgroundColor: '#f5f5f5', height: 12}}/>
            <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                <View style={{height: 16, width: 3, backgroundColor: '#0099FF'}}/>
                <Text style={{color: '#0099FF', fontSize: 17, marginLeft: 10}}>今日请假概况</Text>
            </View>
            <View style={{width: null, height: 1, backgroundColor: '#e5e5e5'}}/>
        </View>
    }

    itemView(pic, text, callback) {
        return <TouchableOpacity onPress={callback}
                                 style={{
                                     flex: 1,
                                     paddingTop: 15,
                                     paddingBottom: 15,
                                     justifyContent: 'center',
                                     alignItems: 'center'
                                 }}>

            <ImageBackground style={{width: (size.width - 45)/2, height: ((size.width - 45)/2)*75/165}}
                             source={pic}>
                <Text style={{color: '#fff', fontSize: 14, right:58,top:23,position:'absolute'}}>{text}</Text>
                <Text style={{color: '#fff', fontSize: 11, right:32,top:43,position:'absolute'}}>点击查看 ></Text>
            </ImageBackground>
        </TouchableOpacity>
    }

    /**item view */
    _renderItem = item => {
        var h = (size.width - 30) * 73 / 3 / 112
        return (<View style={{backgroundColor: "#fff", paddingLeft: 10, paddingRight: 10}}>

                <Button onPress={() => {
                Actions.message();
            }}>
                    <View style={{width: size.width, padding: 10, flexDirection: 'row'}}>
                        <Image style={{width: 55, height: 55}} source={src.gerenxiaoxi_btn}/>
                        <View style={{height: 44, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                            <Text style={{color: '#111111', fontSize: 15,fontWeight:'bold',marginTop:15}}>
                                张大大
                            </Text>
                            <Text style={{color: '#0099FF', fontSize: 12, marginTop: 5}} numberOfLines={1}>事假申请</Text>
                            <Text style={{color: '#82868B', fontSize: 12, marginTop: 5}} numberOfLines={1}>感冒   发烧咳嗽</Text>
                        </View>
                    </View>
                </Button>
                <View style={{width: null, height: 1, marginTop: 10, backgroundColor: '#eee'}}/>
            </View>
        );
    };


    /**空数据时候展示*/
    _listEmptyComponent = () => {
        return (
            <View
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text style={{color: "#999", fontSize: 15, marginTop: 50}}>
                    暂无数据
                </Text>
            </View>
        );
    };

    /**头部请求*/
    _get(isShow) {
        setTimeout(() => {
            this.listView.setRefreshing(false);
        }, 1000);
    }

    /**即将挂载-处理参数*/
    componentWillMount() {
    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
    }

    /**卸载*/
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

}

const content = '所谓安全教育就是指孩子解决各种安全问题的能力，良好的安全教育可以让孩子在没有大人帮助的情况下也能自己保护好自己。'
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