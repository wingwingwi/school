import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    InteractionManager,
    DeviceEventEmitter
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {isNotEmpty, showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import NextView from "../../component/NextView";
import {postCache} from "../../utils/Resquest";
import {URL_ADD_ARCHIVES, URL_MY_ARCHIVES} from "../../constant/Url";
import BottomCModel from "../../model/BottomCModel";
import BasePage from "../BasePage";
import YearMModel from "../../model/YearMModel";

/**
 * @class
 */
export default class Record extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            stature: '180', vision: '', weight: '75', eyeL: "", eyeR: "", oral: '', internal: '', surgery: '',
            list: data, showModal: false, yearMonth: '', showYear: false
        }
        this.key = 0;
        this.dataYearMonth = []
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"个人档案"} onSelect={() => Actions.pop()}/>
                <ScrollView contentContainerStyle={{paddingVertical: 10}} style={{flex: 1}}>
                    {NextView.getSettingImgItemTech(() => {
                        this.setState({showYear: true})
                    }, "日期", this.state.yearMonth, true, true, "")}
                    {<View style={{height: 10}}/>}
                    {this.state.list.map((item, idx) => {
                        var gIndex = idx;
                        if (item.child.length != 0) {
                            var view = [];
                            view.push(this.titleView(item, gIndex))
                            if (!item.isCloseShow)
                                item.child.map((ib, index) => {
                                    var cIndex = index;
                                    view.push(this.itemView(ib, gIndex, cIndex))
                                })
                            return view;
                        } else {
                            return this.itemView(item, gIndex, 0)
                        }
                    })}
                    <Button onPress={() => {
                        this.commit();
                    }} style={{marginTop: 70, marginLeft: 15, marginRight: 15}}>
                        <LinearGradient colors={["#00C6FF", "#0082FF"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        style={{
                                            height: 45,
                                            width: size.width - 30,
                                            borderRadius: 5,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                            <Text style={{color: '#fff', fontSize: 18}}>保存</Text>
                        </LinearGradient>
                    </Button>
                    <View style={{height: 60}}/>
                </ScrollView>
                <BottomCModel list={[{name: '正常'}, {name: '不良'}]} show={this.state.showModal}
                              closeModal={(data) => {
                                  if (data) {
                                      var list = this.changeValue(chooseKey, data.name == '正常' ? '1' : '2')
                                      this.setState({showModal: false, list: list})
                                  } else this.setState({showModal: false})
                              }}/>
                <YearMModel show={this.state.showYear} closeModal={(dateYear) => {
                    if (dateYear)
                        this.setState({yearMonth: dateYear, showYear: false})
                    else
                        this.setState({showYear: false})
                }}/>
            </View>);
    }


    componentDidMount() {
        if (isNotEmpty(this.props.id))
            InteractionManager.runAfterInteractions(() => {
                this.loadKey = showMsg("获取个人档案中...", 3)
                postCache(URL_MY_ARCHIVES, {id: this.props.id}, (data) => {
                    showMsg('', this.loadKey)
                    if (isNotEmpty(data))
                        this.setValue(data)
                }, false, (error) => {
                    showMsg('', this.loadKey, 'error')
                })
            })
    }

    itemView(item, group, index) {
        var str = isNotEmpty(item.value) ? item.value : '请输入'
        if (item.isChose) str = ' '
        return (<View style={{width: size.width}} key={this.key++}>
            <Button onPress={() => {
                if (!item.isChose) {
                    Actions.inputPage({
                        event: eventType, eventName: item.key,
                        text: item.value
                    })
                }
            }} style={[styles.itemView, {marginTop: 0}]}>
                <Text style={styles.leftText}>{item.name}</Text>
                <Text style={styles.editStyle}>{str}</Text>
                {item.isChose ? <View style={{flexDirection: 'row'}}>
                    <Button onPress={() => {
                        var list = this.changeValue(item.key, '1')
                        this.setState({list: list})
                    }}><Image style={{width: 65, height: 25}}
                              source={item.value == '1' ? src.zhengchang_highlight_btn : src.zhengchang_normal_btn}/></Button>
                    <Button onPress={() => {
                        var list = this.changeValue(item.key, '2')
                        this.setState({list: list})
                    }}><Image style={{width: 65, height: 25, marginLeft: 10, marginRight: 10}}
                              source={item.value == '2' ? src.yichang_highlight_btn : src.yichang_normal_btn}/></Button>
                </View> : null}
            </Button>
            {item.isChose && item.value == 2 ? <Button onPress={() => Actions.inputPage({
                event: eventType, eventName: item.key,
                text: item.valueName
            })} style={[styles.itemView, {marginTop: 0}]}>
                <Text style={styles.leftText}>{''}</Text>
                <Text style={styles.editStyle}>{item.valueName ? item.valueName : '请输入说明'}</Text>
            </Button> : null}
            <View style={styles.line}/></View>);
    }

    titleView(item, index) {
        return <View style={{width: size.width}} key={this.key++}>
            <Button
                style={[styles.itemView, {marginTop: 10}]} onPress={() => {
                var list = this.state.list;
                list[index].isCloseShow = !list[index].isCloseShow
                this.setState({list: list})
            }}><Text
                style={styles.titleText}>{item.name}</Text>
                <Text style={styles.editStyle}></Text>
                <Image style={{width: 14, height: 14, marginRight: 10}}
                       source={item.isCloseShow ? src.gengduo_down_btn : src.gengduo_up_btn}/>
            </Button>
            <View style={styles.line}/>
        </View>
    }

    componentWillMount() {
        super.componentWillMount()
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {
            var list = this.changeValue(item.key, item.text, true)
            this.setState({list: list})
        });
    }

    changeValue(key, value, isListener) {
        var data = this.state.list
        console.log(key + '/' + value)
        for (var i = 0; i < data.length; i++) {
            if (key == data[i].key) {
                if (data[i].isChose && isListener) {
                    data[i].valueName = value;
                } else
                    data[i].value = value;
                return data;
            } else
                for (var j = 0; j < data[i].child.length; j++) {
                    if (key == data[i].child[j].key) {
                        if (data[i].child[j].isChose && isListener) {
                            data[i].child[j].valueName = value;
                        } else
                            data[i].child[j].value = value;
                        return data;
                    }
                }
        }
    }

    setValue(result) {
        var data = this.state.list
        for (var i = 0; i < data.length; i++) {
            if (data[i].child.length == 0) {
                data[i].value = result[data[i].key];
            } else
                for (var j = 0; j < data[i].child.length; j++) {
                    data[i].child[j].value = result[data[i].child[j].key];
                }
        }
        var yearMonth = result['moth'] ? result['moth'].substring(0, 7) : result['updateTime'] ? result['updateTime'].substring(0, 7) : ""
        this.setState({list: data, yearMonth: yearMonth})
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.listener && this.listener.remove();
    }

    /***/
    commit() {
        var list = this.state.list
        var param = {}
        if (isNotEmpty(this.state.yearMonth)) {//提交时间，格式 yyyy-mm；自己可以后面拼接
            param['moth'] = `${this.state.yearMonth}-00 00:00`
        } else {
            showMsg('提交时间')
            return
        }
        if (isNotEmpty(this.props.id)) param = {id: this.props.id}
        for (var i = 0; i < data.length; i++) {
            if (data[i].child.length == 0) {
                var it = data[i]
                param[it.key] = isNotEmpty(it.value) ? it.value : it.isChose ? '0' : ''
                if (it.isChose && it.value == 2 && it.valueName) //选择正常非正常；可以添加新数据，如果♏️说明
                    param[`${it.key}_value`] = it.valueName
            } else
                for (var j = 0; j < data[i].child.length; j++) {
                    var it = data[i].child[j]
                    param[it.key] = isNotEmpty(it.value) ? it.value : it.isChose ? '0' : ''
                    if (it.isChose && it.value == 2 && it.valueName) //选择正常非正常；可以添加新数据，如果♏️说明
                        param[`${it.key}_value`] = it.valueName
                }
        }
        if (this.props.id) param['id'] = this.props.id
        this.loadKey = showMsg('正在提交...', 3)
        postCache(URL_ADD_ARCHIVES, param, (data) => {
            showMsg('', this.loadKey, '提交成功')
            this.timeout = setTimeout(() => {
                Actions.pop()
            }, 500)
        }, false, (err) => showMsg('', this.loadKey, err))
    }
}

