'use strict';
import React, { Component } from 'react';
import {
    Alert,
    Flex,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Modal,
    NavigatorIOS,
    Picker,
    Platform,
    ActivityIndicatorIOS,
    InteractionManager
} from 'react-native';

import Home from '../home';
import {
    Token,
    toast
} from '../../utils/common';
import Button from '../../../app/components/button/Button';
import PhoneCodeButton from '../../../app/components/button/PhoneCodeButton';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import LoginPage from './LoginPage';
import configs from '../../constants/configs';

const myIcon = (<Icon name="rocket" size={30} color="#900" />)

export default class ForgetPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: true,
            sending: true
        };
    }

    _onPasswordLoginLink() {
        const { navigator } = this.props;

        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
    }
    _sendCode() {
        if (this.state.sending) return;

        if(!this.state.phone){
            toast('请填写正确的手机号码');
            return false;
        }

        this.state.sending = true;

        fetch(configs.serviceUrl + '/message/verification-code', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                purpose: 'login',
                mobile: this.state.phone
            })
        }).then((response) => {
            this.state.sending = false;
            if (response.ok) {
                return response.json()
            }
        }).then((responseJson) => {
            if(responseJson.resultCode == 0){
                toast('验证码已发送');
                return responseJson.resultCode;
            }
        }).catch((error) => {
            this.state.sending = false;
            console.error(error);
        });
    }

    _onPressLoginButton() {
        if (this.state.sending) return;

        const { navigator, HomeNavigator } = this.props;
        let {phone, code} = this.state;
        
        this.state.sending = true;

        fetch(configs.serviceUrl + 'user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                loginMethod: 'VERIFICATION_CODE',
                secret: code,
                mobileNumber: phone
            })
        }).then((response) => {
            this.state.sending = false;
            if (response.ok) {
                return response.headers.map['x-app-token'];
            }
        }).then((responseJson) => {
            console.log(responseJson);
            if (responseJson && responseJson.length > 0) {
                InteractionManager.runAfterInteractions(() => {
                    setTimeout(function(){
                        navigator.jumpTo(navigator.getCurrentRoutes()[0]);
                    }, 1000);

                });
                toast('登录成功');
                Token.setToken(responseJson[0]);
                return true;
            } else {
                Alert.alert('登录失败', "验证码登录失败");
            }


        }).catch((error) => {
            this.state.sending = false;
            Alert.alert('登录失败', "网络连接失败：" + error);
        });
    }

    validate() {
        if (!this.state.phone || this.state.phone.length < 11) {
            this.setState({validForm:false});
            return;
        }

        if (!this.state.code || this.state.code.length < 4) {
            this.setState({validForm:false});
            return;
        }

        this.setState({validForm:true});
    }

    render() {
        return (
            <View style={[styles.container, Platform.OS === 'android' ? null : {marginTop: 21}]}>

                <View style={styles.navigator}>
                    <Icon.Button name="angle-left" size={32} color="#4a4a4a" backgroundColor="transparent" onPress={this._onPasswordLoginLink.bind(this)}>
                        <Text style={{fontSize:24, color:'#4a4a4a'}}>返回密码登录</Text>
                    </Icon.Button>
                </View>

                <View style={[styles.fieldContainer,{marginTop:60}, this.state.focus == 'phone' ? styles.activeFieldContainer : {}]}>
                    <TextInput placeholder="请输入手机号码" maxLength={13}
                               clearButtonMode='while-editing' underlineColorAndroid='transparent'
                               style={[styles.textInput, Platform.OS === 'android' ? null : {height: 26}]}
                               onChangeText={(text) => {this.state.phone=text, this.validate()}}
                               value={this.state.text} autoFocus={true} keyboardType="numeric"
                               onFocus={(e) => {this.setState({focus:'phone'})}}/>
                    <Text style={{fontSize:20,color:'#696969',lineHeight:23,fontFamily:'ArialMT'}}>+86</Text>
                </View>

                <View style={[styles.fieldContainer,{marginTop:20}, this.state.focus == 'code' ? styles.activeFieldContainer : {}]}>
                    <TextInput placeholder="请输入验证码" maxLength={6}
                               clearButtonMode='while-editing' underlineColorAndroid='transparent'
                               style={[styles.textInput, Platform.OS === 'android' ? null : {height: 26}]}
                               keyboardType="numeric"
                               onChangeText={(text) => {this.state.code=text; this.validate();}}
                               value={this.state.text}
                               onFocus={(e) => this.setState({focus:'code'})}/>
                    <PhoneCodeButton onPress={this._sendCode.bind(this)}>发送验证码</PhoneCodeButton>
                </View>

                <View style={{justifyContent:'flex-end', flexDirection:'row'}}>
                    <Button style={{textAlign:'right', fontSize: 14, padding:3, borderRadius:2, color:'#888',lineHeight:23,fontFamily:'ArialMT'}}
                            onPress={this._onPasswordLoginLink.bind(this)} >密码登录</Button>
                </View>

                <View style={{marginTop:40, flexDirection:'row'}}>
                    <Button style={[styles.button, this.state.validForm ? styles.activeButton : null]} containerStyle={{flex:1}}
                        onPress={this._onPressLoginButton.bind(this)}>登录</Button>
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

/*<Button ref={(component) => this.codeBtn = component}
        onPress={this._sendCode.bind(this)}
        style={{fontSize: 14, backgroundColor:'#ececec', padding:3, borderRadius:2, color:'#888',lineHeight:23,fontFamily:'ArialMT'}}>

    发送验证码</Button>*/

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
        alignItems: 'stretch'
    },
    navigator: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    fieldContainer: {
        borderColor: 'gray',
        borderBottomWidth: 1,
        flexDirection:'row',
        paddingVertical:3
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
        textAlignVertical: 'center', /* android */
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