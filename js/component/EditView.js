import React from 'react';
import {TouchableOpacity, Platform, TextInput} from 'react-native';
import PropTypes from 'prop-types';

/**点击button*/
export default class EditView extends React.Component {

    static propTypes = {
        multiline: PropTypes.bool,
        secureTextEntry: PropTypes.bool,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        style: PropTypes.object,
        keyboardType: PropTypes.oneOf(['default', 'numeric', 'visible-password'])
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    render() {
        return (<TextInput style={[{padding: 0}, this.props.style]}
                           ref={ref => (this.textInput = ref)}
                           multiline={this.props.multiline}
                           secureTextEntry={this.props.secureTextEntry}
                           numberOfLines={this.props.numberOfLines ? this.props.numberOfLines : 1}
                           value={this.state.text}
                           keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                           onChangeText={(text) => this.setState({text: text})}
                           placeholder={this.props.placeholder}
                           underlineColorAndroid='transparent'>
            </TextInput>
        )
    }

    focus() {
        this.textInput && this.textInput.focus()
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