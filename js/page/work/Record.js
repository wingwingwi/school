import React, {Component} from 'react';

import {View, Text, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {showMsg, size} from '../../utils/Util';
import {Provider, Toast} from '@ant-design/react-native';
import src from '../../constant/Src';
import NarBar from '../../component/Narbar';
import EditView from "../../component/EditView";
import Button from "../../component/Button";
import LinearGradient from "react-native-linear-gradient";
import NextView from "../../component/NextView";

var data = [{name: '身高(cm)', value: '180', child: []},
    {name: '体重(kg)', value: '75', child: []},
    {name: '视力', value: '', child: [{name: '左眼', value: '5.0'}, {name: '右眼', value: '5.0'}]},
    {name: '口腔', value: '', child: [{name: '左眼', value: ''}, {name: '右眼', value: ''}]},
    {name: '内科', value: '', child: [{name: '左眼', value: ''}, {name: '右眼', value: ''}]},
    {name: '外科', value: '', child: [{name: '左眼', value: ''}, {name: '右眼', value: ''}]},
]

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
                                    view.push(this.itemView(ib.name, ib.value, gIndex, cIndex))
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


    itemView(name, value, group, index) {
        return <View style={{width: size.width}} key={this.key++}><Button
            style={[styles.itemView, {marginTop: 0}]}><Text
            style={styles.leftText}>{name}</Text>
            <Text style={styles.editStyle}>{value}</Text></Button>
            <View style={styles.line}/></View>
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

    //
    // statureView() {
    //     return <View style={styles.itemView}>
    //         <Text style={styles.leftText}>身高(cm)</Text>
    //         <EditView style={styles.editStyle} ref={ref => (this.mStature = ref)}/>
    //     </View>
    // }
    //
    // weightView() {
    //     return <View style={styles.itemView}>
    //         <Text style={styles.leftText}>体重(kg)</Text>
    //         <EditView style={styles.editStyle} ref={ref => (this.mWeight = ref)}/>
    //     </View>
    // }
    //
    // eyeLView() {
    //     return <View style={styles.itemView}>
    //         <Text style={styles.leftText}>左眼</Text>
    //         <EditView style={styles.editStyle} ref={ref => (this.mEyeL = ref)}/>
    //     </View>
    // }
    //
    // eyeRView() {
    //     return <View style={styles.itemView}>
    //         <Text style={styles.leftText}>右眼</Text>
    //         <EditView style={styles.editStyle} ref={ref => (this.mEyeR = ref)}/>
    //     </View>
    // }
}

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