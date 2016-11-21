'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ListView,
    InteractionManager,
    Navigator,
    DeviceEventEmitter,
    Platform
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentPage from '../../pages/comment';
import { connect } from 'react-redux';
import { Token } from '../../utils/common';
import LoginPage from '../../pages/login';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.comments.commentsList)
        };
    }

    componentDidMount() {
        let the = this;
        DeviceEventEmitter.addListener('newComment',()=>{
            the.setState({'dataSource': the.ds.cloneWithRows(the.props.comments.commentsList)})
        });

    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        return (
            <TouchableOpacity  underlayColor="transparent" activeOpacity={0.5}>
                <View>
                    <View style={styles.commentRow}>
                        <Image style={styles.portrait} source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 34, height: 34}}/>
                        <View style={styles.commentContent}>
                            <View style={styles.commentUserAndTime}>
                                <Text style={styles.dimText}>{rowData.authorNickname} </Text>
                                <Text style={[styles.dimText,styles.commentTime]}>2016-08-05 </Text>
                            </View>

                            <Text style={styles.baseText} >
                                {rowData.comment}
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _jumpToCommentPage(){
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
                if (token) {
                    InteractionManager.runAfterInteractions(() => {
                        navigator.push({
                            component: CommentPage,
                            name: 'CommentPage',
                            sceneConfigs: Navigator.SceneConfigs.FloatFromBottom,
                            noteId: this.props.route.noteId
                        });
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

    render() {
        return(
            <View style={[styles.container, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="评论"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    />
                <ListView
                    contentContainerStyle={styles.commentList}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    />

                <View style={styles.float}>
                    <TouchableOpacity style={styles.floatOp} >
                        <Image style={styles.portrait} source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 28, height: 28}}/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => this._jumpToCommentPage()}>
                        <TextInput
                            onFocus={() => this._jumpToCommentPage()}
                            style={styles.commentText}
                            placeholder={'说点什么'}
                            placeholderTextColor='#bebebe'
                            multiline={false}
                            />
                    </TouchableOpacity>

                </View>
            </View>
        )

    }
}

function mapStateToProps(state) {
    const { comments } = state;
    return {
        comments
    };
}

export default connect(mapStateToProps)(CommentList);