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
    Navigator
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import PrefetchImage from '../../components/prefetchImage';
import Flow from '../../components/flow';
import Share from '../../components/share';
import CommentPage from '../../pages/comment';
import CommentListPage from '../../pages/commentList';
import ImageSlider from '../../components/imageSlider';
import {fetchDetail} from '../../actions/detail';
import {fetchCommentsList} from '../../actions/comments';
import { connect } from 'react-redux';

const shareImg = require('../../assets/note/transfer.png');
const uri = ['https://hbimg.b0.upaiyun.com/fd0af542aae5ceb16f67c54c080a6537111d065b94beb-brWmWp_fw658',
    'https://hbimg.b0.upaiyun.com/b13d086f8c1a3040ae05637c6cb283d60c1286661f43b-OKqo08_fw658',
    'https://hbimg.b0.upaiyun.com/81329d6d0911921db04ee65f3df9d62aa6763b5f266fa-4kXDrj_fw658'
];
const {height, width} = Dimensions.get('window');
const thumbs = [

    {
        uri: 'http://hbimg.b0.upaiyun.com/fd7af3c379c8888a1ede4ea1046efea1fe953c63db770-sUI89w_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/0e343198bc21f4bfb6208dbb8e6d7d4358cffb3f2336c-M90TeP_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/be437a14550ce40dd0967e26bc4dd72dc2acdd88c418-TfAcUn_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/9944373939d4afd9b8c393973c3875f91ebf6c1d26d0e-lAUGG4_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/27e37520133ada3bde5c20d28bee40a5042f671711574-uM60Kq_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/3bfa27a07f27ab9a88493ca06cc21c001e3c943271027-VYWzdp_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/783b504aba16ddbc54e572d243ce70796c3bacd169828-uqStAZ_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/81329d6d0911921db04ee65f3df9d62aa6763b5f266fa-4kXDrj_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/cedb001478d5ad0dfe54a5af1797ad655efccd851d7d9-F0bnZJ_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/f065d8ce338b6f07a6b80471739c6739bb2c18979ada4-XKfULg_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/3720c87acb331491191a17d077f9b3f0e2705a69240ca-g1GUjG_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/7bb5cb03ac44b15d1dd5d2b9f20fc300c8d61252cf0f-BJ4TZf_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/21f167d573b123a69b6e7e52f0b68e1a374f13f165462-1CoVG0_fw658',
        width: (width / 100) * 47,
        height: 200
    },
    {
        uri: 'https://hbimg.b0.upaiyun.com/e5a9ab3f0ed21b2ad8758138b6f8c1f5f238c96ee506-FqVv3B_fw658',
        width: (width / 100) * 47,
        height: 200
    },


];

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this._genRows = this._genRows.bind(this);
        this._onSharePress = this._onSharePress.bind(this);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._genRows({})),
            showShare: false,
            position: 0
        };
    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = thumbs[(rowHash - 2) % thumbs.length];
        return (
            <TouchableOpacity onPress={() => this._jumpToDetailPage()} underlayColor="transparent" activeOpacity={0.5}>
                <View>
                    <View style={styles.sysRow}>
                        <PrefetchImage
                            imageUri={imgSource.uri}
                            imageStyle={styles.sysThumb}
                            resizeMode="cover"
                            width={width/3-5}
                            height={width/3-5}
                            />
                        <View>
                            <Text style={styles.baseText} lineBreakMode={'tail'} numberOfLines={1}>
                                miya2016夏装新品宽松镂空短袖蕾丝衫女韩系显瘦性感度假上衣潮
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _genRows(pressData) {
        var dataBlob = [];
        for (var i = 0; i < 10; i++) {
            var pressedText = pressData[i] ? ' (X)' : '';
            dataBlob.push('Cell ' + i + pressedText);
        }
        return dataBlob;
    }

    _onSharePress(){
        this.setState({showShare: !this.state.showShare});
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

    _jumpToCommentListPage(){
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: CommentListPage,
                name: 'CommentListPage'
            });
        });
    }

    componentDidMount() {
        const { dispatch, route } = this.props;
        dispatch(fetchCommentsList(route.note.noteId));
    }

    componentWillUnmount() {

    }

    render() {
        const {detail, route, comments} = this.props;
        const noteId = route.note.noteId;
        let images = [];
        if(detail.note[noteId]){
            detail.note[noteId].images.map((val, key) => {
                let image = {
                    width: val.width,
                    height: val.height,
                    uri: val.url
                };

                images.push(image);
            }, this);
        } else {
            let image = {
                width: 478,
                height: 418,
                uri: 'https://hbimg.b0.upaiyun.com/be437a14550ce40dd0967e26bc4dd72dc2acdd88c418-TfAcUn_fw658'
            };
            images.push(image);
        }

        return(
            <View style={styles.container}>
                <Toolbar
                    title="笔记详情"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightImg={shareImg}
                    rightImgPress={this._onSharePress}
                    />
                <ScrollView style={styles.main}>

                    <View style={[styles.note,styles.block]}>
                        <View style={styles.user}>
                            <Image style={styles.portrait} source={{uri: (detail.note[noteId] ? detail.note[noteId].portrait : 'https://avatars2.githubusercontent.com/u/19884155?v=3&s=200'), width:34, height:34 }}/>
                            <View style={styles.info}>
                                <Text style={styles.nick}>{detail.note[noteId] ? detail.note[noteId].nickname : '' }</Text>
                                <Text style={styles.date}>5月26日 11:29</Text>
                            </View>
                            <Image style={styles.follow} source={require('../../assets/note/follow.png')}/>
                        </View>
                        <View style={styles.thumbWarp}>

                            <ImageSlider
                                images={images}
                                position={this.state.position}
                                onPositionChanged={position => this.setState({position})}
                                />

                        </View>
                        <View style={styles.description}>
                            <Text style={[styles.dTitle,styles.baseText]}>miya2016夏装新品宽松镂空短袖</Text>
                            <Text style={[styles.dContent,styles.baseText]}>{detail.note[noteId] ? detail.note[noteId].content :'' }</Text>
                        </View>
                        <View style={styles.tags}>
                            {
                                detail.note[noteId] ? detail.note[noteId].tags.map((val, key) => {
                                        return (
                                            <TouchableOpacity key={key} style={styles.tag}><Text style={styles.tagText}>{val.name}</Text></TouchableOpacity>
                                        )
                                    }, this) : <TouchableOpacity style={styles.tag}><Text style={styles.tagText}>新款</Text></TouchableOpacity>


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
                                <TouchableOpacity style={styles.rightArrow} onPress={() => this._jumpToCommentListPage()}>
                                    <Image source={require('../../assets/note/rg_right.png')}/>
                                </TouchableOpacity>
                            </View>
                            {
                                comments.commentsList.map((val, key) => {
                                    if(key>2)
                                        return;
                                    return (
                                        <View key={key} style={styles.commentList}>
                                            <Text style={styles.NickName} lineBreakMode="tail" numberOfLines={1}>{val.authorNickname}</Text>
                                            <Text>：</Text>
                                            <Text style={styles.commentContent} lineBreakMode='tail' numberOfLines={1}>{val.comment}</Text>
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
                                imageUri={thumbs[4.].uri}
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
                                <Text style={[styles.baseText, styles.sysFromText]} >来自天猫</Text>
                                <TouchableOpacity style={styles.sysFromMore}>
                                    <Text style={[styles.baseText, styles.dimText]}>更多</Text>
                                    <Image source={require('../../assets/note/rg_right.png')}/>
                                </TouchableOpacity>
                            </View>
                            <ListView
                                contentContainerStyle={styles.sysList}
                                dataSource={this.state.dataSource}
                                renderRow={this._renderRow}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                />
                        </View>
                        <View style={styles.sysFromFrame}>
                            <View style={styles.sysFrom}>
                                <Text style={[styles.baseText, styles.sysFromText]} >来自京东</Text>
                                <TouchableOpacity style={styles.sysFromMore}>
                                    <Text style={[styles.baseText, styles.dimText]}>更多</Text>
                                    <Image source={require('../../assets/note/rg_right.png')}/>
                                </TouchableOpacity>
                            </View>
                            <ListView
                                contentContainerStyle={styles.sysList}
                                dataSource={this.state.dataSource}
                                renderRow={this._renderRow}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
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
                    <TouchableOpacity style={styles.floatOp} >
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/note/heart.png')}/>
                            <Text style={styles.floatOpText}>{detail.note[noteId]? detail.note[noteId].likeCount : 0 }</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.floatOpLine}></View>
                    <TouchableOpacity style={styles.floatOp} onPress={() => this._jumpToCommentPage()} >
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/personal/comment.png')}/>
                            <Text style={styles.floatOpText}>{detail.note[noteId] ? detail.note[noteId].commentCount : 0 }</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.floatOpLine}></View>
                    <TouchableOpacity style={styles.floatOp}>
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/note/shopping_cart.png')}/>
                            <Text style={styles.floatOpText}>{detail.note[noteId] ? detail.note[noteId].transactionCount : 0 }</Text>
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

var hashCode = function (str) {
    var hash = 8;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

function mapStateToProps(state) {
    const { detail, comments } = state;
    return {
        detail,
        comments
    };
}

export default connect(mapStateToProps)(Detail);