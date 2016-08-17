'use strict';

import React  from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import PrefetchImage from '../../components/prefetchImage';
const shareImg = require('../../assets/note/transfer.png');
const uri = ['https://hbimg.b0.upaiyun.com/fd0af542aae5ceb16f67c54c080a6537111d065b94beb-brWmWp_fw658',
    'https://hbimg.b0.upaiyun.com/b13d086f8c1a3040ae05637c6cb283d60c1286661f43b-OKqo08_fw658',
    'https://hbimg.b0.upaiyun.com/81329d6d0911921db04ee65f3df9d62aa6763b5f266fa-4kXDrj_fw658'
];
const {height, width} = Dimensions.get('window');

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    _onLeftIconClicked() {

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
                            <PrefetchImage
                                imageUri={uri[1]}
                                imageStyle={styles.thumb}
                                resizeMode="cover"
                                width={width}
                                />
                            <PrefetchImage
                                imageUri={uri[1]}
                                imageStyle={styles.thumb}
                                resizeMode="cover"
                                width={width}
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
                                <TouchableOpacity style={styles.rightArrow}>
                                    <Image source={require('../../assets/note/rg_right.png')}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.commentList}>
                                <Text style={styles.NickName}>小熊猫1号:</Text>
                                <Text style={styles.commentContent}>很好看,很好看,很好看,很好看</Text>
                            </View>
                            <View style={styles.commentList}>
                                <Text style={styles.NickName}>小熊猫1号:</Text>
                                <Text style={styles.commentContent}>很好看</Text>
                            </View>
                            <View style={styles.commentList}>
                                <Text style={styles.NickName}>小熊猫1号:</Text>
                                <Text style={styles.commentContent}>很好看</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.float}>
                    <TouchableOpacity style={styles.floatOp}>
                        <View style={styles.floatOpView}>
                            <Image style={styles.floatOpImage} source={require('../../assets/note/heart.png')}/>
                            <Text style={styles.floatOpText}>200</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.floatOpLine}></View>
                    <TouchableOpacity style={styles.floatOp}>
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
            </View>
        )

    }
}

export default Detail;