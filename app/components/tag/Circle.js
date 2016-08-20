/**
 * Created by lyan2 on 16/8/20.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default class Circle extends Component {
    static propTypes = {
        ...TouchableOpacity.propTypes,
        containerStyle: View.propTypes.style,
        disabled: PropTypes.bool,
        style: Text.propTypes.style,
        styleDisabled: Text.propTypes.style,
        }

    render() {
        let touchableProps = {};
        if (!this.props.disabled) {
            touchableProps.onPress = this.props.onPress;
            touchableProps.onPressIn = this.props.onPressIn;
            touchableProps.onPressOut = this.props.onPressOut;
            touchableProps.onLongPress = this.props.onLongPress;
        }

        let size = this.props.size ? this.props.size : 12;
        let half = size / 2;
        let position = this.props.position ? this.props.position : null;
        let style= position == null ? null : {position: 'absolute', left: position.left - half, top: position.top - half};

        return (
            <TouchableOpacity {...touchableProps} testID={this.props.testID} style={[{height: size, width: size}, style]}>
                <View style={[{backgroundColor: '#fff', height: size, width: size, borderRadius: size}]}>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
});