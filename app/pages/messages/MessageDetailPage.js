/**
 * Created by lyan2 on 16/7/31.
 */
import React, { Component } from 'react';
import {
    AsyncStorage,
    Flex,
    InteractionManager,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';

import styles from './styles';
import Toolbar from '../../components/toolbar';
import WebViewBridge from 'react-native-webview-bridge';

export default class MessageDetailPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{backgroundColor: '#f5f5f5', flex: 1},Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="消息"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />
                <WebViewBridge
                    ref="webviewbridge"
                    source={{uri: "http://share68.com"}}/>

            </View>
        );
    }
}