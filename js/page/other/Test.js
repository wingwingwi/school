import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  ImageBackground,
  NativeModules
} from "react-native"; //基本架构

import { Actions } from "react-native-router-flux"; //路由
import { showMsg } from "../../utils/Util"; //工具类
import Theme from "../../constant/Theme"; //属性，颜色，字体大小
import Button from "../../component/Button";
import BottomCModel from "../../model/BottomCModel";
import ChooseIModel from "../../model/ChooseIModel";
import DateModel from "../../model/DateModel";

/**
 * @class Test 是例子
 */
export default class Test extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { name: "测试",show:false }; //定义属性
  }
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => { this.setState({show:!this.state.show})}}>model 吊起</Text>
        <DateModel show={this.state.show} closeModal={(item)=>{
          if(item){}
          this.setState({show:false})
        }} list={[{name:"sss"},{name:"sss"},{name:"sss"},{name:"sss"},{name:"sss"}]}/>
      </View>
    );
  }

  /**即将挂载-处理参数*/
  componentWillMount() {}

  /**已经挂载-处理耗时操作*/
  componentDidMount() {}

  /**卸载*/
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
