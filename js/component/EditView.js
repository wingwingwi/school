import React from 'react';
import {TouchableOpacity, Platform, TextInput} from 'react-native';

/**点击button*/
export default class EditView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    render() {
        return (<TextInput style={[{padding: 0}, this.props.style]}
                           multiline={this.props.multiline}
                           numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : 1}
                           value={this.state.text}
                           onChangeText={(text) => this.setState({text: text})}
                           placeholder={this.props.placeholder}
                           underlineColorAndroid='transparent'>
            </TextInput>
        )
    }

    /**获取数据*/
    text(text) {
        if (text) {
            this.setState({text: text});
            return text;
        }
        return this.state.text;
    }
}