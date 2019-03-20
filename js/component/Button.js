import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';

/**点击button*/
export default class Button extends React.Component {
    render() {
        return (<TouchableOpacity onPress={this.props.onPress} style={this.props.style} activeOpacity={0.9}>
                {this.props.children}
            </TouchableOpacity>
        )
    }

}