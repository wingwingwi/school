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
import {size, showMsg, isIos, getDateList, getDateTime, twoText} from "../utils/Util";
import Swiper from "react-native-swiper";
import {DatePickerView, PickerView} from '@ant-design/react-native';

const nowDate = new Date(); //获取当前的时间
const nowYear = nowDate.getFullYear(); //当前年
const nowMonth = nowDate.getMonth() + 1; //当前年
const nowDay = nowDate.getDate(); //当前年
const nowWeek = nowDate.getDay(); //周几
const nowHour = nowDate.getHours();
const nowMinutes = nowDate.getMinutes();
var year = nowYear;
var month = nowMonth;
var day = nowDay;
const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; //分钟
const mins = [0, 10, 20, 30, 40, 50]; //分钟

export default class DateModel extends Component {
    /**定义基本的数据类型，props，*/
    static propTypes = {
        closeModal: PropTypes.func, //关闭对话框监听方法
        show: PropTypes.bool,
        list: PropTypes.array
    };

    /**初始化数据*/
    constructor(props) {
        super(props);
        var hours = []
        for (var i = 0; i < 24; i++) {
            var hour = i < 10 ? `0${i}` : `${i}`
            hours.push({label: `${hour}点`, value: hour})
        }
        times = [hours]
        this.state = {
            isVisible: this.props.show,
            list: [], value: undefined, dataList: times,
            dateDay: "",
            dateTime: "8:00",
            isSettingDay: true
        };
        this.key = 1000;

    }

    /**已经挂载-处理耗时操作*/
    componentWillMount() {
        var lists = getDateList(nowYear, nowMonth);
        this.setState({
            list: lists,
            dateDay: year + "年" + twoText(month) + "月" + twoText(day) + "日",
            dateTime: twoText(8) + ":" + twoText(0)
        });
    }

