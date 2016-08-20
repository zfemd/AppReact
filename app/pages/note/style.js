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
        backgroundColor: '#f1f1f1'
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
        backgroundColor: '#000',
        position: 'relative'
    },
    selectedPhoto: {
    },
    tabView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    modalContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textInput: {
        marginHorizontal: 10,
        padding: 3,
        height: 26,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        flex:1,
        fontSize:18,
        color:'#fff'
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10
    },
    button: {
        marginVertical: 10,
        paddingVertical:9,
        backgroundColor: '#F37D30',
        borderRadius:9,
        alignItems:'center',
        justifyContent:"center"
    },
    buttonText: {
        fontSize:18,
        color:'#fff',
        fontFamily:'STHeitiSC-Medium'
    },
    cancelBtn: {
        backgroundColor: '#F1f1f1'
    },
    cancelBtnText: {
        color: '#000'
    }
});

export default styles;