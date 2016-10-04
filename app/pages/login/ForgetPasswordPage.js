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
    ActivityIndicatorIOS
} from 'react-native';

import Home from '../home';
import {
    Token
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
            modalVisible: true
        };
    }
    _onPasswordLoginLink() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.push({
                name: 'LoginPage',
                component: LoginPage
            })
        }
    }
    _sendCode() {
        fetch(configs.serviceUrl + 'accounts/' + this.state.phone + '/message/verification-code/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: this.state.phone
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((responseJson) => {
            console.log(responseJson);
            return responseJson.resultCode;
        }).catch((error) => {
            console.error(error);
        });
    }

    _onPressLoginButton() {
        const { navigator } = this.props;
        let {phone, code} = this.state;

        //let formData = new FormData();
        //formData.append("code", "1234");

        //let request = new Request(configs.serviceUrl + 'accounts/' + this.state.phone + '/login/verification-code', {
        //    method: 'POST',
        //    headers: {},
        //    body: formData
        //});

        fetch(configs.serviceUrl + 'accounts/' + this.state.phone + '/login/verification-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "code=" + code
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((responseJson) => {
            console.log(responseJson);
            if (responseJson && responseJson.resultCode == 0) {
                if (responseJson.resultValues && responseJson.resultValues.loginSuccess) {

                    navigator.push({
                        component: Home,
                        name: 'Home',
                        params: {store: this.props.store}
                    });

                    Token.setToken(responseJson.resultValues.token);

                    return;
                }
            }

            Alert.alert('登陆失败', "验证码登陆失败");
        }).catch((error) => {
            Alert.alert('登陆失败', "网络连接失败：" + error);
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
            <View style={styles.container}>

                <View style={styles.navigator}>
                    <Icon.Button name="angle-left" size={32} color="#4a4a4a" backgroundColor="transparent" onPress={this._onPasswordLoginLink.bind(this)}>
                        <Text style={{fontSize:24, color:'#4a4a4a'}}>返回密码登陆</Text>
                    </Icon.Button>
                </View>

                <View style={[styles.fieldContainer,{marginTop:60}, this.state.focus == 'phone' ? styles.activeFieldContainer : {}]}>
                    <TextInput placeholder="请输入手机号码" maxLength={13}
                               style={[styles.textInput, {borderRightWidth:1}]}
                               onChangeText={(text) => {this.state.phone=text, this.validate()}}
                               value={this.state.text} autoFocus={true} keyboardType="numeric"
                               onFocus={(e) => {this.setState({focus:'phone'})}}/>
                    <Text style={{fontSize:20,color:'#696969',lineHeight:23,fontFamily:'ArialMT'}}>+86</Text>
                </View>

                <View style={[styles.fieldContainer,{marginTop:20}, this.state.focus == 'code' ? styles.activeFieldContainer : {}]}>
                    <TextInput placeholder="请输入验证码" maxLength={6}
                               style={[styles.textInput]}
                               keyboardType="numeric"
                               onChangeText={(text) => {this.state.code=text; this.validate();}}
                               value={this.state.text}
                               onFocus={(e) => this.setState({focus:'code'})}/>
                    <PhoneCodeButton onPress={this._sendCode.bind(this)}>发送验证码</PhoneCodeButton>
                </View>

                <View style={{justifyContent:'flex-end', flexDirection:'row'}}>
                    <Button style={{textAlign:'right', fontSize: 14, padding:3, borderRadius:2, color:'#888',lineHeight:23,fontFamily:'ArialMT'}}
                            onPress={this._onPasswordLoginLink.bind(this)} >密码登陆</Button>
                </View>

                <View style={{marginTop:40, flexDirection:'row'}}>
                    <Button style={[styles.button, this.state.validForm ? styles.activeButton : null]} containerStyle={{flex:1}}
                        onPress={this._onPressLoginButton.bind(this)}>登陆</Button>
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
    }
});