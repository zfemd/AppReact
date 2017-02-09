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
        backgroundColor: colors.white
    },
    uploadAvatar: {
        marginRight: 10
    },
    selectedPhotoContainer: {
        backgroundColor: colors.black,
        flexDirection: 'row',
        height:300
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
        borderColor: colors.white,
        borderWidth: 1,
        borderRadius: 5,
        flex:1,
        fontSize:18,
        color: colors.white
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
        backgroundColor: colors.orange,
        borderRadius:9,
        alignItems:'center',
        justifyContent:"center"
    },
    buttonText: {
        fontSize:18,
        color: colors.white,
        fontFamily:'STHeitiSC-Medium'
    },
    cancelBtn: {
        backgroundColor: colors.bgGray
    },
    cancelBtnText: {
        color: colors.black
    },
    morePhotoBox: {
        backgroundColor: colors.bgGray,
        borderStyle: 'solid',
        borderColor: colors.gray,
        borderWidth: 1,
        width: 80,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterBox: {
        width: 100,
        marginHorizontal: 10,
        marginVertical: 0,
        //backgroundColor:'#eee',
        alignItems:'stretch',
        justifyContent: 'center'
    },
    filterImageFrame: {
        justifyContent:'flex-start',
        alignItems: 'center'
    },
    filterImage: {
        width: 100,
        height: 80,
        marginVertical: 0,
        paddingVertical: 0
    },
    textInput: {
        flex:1,
        fontSize:18,
        color:'#696969',
        borderWidth: 0,
        marginVertical: 0,
        paddingVertical: 0,
        textAlignVertical: 'top'
    },
    framedTextInput: {
        flex: 1,
        height: 24,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:5,
        marginHorizontal: 5
    }
});

export default styles;