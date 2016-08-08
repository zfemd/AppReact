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
        paddingHorizontal: 10
    },
    navigatorTitle: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        flex:2
    },
    navigatorText: {
        fontSize:18,
        color:'#4a4a4a'
    },
    rightContainer: {
        justifyContent: 'flex-end'
    },
    leftContainer: {
        justifyContent: 'flex-start'
    },
    uploadAvatarContainer: {

    },
    uploadAvatar: {

    },
    selectedPhotoContainer: {
        backgroundColor: '#000'
    },
    selectedPhoto: {
    },
    tabView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles