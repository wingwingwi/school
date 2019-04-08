import React, {Component} from "react";
import {
    View,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Dimensions,
    Modal,
    FlatList,
    Text,
    Image,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import {size, showMsg, isIos} from "../utils/Util";
import {PickerView, Button} from "@ant-design/react-native";

export default class PickerModel extends Component {
    /**定义基本的数据类型，props，*/
    static propTypes = {
        closeModal: PropTypes.func, //关闭对话框监听方法
        show: PropTypes.bool,
        list: PropTypes.array,
        titleLeft: PropTypes.string,
        titleRight: PropTypes.string
    };

    /**初始化数据*/
    constructor(props) {
        super(props);
        this.state = {
            isVisible: this.props.show,
            list: [[{label: '选择', value: '0'}]], value: undefined
        };
        this.key = 1000;
    }

    /**主布局*/
    renderDialog() {
        return (
            <View style={{width: size.width, backgroundColor: '#fff'}}>
                <View style={{
                    width: null,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-between"
                }}>
                    <Text style={{
                        padding: 10,
                        paddingLeft: 15,
                        fontSize: 15,
                        color: "#333"
                    }}
                          onPress={() => this.closeModal()}>取消</Text>
                    <Text style={{
                        padding: 10,
                        paddingRight: 15,
                        color: "#0099FF",
                        fontSize: 15
                    }} onPress={() => {
                        var index = this.state.value[0];
                        this.props.closeModal(index)
                    }}>确认</Text>
                </View>
                <View style={{width: null, height: 1, backgroundColor: "#eee"}}/>
                {this.props.titleLeft ? <View style={{
                    width: null,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <Text style={{padding: 10, fontSize: 15, color: "#333"}}>{this.props.titleLeft}</Text>
                    <Text style={{padding: 10, fontSize: 15, color: "#333"}}>{this.props.titleRight}</Text>
                </View> : null}
                <PickerView
                    data={this.state.list}
                    value={this.state.value}
                    onChange={value => {
                        this.setState({value: value})
                    }}
                    cascade={false}
                    cols={1}
                    indicatorStyle={{flex: 1, color: '#999'}}
                    itemStyle={{fontSize: 15, padding: 5, color: '#555'}}
                />
                <View style={{height: 15, backgroundColor: "#fff", width: null}}/>
            </View>
        );
    }

    /**配置布局*/
    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.isVisible}
                animationType={"fade"}
                onRequestClose={() => this.closeModal()}
            >
                <View
                    style={{
                        flex: 1,
                        width: size.width,
                        justifyContent: "flex-end",
                        backgroundColor: "rgba(0, 0, 0, 0.5)"
                    }}
                >
                    <TouchableWithoutFeedback
                        style={{flex: 1}}
                        onPress={() => this.closeModal()}
                    >
                        <View style={{flex: 1}}/>
                    </TouchableWithoutFeedback>
                    {this.renderDialog()}
                </View>
            </Modal>
        );
    }

    onChange = value => {
        console.log(value);
        this.setState({value});
    };

    /**关闭弹框*/
    closeModal() {
        if (this.state.isVisible) {
            this.props.closeModal();
        }
    }

    /**跟新状态*/
    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            var listNew = nextProps.list;
            var list = [[]];
            listNew.map((item, idx) => {
                list[0].push({label: `${item.name}`, value: `${idx}`})
            })
            console.log(JSON.stringify(list))
            this.setState({isVisible: nextProps.show, list: list, value: [list[0][0].value]});
        } else {
            this.setState({isVisible: false});
        }
    }

    /**传入有效数据*/
    sureModal(isOk) {
        this.props.closeModal(isOk);
    }
}
