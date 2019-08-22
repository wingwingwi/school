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
import {isNotEmpty, showMsg, size} from "../../utils/Util"; //工具类
import Button from "../../component/Button";
import BasePage from "../BasePage";
import NarBar from "../../component/Narbar";
import BListView from "../../component/BListView";
import src from "../../constant/Src";
import TextBar from "../../component/TextBar";
import {postCache} from "../../utils/Resquest";
import {URL_MY_STUDENTS} from "../../constant/Url";

/**
 * @class Test 是例子
 */
export default class MyStudList extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            name: "测试",
            refreshing: false, tab: 1,
            list: []
        }; //定义属性
        this.leftList = []
        this.rightList = []
    }


    render() {
        return <View style={{flex: 1}}>
            <NarBar title={"班级学生列表"} onSelect={() => Actions.pop()}/>
            <BListView ref={ref => (this.listView = ref)}
                       ListEmptyComponent={this._listEmptyComponent}
                       list={this.state.list}
                       renderRefresh={() => this.requestList(1)}
                       itemView={this._renderItem}
                       renderLoad={() => this.requestList(this.page + 1)}
            />
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
        var avatar = isNotEmpty(item.avatarUrl) ? {uri: item.avatarUrl} :
            '女' == item.gender ? src.headico_girl : src.headico_boy
        return (<View key={this.key++}>
            <View style={{width: size.width, padding: 10, flexDirection: 'row', backgroundColor: '#fff'}} >
                <Image style={{width: 55, height: 55, borderRadius: 28}} source={avatar}/>
                <Button style={{width: size.width}} onPress={() => Actions.leaveTeach({memberId: item.memberId})}>
                    <View style={{height: 55, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                        <Text style={{color: '#111', fontSize: 15, marginTop: 6}}>{item.title}<Text
                            style={{color: '#12b7f5', fontSize: 14}}>{item.realName}</Text></Text>
                        <Text style={{color: '#888', fontSize: 12, marginTop: 11}}
                              numberOfLines={1}>{item.gender+'  '+item.age+'岁'}</Text>
                        {/*{item.lb != 1 ? <Text style={{color: '#12b7f5', fontSize: 13, marginTop: 6}}*/}
                                              {/*numberOfLines={1}>{item.jbmc}</Text> : null}*/}
                        {/*<Text style={{color: '#82868B', fontSize: 12, marginTop: 11}} numberOfLines={1}>{item.zyzz}</Text>*/}
                        {/*<Text style={{color: '#82868B', fontSize: 12, marginTop: 11}} numberOfLines={1}>{item.remk}</Text>*/}
                        {/*{item.lb != 1 ? <Button style={{*/}
                        {/*position: 'absolute',*/}
                        {/*height: 25,*/}
                        {/*paddingLeft: 15,*/}
                        {/*paddingRight: 15,*/}
                        {/*top: 15,*/}
                        {/*right: 0,*/}
                        {/*borderRadius: 12,*/}
                        {/*borderWidth: 0,*/}
                        {/*borderColor: '#0099FF',*/}
                        {/*alignItems: 'center', justifyContent: 'center'*/}
                        {/*}} onPress={() => Actions.leaveInfo({item: item})}><Text*/}
                        {/*style={{color: '#f96868', fontSize: 12}}>{'病假'}</Text></Button>:<Button style={{*/}
                        {/*position: 'absolute',*/}
                        {/*height: 25,*/}
                        {/*paddingLeft: 15,*/}
                        {/*paddingRight: 15,*/}
                        {/*top: 15,*/}
                        {/*right: 0,*/}
                        {/*borderRadius: 12,*/}
                        {/*borderWidth: 0,*/}
                        {/*borderColor: '#0099FF',*/}
                        {/*alignItems: 'center', justifyContent: 'center'*/}
                        {/*}} onPress={() => Actions.leaveInfo({item: item})}><Text*/}
                        {/*style={{color: '#0099FF', fontSize: 12}}>{'事假'}</Text></Button>}*/}
                    </View>
                </Button>
            </View>
            <View style={{width: size.width, height: 1, backgroundColor: '#eee'}}/>
        </View>);
    };

    requestList(page) {
        this.page = page;
        postCache(URL_MY_STUDENTS, {limit: 20, page: this.page}, (data) => {
            if (page == 1) {
                this.setState({list: data})
            } else {
                var list = this.state.list;
                list = list.concat(data);
                this.setState({list: data})
            }
            this.refreshing()
        }, false, (error) => {
            showMsg(error)
            this.refreshing()
        })
    }
    refreshing() {
        if (this.listView) {
            this.listView.setRefreshing(false);
            if (this.state.list.length >= this.page * 20) {
                this.listView.setLoading(true);
            } else if (this.state.list.length == 0) {
                this.listView.setStopLoading()
            } else {
                this.listView.setLoading(false);
            }
        }
    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
        setTimeout(() => {
            this.listView.setRefreshing(true)
            this.requestList(1)
        }, 100)
    }

    componentWillMount() {
    }
}