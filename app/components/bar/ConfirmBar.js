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
    Image,
} from 'react-native';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';

var closeIcon = <Icon style={{color:'#9b9b9b'}} size={16} name="close" />;
var checkIcon = <Icon style={{color:'#9b9b9b'}} size={16} name="check" />;

export default class ConfirmBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.bar}>
                <TouchableHighlight>
                    {closeIcon}
                </TouchableHighlight>
                <Text>fsfd</Text>
                <TouchableHighlight>
                    {checkIcon}
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    bar : {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
}
