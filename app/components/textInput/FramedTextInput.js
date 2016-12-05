/**
 * Created by lyan2 on 16/12/5.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
export default class FramedTextInput extends Component {
    render() {
        return (
            <View style={this.props.containerStyle}>
                <TextInput {...this.props} />
            </View>
        );
    }
}