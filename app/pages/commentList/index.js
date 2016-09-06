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
    Navigator
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentPage from '../../pages/comment';;

class CommnetList extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([1,2,3,4,5,6,7,8,9,10,11,12,13,14])
        };
    }
    _renderRow(rowData:string, sectionID:number, rowID:number) {
        return (
            <TouchableOpacity  underlayColor="transparent" activeOpacity={0.5}>
                <View>
                    <View style={styles.commentRow}>
                        <Image style={styles.portrait} source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 34, height: 34}}/>
                        <View style={styles.commentContent}>
                            <View style={styles.commentUserAndTime}>
                                <Text style={styles.dimText}>我是小仙女 </Text>
                                <Text style={[styles.dimText,styles.commentTime]}>2016-08-05 </Text>
                            </View>

                            <Text style={styles.baseText} >
                                miya2016夏装新品宽松镂空短袖蕾丝衫女韩系显瘦性感度假上衣潮
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _jumpToCommentPage(){
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: CommentPage,
                name: 'CommentPage',
                sceneConfigs: Navigator.SceneConfigs.FloatFromBottom
            });
        });
    }

    render() {
        return(
            <View style={styles.container}>
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

export default CommnetList;