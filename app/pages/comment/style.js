'use strict';

import React from 'react-native';

var {
    StyleSheet
    } = React;

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
    comment: {
        backgroundColor: '#fff',
        padding: 5
    },
    commentText: {
        height: 120,
        fontSize: 14,
        borderWidth: 0
    },
    shortcut:{
        flexDirection: 'row',
        height: 35,
        borderColor: "#e1e1e1",
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    at: {
        color: "#9b9b9b",
        fontSize: 25,
        marginLeft: 20
    },
    button: {
        height: 36,
        backgroundColor: '#fc7d30',
        margin: 30,
        marginTop: 40,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonFont: {
        fontSize: 16,
        lineHeight: 26,
        color: '#fff'
    }
});

export default styles;