    /**主布局*/
    renderDialog() {
        return (
            <View style={{width: size.width}}>
                <View
                    style={{
                        width: null,
                        backgroundColor: "#fff",
                        height: 45,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <View style={{flexDirection: "row"}}>
                        <View
                            style={{
                                height: 45,
                                marginLeft: 10,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    padding: 5,
                                    fontSize: 15,
                                    color: this.state.isSettingDay ? "#0099FF" : "#999"
                                }}
                                onPress={() => this.setState({isSettingDay: true})}
                            >
                                {this.state.dateDay}
                            </Text>
                            {!this.state.isSettingDay ? null :
                                <View
                                    style={{
                                        position: "absolute",
                                        height: 2,
                                        width: 100,
                                        backgroundColor: "#0099FF",
                                        bottom: 0
                                    }}
                                />
                            }
                        </View>
                        <View
                            style={{
                                height: 45,
                                marginLeft: 10,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    padding: 5,
                                    fontSize: 15,
                                    color: this.state.isSettingDay ? "#999" : "#0099FF"
                                }}
                                onPress={() => this.setState({isSettingDay: false})}
                            >
                                {this.state.dateTime}
                            </Text>
                            {this.state.isSettingDay ? null : (
                                <View
                                    style={{
                                        position: "absolute",
                                        height: 2,
                                        width: 50,
                                        backgroundColor: "#0099FF",
                                        bottom: 0
                                    }}
                                />
                            )}
                        </View>
                    </View>
                    <Text
                        style={{
                            padding: 5,
                            paddingRight: 15,
                            color: "#0099FF",
                            fontSize: 15
                        }}
                        onPress={() => this.props.closeModal(year + '-' + twoText(month) + '-' + twoText(day) + ' ' + this.state.dateTime)}
                    >
                        确认
                    </Text>
                </View>
                <View style={{width: null, height: 1, backgroundColor: "#eee"}}/>
                {this.state.isSettingDay ? <View
                    style={{
                        backgroundColor: "#fff",
                        height: ((this.state.list.length == 35 ? 6 : 7) * size.width) / 10
                    }}
                >
                    <Swiper style={{flex: 1}}>
                        <View
                            style={{
                                width: size.width,
                                backgroundColor: "#fff",
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}
                        >
                            {this._getViewList()}
                        </View>
                    </Swiper>
                </View> : this.renderTime()}
            </View>
        );
    }

    renderTime() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#fff',
                    height: size.width * 7 / 10
                }}
            >
                {/*<DatePickerView value={getDateTime("2018-01-01 " + this.state.dateTime)}*/}
                {/*mode={'time'}*/}
                {/*onChange={(data) => {*/}
                {/*}}*/}
                {/*onValueChange={(data, index) => {*/}
                {/*var time = twoText(data[0]) + ':' + twoText(data[1])*/}
                {/*this.setState({dateTime: time});*/}
                {/*}}*/}
                {/*/>*/}
                <PickerView data={this.state.dataList} value={this.state.value}
                            onChange={value => {
                                this.setState({value: value, dateTime: value[0] + ":00"})
                                console.log(JSON.stringify(value))
                            }}
                            cascade={false}
                            cols={1}
                            indicatorStyle={{flex: 1, color: '#999'}}
                            itemStyle={{fontSize: 15, padding: 5, color: '#555'}}/>
            </View>
        );
    }

    /**获取列表*/
    _getViewList() {
        var view = [];
        if (this.state.list == undefined) {
            return;
        }
        ["日", " 一", " 二", " 三", "四", "五", "六"].map((item, idx) => {
            const index = idx;
            view.push(this.viewItemT(item, index));
        });
        this.state.list.map((item, idx) => {
            const index = idx;
            view.push(this.viewItem(item, index));
        });
        return view;
    }

    /**item 数据*/
    viewItemT(item, index) {
        return (
            <View
                style={{
                    width: size.width / 7 - 1,
                    height: size.width / 10,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                key={this.key++}
            >
                <Text style={{color: "#333", fontSize: 15}}>{item}</Text>
            </View>
        );
    }

    /**item 数据*/
    viewItem(item, index) {
        var color = "#a9a9a9";
        if (item.type == 0) color = item.day == 1 ? "#0099FF" : "#333";
        var isDay = item.type == 0 && item.day == day;
        var isToday = item.m == nowMonth + item.type && item.day == nowDay;
        return (
            <TouchableOpacity
                style={{
                    width: size.width / 7 - 1,
                    height: size.width / 10,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                key={this.key++}
                onPress={() => this.setNewList(this.state.list[index])}
            >
                {isDay ? (
                    <View
                        style={{
                            position: "absolute",
                            backgroundColor: "#0099FF",
                            width: size.width / 10,
                            height: size.width / 10,
                            borderRadius: size.width / 10 / 2
                        }}
                    />
                ) : null}
                {isToday ? (
                    <View
                        style={{
                            position: "absolute",
                            bottom: 1,
                            backgroundColor: "#0099FF",
                            width: 4,
                            borderRadius: 2,
                            height: 4
                        }}
                    />
                ) : null}
                <Text
                    style={{
                        color: isDay ? "#fff" : color,
                        fontSize: 15
                    }}
                >
                    {item.type == 0 && item.day == 1 ? item.m + "月" : item.day + ""}
                </Text>
            </TouchableOpacity>
        );
    }

    //2个月内操作
    setNewList(item) {
        console.log(JSON.stringify(item))
        if (item.type == 0) {//本月
            this.setDateText(item.y, item.m, item.day);
        } else if (item.type == -1) {//上一个月
            if (nowMonth == 12 && item.m == 1) {
                this.setDateText(nowYear, nowMonth, item.day);
                this.changList(nowYear, nowMonth);
            } else if (nowMonth != 12 && item.m == nowMonth + 1) {
                this.setDateText(nowYear, nowMonth, item.day);
                this.changList(nowYear, nowMonth);
            }
        } else if (item.type == 1) {//下一个月
            if (nowMonth == 12 && item.m == 12) {
                this.setDateText(nowYear + 1, 1, item.day);
                this.changList(nowYear, 1);
            } else if (item.m == nowMonth) {
                this.setDateText(nowYear, nowMonth + 1, item.day);
                this.changList(nowYear, nowMonth + 1);
            }
        }
    }

    setDateText(y, m, d) {
        year = y;
        month = m;
        day = d;
        this.setState({
            dateDay: y + "年" + twoText(m) + "月" + twoText(d) + "日"
        });
    }

    changList(year, month) {
        var lists = getDateList(year, month);
        this.setState({
            list: lists
        });
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
                <View style={{
                    flex: 1,
                    width: size.width,
                    justifyContent: "flex-end",
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}>
                    <TouchableWithoutFeedback style={{flex: 1}}
                                              onPress={() => this.closeModal()}><View
                        style={{flex: 1}}/></TouchableWithoutFeedback>
                    <View>
                        {this.renderDialog()}
                    </View>
                </View>
            </Modal>
        );
    }

    onChange = value => {
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
            year = nowYear;
            month = nowMonth;
            day = nowDay;
            this.setState({isVisible: nextProps.show});
            this.setDateText(year, month, day)
            this.changList(year, month)
        } else {
            this.setState({isVisible: false});
        }
    }

    /**传入有效数据*/
    sureModal(isOk) {
        this.props.closeModal(isOk);
    }
}

var times = [[{label: '08点', value: '08'}]]
//     [[{label: '08点', value: '08'}, {label: '09点', value: '09'}, {label: '10点', value: '10'},
//     {label: '11点', value: '11'}, {label: '12点', value: '12'}, {label: '13点', value: '13'},
//     {label: '14点', value: '14'}, {label: '15点', value: '15'}, {label: '16点', value: '16'},
//     {label: '17点', value: '17'}, {label: '18点', value: '18'}
// ]]