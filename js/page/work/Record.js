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
import {URL_MY_ARCHIVES} from "../../constant/Url";

/**
 * @class
 */
export default class Record extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            stature: '180', vision: '', weight: '75', eyeL: "", eyeR: "", oral: '', internal: '', surgery: '',
            list: data,
        }
        this.key = 0;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NarBar title={"个人档案"} onSelect={() => Actions.pop()}/>
                <ScrollView contentContainerStyle={{flex: 1, alignItems: 'center'}}>
                    {this.state.list.map((item, idx) => {
                        var gIndex = idx;
                        if (item.child.length != 0) {
                            var view = [];
                            view.push(this.titleView(item, gIndex))
                            if (item.isShowList)
                                item.child.map((ib, index) => {
                                    var cIndex = index;
                                    view.push(this.itemView(ib, gIndex, cIndex))
                                })
                            return view;
                        } else {
                            return this.itemView(item.name, item.value, gIndex, 0)
                        }
                    })}
                    <Button onPress={() => {
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
                    <View style={{height: 40}}/>
                </ScrollView>
            </View>);
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.loadKey = showMsg("获取个人档案中...", 3)
            postCache(URL_MY_ARCHIVES, undefined, (data) => {
                showMsg('', this.loadKey)
            }, false, (error) => {
                showMsg('', this.loadKey, 'error')
            })
        })
    }

    itemView(item, group, index) {
        var str = isNotEmpty(item.value) ? item.value : '请输入'
        if (item.isChoose)
            str = isNotEmpty(item.value) ? item.value == 1 ? '正常' : '不良' : '请选择'
        return (<View style={{width: size.width}} key={this.key++}>
            <Button onPress={() => {
                if (item.isChoose) {
                    this.chooseIndex = [group, index]
                    this.setState({showModal: true})
                } else {
                    Actions.inputPage({
                        event: eventType, eventName: item.key,
                        text: value
                    })
                }
            }} style={[styles.itemView, {marginTop: 0}]}>
                <Text style={styles.leftText}>{item.name}</Text>
                <Text style={styles.editStyle}>{item.value}</Text>
            </Button>
            <View style={styles.line}/></View>);
    }

    titleView(item, index) {
        return <View style={{width: size.width}} key={this.key++}><Button
            style={[styles.itemView, {marginTop: 10}]} onPress={() => {
            var list = this.state.list;
            list[index].isShowList = !list[index].isShowList
            this.setState({list: list})
        }}><Text
            style={styles.titleText}>{item.name}</Text>
            <Text style={styles.editStyle}></Text>
            <Image style={{width: 14, height: 14, marginRight: 10}}
                   source={item.isShowList ? src.gengduo_down_btn : src.gengduo_up_btn}/>
        </Button><View style={styles.line}/></View>
    }

    componentWillMount() {
        this.listener = DeviceEventEmitter.addListener(eventType, (item) => {

        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
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
]
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