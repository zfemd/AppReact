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
    ActivityIndicatorIOS,
    Navigator
} from 'react-native';

import Home from '../home';
import Button from '../../components/button/Button';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import ForgetPasswordPage from './ForgetPasswordPage';
import WeiXinLoginPage from './WeiXinLoginPage';
import configs from '../../constants/configs';

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
                sceneConfigs: Navigator.SceneConfigs.FloatFromLeft,
                params: {store: this.props.store}
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
            Alert.alert('登陆失败', "密码登陆失败");
        }).catch((error) => {
            Alert.alert('登陆失败', "网络连接失败：" + error);
        });
    }

    _onPressWeixinIcon() {
        const { navigator } = this.props;
        navigator.push({
            component: WeiXinLoginPage,
            name: 'WeiXinLoginPage',
            params: {store: this.props.store}
        });
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
            <View style={styles.container}>
                <View style={styles.navigator}>
                    <Text style={{fontSize:24, flex:1, color:'#4a4a4a'}}>登陆</Text>
                    <TouchableOpacity onPress={this._onPressCancel.bind(this)}>
                        <Image style={styles.close} source={require('../../assets/signin/close.png')}/>
                    </TouchableOpacity>
                </View>

                <View ref={(component) => this.phoneField = component} style={[styles.fieldContainer,{marginTop:60}, this.state.focus == 'phone' ? styles.activeFieldContainer : {}]}>
                    <TextInput placeholder="请输入手机号码" maxLength={13}
                        style={[styles.textInput, {borderRightWidth:1}]} keyboardType="numeric"
                        value={this.state.text} autoFocus={true} onChangeText={(text) => {this.state.phone=text, this.validate()}}
                               onFocus={(e) => {this.setState({focus:'phone'})}}
                    />
                </View>

                <View style={[styles.fieldContainer,{marginTop:20}, this.state.focus == 'password' ? styles.activeFieldContainer : {}]}>
                    <TextInput placeholder="请输入密码"
                               style={[styles.textInput]}
                               value={this.state.text}
                               onChangeText={(text) => {this.state.password =text, this.validate()}}
                               onFocus={(e) => this.setState({focus:'password'})}
                    />
                </View>

                <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                    <Button style={{ textAlign:'left', fontSize: 14, padding:3, borderRadius:2, color:'#888',lineHeight:23,fontFamily:'ArialMT'}}
                            onPress={this._onPressForgetLink.bind(this)} >快速注册</Button>
                    <Button style={{ fontSize: 14, padding:3, borderRadius:2, color:'#888',lineHeight:23,fontFamily:'ArialMT'}}
                            onPress={this._onPressForgetLink.bind(this)} >忘记密码</Button>
                </View>

                <View style={{marginTop:40, flexDirection:'row'}}>
                    <Button style={[styles.button, this.state.validForm ? styles.activeButton : null]} containerStyle={{flex:1}}
                        onPress={this._onPressLoginButton.bind(this)}>登陆</Button>
                </View>

                <View style={{marginTop:60, flexDirection:'row'}}>
                    <View style={{borderBottomColor:'#989898', borderBottomWidth:1, flex:1, height:8, marginRight:5}}></View>
                    <Text style={{color:'#989898'}}>或合作账号登陆</Text>
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
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
        marginTop: 21,
        alignItems: 'stretch',
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
        height: 26,
        borderColor: 'gray',
        flex:1,
        fontSize:18,
        color:'#696969'
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
    },
    close: {

    }
});