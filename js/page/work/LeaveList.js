import React from 'react';

import {DeviceEventEmitter, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size} from '../../utils/Util';
import NarBar from '../../component/Narbar';
import Button from "../../component/Button";
import TextBar from "../../component/TextBar";
import {postCache} from "../../utils/Resquest";
import {URL_LIST_LEAVES} from "../../constant/Url";
import BasePage from "../BasePage";
import BListView from "../../component/BListView";

/**
 * @class
 */
export default class LeaveList extends BasePage {
    constructor(props) {
        super(props);
        this.state = {//设置初值
            name: "测试",
            refreshing: false, tab: 1,
            list: []
        };
        this.leftList = []
        this.rightList = []
        this.pics = [];
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"请假历史"} onSelect={() => Actions.pop()}/>
                <TextBar list={['未复课', '已复课']} ref={ref => this.textBar = ref} changeTab={(num) => {
                    var tab = num + 1;
                    console.log('tab=' + tab)
                    console.log(JSON.stringify(this.leftList))
                    console.log(JSON.stringify(this.rightList))
                    if (tab == 1) {
                        this.setState({tab: tab, list: [].concat(this.leftList)})
                        if (this.leftList.length == 0) this.requestList(1, true)
                    } else {
                        this.setState({tab: tab, list: [].concat(this.rightList)})
                        if (this.rightList.length == 0) this.requestList(2, true)
                    }
                }}/>
                <BListView ref={ref => this.listView = ref}
                           ListEmptyComponent={this._listEmptyComponent}
                           list={this.state.list}
                           renderRefresh={() => this.requestList(this.state.tab)}
                           itemView={this._renderItem}/>
            </View>);
    }


    componentDidMount() {
        if (this.props.isType) this.textBar.tab(1)
        this.listView.setRefreshing(true);
        this.requestList(1, true)
    }

    componentWillMount() {
        this.setState({tab: 1})
        DeviceEventEmitter.addListener('leavelist', (data) => {
            this.listView.setRefreshing(true);
            this.requestList(this.state.tab);
        })
    }

    // requestList() {
    //     var param = undefined;
    //     if (this.props.resumeStatus)
    //         param = {resumeStatus: this.props.resumeStatus}
    //     postCache(URL_LIST_LEAVES, param, (data) => {
    //         this.listView.setRefreshing(false);
    //         this.setState({list: data, isLoading: false})
    //     }, false, err => {
    //         this.listView.setRefreshing(false);
    //     })
    // }

    requestList(lb, isShow) {
        if (isShow)
            this.loadKey = showMsg('加载中...', 3)
        var resumeStatu = '';
        if (lb == 1) {
            console.log('tab=1111')
            resumeStatu = 0
        } else if (lb == 2) {
            console.log('tab=2222')
            resumeStatu = 1
        }
        postCache(URL_LIST_LEAVES, {resumeStatus: resumeStatu}, (data) => {
            if (lb == 1)
                this.leftList = data;
            else this.rightList = data;
            if (this.state.tab == 1) {
                this.setState({list: [].concat(this.leftList)})
            } else this.setState({list: [].concat(this.rightList)})
            this.listView.setRefreshing(false);
            if (isShow)
                showMsg('', this.loadKey)
        }, false, err => {
            if (isShow)
                showMsg('', this.loadKey, err)
            else
                showMsg(err)
            this.listView.setRefreshing(false);
        })
    }


    _listEmptyComponent = () => {
        return (<View
                style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <Text style={{color: "#999", fontSize: 15, marginTop: 50}}>
                    {this.state.isLoading ? "正在加载" : '暂无数据'}
                </Text>
            </View>
        );
    }
    _renderItem = item => {
        let name = `${item.lb == 1 ? "事假" : "病假"}-${item.startTime}`
        return (<View key={this.key++}>
            {/*{NextView.getSettingImgItemTech(() => {*/}
            {/*if (item.resumeStatus == 0)*/}
            {/*Actions.resumeStudy({lb: item.lb, id: item.id})*/}
            {/*}, name,item.resumeStatus == 0 ? '去复课' : '', true, true, "")}*/}
            <View style={{width: size.width, padding: 10, flexDirection: 'row', backgroundColor: '#fff'}}>
                <Button onPress={() => Actions.leaveInfo({item: item, isType: item.lb})}>
                    <View style={{height: 85, flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#888888', fontSize: 12, marginTop: 6}}>
                                请假类型：
                            </Text>
                            {item.lb != 1 ? <Text style={{color: '#333333', fontSize: 12, marginTop: 6}}
                                                  numberOfLines={1}>病假</Text> :
                                <Text style={{color: '#333333', fontSize: 12, marginTop: 11}}
                                      numberOfLines={1}>事假</Text>}
                        </View>

                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#888888', fontSize: 12, marginTop: 6}}>
                                请假时间：
                            </Text>
                            <Text style={{color: '#333333', fontSize: 12, marginTop: 6}}
                                  numberOfLines={1}>{item.startTime}</Text>
                        </View>

                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            {item.lb != 1 ? <Text style={{color: '#888888', fontSize: 12, marginTop: 6}}
                                                  numberOfLines={1}>主要症状：</Text> :
                                <Text style={{color: '#888888', fontSize: 12, marginTop: 11}}
                                      numberOfLines={1}>请假事由：</Text>}

                            {item.lb != 1 ? <Text style={{color: '#333333', fontSize: 12, marginTop: 6}}
                                                  numberOfLines={1}>{item.zyzz}</Text> :
                                <Text style={{color: '#333333', fontSize: 12, marginTop: 6}}
                                      numberOfLines={1}>{item.remk}</Text>}
                        </View>

                        {this.state.tab == 2 ?<View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Text style={{color: '#888888', fontSize: 12, marginTop: 6}}>
                                复课时间：
                            </Text>
                            <Text style={{color: '#333333', fontSize: 12, marginTop: 6}}
                                  numberOfLines={1}>{item.resumeTime}</Text>
                        </View>:null}

                        {this.state.tab == 1 ? <View
                                style={{
                                flexDirection: 'row',
                                marginTop: 3,
                                justifyContent: 'flex-end',
                                width: size.width - 20
                            }}>

                                <Button style={{
                                width: 75,
                                height: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 16,
                                marginRight: 10,
                                borderColor: '#0099FF',
                                borderWidth: 1,
                            }} onPress={() => {
                                Actions.leave({item: item})
                            }}><Text style={{
                                color: '#0099FF',
                                fontSize: 12,
                            }}>{"修改申请"}</Text></Button>

                                <Button style={{
                                width: 75,
                                height: 20,
                                marginRight: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 16,
                                backgroundColor: '#0099FF',
                                borderColor: '#0099FF',
                                borderWidth: 1,
                            }} onPress={() => {
                                Actions.resumeStudy({lb: item.lb, id: item.id})
                            }}><Text style={{
                                color: '#fff',
                                fontSize: 12,
                            }}>{"我要复课"}</Text></Button>
                            </View>:null}
                    </View>
                </Button>
            </View>
            <View style={{width: size.width, height: 6, backgroundColor: '#fff'}}/>
            <View style={{width: size.width, height: 1, backgroundColor: '#eee'}}/>
        </View>);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        DeviceEventEmitter.removeListener()
    }
}

const eventType = 'leavelist'