var data = [{name: '身高(cm)', value: '180', key: 'height', child: []},
    {name: '体重(kg)', value: '75', key: 'weight', child: []},
    {
        name: '五官', child: [{name: '左眼', key: 'lefteye', value: '5.0'}
        , {name: '右眼', key: 'righteye', value: '5.0'}
        , {name: '口腔', key: 'oralcavity', value: '', isChose: true}
        , {name: '皮肤', key: 'skin', value: '', isChose: true}
    ]
    },
    {
        name: '内科', child: [{name: '心', key: 'heart', value: '', isChose: true}
        , {name: '肝', key: 'liver', value: '', isChose: true}
        , {name: '肺', key: 'lung', value: '', isChose: true}
        , {name: '淋巴结', key: 'lymphaden', value: '', isChose: true}
        , {name: '脾', key: 'taste', value: '', isChose: true}
    ]
    },
    {
        name: '外科', child: [{name: '四肢', key: 'allfours', value: '', isChose: true}
        , {name: '胸部', key: 'chest', value: '', isChose: true}
        , {name: '头部', key: 'head', value: '', isChose: true}
        , {name: '颈部', key: 'neck', value: '', isChose: true}
        , {name: '脊柱', key: 'spine', value: '', isChose: true}
    ]
    },
    {
        name: '结核病检查', child: [{name: '是否有肺结核密切接触史', key: 'allfours1', value: '', isChose: true}
        , {name: '是否有肺结核可疑症状', key: 'chest1', value: '', isChose: true}
        , {name: '是否开展结核菌素皮肤试验', key: 'head1', value: '', isChose: true}
        , {name: '是否开展胸部X光片检查 ', key: 'neck1', value: '', isChose: true}
    ]
    }
]

var chooseKey = ""
const eventType = 'record'
const styles = StyleSheet.create({
    leftText: {
        color: '#262626', fontSize: 17, marginLeft: 10
    }, titleText: {
        color: '#888', fontSize: 15, marginLeft: 10
    },
    itemView: {
        flexDirection: 'row', backgroundColor: '#fff', alignItems: 'center'
    },
    editStyle: {
        padding: 15, color: '#666', fontSize: 17, textAlign: 'right', flex: 1
    },
    line: {width: null, height: 1, backgroundColor: '#F3F3F3'}
});