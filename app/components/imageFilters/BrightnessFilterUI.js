/**
 * Created by lyan2 on 16/10/2.
 */
import React, { Component } from 'react';
import {
    Flex,
    InteractionManager,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import ConfirmBar from '../../components/bar/ConfirmBar';

export default class BrightnessFilterUI extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.bar}>
                <ConfirmBar></ConfirmBar>
            </View>
        );
    }
}

const styles = {
    bar : {
        flexDirection: 'row'
    }
}
