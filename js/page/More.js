import React, {Component} from 'react';

import {
    View, Text, StyleSheet, ScrollView, RefreshControl, Image,
    TouchableOpacity, ImageBackground, NativeModules, DeviceEventEmitter
} from 'react-native';
import NarBar from "../component/Narbar";
import BListView from "../component/BListView";
import Button from "../component/Button";
import {size, showMsg} from '../utils/Util'
import src from '../constant/Src'
import TextBar from "../component/TextBar";

/**
 *
 *
 * @export
 * @class More
 * @extends {Component<Props>}
 */
export default class More extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {isRefreshing: false, list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}; //定义属性
        this.listener = DeviceEventEmitter.addListener('event', (item) => {
            this.textBar.tab(1)
        });
    }

    render() {

        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            <NarBar title={'资讯'}/>
            <TextBar ref={ref => (this.textBar = ref)} changeTab={(index) => {
            }}/>
            <BListView ref={ref => (this.listView = ref)}
                       ListEmptyComponent={this._listEmptyComponent}
                       list={this.state.list}
                       renderRefresh={() => this._get(false)}
                       itemView={this._renderItem}/>
        </View>;
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
        this.listener && this.listener.remove();
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
        var h = (size.width - 30) * 73 / 3 / 112
        return (<View style={{backgroundColor: "#fff", paddingLeft: 10, paddingRight: 10}}>
                <Text style={{color: '#000', fontSize: 15, paddingTop: 10, paddingBottom: 10}}>为什么要给宝宝进行安全教育</Text>
                {item.index == 2 ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                {item.index == 2 ? null :
                    <Text style={{color: '#333', fontSize: 10, marginTop: 10}}>教育热点</Text>
                }

                <View style={{width: null, height: 1, marginTop: 10, backgroundColor: '#eee'}}/>
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