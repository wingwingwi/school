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

/**
 * @class Test 是例子
 */
export default class TechPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {name: "测试", refreshing: false}; //定义属性
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
                            <Swiper style={{width: null, height: h}}>
                                <Button onPress={() => {
                                    Actions.webPage({url: 'https://www.baidu.com'})
                                }}>
                                    <Image style={{width: null, height: h}} source={src.banner_pic2}/>
                                </Button>
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
                        {this.itemView(src.shijia_btn, "事假", '点击前往 >', () => Actions.studentList())}
                        {this.itemView(src.bingjia_btn, "病假", '点击前往 >', () => Actions.resumeStudy())}
                    </View>
                    <View style={{backgroundColor: '#f5f5f5', height: 12}}/>
                    <View style={{flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff'}}>
                        <View style={{height: 16, width: 3, backgroundColor: '#0099FF'}}/>
                        <Text style={{color: '#0099FF', fontSize: 17, marginLeft: 10}}>今日出勤状况</Text>
                    </View>
                    <View style={{width: null, height: 1, backgroundColor: '#e5e5e5'}}/>
                    <View style={{flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff'}}>
                        <Text style={{color: '#0099FF', fontSize: 17}}><Text
                            style={{color: '#333', fontSize: 15}}>应到35人，实到35人</Text> </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        setTimeout(() => {
            this.setState({refreshing: false})
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


    /**即将挂载-处理参数*/
    componentWillMount() {
        super.componentWillMount()
    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {

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
