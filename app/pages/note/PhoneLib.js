/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
const ReactNative = require('react-native');
const {
    Navigator,
    StyleSheet,
    Text,
    View
} = ReactNative;

class PhoneLib extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }

    render() {
        return (
            <Text>Phone Lib page</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default PhoneLib;