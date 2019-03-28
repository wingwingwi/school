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

const nowDate = new Date(); //获取当前的时间
const nowYear = nowDate.getFullYear(); //当前年
const nowMonth = nowDate.getMonth() + 1; //当前年
var yearMonth = [[{label: `${nowYear}年`, value: `${nowYear}`}, {label: `${nowYear - 1}年`, value: `${nowYear - 1}`}],
    []]
export default class YearMModel extends Component {
    /**定义基本的数据类型，props，*/
    static propTypes = {
        closeModal: PropTypes.func, //关闭对话框监听方法
        show: PropTypes.bool,
        list: PropTypes.array
    };

    /**初始化数据*/
    constructor(props) {
        super(props);
        for (var i = 1; i < 13; i++) {
            if (i < 10)
                yearMonth[1].push({label: `0${i}月`, value: `0${i}`})
            else yearMonth[1].push({label: `${i}月`, value: `${i}`})
        }
        this.state = {
            isVisible: this.props.show,
            list: yearMonth, value: undefined
        };
        this.key = 1000;
    }

    /**主布局*/
    renderDialog() {
        return (
            <View style={{width: size.width, backgroundColor: '#fff'}}>
                <View
                    style={{
                        width: null,
                        backgroundColor: "#fff",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style={{
                            padding: 10,
                            paddingLeft: 15,
                            fontSize: 15,
                            color: "#333"
                        }}
                        onPress={() => this.closeModal()}
                    >
                        取消
                    </Text>
                    <Text
                        style={{
                            padding: 10,
                            paddingRight: 15,
                            color: "#0099FF",
                            fontSize: 15
                        }}
                        onPress={() => {
                            console.log(JSON.stringify(this.state.value))
                            if (this.state.value) {
                                var year = this.state.value[0] + '-' + this.state.value[1]
                                this.props.closeModal(year)
                            } else showMsg('请选择')
                        }}
                    >
                        确认
                    </Text>
                </View>
                <View style={{width: null, height: 1, backgroundColor: "#eee"}}/>

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
            this.setState({isVisible: nextProps.show, value: undefined});
        } else {
            this.setState({isVisible: false});
        }
    }

    /**传入有效数据*/
    sureModal(isOk) {
        this.props.closeModal(isOk);
    }
}
