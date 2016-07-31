/**
 * Created by lyan2 on 16/7/26.
 */
import React from 'react-native'

var {
    StyleSheet
} = React;

export default styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 30,
        marginTop: 21,
        alignItems: 'stretch',
    },
    separatorHorizontal: {
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f5f4f5',
        paddingVertical: 12,
        borderBottomWidth:1,
        borderBottomColor: '#ccc'
    },
    messageHeaderTitle: {
        fontSize: 20
    },
    messageRow: {
        flexDirection:'row',
        backgroundColor:'#fff',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    messageTitle: {
        fontSize:16,
        color:'#686868',
        flex:1
    },
    messageNewMark: {
        backgroundColor:'#f00',
        marginRight:5,
        paddingHorizontal:5,
        borderRadius: 5
    },
    messageNewNum: {
        fontSize:12,
        lineHeight:16,
        color:'#fff'
    },
    messageIndicatortIcon: {
        color:'#9b9b9b',
        marginRight: 5,
        width: 20
    },
    messageLinkIcon: {
        color:'#9b9b9b',
        marginLeft: 5
    }
});