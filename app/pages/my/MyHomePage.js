'use strict';
import React, { Component } from 'react';
import {
    Flex,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    NavigatorIOS,
    Picker,
    ActivityIndicatorIOS
} from 'react-native';

import Toolbar from '../../components/toolbar';
import Button from '../../../app/components/button/Button';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import styles from './styles';

var woman = <Icon style={{marginLeft:3,alignItems:'center'}} size={16} name="venus"/>;
var man = <Icon style={{marginLeft:3,alignItems:'center'}} size={16} name="mars"/>;
var rmbIcon = <Icon style={[styles.noteAssetIcon, {marginLeft:3}]} size={14} name="rmb"/>;
var zanIcon = <Icon style={styles.noteAssetIcon} size={14} name="heart-o"/>;
var commentIcon = <Icon style={styles.noteAssetIcon} size={14} name="comment-o"/>;
var shoppingCartIcon = <Icon style={styles.noteAssetIcon} size={14} name="shopping-cart"/>;
var ellipsisIcon = <Icon style={styles.noteAssetIcon} size={14} name="ellipsis-h"/>;

var THUMB_URLS = [
    require('../../assets/test/test.png'),
    require('../../assets/test/test1.png')
];

export default class MyHomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }
    _pressButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            // navigator.push({
            //     name: 'ForgetPasswordPage',
            //     component: ForgetPasswordPage,
            // })
        }
    }
    render() {
        return (
            <View>
                <View style={styles.userContainer}>
                    <View style={styles.portrait}>
                        <Image source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 45, height: 45}} />
                    </View>
                    <View style={styles.user}>
                        <Text style={{fontSize:16}}>天才小熊猫</Text><Icon style={{marginLeft:3, color:'#FF0087'}} size={16} name="venus"/>
                    </View>
                    <View style={styles.income}>
                        <Text style={{fontSize:12}}>总收益:</Text>
                        {rmbIcon}
                        <Text style={{marginLeft:3, fontSize:12, color:'#FC4D30'}}>32</Text>
                    </View>
                </View>

                <View style={styles.summaryContainer}>
                    <View style={styles.asset}>
                        <Text style={styles.count}>32</Text>
                        <Text style={[styles.text, styles.assetText]}>笔记</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>32</Text>
                        <Text style={[styles.text, styles.assetText]}>交易</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>32</Text>
                        <Text style={[styles.text, styles.assetText]}>关注</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.asset}>
                        <Text style={styles.count}>32</Text>
                        <Text style={[styles.text, styles.assetText]}>粉丝</Text>
                    </View>
                </View>

                <View style={styles.myNotesTitle}>
                    <Text style={{fontSize:16}}>我的笔记</Text>
                </View>

                <View style={styles.myNote}>
                    <View style={styles.noteUserBox}>
                        <View style={[styles.portrait, {borderRadius:31}]}>
                            <Image source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 31, height: 31}} />
                        </View>
                        <View style={styles.noteUserMsgBox}>
                            <Text style={styles.noteUserTitle}>天才小熊猫</Text>
                            <Text style={styles.noteCreateTime}>05-30 08:29</Text>
                        </View>
                    </View>
                    <TouchableHighlight style={styles.noteThumbBox}>
                        <Image style={styles.noteThumb} source={THUMB_URLS[0]} height={191} width={191}/>
                    </TouchableHighlight>
                    <Text style={styles.noteTitle}>最新入手的羊毛线</Text>
                    <View style={styles.noteAssets}>
                        <View style={styles.noteAsset}>
                            {zanIcon}
                            <Text style={[styles.text, {marginLeft:5}]}>11</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={styles.noteAsset}>
                            {commentIcon}
                            <Text style={[styles.text, {marginLeft:5}]}>11</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={styles.noteAsset}>
                            {shoppingCartIcon}
                            <Text style={[styles.text, {marginLeft:5}]}>({rmbIcon} 11)</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={styles.noteAsset}>
                            <Text style={[styles.text]}>...</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

