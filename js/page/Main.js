import React, {Component} from 'react';

import {
    View, Text, StyleSheet, ScrollView, RefreshControl, Image,
    TouchableOpacity, ImageBackground, NativeModules, StatusBar, DeviceEventEmitter, InteractionManager
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {post, showMsg} from '../utils/Util'
import {postCache} from '../utils/Resquest'

import Button from '../component/Button';
import NarBar from '../component/Narbar';
import BListView from "../component/BListView";
import Swiper from 'react-native-swiper'
import src from '../constant/Src'
import {size} from '../utils/Util'
import {URL_LIST, URL_BANNERS, URL_QUERY_PAGE} from "../constant/Url";

/**
 *
 *
 * @export
 * @class Main
 * @extends {Component<Props>}
 */
export default class Main extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {isRefreshing: false, list: []}; //定义属性
    }

    render() {
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            <NarBar title={'学生卫生平台'}/>
            <BListView ListHeaderComponent={() => this.headerComponent()}
                       ref={ref => (this.listView = ref)}
                       ListEmptyComponent={this._listEmptyComponent}
                       list={this.state.list}
                       renderRefresh={() => this._get(false)}
                       itemView={this._renderItem}/>
        </View>;
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.listView) {
                this.request();
                this.requestList(true, 1)
            }
        }, 100)
    }

    request() {
        postCache(URL_BANNERS, undefined, (data) => {
            this.setState({phone: data})
        })
    }

    requestList(isShow, page) {
        this.page = page;
        if (isShow)
            this.loadKey = showMsg("加载中...", 3)
        postCache(URL_QUERY_PAGE, {limit: 20, page: this.page, ishome: 1}, (data) => {
            this.setState({list: data})
            if (isShow)
                showMsg('', this.loadKey)
            this.listView && this.listView.setRefreshing(false);
        }, this.page == 1, (error) => {
            if (isShow)
                showMsg('', this.loadKey, error)
            else
                showMsg(error)
            this.listView && this.listView.setRefreshing(false);
        })
    }

    headerComponent() {
        var h = (size.width - 20) * 290 / 690
        return <View style={{backgroundColor: '#fff'}}>
            <View style={{marginLeft: 10, marginRight: 10}}>
                <Swiper style={{width: null, height: h}}>
                    <Button onPress={() => {
                        Actions.webPage()
                    }}>
                        <Image style={{width: null, height: h}} source={src.banner_pic2}/>
                    </Button>
                </Swiper>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                {this.itemView(src.woyaoqingjia_btn, "我要请假", () => Actions.leave())}
                {this.itemView(src.woyaofuke_btn, "我要复课", () => Actions.resumeStudy())}
                {this.itemView(src.jiankangjiaoyu_btn, "健康教育", () => {
                    Actions.more()
                })}
                {this.itemView(src.gerendangan_btn, "个人档案", () => Actions.record())}
                {this.itemView(src.gerenxiaoxi_btn, "个人消息", () => Actions.message())}
            </View>
            <View style={{backgroundColor: '#f5f5f5', height: 12}}/>
            <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                <View style={{height: 16, width: 3, backgroundColor: '#0099FF'}}/>
                <Text style={{color: '#0099FF', fontSize: 17, marginLeft: 10}}>推荐</Text>
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
            <Image style={{width: 44, height: 44}} source={pic}/>
            <Text style={{color: '#333', fontSize: 12, marginTop: 8}}>{text}</Text>
        </TouchableOpacity>
    }

    /**item view */
    _renderItem = item => {
        var h = (size.width - 30) * 73 / 3 / 112
        return (<View style={{backgroundColor: "#fff", paddingLeft: 10, paddingRight: 10}}>
                <Text style={{color: '#000', fontSize: 15, paddingTop: 10, paddingBottom: 10}}>为什么要给宝宝进行安全教育</Text>
                {item.index % 2 == 1 ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{height: h, flex: 2}}>
                        <Text style={{color: '#888', fontSize: 10, lineHeight: 15, flex: 1, marginTop: 5}}
                              multiline={true}
                              numberOfLines={3}>{content}</Text>
                        <Text style={{color: '#333', fontSize: 10, marginTop: 5}}>教育热点</Text>
                    </View>

                    <View style={{width: 5, height: 1}}/>
                    <Image style={{flex: 1, height: h, borderRadius: 5}} source={src.banner_pic2}/>
                </View> : <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{flex: 1, height: h, borderRadius: 5}} source={src.banner_pic2}/>
                    <View style={{width: 5, height: 1}}/>
                    <Image style={{flex: 1, height: h, borderRadius: 5}} source={src.banner_pic2}/>
                    <View style={{width: 5, height: 1}}/>
                    <Image style={{flex: 1, height: h, borderRadius: 5}} source={src.banner_pic2}/>
                </View>}
                {item.index % 2 == 1 ? null :
                    <Text style={{color: '#333', fontSize: 10, marginTop: 10}}>教育热点</Text>
                }
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
        this.requestList(isShow, 1)
    }

    /**即将挂载-处理参数*/
    componentWillMount() {
    }


    /**卸载*/
    componentWillUnmount() {
        this.listView = undefined
        this.setState = (state, callback) => {
            return;
        };
    }

}

const content = '所谓安全教育就是指孩子解决各种安全问题的能力，良好的安全教育可以让孩子在没有大人帮助的情况下也能自己保护好自己。'