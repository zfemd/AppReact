'use strict';

import React from 'react';
import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,
    Text,
    View
} from 'react-native';
import Login from '../login/index'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#3e9ce9"
                    barStyle="default"
                    />
                <Login/>
            </View>
        );
    }
}

export default Home;