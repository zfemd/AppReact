'use strict';

import React  from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    baseText:{
        fontSize: 14,
        color: '#4a4a4a',
        lineHeight: 18,
        paddingBottom: 2
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f1f1f1',
    },
    main: {
        //padding: 10,
        //marginBottom: 40
    },
    block: {
        backgroundColor: '#fff',
        marginBottom: 5,
        flex: 1,
        flexDirection: 'column',
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        paddingBottom: 0,
    },
    portrait: {
        backgroundColor: '#d8d8d8',
        borderRadius: 17,
        borderColor: '#fff',
        borderWidth: 1,
    },
    info: {
        marginLeft: 5,
    },
    nick: {
        fontSize: 16,
        lineHeight: 16,
        color: '#4a4a4a',
    },
    date: {
        fontSize: 11,
        lineHeight: 11,
        marginTop: 5,
        color: '#9b9b9b',
    },
    follow: {
        position: 'absolute',
        right: 10,
        top: 14,
    },
    thumbWarp: {
        marginTop: 10,
        flexDirection: 'row',
        overflow: 'visible',
        flexWrap: 'nowrap',
        alignSelf: 'flex-start',
    },
    thumb: {
        width: width,
        overflow: 'hidden',
    },
    description: {
        padding: 10,
    },
    dTitle: {
        paddingBottom: 8
    },
    tags: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
    },
    tag: {
        backgroundColor: 'rgba(155,155,155,0.1)',
        height: 25,
        borderRadius: 2,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 5,
        marginBottom: 10,
    },
    tagText: {
        fontSize: 12,
        lineHeight: 18,
        color: '#9b9b9b'
    }
});

export default styles;