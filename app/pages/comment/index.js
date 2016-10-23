'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import { request } from '../../utils/common';
import { Token } from '../../utils/common';
import {fetchCommentsList} from '../../actions/comments';

class Comment extends React.Component {
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
                    //let body = {
                    //    comment: this.state.comment,
                    //    rating: 0,
                    //    longitude: 0,
                    //    latitude: 0
                    //};
                    //body = JSON.stringify(body);
                    const body = 'comment=' + this.state.comment + '&rating=0&longitude=0&latitude=0';
                    request('/notes/' + noteId + '/comments?' + body, 'POST', '', token)
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
        const {navigator, dispatch, route } = this.props;
        dispatch(fetchCommentsList(route.noteId));
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar
                    title="评论"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />
                <View style={styles.comment}>
                    <TextInput
                        style={styles.commentText}
                        placeholder={'来说说你的心得吧'}
                        placeholderTextColor='#bebebe'
                        multiline={true}
                        onChangeText={(text) => {this.state.comment=text }}
                        />
                </View>
                <View style={styles.shortcut}>
                    <Text style={styles.at}>
                        @
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={()=>this._submit()}>
                    <Text style={styles.buttonFont}>发布</Text>
                </TouchableOpacity>
            </View>
        )

    }
}

export default Comment;