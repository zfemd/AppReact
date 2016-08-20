/**
 * Created by lyan2 on 16/8/20.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Circle from './Circle';

export default class Tag extends Component {
    static propTypes = {
        ...TouchableOpacity.propTypes,
        containerStyle: View.propTypes.style,
        disabled: PropTypes.bool,
        style: Text.propTypes.style,
        styleDisabled: Text.propTypes.style,
        };

    static index = 0;

    constructor(props) {
        super(props);
        index++;
    }

    render() {
        let touchableProps = {};
        if (!this.props.disabled) {
            touchableProps.onPress = this.props.onPress;
            touchableProps.onPressIn = this.props.onPressIn;
            touchableProps.onPressOut = this.props.onPressOut;
            touchableProps.onLongPress = this.props.onLongPress;
        }

        let position = this.props.position ? this.props.position : {left: 0, top: 0};

        //<TouchableOpacity {...touchableProps} testID={this.props.testID} style={this.props.containerStyle}>
        //    {this._renderGroupedChildren()}
        //</TouchableOpacity>

        return (
            <View key={index} style={{left: position.left, top: position.top, position: 'absolute'}}>
                <Circle></Circle>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    text: {
        color: '#007aff',
        fontFamily: '.HelveticaNeueInterface-MediumP4',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    disabledText: {
        color: '#dcdcdc',
    },
    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});