/**
 * Created by lyan2 on 16/7/26.
 */
import React from 'react-native'

var {
    StyleSheet
} = React;

export default styles = StyleSheet.create({
    text:{
        color: '#4a4a4a'
    },
    userContainer: {
        flexDirection:'column',
        alignItems: 'center',
        marginTop: 10,
    },
    portrait: {
        borderRadius: 45,
        borderColor: '#fff',
        borderWidth: 2
    },
    user: {
        flexDirection:'row',
        justifyContent: 'center',
        marginTop:5
    },
    income: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'flex-end',
        marginTop:5
    },
    summaryContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'stretch',
        backgroundColor:'#fff',
        marginTop: 10,
        marginBottom: 5,
        paddingVertical:5
    },
    asset: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    assetText: {
        fontSize:12
    },
    separatorVertical: {
        borderLeftWidth:1,
        borderLeftColor:'#ccc'
    },
    separatorHorizontal: {
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    count: {
        fontSize:20,
        color:'#FC4D30',
        fontStyle: 'italic'
    },
    myNotesTitle: {
        backgroundColor: '#fff',
        padding: 16
    },
    myNote:{
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#fff',
        padding: 20
    },
    noteUserBox: {
        flexDirection: 'row'
    },
    noteUserMsgBox: {
        marginLeft: 5,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    noteUserTitle: {
        fontSize: 16
    },
    noteCreateTime: {
        fontSize: 12,
        color: '#9B9B9B'
    },
    noteThumbBox: {
        marginTop: 10,
    },
    noteThumb: {
        height: 191,
        width: 191,
        overflow:'hidden'
    },
    noteTitle: {
        fontSize: 14,
        marginVertical: 10
    },
    noteAssets: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    noteAsset: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    noteAssetIcon: {
        color:'#FC4D30'  
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
    messageAssertIcon: {
        color:'#9b9b9b',
        marginRight: 5,
        width: 20
    },
    messageLinkIcon: {
        color:'#9b9b9b',
        marginLeft: 5
    },
    container: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 30,
        marginTop: 21,
        alignItems: 'stretch',
    },
    navigator: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    button: {
        paddingVertical:9,
        backgroundColor: '#DFDFDF',
        borderRadius:2,
        fontSize:18,
        color:'#fff',
        fontFamily:'STHeitiSC-Medium',
        alignItems:'center',
        justifyContent:"center"
    },
    activeButton: {
        backgroundColor: '#F37D30',
    }
});