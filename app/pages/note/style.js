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
        marginTop: 21,
        backgroundColor: '#f1f1f1',
        flex: 1
    },
    navigator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        paddingHorizontal: 30
    },
    navigatorTitle: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    uploadAvatarContainer: {

    },
    uploadAvatar: {

    }
});

export default styles