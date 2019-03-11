import React from 'react';
import {Text, Platform, View, ImageBackground} from 'react-native';
import Button from "./Button";
import {size, isIos, showMsg} from "../utils/Util";
import src from "../constant/Src";

/**点击button*/
export default class CheckView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
        }
    }

    render() {
        return (<View style={[{flexDirection: 'row', alignItems: 'center'}, this.props.style]}>
                {this.props.title ?
                    <Text style={{color: '#333', fontSize: 15, marginRight: 10}}>{this.props.title}</Text> : null}
                <Button onPress={() => {
                    var c = !this.state.check
                    this.setState({check: c})
                    if (this.props.changeCheck)
                        this.props.changeCheck(c)
                }}>
                    <ImageBackground style={{width: 60, height: 30,paddingLeft:5,paddingRight:5, flexDirection: 'row', alignItems: 'center'}}
                                     source={this.state.check ? src.anniu_highlight_btn : src.anniunormal_btn}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 15,
                            textAlign: 'center',
                            width: 25
                        }}>{this.state.check ? ' 是' : ''}</Text>
                        <Text style={{
                            color: '#fff',
                            fontSize: 15,
                            textAlign: 'center',
                            width: 25
                        }}>{this.state.check ? '' : '否 '}</Text>
                    </ImageBackground>
                </Button>
            </View>
        )
    }

    /**获取数据*/
    check(bool) {
        if (bool) {
            this.setState({check: bool});
            return bool;
        }
        return this.state.check;
    }
}