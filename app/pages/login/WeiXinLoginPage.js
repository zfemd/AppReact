/**
 * Created by lyan2 on 16/9/25.
 */
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
import Home from '../home';
import Button from '../../components/button/Button';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import ForgetPasswordPage from './ForgetPasswordPage';

const myIcon = (<Icon name="rocket" size={30} color="#900" />)

export default class WeixinLoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            region: 'China'
        };
    }

    _onPressForgetLink() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'ForgetPasswordPage',
                component: ForgetPasswordPage,
            })
        }
    }

    _onPressLoginButton() {
        const { navigator } = this.props;
        let {phone, password} = this.state;

        //fetch('http://facebook.github.io/react-native/movies.json', {
        //  method: 'POST',
        //  headers: {
        //    'Accept': 'application/json',
        //        'Content-Type': 'application/json'
        //  },
        //  body: JSON.stringify({
        //    phone: phone,
        //    password: password,
        //  })
        //}).then((response) => response.json()).then((responseJson) => {
        //    console.log(responseJson);
        //    return responseJson.movies;
        //}).catch((error) => {
        //    console.error(error);
        //});

        navigator.resetTo({
            component: Home,
            name: 'Home',
            params: {store: this.props.store}
        });

        //console.log(phone, password);
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
            <View>
                <Toolbar
                    title="微信账号登录"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />

                <View style={styles.container}>
                    <View ref={(component) => this.phoneField = component} style={[styles.fieldContainer,{marginTop:60}, this.state.focus == 'phone' ? styles.activeFieldContainer : {}]}>
                        <TextInput placeholder="请输入微信号" maxLength={13}
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

                    <View style={{marginTop:40, flexDirection:'row'}}>
                        <Button style={[styles.button, this.state.validForm ? styles.activeButton : null]} containerStyle={{flex:1}}
                                onPress={this._onPressLoginButton.bind(this)}>登录</Button>
                    </View>
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
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
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