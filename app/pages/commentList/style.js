'use strict';

import React from 'react-native';

var {
    StyleSheet,
    Dimensions
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
    portrait: {
        backgroundColor: '#d8d8d8',
        borderRadius: 17,
        borderColor: '#fff',
        borderWidth: 1,
    },
    float: {
        flex:1,
        flexDirection: 'row',
        position: 'absolute',
        width: width,
        height: 40,
        bottom: 0,
        backgroundColor: '#fff',
        paddingTop: 6,
        paddingLeft: 10
    },
    commentRow: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
        paddingTop: 10,
        borderColor: 'rgba(155,155,155,0.1)',
        borderBottomWidth: 1,
        flex:1,
        flexDirection: 'row',
    },
    commentContent: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10
    },
    commentUserAndTime: {
        flex: 1,
        flexDirection: 'row',
    },
    commentTime: {
        fontSize: 10,
    },
    commentText: {
        height: 24,
        width: width - 56,
        marginLeft: 4,
        paddingLeft: 4,
        fontSize: 14,
        lineHeight: 24,
        borderWidth: 0,
        backgroundColor:  'rgba(155,155,155,0.1)',
    }
});

export default styles;