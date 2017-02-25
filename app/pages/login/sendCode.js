import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    DeviceEventEmitter,
    Platform
} from 'react-native';
import styles from './bindingStyle';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import { Token, toast, request } from '../../utils/common';
import { connect } from 'react-redux';
import PhoneCodeButton from '../../../app/components/button/PhoneCodeButton';

class SendCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: this.props.route.phone
        };
    }

    _submit() {
        const {navigator} = this.props;
        let body = {
            phone: this.state.phone
        };
        request('/message/verification-code', 'POST', body)
            .then((res) => {
                if (res.resultCode === 0) {

                }
            }, function (error) {
                console.log(error);
            })
            .catch(() => {
                console.log('network error');
            });
    }


    _sendCode() {
        return true;
    }

    componentDidMount() {
        this.codeBtn.codeBtn.props.onPress();
    }

    render() {
        return (
            <View style={[styles.container, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="账号绑定"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />
                <View style={styles.phone}>
                    <TextInput
                        style={[styles.phoneText, Platform.OS === 'android' ? null : {height: 26}]}
                        placeholder={'验证码'}
                        placeholderTextColor='#bebebe'
                        underlineColorAndroid='transparent'
                        returnKeyType='done'
                        onChangeText={(text) => {this.state.phone=text }}
                        />
                    <View style={{marginRight: 8}}>
                        <PhoneCodeButton ref={(component) => this.codeBtn = component}
                            onPress={this._sendCode.bind(this)}>再次发送</PhoneCodeButton>
                    </View>
                </View>
                <View style={styles.bindPhone}>
                    <Text style={styles.baseText}>即将绑定手机：{this.state.phone}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>this._submit()}>
                    <Text style={styles.buttonFont}>完成绑定并登录</Text>
                </TouchableOpacity>
            </View>
        )

    }
}



export default SendCode;