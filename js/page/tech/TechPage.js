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
import Swiper from 'react-native-swiper'
import src from "../../constant/Src";
import {postCache} from "../../utils/Resquest";
import {URL_ATTENDANCE, URL_BANNERS, URL_TOADY_LEAVES} from "../../constant/Url";

/**
 * @class Test 是例子
 */
export default class TechPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {name: "测试", refreshing: false, list: [], reachedNum: 0, actualNum: 0, listS: []}; //定义属性
        this.key = 100
    }

    render() {
        var h = (size.width - 20) * 290 / 690
        return (
            <View style={styles.container}>
                <View>
                    <NarBar title={'学生卫生平台'}/>
                    <Text style={{
                        padding: 15,
                        color: '#0099FF',
                        fontSize: 15,
                        position: 'absolute',
                        bottom: 0
                    }} onPress={() => {
                        Actions.login()
                    }}>李芳芳</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{paddingTop: 0}}
                    removeClippedSubviews
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                >
                    <View style={{backgroundColor: '#fff', width: size.width}}>
                        <View style={{marginLeft: 15, marginRight: 15}}>
                            <Swiper style={{width: null, height: h}}
                                    dot={<View style={{
                                        backgroundColor: '#fff',
                                        width: 6,
                                        height: 6,
                                        borderRadius: 3,
                                        marginLeft: 3,
                                        marginRight: 3,
                                        marginTop: 3,
                                        marginBottom: 3,
                                    }}/>}
                                    activeDot={<View style={{
                                        backgroundColor: 'grey',
                                        width: 6,
                                        height: 6,
                                        borderRadius: 3,
                                        marginLeft: 3,
                                        marginRight: 3,
                                        marginTop: 3,
                                        marginBottom: 3
                                    }}/>}
                                    paginationStyle={{
                                        bottom: 10, left: null, right: 10
                                    }}>
                                {this.state.list.length > 0 ? (this.state.list.map((item, idx) => {
                                    return <Button onPress={() => {
                                        Actions.webPage({url: item.linkUrl, id: item.id});
                                    }} key={idx}>
                                        <Image style={{width: null, height: h, borderRadius: 5}}
                                               source={{uri: item.pictureUrl}}/>
                                    </Button>
                                })) : <Button onPress={() => {
                                }}>
                                    <Image style={{width: null, height: h, borderRadius: 5}} source={src.banner_pic2}/>
                                </Button>}

                            </Swiper>
                        </View>
                    </View>
                    <View style={{backgroundColor: '#fff', width: size.width}}>
                        <View style={{
                            marginTop: 10, marginLeft: 15, marginRight: 15, width: null, height: 20,
                            backgroundColor: '#FFEDD3', borderRadius: 3, flexDirection: 'row', alignItems: 'center'
                        }}>
                            <Image source={src.tongzhi_icon} style={{width: 16, height: 16, marginLeft: 10}}/>
                            <Text style={{color: '#333', fontSize: 11, marginLeft: 10}}>今日暂无学生请假</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingTop: 15,
                        paddingLeft: 5,
                        paddingRight: 5,
                        paddingBottom: 15,
                        width: size.width,
                        backgroundColor: '#fff'
                    }}>
                        {this.itemView(src.shijia_btn, "事假", '点击前往 >', () => Actions.studentList({}))}
                        {this.itemView(src.bingjia_btn, "病假", '点击前往 >', () => Actions.studentList({isType: true}))}
                    </View>
                    <View style={{backgroundColor: '#f5f5f5', height: 12}}/>
                    <View style={{flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff'}}>
                        <View style={{height: 16, width: 3, backgroundColor: '#0099FF'}}/>
                        <Text style={{color: '#0099FF', fontSize: 17, marginLeft: 10}}>今日出勤状况</Text>
                    </View>
                    <View style={{width: null, height: 1, backgroundColor: '#e5e5e5'}}/>
                    <View style={{flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff'}}>
                        <Text style={{color: '#0099FF', fontSize: 17}}><Text
                            style={{
                                color: '#333',
                                fontSize: 15
                            }}>{`应到${this.state.reachedNum}人，实到${this.state.actualNum}人`}</Text> </Text>
                    </View>
                    <View style={{backgroundColor: '#f5f5f5', height: 12}}/>
                    <View style={{flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff'}}>
                        <View style={{height: 16, width: 3, backgroundColor: '#0099FF'}}/>
                        <Text style={{color: '#0099FF', fontSize: 17, marginLeft: 10}}>今日请假状况</Text>
                    </View>
                    <View style={{width: null, height: 1, backgroundColor: '#e5e5e5'}}/>
                    <View style={{flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff'}}>
                        {this.state.listS.length > 0 ? (this.state.listS.map((item, idx) => {
                            return this._renderItem(item, idx)
                        })) : <Text style={{color: '#666', fontSize: 15}}>暂无请假信息</Text>}
                    </View>
                </ScrollView>
            </View>
        );
    }

    /**item view */
    _renderItem(item, idx) {
        let index = idx;
        return (<View key={this.key++}>
            <View style={{width: size.width, padding: 10, flexDirection: 'row', backgroundColor: '#fff'}}>
                <Image style={{width: 55, height: 55, borderRadius: 22}} source={item.img}/>
                <View style={{height: 55, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                    <Text style={{color: '#111', fontSize: 15}}>{item.title}<Text
                        style={{color: '#888', fontSize: 14}}>{'     男   9岁'}</Text></Text>
                    <Text style={{color: '#82868B', fontSize: 12, marginTop: 11}} numberOfLines={1}>{'事假申请'}</Text>
                    <Button style={{
                        position: 'absolute',
                        height: 25,
                        paddingLeft: 15,
                        paddingRight: 15,
                        top: 15,
                        right: 0,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#0099FF',
                        alignItems: 'center', justifyContent: 'center'
                    }} onPress={() => Actions.leaveInfo({item: item})}><Text
                        style={{color: '#0099FF', fontSize: 12}}>去查看</Text></Button>
                </View>
            </View>
            <View style={{width: size.width, height: 1, backgroundColor: '#eee'}}/>
        </View>);
    };

    onRefresh = () => {
        this.setState({refreshing: true})
        setTimeout(() => {
            this.request()
        }, 1000)
    };

    itemView(bgPic, title, content, callback) {
        var w = (size.width - 45) / 2;
        var h = w * 75 / 165;
        return <Button style={{width: w, height: h}} onPress={callback}>
            <ImageBackground style={{width: w, height: h}} source={bgPic}>
                <View style={{height: h, justifyContent: 'center', position: 'absolute', right: w * 32 / 165}}>
                    <Text style={{color: '#fff', fontSize: 14}}>{title}</Text>
                    <Text style={{color: '#fff', fontSize: 11, marginTop: 8}}>{content}</Text>
                </View>
            </ImageBackground>
        </Button>
    }

    request() {
        postCache(URL_ATTENDANCE, undefined, (data) => {
            this.setState({refreshing: false, reachedNum: data.reachedNum, actualNum: data.actualNum})
        }, false, (err) => {
            this.setState({refreshing: false})
        })
        postCache(URL_TOADY_LEAVES, undefined, (data) => {
            this.setState({refreshing: false, listS: data})
        }, false, (err) => {
            this.setState({refreshing: false})
        })
        postCache(URL_BANNERS, undefined, (data) => {
            this.setState({list: data})
        })
    }


    /**即将挂载-处理参数*/
    componentWillMount() {
        super.componentWillMount()
    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
        this.setState({refreshing: true})
        this.request()

    }

    /**卸载*/
    componentWillUnmount() {
        super.componentWillUnmount()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
