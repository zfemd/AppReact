/**
 * Created by lyan2 on 16/9/22.
 */
import React from 'react-native';

var { StyleSheet } = React;

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
    }
});

export default styles;