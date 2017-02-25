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
import { request } from '../../utils/common';
import { Token } from '../../utils/common';
import { connect } from 'react-redux';

class Binding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
    }

    _submit() {
        let the = this;
        const {navigator, route } = this.props;
        const noteId = route.noteId;
        Token.getToken(navigator).then((token) => {
                if (token) {
                    let body = {
                        comment: this.state.comment,
                        rating: 0,
                        longitude: 0,
                        latitude: 0
                    };
                    body = JSON.stringify(body);
                    //const body = 'comment=' + this.state.comment + '&rating=0&longitude=0&latitude=0';
                    request('/notes/' + noteId + '/comments', 'POST', body, token)
                        .then((res) => {
                            if (res.resultCode === 0) {
                                Alert.alert('评论', "评论成功",
                                    [
                                        {text: 'OK', onPress: () => the._jumpToListPage()},
                                    ]);
                            }
                        }, function (error) {
                            console.log(error);
                        })
                        .catch(() => {
                            console.log('network error');
                        });
                } else {
                    InteractionManager.runAfterInteractions(() => {
                        navigator.push({
                            component: LoginPage,
                            name: 'LoginPage',
                            sceneConfigs: Navigator.SceneConfigs.FloatFromBottom
                        });
                    });
                }
            }
        );

    }

    _jumpToListPage(){
        const {navigator, dispatch, route, comments } = this.props;
        dispatch(fetchBindingsList(route.noteId)).then(() => {
            DeviceEventEmitter.emit('newBinding',comments );
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
            }
        });

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
                        placeholder={'输入您已注册 或 常用的手机号'}
                        placeholderTextColor='#bebebe'
                        underlineColorAndroid='transparent'
                        returnKeyType='done'
                        onChangeText={(text) => {this.state.phone=text }}
                        />
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>this._submit()}>
                    <Text style={styles.buttonFont}>确认</Text>
                </TouchableOpacity>
            </View>
        )

    }
}



export default Binding;