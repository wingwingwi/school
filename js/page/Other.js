import React, {Component} from 'react';

import {
    View, Text, StyleSheet, ScrollView, RefreshControl, Image,
    TouchableOpacity, ImageBackground, NativeModules, DeviceEventEmitter
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import NarBar from "../component/Narbar";
import BListView from "../component/BListView";
import Button from "../component/Button";
import {size, showMsg} from '../utils/Util'
import src from '../constant/Src'
import {postCache} from "../utils/Resquest";
import {URL_MSG_LIST, URL_MSG_MYMSG} from "../constant/Url";

/**
 *
 *
 * @export
 * @class Other
 * @extends {Component<Props>}
 */
export default class Other extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false, list: list
        }; //定义属性
    }

    render() {
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            <NarBar title={'消息'}/>
            <BListView
                ref={ref => (this.listView = ref)}
                ListEmptyComponent={this._listEmptyComponent}
                list={this.state.list}
                renderRefresh={() => this._get(false)}
                itemView={this._renderItem}
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
        return (
            <Button onPress={() => {
                Actions.message({typeNum: parseInt(item.index) + 1});
            }}>
                <View style={{width: size.width, padding: 10, flexDirection: 'row'}}>
                    <Image style={{width: 44, height: 44}} source={item.img}/>
                    <View style={{height: 44, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                        <Text style={{color: '#333', fontSize: 15, fontWeight: 'bold'}}>{item.title}</Text>
                        <Text style={{color: '#888', fontSize: 12, marginTop: 5}} numberOfLines={1}>{item.text}</Text>
                    </View>
                </View>
                <View style={{width: size.width, height: 1, backgroundColor: '#eee'}}/>
            </Button>
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
        this.listener = DeviceEventEmitter.addListener('other', (data) => {
            var mList = [].concat(this.state.list);
            if (data.type == 1) {
                mList[0].text = data.count == 0 ? '暂无个人消息' : `收到${data.count}条消息，注意查看`
            } else if (data.type == 2) {
                mList[1].text = data.count == 0 ? '暂无班主任消息' : `收到班主任${data.count}条消息，注意查看`
            } else if (data.type == 3) {
                mList[2].text = data.count == 0 ? '暂无系统消息' : `系统发送${data.count}条消息，注意查看`
            }
            this.setState({list: mList})
        });
    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
        postCache(URL_MSG_MYMSG, undefined, (data) => {
            var mList = list;
            mList[0].text = data.myCount == 0 ? '暂无个人消息' : `收到${data.myCount}条消息，注意查看`
            mList[1].text = data.bzrCount == 0 ? '暂无班主任消息' : `收到班主任${data.bzrCount}条消息，注意查看`
            mList[2].text = data.sysCount == 0 ? '暂无系统消息' : `系统发送${data.sysCount}条消息，注意查看`
            this.setState({list: mList})
        }, false, (error) => {
            showMsg(error)
            this.listView.setRefreshing(false);
        })
    }

    /**卸载*/
    componentWillUnmount() {
        this.listener && this.listener.remove();
        this.setState = (state, callback) => {
            return;
        };
    }
}
const list = [{img: src.gerenxiaoxi1_btn, title: '个人消息', text: '正在获取个人消息'},
    {img: src.banzhurenxiaoxi_btn, title: '班主任消息', text: '正在获取班主任消息'},
    {img: src.xitongxiaoxi_btn, title: '系统消息', text: '正在获取系统消息'}];
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    }
});
