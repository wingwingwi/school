import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {showMsg, size} from '../utils/Util'

/**选项卡，文字，下划线设置*/
export default class TextBar extends Component {
    constructor(props) {
        super(props);
        this.state = {//设置初值
            tab: 0, isClock: false,
            list: ["推荐", "教育健康", "社会", "亲子", "人文"]
        };
    }

    componentWillMount() {
        var list = this.props.list
        list ? this.setState({list: list}) : null
    }

    render() {
        return <View><ScrollView style={{width: size.width, backgroundColor: '#fff'}}
                                 horizontal={true}>
            {this.state.list.map((item, index) => {
                var num = index;
                return this.textView(item, num);
            })}
        </ScrollView>
            <View style={{backgroundColor: '#E5E5E5', width: size.width, height: 1}}/>
        </View>
    }

    textView(text, index) {
        var s = {}
        if (this.state.list.length < 3) {
            s.width = size.width / this.state.list.length
        }
        return <TouchableOpacity onPress={() => {
            if (this.state.isClock) {
                if (this.state.tab != index)
                    showMsg('当前不允许更改请假类型')
            } else {
                this.setState({tab: index})
                if (this.props.changeTab) this.props.changeTab(index)
            }
        }} style={[{paddingRight: 5, paddingLeft: 5, alignItems: 'center'}, s]} key={index}>
            <Text style={{
                fontSize: 15,
                padding: 8,
                color: index == this.state.tab ? '#0099FF' : '#262626'
            }}>{text}</Text>
            <View style={{width: 60, height: 2, backgroundColor: index == this.state.tab ? '#0099FF' : '#fff'}}></View>
        </TouchableOpacity>
    }

    tab(num) {
        if (num) {
            this.setState({tab: num});
            return num;
        }
        return this.state.tab;
    }

    /**设置锁定*/
    clock() {
        this.setState({isClock: true})
    }

    setList(list) {
        list ? this.setState({list: list}) : null
    }
}
