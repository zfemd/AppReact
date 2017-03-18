'use strict';

import React from 'react-native';

var {
    StyleSheet,
    Dimensions,
    Platform
    } = React;
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    baseText:{
        fontSize: 13,
        color: '#4a4a4a',
        lineHeight: 18,
        paddingBottom: 2
    },
    dimText:{
        color: '#9b9b9b',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f1f1f1',
    },
    searchHeader: {
        height: 42,
        paddingTop: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    back: {
        marginLeft: 10,
        marginTop:  Platform.OS === 'android' ? 6 : 0
    },
    searchText: {
        height: 24,
        width: width - 66,
        marginTop: 10,
        marginLeft: 12,
        paddingLeft: 16,
        fontSize: 14,
        lineHeight: 24,
        borderWidth: 0,
        backgroundColor: 'rgba(155,155,155,0.1)',
        marginHorizontal: 10,
        flex: 1,
        paddingVertical: 3
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchBody : {
        marginBottom: 44
    },
    searchTab: {
        height: 40,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#f1f1f1',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
    },
    tab: {
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#f1f1f1',
        paddingBottom: 10,
        width: width/2
    },
    tabActive: {
        borderColor: '#fc7d30'
    }
});

export default styles;