import React, {Component} from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image, DeviceEventEmitter,
    TouchableOpacity,
    ImageBackground,
    NativeModules
} from "react-native"; //基本架构

import {Actions} from "react-native-router-flux"; //路由
import {showMsg} from "../../utils/Util"; //工具类
import Theme from "../../constant/Theme"; //属性，颜色，字体大小
import ListView from "../../component/BListView"; //
import Button from "../../component/Button";
import NarBar from "../../component/Narbar";
import {postCache} from "../../utils/Resquest";
import {URL_MSG_DOREAD, URL_MSG_LIST, URL_QUERY_NETE_TEMPLATE, URL_QUERY_PAGE} from "../../constant/Url";

/**
 * @class Message 消息中心
 */
export default class Message extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {isRefreshing: false, list: []}; //定义属性
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"消息中心"} onSelect={() => Actions.pop()}/>
                <ListView
                    ref={ref => (this.listView = ref)}
                    ListEmptyComponent={this._listEmptyComponent}
                    list={this.state.list}
                    renderRefresh={() => this.requestList()}
                    itemView={this._renderItem}
                />
            </View>
        );
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
        var time = item.createTime && item.createTime.length > 16 ? item.createTime.substring(0, 16) : item.createTime
        return (
            <Button style={{
                backgroundColor: item.isRead == 0 ? "#fff" : '#eee',
                borderRadius: 5,
                marginLeft: 10,
                marginRight: 10,
                padding: 10,
                marginTop: item.index == 0 ? 10 : 0,
                marginBottom: 10,
                width: null,
                elevation: 3,
                shadowColor: '#333',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.18,
                shadowRadius: 5,
            }}
                    onPress={() => this.isReadRequest(parseInt(item.index))}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: item.isRead == 0 ? '#479BFA' : '#A9A9A9'
                    }}/>
                    <Text style={{
                        color: item.isRead == 0 ? '#0099FF' : '#A9A9A9',
                        fontSize: 15,
                        flex: 1,
                        marginLeft: 5
                    }}>{item.title}</Text>
                    <Text style={{color: '#888', fontSize: 10}}>{time}</Text>
                </View>
                <Text style={{color: item.isRead == 0 ? '#333' : '#A9A9A9', fontSize: 12, marginTop: 5, lineHeight: 20}}
                      multiline={true}>{item.cnts}</Text>
            </Button>
        );
    };

    /**头部请求*/
    _get(isShow) {
        this.listView.setRefreshing(false);
    }

    isReadRequest(index) {
        var list = this.state.list;
        if (list[index].isRead == 0) {
            list[index].isRead = 1
            this.setState({list: list})
            var count = 0;
            list.map((item) => {
                if (item.isRead == 0)
                    count = count + 1
            })
            DeviceEventEmitter.emit('other', {count: count, type: this.props.typeNum})
            postCache(URL_MSG_DOREAD, {id: list[index].id, lb: this.props.typeNum})
        }

    }

    /**即将挂载-处理参数*/
    componentWillMount() {

    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
        this.listView.setRefreshing(true);
        this.requestList();
    }


    requestList() {
        postCache(URL_MSG_LIST, {lb: this.props.typeNum}, (data) => {
            this.listView.setRefreshing(false);
            this.setState({list: data})
        }, false, (error) => {
            showMsg(error)
            this.listView.setRefreshing(false);
        })
    }

    /**卸载*/
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    }
});
