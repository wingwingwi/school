import React, {Component} from 'react';

import {
    BackHandler,
    Alert,
    Linking,
    Image,
    PermissionsAndroid,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isIos, showMsg, size} from '../utils/Util'
import {postCache} from '../utils/Resquest'

import Button from '../component/Button';
import NarBar from '../component/Narbar';
import BListView from "../component/BListView";
import Swiper from 'react-native-swiper'
import src from '../constant/Src'
import {URL_BANNERS, URL_QUERY_PAGE, URL_VERSION} from "../constant/Url";
import BasePage from "./BasePage";
import {version_name} from "../constant/Constants";

/**
 *
 *
 * @export
 * @class Main
 * @extends {Component<Props>}
 */
export default class Main extends BasePage {
    constructor(props) {
        super(props);
        this.state = {isRefreshing: false, list: [], listS: []}; //定义属性
        this.key = 1;
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
            this.checkVersion()
            //this.checkAndroidPermission()
        }, 100)
    }

    request() {
        postCache(URL_BANNERS, undefined, (data) => {
            this.setState({listS: data})
        }, true)
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
        var h = (size.width - 20) * 290 / 690 + 20
        console.log(JSON.stringify(this.state.listS))
        return <View style={{backgroundColor: '#fff'}}>
            <View style={{width: size.width, flexDirection: 'row'}}>
                <Swiper height={h} autoplay={true} autoplayTimeout={4}
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
                            bottom: 10, left: null, right: 20
                        }}>
                    {this.state.listS.length > 0 ? (this.state.listS.map((item, idx) => {
                        return <Button onPress={() => {
                            Actions.webPage({id: item.linkUrl});
                        }} key={idx} style={{width: size.width, padding: 10}}>
                            <Image style={{height: h - 20, width: size.width - 20}}
                                   source={{uri: item.pictureUrl}}/>
                        </Button>
                    })) : <View style={{width: size.width, padding: 10}}><Image
                        style={{height: h - 20, width: size.width - 20, borderRadius: 5}}
                        source={src.banner_pic2}/></View>
                    }
                </Swiper>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                {this.itemView(src.woyaoqingjia_btn, "我要请假", () => Actions.leave())}
                {this.itemView(src.woyaofuke_btn, "请假列表", () => Actions.leaveList())}
                {this.itemView(src.jiankangjiaoyu_btn, "健康教育", () => {
                    Actions.more()
                })}
                {this.itemView(src.gerendangan_btn, "健康档案", () => Actions.recordList())}
                {/*{this.itemView(src.gerenxiaoxi_btn, "个人消息", () => Actions.message({typeNum: 1}))}*/}
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
        var view = []
        if (item.fileList && item.fileList.length > 0)
            for (var i = 0; i < item.fileList.length; i++) {
                if (item.fileList.length >= 3) {
                    view.push(<Image style={{flex: 1, height: h, borderRadius: 5}}
                                     source={{uri: item.fileList[i].fileUrl}} key={this.key++}/>)
                    if (i < 2) {
                        view.push(<View style={{width: 5, height: 1}} key={this.key++}/>)
                    }
                } else if (item.fileList.length > 0 && i == 0) {
                    view.push(<View style={{height: h, flex: 2}} key={this.key++}>
                        <Text style={{color: '#888', fontSize: 10, lineHeight: 15, flex: 1, marginTop: 5}}
                              multiline={true}
                              numberOfLines={3}>{item.remk}</Text>
                        <Text style={{color: '#333', fontSize: 10, marginTop: 5}}>健康教育</Text>
                    </View>)
                    view.push(<View style={{width: 5, height: 1}} key={this.key++}/>)
                    view.push(<Image style={{flex: 1, height: h, borderRadius: 5}}
                                     source={{uri: item.fileList[0].fileUrl}}
                                     key={this.key++}/>)
                }
            }
        else {
            view.push(<View style={{height: h, flex: 2}} key={this.key++}>
                <Text style={{color: '#888', fontSize: 10, lineHeight: 15, flex: 1, marginTop: 5}}
                      multiline={true}
                      numberOfLines={3}>{item.remk}</Text>
                <Text style={{color: '#333', fontSize: 10, marginTop: 5}}>健康教育</Text>
            </View>)
        }
        return (<Button style={{backgroundColor: "#fff", paddingLeft: 10, paddingRight: 10}} onPress={() => {
                Actions.webPage({id: item.id})
            }}>
                <Text style={{color: '#000', fontSize: 15, paddingTop: 10, paddingBottom: 10}}
                      numberOfLines={1}>{item.title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>{view}
                </View>
                {!item.fileList || item.fileList.length < 3 ? null :
                    <Text style={{color: '#333', fontSize: 10, marginTop: 10}}>健康教育</Text>
                }
                <View style={{width: null, height: 1, marginTop: 10, backgroundColor: '#eee'}}/>
            </Button>
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

    /**检查版本号*/
    checkVersion() {
        postCache(URL_VERSION, {versionName: version_name}, (data) => {
            var info = isIos ? data["ios"] : data["android"]
            var vno = info["vno"]
            if (vno != undefined && version_name != vno) {
                Alert.alert("版本升级", info["remk"], [
                    {text: '取消', onPress: () => BackHandler.exitApp()},
                    {text: '升级', onPress: () => this.openLink(info['downUrl'])},], {cancelable: false})

            }
        }, true)
    }

    /**升级*/
    openLink(link) {
        var url = link
        if (isIos) {
            url = "https://itunes.apple.com/cn/app/cryptomator-open-source-cloud/id"
        }
        Linking.openURL(url).catch((e) => {
            showMsg("跳转失败")
        });
    }

    /**检查Android的权限*/
    checkAndroidPermission() {
        if (isIos) return;
        setTimeout(() => {
            this.requestCameraPermission()
        }, 150)
    }

    /**发起权限认同*/
    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': '必要授权',
                    'message': '应用需要访问手机储存设备，需要你同意授权',
                    'buttonNegative': '取消',
                    'buttonPositive': '确认'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("验证通过")
            } else {
                Alert.alert("授权失败，请退出应用", "再次授权请到设置授权", [
                    {text: '退出', onPress: () => BackHandler.exitApp()},
                    {text: '确认', onPress: () => BackHandler.exitApp()},], {cancelable: false})
                console.log("授权失败")
            }
        } catch (err) {
            console.warn(err)
        }
    }
}

const content = '所谓安全教育就是指孩子解决各种安全问题的能力，良好的安全教育可以让孩子在没有大人帮助的情况下也能自己保护好自己。'
