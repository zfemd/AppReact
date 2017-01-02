'use strict';

import React  from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ListView,
    InteractionManager,
    Navigator,
    Platform
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import PrefetchImage from '../../components/prefetchImage';
import Flow from '../../components/flow';
import Share from '../../components/share';
import CommentPage from '../../pages/comment';
import CommentListPage from '../../pages/commentList';
import UserPage from '../../pages/user';
import ImageSlider from '../../components/imageSlider';
import {fetchDetail} from '../../actions/detail';
import {fetchCommentsList} from '../../actions/comments';
import {fetchRecommendList} from '../../actions/recommend';
import { connect } from 'react-redux';
import React_Native_Taobao_Baichuan_Api from 'react-native-taobao-baichuan-api';
import {Token, follow, timeFormat, like } from '../../utils/common';
import _ from 'lodash';

const shareImg = require('../../assets/note/transfer.png');
const uri = ['https://hbimg.b0.upaiyun.com/fd0af542aae5ceb16f67c54c080a6537111d065b94beb-brWmWp_fw658',
    'https://hbimg.b0.upaiyun.com/b13d086f8c1a3040ae05637c6cb283d60c1286661f43b-OKqo08_fw658',
    'https://hbimg.b0.upaiyun.com/81329d6d0911921db04ee65f3df9d62aa6763b5f266fa-4kXDrj_fw658'
];
const {height, width} = Dimensions.get('window');

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this._onSharePress = this._onSharePress.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            commendTaobaoSource: this.ds.cloneWithRows([]),
            showShare: false,
            position: 0,
            noteUpdated: false
        };
    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        return (
            <TouchableOpacity onPress={() => this._jumpToRecommendPage(rowData.providerItemId)}
                              underlayColor="transparent" activeOpacity={0.5}>
                <View>
                    <View style={styles.sysRow}>
                        <PrefetchImage
                            imageUri={rowData.image.url}
                            imageStyle={styles.sysThumb}
                            resizeMode="cover"
                            width={width/3-5}
                            height={width/3-5}
                            />
                        <View style={styles.recFlowPrice}>
                            <Text style={[styles.baseText,styles.recFlowText]}>￥{rowData.price}</Text>
                        </View>
                        <View>
                            <Text style={styles.baseText} lineBreakMode={'tail'} numberOfLines={1}>
                                {rowData.title}
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onSharePress() {
        const {navigator } = this.props;
        Token.getToken(navigator).then((token) => {
            if (token) {
                this.setState({showShare: !this.state.showShare});
            }
        });
    }

    _jumpToCommentPage() {
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
            if (token) {
                InteractionManager.runAfterInteractions(() => {
                    navigator.push({
                        component: CommentPage,
                        name: 'CommentPage',
                        sceneConfigs: Navigator.SceneConfigs.FloatFromBottom,
                        noteId: this.props.route.note.noteId
                    });
                });
            }
        });
    }

    _jumpToCommentListPage() {
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: CommentListPage,
                name: 'CommentListPage',
                noteId: this.props.route.note.noteId
            });
        });
    }

    componentDidMount() {
        const { dispatch, route } = this.props;
        let the = this;
        dispatch(fetchCommentsList(route.note.noteId));
        dispatch(fetchRecommendList(route.note.noteId)).then(()=> {
            let taobaoList = the.props.recommend.recommendList.taobao ? the.props.recommend.recommendList.taobao : [];
            the.setState({'commendTaobaoSource': the.ds.cloneWithRows(taobaoList)})
        });
    }

    componentWillUnmount() {

    }

    _jumpToRecommendPage(itemId) {
        React_Native_Taobao_Baichuan_Api.jump(itemId)
    }

    _jumpToUserPage(userId) {
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
                if (token) {
                    InteractionManager.runAfterInteractions(() => {
                        navigator.push({
                            component: UserPage,
                            name: 'UserPage',
                            sceneConfigs: Navigator.SceneConfigs.FloatFromRight,
                            userId: userId
                        });
                    });
                }
            }
        );
    }

    _follow(userId) {
        let {navigator,detail } = this.props;
        Token.getToken(navigator).then((token) => {
            if (token) {
                follow(userId, token).then((res) => {
                    let notes = _.filter(detail.note, {userId: userId});
                    _.each(notes, function (note) {
                        note.isAuthorFollowedByVisitor = true;
                    });
                    this.setState({noteUpdated: true});
                });
            }
        });
    }

    _like(noteId) {
        const { navigator, detail } = this.props;
        let the = this;
        Token.getToken(navigator).then((token) => {
                if (token) {
                    like(noteId, token).then((res) => {
                        let note = detail.note[noteId];
                        note.isLikedByVisitor = true;
                        note.likeCount++;
                        this.setState({noteUpdated: true});
                    });
                }
            }
        );
    }

    render() {
        const {detail, route, comments} = this.props;
        const noteId = route.note.noteId;
        let images = [];
        if (detail.note[noteId] && detail.note[noteId].images[0].image.url) {
            detail.note[noteId].images.map((val, key) => {
                let image = {
                    width: val.image.width,
                    height: val.image.height,
                    uri: val.image.url
                };

                images.push(image);
            }, this);
        } else {
            let image = {
                width: 376,
                height: 288,
                uri: 'http://img.hb.aicdn.com/58373a70edfbcc1bc71bee64521b09f8ba228ff21848d2-qHcWbh_fw658'
            };
            images.push(image);
        }

        return (
            <View style={[styles.container, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="笔记详情"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightImg={shareImg}
                    onRightIconClicked={this._onSharePress}
                    />
                <ScrollView style={styles.main}>

                    <View style={[styles.note,styles.block]}>
                        <View style={styles.user}>
                            <TouchableOpacity style={{flexDirection: 'row'}}
                                              onPress={() => this._jumpToUserPage(detail.note[noteId].userId)}>
                                <Image style={styles.portrait}
                                       source={{uri: (detail.note[noteId] ? detail.note[noteId].portrait : 'https://avatars2.githubusercontent.com/u/19884155?v=3&s=200'), width:34, height:34 }}/>
                                <View style={styles.info}>
                                    <Text
                                        style={styles.nick}>{detail.note[noteId] ? detail.note[noteId].nickname : '' }</Text>
                                    <Text
                                        style={styles.date}>{detail.note[noteId] ? timeFormat(detail.note[noteId].publishTime, 'yyyy年MM月dd日 hh:mm:ss') : ''}</Text>
                                </View>
                            </TouchableOpacity>

                            {
                                !detail.note[noteId].isAuthorFollowedByVisitor ?
                                    <TouchableOpacity style={styles.follow}
                                                      onPress={() => this._follow(detail.note[noteId].userId)}>
                                        <Image source={require('../../assets/note/follow.png')}/>
                                    </TouchableOpacity>
                                    :
                                    <View></View>
                            }

                        </View>
                        <View style={styles.thumbWarp}>

                            <ImageSlider
                                images={images}
                                position={this.state.position}
                                onPositionChanged={position => this.setState({position})}
                                />

                        </View>
                        <View style={styles.description}>
                            <Text
                                style={[styles.dTitle,styles.baseText]}>{detail.note[noteId] ? detail.note[noteId].title : ''}</Text>
                            <Text
                                style={[styles.dContent,styles.baseText]}>{detail.note[noteId] ? detail.note[noteId].content : '' }</Text>
                        </View>
                        <View style={styles.tags}>
                            {
                                detail.note[noteId] ? detail.note[noteId].tags.map((val, key) => {
                                    return (
                                        <TouchableOpacity key={key} style={styles.tag}><Text
                                            style={styles.tagText}>{val.name}</Text></TouchableOpacity>
                                    )
                                }, this) : <TouchableOpacity style={styles.tag}><Text
                                    style={styles.tagText}>新款</Text></TouchableOpacity>


                            }

                        </View>
                    </View>

                    <View style={[styles.block, styles.GC]}>
                        <View style={styles.grade}>
                            <View style={styles.blockTitle}><Text style={styles.blockTitleText}>评分</Text></View>
                            <View style={styles.star}>
                                <Text style={styles.starTitle}>性价比</Text>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_unfilled.png')}/>
                            </View>
                            <View style={styles.star}>
                                <Text style={styles.starTitle}>材质</Text>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_unfilled.png')}/>
                            </View>
                            <View style={styles.star}>
                                <Text style={styles.starTitle}>舒适的</Text>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_filled.png')}/>
                                <Image source={require('../../assets/note/star_unfilled.png')}/>
                            </View>
                        </View>
                        <View style={styles.comment}>
                            <View style={styles.blockTitle}>
                                <Text style={styles.blockTitleText}>评论({comments.commentsList.length})</Text>
                                <TouchableOpacity style={styles.rightArrow}
                                                  onPress={() => this._jumpToCommentListPage()}>
                                    <Image source={require('../../assets/note/rg_right.png')}/>
                                </TouchableOpacity>
                            </View>
                            {
                                comments.commentsList.map((val, key) => {
                                    if (key > 2)
                                        return;
                                    return (
                                        <View key={key} style={styles.commentList}>
                                            <Text style={styles.NickName} lineBreakMode={"tail"}
                                                  >{val.authorNickname}</Text>
                                            <Text>：</Text>
                                            <Text style={styles.commentContent} lineBreakMode={'tail'}
                                                  numberOfLines={1}>{val.comment}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={[styles.block, styles.recommendByUser]}>
                        <View style={styles.blockTitle}>
                            <Text style={styles.blockTitleText}>作者推荐商品</Text>
                        </View>
                        <TouchableOpacity style={styles.recFrame}>
                            <PrefetchImage
                                imageUri={'https://hbimg.b0.upaiyun.com/0e343198bc21f4bfb6208dbb8e6d7d4358cffb3f2336c-M90TeP_fw658'}
                                imageStyle={styles.recThumb}
                                resizeMode="cover"
                                width={width/4}
                                height={width/4}
                                />
                            <View style={styles.recContent}>
                                <Text style={styles.baseText} lineBreakMode={'tail'} numberOfLines={2}>
                                    miya2016夏装新品宽松镂空短袖蕾丝衫女韩系显瘦性感度假上衣潮
                                </Text>
                                <View style={styles.recPriceFrame}>
                                    <Text style={[styles.baseText,styles.recPrice]}>￥100</Text>
                                    <Text style={[styles.baseText,styles.dimText,styles.recPriceOld]}>￥120</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.block, styles.recommendBySystem]}>
                        <View style={styles.blockTitle}>
                            <Text style={styles.blockTitleText}>系统为你推荐</Text>
                        </View>
                        <View style={styles.sysFromFrame}>
                            <View style={styles.sysFrom}>
                                <Text style={[styles.baseText, styles.sysFromText]}>来自天猫</Text>
                                <TouchableOpacity style={styles.sysFromMore}>
                                    <Text style={[styles.baseText, styles.dimText]}>更多</Text>
                                    <Image source={require('../../assets/note/rg_right.png')}/>
                                </TouchableOpacity>
                            </View>
                            <ListView
                                contentContainerStyle={styles.sysList}
                                dataSource={this.state.commendTaobaoSource}
                                renderRow={this._renderRow}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                enableEmptySections={true}
                                />
                        </View>

                    </View>
                    <View style={[styles.block, styles.relatedNote]}>
                        <View style={[styles.blockTitle,styles.relatedNoteTitle]}>
                            <Text style={styles.blockTitleText}>相关笔记</Text>
                        </View>
                        <Flow navigator={this.props.navigator}></Flow>
                    </View>
                </ScrollView>
                <View style={styles.float}>
                    <TouchableOpacity style={styles.floatOp} onPress={()=> this._like(noteId)}>
                        <View style={styles.floatOpView}>
                            {
                                detail.note[noteId]&&detail.note[noteId].isLikedByVisitor ?(
                                    <Image style={styles.floatOpImage} source={ require('../../assets/note/heart.png') }/>
                                ):(
                                    <Image style={styles.floatOpImage} source={ require('../../assets/note/heart.png')}/>
                                )
                            }
                            <Text
                                style={styles.floatOpText}>{detail.note[noteId] ? detail.note[noteId].likeCount : 0 }</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.floatOpLine}></View>
                    <TouchableOpacity style={styles.floatOp} onPress={() => this._jumpToCommentPage()}>
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/personal/comment.png')}/>
                            <Text
                                style={styles.floatOpText}>{detail.note[noteId] ? detail.note[noteId].commentCount : 0 }</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.floatOpLine}></View>
                    <TouchableOpacity style={styles.floatOp}>
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/note/shopping_cart.png')}/>
                            <Text
                                style={styles.floatOpText}>{detail.note[noteId] ? detail.note[noteId].transactionCount : 0 }</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.floatOpLine}></View>
                    <TouchableOpacity style={styles.floatOp}>
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/note/save.png')}/>
                            <Text style={styles.floatOpText}>200</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                {[this.state.showShare].map((show) => {
                    if (show) {
                        return (
                            <Share key='' press={this._onSharePress}/>
                        );
                    }
                })}
            </View>
        )

    }
}

function mapStateToProps(state) {
    const { detail, comments, recommend } = state;
    return {
        detail,
        comments,
        recommend
    };
}

export default connect(mapStateToProps)(Detail);