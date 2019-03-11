import React, { Component } from "react";
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
import { size, showMsg, isIos, getDateList, twoText } from "../utils/Util";
import Swiper from "react-native-swiper";

const nowDate = new Date(); //获取当前的时间
const nowYear = nowDate.getFullYear(); //当前年
const nowMonth = nowDate.getMonth() + 0; //当前年
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
    this.state = {
      isVisible: this.props.show,
      list: [],
      dateDay: "",
      dateTime: "",
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
      dateTime: twoText(nowHour) + ":" + twoText(nowMinutes)
    });
  }
  /**主布局*/
  renderDialog() {
    return (
      <View style={{ width: size.width }}>
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
          <View style={{ flexDirection: "row" }}>
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
              >
                {this.state.dateDay}
              </Text>
              {!this.state.isSettingDay ? null : (
                <View
                  style={{
                    position: "absolute",
                    height: 45,
                    width: 600,
                    color: "#0099FF",
                    bottom: 0
                  }}
                />
              )}
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
              >
                {this.state.dateTime}
              </Text>
              {this.state.isSettingDay ? null : (
                <View
                  style={{
                    position: "absolute",
                    height: 2,
                    width: 60,
                    color: "#0099FF",
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
            onPress={() => this.closeModal()}
          >
            确认
          </Text>
        </View>
        <View style={{ width: null, height: 1, backgroundColor: "#eee" }} />
        {this.renderTime()}
        {/* {<View
          style={{
            backgroundColor: "#fff",
            height: ((this.state.list.length == 35 ? 6 : 7) * size.width) / 10
          }}
        >
          <Swiper style={{ flex: 1 }}>
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
        </View>} */}
      </View>
    );
  }

  renderTime() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ScrollView style={{height:size.width / 10}}>
          {hours.map((item, idx) => {
            return <Text>11</Text>;
          })}
        </ScrollView>
        <Text> : </Text>
        <ScrollView>
          {mins.map((item, idx) => {
            return <Text>11</Text>;
          })}
        </ScrollView>
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
          width: size.width / 7,
          height: size.width / 10,
          alignItems: "center",
          justifyContent: "center"
        }}
        key={this.key++}
      >
        <Text style={{ color: "#333", fontSize: 15 }}>{item}</Text>
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
          width: size.width / 7,
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
    if (item.type == 0) {
      this.setDateText(nowYear, nowMonth, item.day);
    } else if (item.type == -1) {
      if (nowMonth == 12 && item.m == 1) {
        this.setDateText(nowYear, nowMonth, item.day);
        this.changList(nowYear, nowMonth);
      } else if (nowMonth != 12 && item.m == nowMonth + 1) {
        this.setDateText(nowYear, nowMonth, item.day);
        this.changList(nowYear, nowMonth);
      }
    } else if (item.type == 1) {
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
        <TouchableWithoutFeedback onPress={() => this.closeModal()}>
          <View
            style={{
              flex: 1,
              width: size.width,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
          >
            <TouchableWithoutFeedback>
              {this.renderDialog()}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  onChange = value => {
    console.log(value);
    this.setState({ value });
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
      this.setState({ isVisible: nextProps.show });
    } else {
      this.setState({ isVisible: false });
    }
  }

  /**传入有效数据*/
  sureModal(isOk) {
    this.props.closeModal(isOk);
  }
}
