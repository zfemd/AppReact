/**
 * Created by lyan2 on 16/8/20.
 */
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
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
        Tag.index++;
    }

    render() {
        let touchableProps = {};
        if (!this.props.disabled) {
            touchableProps.onPress = this.props.onPress;
            touchableProps.onPressIn = this.props.onPressIn;
            touchableProps.onPressOut = this.props.onPressOut;
            touchableProps.onLongPress = this.props.onLongPress;
        }

        // TouchableWithoutFeedback doesn't support position, because it doesn't have size and position.
        // so we have to transfer position to Circle component.
        let position = this.props.position ? this.props.position : {left: 0, top: 0};

        //<TouchableOpacity {...touchableProps} testID={this.props.testID} style={this.props.containerStyle}>
        //    {this._renderGroupedChildren()}
        //</TouchableOpacity>

        return (
            <TouchableWithoutFeedback>
                <Circle position={position}></Circle>
            </TouchableWithoutFeedback>
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
    tag: {

    }
});