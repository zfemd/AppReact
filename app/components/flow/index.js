'use strict';

import React, { PropTypes } from 'react';
import {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import PrefetchImage from '../prefetchImage'

const {height, width} = Dimensions.get('window');
const thumbs = [

    {
        uri: 'http://hbimg.b0.upaiyun.com/fd7af3c379c8888a1ede4ea1046efea1fe953c63db770-sUI89w_fw658',
            width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/0e343198bc21f4bfb6208dbb8e6d7d4358cffb3f2336c-M90TeP_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/be437a14550ce40dd0967e26bc4dd72dc2acdd88c418-TfAcUn_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/9944373939d4afd9b8c393973c3875f91ebf6c1d26d0e-lAUGG4_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/27e37520133ada3bde5c20d28bee40a5042f671711574-uM60Kq_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/3bfa27a07f27ab9a88493ca06cc21c001e3c943271027-VYWzdp_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/783b504aba16ddbc54e572d243ce70796c3bacd169828-uqStAZ_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/81329d6d0911921db04ee65f3df9d62aa6763b5f266fa-4kXDrj_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/cedb001478d5ad0dfe54a5af1797ad655efccd851d7d9-F0bnZJ_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/f065d8ce338b6f07a6b80471739c6739bb2c18979ada4-XKfULg_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/3720c87acb331491191a17d077f9b3f0e2705a69240ca-g1GUjG_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/7bb5cb03ac44b15d1dd5d2b9f20fc300c8d61252cf0f-BJ4TZf_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/21f167d573b123a69b6e7e52f0b68e1a374f13f165462-1CoVG0_fw658',
        width: (width/100)*47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/e5a9ab3f0ed21b2ad8758138b6f8c1f5f238c96ee506-FqVv3B_fw658',
        width: (width/100)*47,
        height: 200
    },




];

class Flow extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._genRows({})),
            stars: ds.cloneWithRows([
                '1','2','3','4','5'
            ])
        };
    }

    _renderRow(rowData: string, sectionID: number, rowID: number) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = thumbs[(rowHash) % thumbs.length];
        return (
            <TouchableOpacity onPress={() => this.props.press()} underlayColor="transparent" activeOpacity={0.5}>
                <View>
                    <View style={styles.row}>
                        <PrefetchImage
                            imageUri={imgSource.uri}
                            imageStyle={styles.thumb}
                            resizeMode="cover"
                            width={(width/100)*47}
                            />
                        <Text style={styles.text}>
                            miya2016夏装新品宽松镂空短袖蕾丝衫女韩系显瘦性感度假上衣潮
                        </Text>
                        <View style={[{flexDirection:'row',width: (width/100)*47 -20,flex: 1,borderTopWidth: .6,paddingTop: 10,borderColor: '#9b9b9b',}]}>

                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />

                            <Image style={{width:8 ,height:8, marginLeft:(width/100)*47 -100}} source={require('../../assets/flow/heart.png')}/>
                            <Image style={{width:10 ,height:10, marginLeft:10}} source={require('../../assets/flow/comment.png')}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _renderRow1(rowData: string, sectionID: number, rowID: number) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = thumbs[(rowHash-2) % thumbs.length];
        return (
            <TouchableOpacity onPress={() => this.props.press()} underlayColor="transparent" activeOpacity={0.5}>
                <View>
                    <View style={styles.row}>
                        <PrefetchImage
                            imageUri={imgSource.uri}
                            imageStyle={styles.thumb}
                            resizeMode="cover"
                            width={(width/100)*47}
                            />
                        <Text style={styles.text}>
                            miya2016夏装新品宽松镂空短袖蕾丝衫女韩系显瘦性感度假上衣潮
                        </Text>
                        <View style={[{flexDirection:'row',width: (width/100)*47 -20,flex: 1,borderTopWidth: .6,paddingTop: 10,borderColor: '#9b9b9b',}]}>

                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />

                            <Image style={{width:8 ,height:8, marginLeft:(width/100)*47 -100}} source={require('../../assets/flow/heart.png')}/>
                            <Image style={{width:10 ,height:10, marginLeft:10}} source={require('../../assets/flow/comment.png')}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _genRows(pressData: {[key: number]: boolean}): Array<string> {
        var dataBlob = [];
        for (var ii = 0; ii < 100; ii++) {
            var pressedText = pressData[ii] ? ' (X)' : '';
            dataBlob.push('Cell ' + ii + pressedText);
        }
        return dataBlob;
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    initialListSize={21}
                    pageSize={3} // should be a multiple of the no. of visible cells per row
                    scrollRenderAheadDistance={500}
                    renderRow={this._renderRow}
                    />
                <ListView
                    contentContainerStyle={[styles.list, {paddingLeft: width/100*1}]}
                    dataSource={this.state.dataSource}
                    initialListSize={21}
                    pageSize={3} // should be a multiple of the no. of visible cells per row
                    scrollRenderAheadDistance={500}
                    renderRow={this._renderRow1}
                    />
            </View>

        );
    }
}

var hashCode = function(str) {
    var hash = 8;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var styles = StyleSheet.create({
    list: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        width: (width/100)*50,
        paddingLeft: width/100*2,
    },
    row: {
        flex: 1,
        marginTop: 8,
        marginBottom: 0,
        width: (width/100)*47 ,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    thumb: {
        width: (width/100)*47 ,
        height: 200,
        overflow: 'hidden',
    },
    text: {
        flex: 1,
        margin: 10,
        color: '#4a4a4a',
        fontSize: 11,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        marginBottom: 60
    }
});

export default Flow;