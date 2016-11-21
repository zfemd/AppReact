/**
 * Created by lyan2 on 16/9/22.
 */
import React  from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Alert
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import SecurityPage from './security';
import { request, Token, toast, removeAllStorage } from '../../utils/common';
import Home from '../home';

var chevronRightIcon = <Icon style={[styles.messageLinkIcon]} size={16} name="angle-right"/>;

class SettingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    _onPressSecurity() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'SecurityPage',
                component: SecurityPage
            })
        }
    }

    _signOut() {
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
            if (token) {
                return request('/user/logout', 'post', '', token)
                    .then((ret) => {
                        if(ret.resultCode === 0){
                            removeAllStorage();
                            toast('登出成功');
                            navigator.resetTo(navigator.getCurrentRoutes()[0]);
                        } else {
                            Alert.alert('登出失败', "登出失败");
                        }
                    }, function (error) {
                        Alert.alert('登出失败', "出错：" + error);
                    })
                    .catch(() => {
                        Alert.alert('登出失败', "网络连接失败：" + error);
                    });
            } else {
                console.log('sign out');
            }
        });

    }

    __onPressSignOut() {
        Alert.alert(
            '登出',
            '确定要退出登录吗？',
            [
                {text: 'Cancel', onPress: () => console.log('still sign in')},
                {text: 'OK', onPress: () => this._signOut()},
            ]
        )
    }

    render() {
        return(
            <View style={{backgroundColor: '#f5f5f5', flex: 1}}>
                <Toolbar
                    title="设置"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>个人资料</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight onPress={this._onPressSecurity.bind(this)}>
                    <View style={styles.row}>
                        <Text style={styles.text}>账户与安全</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>关于我们</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight>
                    <View style={styles.row}>
                        <Text style={styles.text}>功能说明</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>
                <View style={styles.separatorHorizontal} />

                <TouchableHighlight onPress={this.__onPressSignOut.bind(this)}>
                    <View style={styles.row}>
                        <Text style={styles.text}>登出</Text>
                        {chevronRightIcon}
                    </View>
                </TouchableHighlight>

            </View>
        )
    }
}

export default SettingPage;