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

var woman = <Icon style={{marginLeft:3,alignItems:'center'}} size={16} name="venus"/>;
var man = <Icon style={{marginLeft:3,alignItems:'center'}} size={16} name="mars"/>;

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
                        <Icon style={{marginLeft:3}} size={12} name="rmb"/>
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
            </View>
        );
    }
}

/*
 <Picker style={{width:80,height:26}}
 selectedValue={this.state.region}
 onValueChange={(lang) => this.setState({region: lang})}>
 <Picker.Item label="+86" value="China" />
 </Picker>*/

var styles = StyleSheet.create({
    text:{
        color: '#4a4a4a'
    },
    userContainer: {
        flexDirection:'column',
        alignItems: 'center',
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
        alignItems:'center',
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
    separator: {
        borderLeftWidth:1,
        borderLeftColor:'#ccc',
        height:48
    },
    count: {
        fontSize:20,
        color:'#FC4D30',
        fontStyle: 'italic'
    },
    myNotesTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        padding: 16
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