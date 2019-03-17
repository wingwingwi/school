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
import src from "../../constant/Src";
import TextBar from "../../component/TextBar";
import {postCache} from "../../utils/Resquest";
import {URL_QUERY_LEAVES} from "../../constant/Url";

/**
 * @class Test 是例子
 */
export default class StudentList extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            name: "测试",
            refreshing: false,
            list: [{title: '1111', img: src.logo_pic}, {title: '1111', img: src.logo_pic}]
        }; //定义属性
    }

    render() {
        return <View style={{flex: 1}}>
            <NarBar title={'请假列表'} onSelect={() => Actions.pop()}/>
            <TextBar list={['事假', '病假']} ref={ref => this.textBar = ref} changeTab={(tab) => {
            }}/>
            <BListView ref={ref => (this.listView = ref)}
                       ListEmptyComponent={this._listEmptyComponent}
                       list={this.state.list}
                       renderRefresh={() => this._get(false)}
                       itemView={this._renderItem}/>
        </View>
    }

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
    /**item view */
    _renderItem = item => {
        return (
            <View>
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
            </View>
        );
    };

    /**头部请求*/
    _get(isShow) {
        setTimeout(() => {
            this.requestList()
        }, 1000);
    }

    requestList() {
        postCache(URL_QUERY_LEAVES, {lb: this.props.isType ? 2 : 1}, (data) => {
            this.listView.setRefreshing(false);
        }, false, err => {
            showMsg(err)
            this.listView.setRefreshing(false);
        })
    }

    componentDidMount() {
        if (this.props.isType) this.textBar.tab(1)
        this.listView.setRefreshing(true);
        this.requestList()
    }
}