/**
 * Created by lyan2 on 16/9/22.
 */
import React from 'react';
import {Dimensions,StyleSheet} from 'react-native';

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    row: {
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    separatorHorizontal: {
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    text: {
        fontSize:16,
        color:'#686868',
        flex:1
    },
    phoneText: {
        color:'#ccc',
        marginRight: 10
    },
    boundText: {
        color:'#FC4D30',
        marginRight: 10
    },
    portraitContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center'
    },
    fullPortrait: {
        width: width,
        height: width,
        marginTop: 50
    },
    fullPortraitImg: {

    },
    button: {
        height: 36,
        backgroundColor: '#fc7d30',
        borderRadius: 4,
        alignItems: 'center',
        width: width/2,
        marginTop: 20
    },
    buttonFont: {
        fontSize: 16,
        lineHeight: 26,
        color: '#fff'
    },
    buttonGrey: {
        backgroundColor: '#dbdbdb',
    }
});

export default styles;