'use strict';

import React from 'react-native';

var {
    StyleSheet,
    Dimensions
    } = React;

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    baseText: {
        fontSize: 13,
        color: '#4a4a4a',
        lineHeight: 18,
        paddingBottom: 2
    },
    dimText: {
        color: '#9b9b9b',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f1f1f1',
    },
    search: {
        height: 62,
        paddingTop: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    searchText: {
        height: 24,
        width: width - 66,
        marginTop: 10,
        marginLeft: 20,
        paddingLeft: 26,
        fontSize: 14,
        lineHeight: 24,
        borderWidth: 0,
        backgroundColor: 'rgba(155,155,155,0.1)',
        marginHorizontal: 10,
        flex: 1,
        paddingVertical: 3
    },
    back: {
        marginTop: 12,
        marginLeft: 10
    },
    magnifier: {
        position: 'absolute',
        marginTop: 14,
        marginLeft: 72 - width
    },
    addressBook: {
        marginTop: 10,
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    addressText: {
        fontSize: 16,
        paddingLeft: 10,
        alignSelf: 'center'
    },
    listContainer: {
        marginTop: 10,
        minHeight: height,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    friendsList: {

    },
    friendsRow: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        //paddingBottom: 15,
        //paddingTop: 15,
        borderColor: 'rgba(155,155,155,0.1)',
        borderBottomWidth: 1,
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    invite: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    float: {
        position: 'absolute',
        width: width,
        height: 40,
        bottom: 0,
        backgroundColor: '#4cd864',
        borderTopWidth: 1,
        borderColor: 'rgba(155,155,155,0.1)',
        justifyContent: 'center'
    },
    portrait: {
        height: 34,
        borderRadius: 17,
        alignSelf: 'center',
    },
    floatText: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center'
    },
    trueSwitchIsOn: {
        alignSelf: 'center',
        right: 10,
    },
    button: {
        borderRadius: 6,
        height: 25
    }
});

export default styles;