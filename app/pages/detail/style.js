'use strict';

import React  from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    baseText:{
        fontSize: 13,
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
        //padding: 15,
        marginBottom: 40
    },
    block: {
        backgroundColor: '#fff',
        marginBottom: 5,
        flexDirection: 'column',
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
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
        padding: 15,
    },
    dTitle: {
        marginBottom: 14,
    },
    tags: {
        padding: 15,
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
    },
    float: {
        flex:1,
        flexDirection: 'row',
        position: 'absolute',
        width: width,
        height: 40,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: 'rgba(155,155,155,0.1)',
    },
    floatOp: {
        width: width/4,
    },
    floatOpView: {
        flex:1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    floatOpImage: {
        marginTop: 12,
    },
    floatOpText: {
        lineHeight: 27,
        paddingLeft: 5,
        color: '#9b9b9b'
    },
    floatOpLine: {
        flex: 1,
        height: 20,
        width: 1.5,
        backgroundColor: 'rgba(155,155,155,0.4)',
        marginTop: 8,
    },

    GC: {
        flex: 1,
        flexDirection: 'row',
    },
    grade: {
        width: width/2,
        padding: 15
    },
    comment: {
        width: width/2,
        padding: 15
    },
    blockTitle: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'rgba(155,155,155,0.1)',
        marginBottom: 5,
        flexDirection: 'row',
    },
    blockTitleText: {
        color: '#4a4a4a',
        fontSize: 16,
        lineHeight: 18,
    },
    star: {
        flexDirection: 'row',
        flex: 1,
        height: 30,
        alignItems: 'center'
    },
    starTitle: {
        width: 70,
        color: '#9b9b9b',
        fontSize: 13
    },
    rightArrow: {
        position: 'absolute',
        right: 0,
        top: 2
    },
    commentList: {
        flexDirection: 'row',
        flex: 1,
        height: 30,
        alignItems: 'center',
        overflow: 'hidden'
    },
    NickName: {
        color: '#9b9b9b',
        fontSize: 13,
        marginRight: 5
    },
    commentContent: {
        color: '#4a4a4a',
        fontSize: 13,
    }
});

export default styles;