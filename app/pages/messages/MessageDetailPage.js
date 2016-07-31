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
    View
} from 'react-native';

import styles from './styles';
import StorageKeys from '../../constants/StorageKeys';
import {
    getToken
} from '../../utils/common'

export default class MessageDetailPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Message Detail</Text>
            </View>
        );
    }
}