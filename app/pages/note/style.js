/**
 * Created by lyan2 on 16/8/2.
 */
import React from 'react';
//noinspection JSUnresolvedVariable
import {
    StyleSheet,
    Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f1f1f1'
    }
});

export default styles