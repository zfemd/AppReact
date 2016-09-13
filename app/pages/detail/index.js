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
            position: 0,
            interval: null
        };
    }

    _onLeftIconClicked() {

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

    componentWillMount() {
        //this.setState({interval: setInterval(() => {
        //    this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
        //    this.setState({height: parseInt(Math.random()*100 + 200)});
        //}, 3000)});
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return(
            <View style={styles.container}>
                <Toolbar
                    title="笔记详情"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    onLeftIconClicked={this._onLeftIconClicked(0)}
                    rightImg={shareImg}
                    rightImgPress={this._onSharePress}
                    />
                <ScrollView style={styles.main}>

                    <View style={[styles.note,styles.block]}>
                        <View style={styles.user}>
                            <Image style={styles.portrait} source={{uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 34, height: 34}}/>
                            <View style={styles.info}>
                                <Text style={styles.nick}>天才小熊猫</Text>
                                <Text style={styles.date}>5月26日 11:29</Text>
                            </View>
                            <Image style={styles.follow} source={require('../../assets/note/follow.png')}/>
                        </View>
                        <View style={styles.thumbWarp}>
                            <ImageSlider
                                images={[
                                    {
                                        width: 300,
                                        height: 200,
                                        uri: 'https://hbimg.b0.upaiyun.com/21f167d573b123a69b6e7e52f0b68e1a374f13f165462-1CoVG0_fw658'
                                    },
                                     {
                                        width: 478,
                                        height: 418,
                                        uri: 'https://hbimg.b0.upaiyun.com/be437a14550ce40dd0967e26bc4dd72dc2acdd88c418-TfAcUn_fw658'
                                    },
                                     {
                                        width: 540,
                                        height: 660,
                                        uri: 'https://hbimg.b0.upaiyun.com/3720c87acb331491191a17d077f9b3f0e2705a69240ca-g1GUjG_fw658'
                                    },


                                ]}
                                position={this.state.position}
                                onPositionChanged={position => this.setState({position})}
                                />

                        </View>
                        <View style={styles.description}>
                            <Text style={[styles.dTitle,styles.baseText]}>miya2016夏装新品宽松镂空短袖</Text>
                            <Text style={[styles.dContent,styles.baseText]}>天猫为第三方交易平台及互联网信息服务提供者，天猫（含网站、客户端等）所展示的商品/服务的标题、价格、详情等信息内容系由店铺经营者发布，其真实性、准确性和合法性均由店铺经营者负责。天猫提醒用户购买商品/服务前注意谨慎核实。如用户对商品/服务的标题、价格、详情等任何信息有任何疑问的，请在购买前通过阿里旺旺与店铺经营者沟通确认；天猫存在海量店铺，如用户发现店铺内有任何违法/侵权信息，请立即向天猫举报并提供有效线索。</Text>
                        </View>
                        <View style={styles.tags}>
                            <TouchableOpacity style={styles.tag}><Text style={styles.tagText}>美人志</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.tag}><Text style={styles.tagText}>衣服</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.tag}><Text style={styles.tagText}>新款</Text></TouchableOpacity>
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
                                <Text style={styles.blockTitleText}>评论(100)</Text>
                                <TouchableOpacity style={styles.rightArrow} onPress={() => this._jumpToCommentListPage()}>
                                    <Image source={require('../../assets/note/rg_right.png')}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.commentList}>
                                <Text style={styles.NickName}>小熊猫1号:</Text>
                                <Text style={styles.commentContent} lineBreakMode={'tail'}>很好看,很好看,很好看,很好看</Text>
                            </View>
                            <View style={styles.commentList}>
                                <Text style={styles.NickName}>小熊猫1号:</Text>
                                <Text style={styles.commentContent} lineBreakMode={'tail'}>很好看</Text>
                            </View>
                            <View style={styles.commentList}>
                                <Text style={styles.NickName}>小熊猫1号:</Text>
                                <Text style={styles.commentContent} lineBreakMode={'tail'}>很好看</Text>
                            </View>
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
                            <Text style={styles.floatOpText}>200</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.floatOpLine}></View>
                    <TouchableOpacity style={styles.floatOp} onPress={() => this._jumpToCommentPage()} >
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/personal/comment.png')}/>
                            <Text style={styles.floatOpText}>200</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.floatOpLine}></View>
                    <TouchableOpacity style={styles.floatOp}>
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/note/shopping_cart.png')}/>
                            <Text style={styles.floatOpText}>200</Text>
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

export default Detail;