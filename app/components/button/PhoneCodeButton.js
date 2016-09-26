/**
 * Created by lyan2 on 16/7/20.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
} from 'react-native';
import Button from './Button';

// var requestAnimationFrame = require('fbjs/lib/requestAnimationFrame');

export default class PhoneCodeButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasSent: false,
            text: '发送验证码'
        };

    }

    onPressBtn() {
        if (this.state.hasSent) return;

        if (this.props.onPress) {
            this.props.onPress();
        }

        this.setState({'hasSent': true});
        this.props.disabled = true;
        let timeLeft = 60;

        let timerId = setInterval((time) => {
            this.setState({text:timeLeft-- + '秒'})

            if (timeLeft <= 0) {
                clearInterval(timerId);
                this.state.hasSent = false;
                this.setState({text:'发送验证码'});
            }
        }, 1000);
    }

    render() {
        return (
            <Button ref={(component) => this.codeBtn = component}
                    onPress={this.onPressBtn.bind(this)}
                    style={styles.button}>
                {this.state.text}
            </Button>
        );
    }
}

var styles = StyleSheet.create({
    button: {
        fontSize: 14,
        backgroundColor:'#ececec',
        padding:3,
        borderRadius:2,
        color:'#888',
        lineHeight:23,
        fontFamily:'ArialMT',
        width:80
    }
});