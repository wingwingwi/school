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
import Swiper from 'react-native-swiper'
import DateModel from "../../model/DateModel";
import ChooseIModel from "../../model/ChooseIModel";
import BListView from "../../component/BListView";
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
            showH: false, listH: [],listbj: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] ,listch: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] //定义属性
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
            </View>);
    }


    leave() {
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
        <BListView
                   ref={ref => (this.listView = ref)}
                   ListEmptyComponent={this._listEmptyComponent}
                   list={this.state.listch}
                   renderRefresh={() => this._get(false)}
                   itemView={this._renderItema}/>
        </View>;
    }

    sickLeave() {
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            <BListView
                ref={ref => (this.listView = ref)}
                ListEmptyComponent={this._listEmptyComponent}
                list={this.state.listbj}
                renderRefresh={() => this._get(false)}
                itemView={this._renderItemb}/>
        </View>;
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

    /**item view 事假 */
    _renderItema = item => {
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
                            <Text style={{color: '#0099FF', fontSize: 12, marginTop: 5}} numberOfLines={1}>开始时间：2019-03-15 08：00</Text>
                            <Text style={{color: '#82868B', fontSize: 12, marginTop: 5}} numberOfLines={1}>家中有事，需要带孩子参加</Text>
                        </View>
                    </View>
                </Button>
                <View style={{width: null, height: 1, marginTop: 10, backgroundColor: '#eee'}}/>
            </View>
        );
    };

    /**item view 病假 */
    _renderItemb = item => {
        return (<View style={{backgroundColor: "#fff", paddingLeft: 10, paddingRight: 10}}>

                <Button onPress={() => {
                Actions.message();
            }}>
                    <View style={{width: size.width, padding: 10, flexDirection: 'row'}}>
                        <Image style={{width: 55, height: 55}} source={src.gerenxiaoxi_btn}/>
                        <View style={{height: 65, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                            <Text style={{color: '#111111', fontSize: 15,fontWeight:'bold',marginTop:15}}>
                                张萌萌
                            </Text>
                            <Text style={{color: '#0099FF', fontSize: 12, marginTop: 5}} numberOfLines={1}>开始时间：2019-03-15 08：00</Text>
                            <Text style={{color: '#82868B', fontSize: 12, marginTop: 5}} numberOfLines={1}>疾病名称：感冒</Text>
                            <Text style={{color: '#82868B', fontSize: 12, marginTop: 5}} numberOfLines={1}>症状：发烧，咳嗽</Text>
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