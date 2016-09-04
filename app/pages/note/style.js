/**
 * Created by lyan2 on 16/8/2.
 */
import React from 'react';
//noinspection JSUnresolvedVariable
import {
    StyleSheet,
    Dimensions
} from 'react-native';
import colors from '../../constants/colors';
var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgGrayColor
    },
    uploadAvatar: {
        marginRight: 10
    },
    selectedPhotoContainer: {
        backgroundColor: '#000'
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
    },
    morePhotoBox: {
        borderStyle: 'dashed',
        borderWidth: 1,
        width: 80,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default styles;