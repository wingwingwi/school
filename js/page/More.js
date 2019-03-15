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
import TextBar from "../component/TextBar";
import {postCache} from "../utils/Resquest";
import {URL_QUERY_PAGE} from "../constant/Url";

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
        this.state = {isRefreshing: false, list: []}; //定义属性
        this.page = 1;
        this.key = 1;
    }

    render() {
        return <View style={{flex: 1, backgroundColor: '#fff'}}>
            <NarBar title={'资讯'}/>
            {/*<TextBar ref={ref => (this.textBar = ref)} changeTab={(index) => {*/}
            {/*}}/>*/}
            <BListView ref={ref => (this.listView = ref)}
                       ListEmptyComponent={this._listEmptyComponent}
                       list={this.state.list}
                       renderRefresh={() => this.requestList(1)}
                       itemView={this._renderItem}
                       renderLoad={() => this.requestList(this.page + 1)}
            />
        </View>;
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
                              numberOfLines={3}>{content}</Text>
                        <Text style={{color: '#333', fontSize: 10, marginTop: 5}}>教育热点</Text>
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
                      numberOfLines={3}>{content}</Text>
                <Text style={{color: '#333', fontSize: 10, marginTop: 5}}>教育热点</Text>
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
                    <Text style={{color: '#333', fontSize: 10, marginTop: 10}}>教育热点</Text>
                }
                <View style={{width: null, height: 1, marginTop: 10, backgroundColor: '#eee'}}/>
            </Button>
        );
    };


    requestList(page) {
        this.page = page;
        postCache(URL_QUERY_PAGE, {limit: 20, page: this.page, ishome: 2}, (data) => {
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

    /**即将挂载-处理参数*/
    componentWillMount() {

    }

    /**已经挂载-处理耗时操作*/
    componentDidMount() {
        setTimeout(() => {
            this.listView.setRefreshing(true)
            this.requestList(1)
        }, 100)
    }

    /**卸载*/
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
}
const content = '所谓安全教育就是指孩子解决各种安全问题的能力，良好的安全教育可以让孩子在没有大人帮助的情况下也能自己保护好自己。'