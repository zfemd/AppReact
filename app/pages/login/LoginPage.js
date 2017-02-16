'use strict';
import React, { Component } from 'react';
import {
    Alert,
    Flex,
    InteractionManager,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    NavigatorIOS,
    Picker,
    Platform,
    ActivityIndicatorIOS,
    Navigator
} from 'react-native';

import Home from '../home';
import Button from '../../components/button/Button';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import ForgetPasswordPage from './ForgetPasswordPage';
import WeiXinLoginPage from './WeiXinLoginPage';
import configs from '../../constants/configs';
import * as WechatAPI from 'react-native-wx';
import {
    Token,
    toast
} from '../../utils/common';

const myIcon = (<Icon name="rocket" size={30} color="#900" />)

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }

    _onPressForgetLink() {
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ForgetPasswordPage,
                name: 'ForgetPasswordPage',
                sceneConfigs: Navigator.SceneConfigs.FloatFromLeft
            });
        });
    }

    _onPressLoginButton() {
        const { navigator } = this.props;
        let {phone, password} = this.state;

        fetch(configs.serviceUrl + 'accounts/' + phone + '/login/credential', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'password=' + password
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            if (responseJson && responseJson.resultCode == 0) {
                if (responseJson.resultValues && responseJson.resultValues.loginSuccess) {
                    InteractionManager.runAfterInteractions(() => {
                        navigator.resetTo({
                            component: Home,
                            name: 'Home',
                            params: {store: this.props.store}
                        });
                    });

                    return;
                }
            }
            Alert.alert('登录失败', "密码登录失败");
        }).catch((error) => {
            Alert.alert('登录失败', "网络连接失败：" + error);
        });
    }

    _onPressWeixinIcon() {
        const config = {
            scope: 'snsapi_userinfo', // 默认 'snsapi_userinfo'
        };
        WechatAPI.isWXAppInstalled()
            .then((res) =>{
                if(!res)
                    toast('您还未安装微信');
                else
                    return WechatAPI.login(config);
            })
            .then((res,re) =>{
                console.log(res);
            })
    }

    _onPressCancel() {
        const { navigator } = this.props;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
    }

    validate() {
        if (!this.state.phone || this.state.phone.length < 11) {
            this.setState({validForm:false});
            return;
        }

        if (!this.state.password || this.state.password.length < 6) {
            this.setState({validForm:false});
            return;
        }

        this.setState({validForm:true});
    }

    render() {
        return (
            <View style={[styles.container, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <View style={styles.navigator}>
                    <Text style={{fontSize:24, flex:1, color:'#4a4a4a'}}>登录</Text>
                    <TouchableOpacity onPress={this._onPressCancel.bind(this)}>
                        <Image style={styles.close} source={require('../../assets/signin/close.png')}/>
                    </TouchableOpacity>
                </View>

                <View style={[styles.fieldContainer, {marginTop:60}, this.state.focus == 'phone' ? styles.activeFieldContainer : {}]}>
                    <TextInput placeholder="请输入手机号码" maxLength={13} keyboardType="numeric" value={this.state.text}
                               clearButtonMode='while-editing'underlineColorAndroid='transparent'
                               autoFocus={true} style={[styles.textInput, Platform.OS === 'android' ? null : {height: 26}]}
                               onChangeText={(text) => {this.state.phone=text, this.validate()}} onFocus={(e) => {this.setState({focus:'phone'})}}
                    />
                </View>

                <View style={[styles.fieldContainer, {marginTop:20}, this.state.focus == 'password' ? styles.activeFieldContainer : {}]}>
                    <TextInput placeholder="请输入密码" secureTextEntry={true} value={this.state.text}
                               clearButtonMode='while-editing' underlineColorAndroid='transparent'
                               style={[styles.textInput, Platform.OS === 'android' ? null : {height: 26}]}
                               onChangeText={(text) => {this.state.password =text, this.validate()}}
                               onFocus={(e) => this.setState({focus:'password'})}
                    />
                </View>

                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <TouchableHighlight>
                        <Text style={{ fontSize: 14, padding:3, color:'#888',lineHeight:23,fontFamily:'ArialMT'}}
                              onPress={this._onPressForgetLink.bind(this)} >快速注册</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{ fontSize: 14, padding:3, color:'#888',lineHeight:23,fontFamily:'ArialMT'}}
                              onPress={this._onPressForgetLink.bind(this)} >忘记密码</Text>
                    </TouchableHighlight>
                </View>

                <View style={{marginTop:40, flexDirection:'row'}}>
                    <Button style={[styles.button, this.state.validForm ? styles.activeButton : null]} containerStyle={{flex:1, justifyContent: 'center', backgroundColor:'red'}}
                            onPress={this._onPressLoginButton.bind(this)}>登录</Button>
                </View>

                <View style={{marginTop:60, flexDirection:'row'}}>
                    <View style={{borderBottomColor:'#989898', borderBottomWidth:1, flex:1, height:8, marginRight:5}}></View>
                    <Text style={{color:'#989898'}}>或合作账号登录</Text>
                    <View style={{borderBottomColor:'#989898', borderBottomWidth:1, flex:1, height:8, marginLeft:5}}></View>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
                    <Icon.Button name="weixin" onPress={this._onPressWeixinIcon.bind(this)} size={28} color="#21b384" backgroundColor="transparent" borderRadius={24} iconStyle={{marginRight:0}} style={{borderWidth:1, borderColor:'#ccc',height:48, width:48}}/>
                    <Icon.Button name="weibo" size={32} color="#900" backgroundColor="transparent" borderRadius={24} iconStyle={{marginRight:0}} style={{borderWidth:1, borderColor:'#ccc'}}/>
                    <Icon.Button name="qq" size={32} color="#007AFF" backgroundColor="transparent" borderRadius={24} iconStyle={{marginRight:0}} style={{borderWidth:1, borderColor:'#ccc'}}/>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
        alignItems: 'stretch'
    },
    navigator: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    fieldContainer: {
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingVertical:3,
        flexDirection:'row'
    },
    activeFieldContainer: {
        borderColor: '#F37D30',
    },
    textInput: {
        flex:1,
        fontSize:18,
        color:'#696969',
        borderWidth: 0,
        marginVertical: 0,
        paddingVertical: 0
    },
    button: {
        paddingVertical:9,
        backgroundColor: '#DFDFDF',
        borderRadius:2,
        fontSize:18,
        textAlignVertical: 'center', /* android */
        color:'#fff',
        fontFamily:'STHeitiSC-Medium',
        alignItems:'center',
        justifyContent:'center'
    },
    activeButton: {
        backgroundColor: '#F37D30',
    },
    close: {

    }
});