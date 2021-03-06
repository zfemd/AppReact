'use strict';

import React, { PropTypes } from 'react';
import {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    RefreshControl,
    ScrollView,
    InteractionManager,
    Navigator,
    ActivityIndicator,
    Button
} from 'react-native';

import AutoResponsive from '../autoResponsive';
import PrefetchImage from '../prefetchImage';
import DetailPage from '../../pages/detail';
import UserPage from '../../pages/user';
import LoginPage from '../../pages/login';
import {fetchList,pageRefresh} from '../../actions/flow';
import { connect } from 'react-redux';
import { Token,like, toast } from '../../utils/common';
import {fetchDetail} from '../../actions/detail';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-spinkit';
import images from '../../constants/images';

const {height, width} = Dimensions.get('window');
let fetchParams = {
    refreshing: false,
    loadingMore: false,
    flowRefreshing: false,
    tag: 'all',
    loadedSize: 0,
    timestamp: 0,
    myFollowOnly: false
};
class Flow extends React.Component {
    constructor(props) {
        super(props);
        this._onRefresh = this._onRefresh.bind(this);
        this._jumpToDetailPage = this._jumpToDetailPage.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._renderChildren = this._renderChildren.bind(this);
        this._onScroll = this._onScroll.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            list: this.props.flow,
            noteUpdated: false
        };
        fetchParams.myFollowOnly = this.props.home.isFollowed;
        this._scrollView = null;
    }

    componentDidMount() {
        let the = this;
        const { dispatch ,tag} = this.props;
        let params = _.cloneDeep(fetchParams);
        params.tag = tag;
        if (typeof tag !== 'undefined')
            dispatch(fetchList(params))
                .then(()=> {
                    _.each(the.props.flow.flowList[params.tag], function (v, k) {
                        if (!the.props.detail.note[v.noteId]) {
                            dispatch(fetchDetail(v.noteId));
                        }
                    });

                });
    }

    componentWillReceiveProps() {
        if (JSON.stringify(this.props.flow.flowList) === '{}'
            || !this.props.flow.flowList[this.props.tag]) {
            return;
        }
        if (this.props.tabForRefresh) {
            this._scrollView.scrollTo({y: 0});
            setTimeout(() => {
                this._onRefresh(true);
            }, 200)

        }

    }

    _onRefresh(isFlow) {
        let the = this;
        const { dispatch ,tag } = this.props;
        let params = _.cloneDeep(fetchParams);
        params.refreshing = true;
        params.tag = tag;
        params.loadingMore = false;
        params.loadedSize = 0;
        params.myFollowOnly = this.props.home.isFollowed;
        if (isFlow) {
            params.flowRefreshing = true;
            dispatch(fetchList(params))
                .then(()=> {
                    _.each(the.props.flow.flowList[params.tag], function (v, k) {
                        if (!the.props.detail.note[v.noteId]) {
                            dispatch(fetchDetail(v.noteId));
                        }
                    });
                });
        } else {
            setTimeout(()=> {
                params.flowRefreshing = false;
                dispatch(fetchList(params))
                    .then(()=> {
                        _.each(the.props.flow.flowList[params.tag], function (v, k) {
                            if (!the.props.detail.note[v.noteId]) {
                                dispatch(fetchDetail(v.noteId));
                            }
                        });
                    });
                this.setState({offlineReloading: false});
            }, 2000);
            this.setState({offlineReloading: true});
        }

    }

    _jumpToDetailPage(note) {
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: DetailPage,
                name: 'DetailPage',
                sceneConfigs: Navigator.SceneConfigs.FloatFromRight,
                note
            });
        });
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

    _like(noteId, tag) {
        const { navigator } = this.props;
        let the = this;
        Token.getToken(navigator).then((token) => {
                if (token) {
                    like(noteId, token).then((res) => {
                        let list = the.props.flow.flowList[tag];
                        let note = _.find(list, {noteId: noteId});
                        note.isLikedByVisitor = true;
                        note.likeCount++;
                        this.setState({list: this.props.flow});
                    });
                }
            }
        );
    }

    _renderFooter(noMoreData) {
        if (noMoreData) {
            return (
                <View
                    style={styles.loadingFooter }
                    >
                    <Text style={styles.footerText }>
                        到底了！
                    </Text>
                </View>
            )
        }

        return (
            <View
                style={styles.loadingFooter }
                >
                <ActivityIndicator size="small" color="#fc7d30"/>
                <Text style={styles.footerText }>
                    数据加载中……
                </Text>
            </View>
        );
    }

    _renderChildren(tag) {
        return this.props.flow.flowList[tag].map((val, key) => {
            val.imageHeight = val.imageHeight !== 0 ? val.imageHeight : 376;
            val.imageWidth = val.imageWidth !== 0 ? val.imageWidth : 288;
            let height = val.imageHeight / val.imageWidth * ((width / 100) * 47);
            const image = val.image ? val.image : images.DEFAULT_IMAGE;
            return (
                <TouchableOpacity key={val.noteId} style={this._getChildrenStyle(height)}
                                  onPress={() => this._jumpToDetailPage(val)} underlayColor="transparent"
                                  activeOpacity={0.5}>
                    <View style={styles.boxContainer}>
                        <PrefetchImage
                            imageUri={image}
                            imageStyle={styles.thumb}
                            resizeMode="cover"
                            width={(width/100)*47}
                            height={height}
                            />
                        <View style={styles.price}>
                            <Text style={styles.priceText}>￥100</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this._jumpToUserPage(val.authorId?val.authorId:13585979772)}
                            style={[styles.portraitContainer,{marginTop: height-15}]}>
                            <View style={styles.portrait}>
                                <Image
                                    source={{uri: val.portrait , width: 30, height: 30}}
                                    style={styles.portraitImg}
                                    />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.title}>
                            <Text style={styles.text} numberOfLines={2} lineBreakMode='tail'>
                                {val.title}
                            </Text>
                        </View>
                        <View style={styles.interaction}>
                            <View style={styles.star}>
                                {
                                    (()=> {
                                        const rating = Math.ceil(val.rating);
                                        let stars = [];
                                        for (let i = 0; i < rating; i++) {
                                            stars.push(<Image key={i}
                                                              source={require('../../assets/flow/star_filled.png')}/>);

                                        }
                                        for (let i = 5; i > rating; i--) {
                                            stars.push(<Image key={i}
                                                              source={require('../../assets/flow/star_unfilled.png')}/>);
                                        }
                                        return stars;
                                    })()
                                }
                            </View>
                            <View style={styles.like}>
                                <TouchableOpacity onPress={()=> this._like(val.noteId,tag)}>
                                    <Icon
                                        name={'ios-heart'}
                                        size={24}

                                        color={ val.isLikedByVisitor?'#fc7d30':'#bebdbd'}
                                        style={{justifyContent: 'flex-start'}}
                                        />
                                </TouchableOpacity>

                                <Text style={styles.interText}>{val.likeCount}</Text>
                            </View>
                            <View style={[styles.like,styles.comment]}>
                                <Image source={require('../../assets/flow/comment.png')}/>
                                <Text style={[styles.interText,styles.commentInterText]}>{val.commentCount}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

            );
        }, this);
    }

    _getAutoResponsiveProps() {
        return {
            itemMargin: width / 100 * 2,
        };
    }

    _getChildrenStyle(height) {
        return {
            width: (width / 100) * 47,
            marginLeft: width / 100 * 2,
            backgroundColor: '#fff',
            height: height + 84
        };
    }

    _onLayout(event) {
        console.log(event.nativeEvent.layout.height)
    }

    _onScroll(event) {
        let the = this;
        const { dispatch, tag, flow } = this.props;
        let maxOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
        let offset = event.nativeEvent.contentOffset.y;
        let params = _.cloneDeep(fetchParams);
        if (offset > 0
            && Math.floor(maxOffset - offset) <= 0
            && !this.props.flow.loadingMore
            && !this.props.flow.noMoreData
            && tag === flow.currentTag) {
            params.loadedSize = this.props.flow.flowList[tag].length;
            params.timestamp = this.props.flow.timestamp[tag];
            params.refreshing = true;
            params.tag = tag;
            params.loadingMore = true;
            params.myFollowOnly = this.props.home.isFollowed;
            dispatch(fetchList(params))
                .then(()=> {
                    _.each(the.props.flow.flowList[params.tag], function (v, k) {
                        if (!the.props.detail.note[v.noteId]) {
                            dispatch(fetchDetail(v.noteId));
                        }
                    });
                });
        }
    }

    componentDidUpdate() {
        let the = this;
        const {flow, tag, dispatch, home} = this.props;
        if (flow.pageRefresh && flow.currentTag === tag) {
            let params = _.cloneDeep(fetchParams);
            params.myFollowOnly = home.isFollowed;
            params.tag = tag;
            dispatch(fetchList(params))
                .then(()=> {
                    _.each(the.props.flow.flowList[params.tag], function (v, k) {
                        if (!the.props.detail.note[v.noteId]) {
                            dispatch(fetchDetail(v.noteId));
                        }
                    });
                });
        }
    }

    render() {
        const {flow, tag} = this.props;
        let list = null;
        if (flow.loading && !flow.refreshing) {
            return (
                <View style={[styles.center,{marginTop: 10}]}>
                    <Text style={{color: '#bdbdbd'}}>加载中...</Text>
                </View>
            )
        } else {
            list = flow.flowList[tag];
        }

        if (!list || list.length === 0) {
            return (
                <View>
                    {
                        flow.refreshing || this.state.offlineReloading ? (
                            <View style={[styles.center,{marginTop: 40}]}>

                                <Image source={require('../../assets/gif/loading.gif')}/>
                            </View>
                        ) : (
                            <View>
                                <View style={[styles.center,{marginTop: 40}]}>
                                    <Text style={{ fontSize: 16, color: '#bdbdbd' }}>
                                        目前没有数据，请刷新重试……
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.button} onPress={() => this._onRefresh(false)}>
                                    <Text style={styles.buttonFont}>刷新</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }


                </View>

            )
        }

        return (
            <ScrollView
                ref={(scrollView) => { this._scrollView = scrollView; }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                          <RefreshControl
                            refreshing={flow.flowRefreshing}
                            onRefresh={() => this._onRefresh(true)}
                            colors={['#fc7d30']}
                            tintColor={['#fc7d30']}
                          />
                      }
                onScroll={this._onScroll}
                scrollEventThrottle={200}
                style={styles.container}
                >
                <View
                    style={styles.row}
                    onLayout={this._onLayout }
                    >
                    <AutoResponsive {...this._getAutoResponsiveProps()} >
                        {this._renderChildren(tag)}
                    </AutoResponsive>
                    {this.props.flow.noMoreData ? this._renderFooter(true) : (this.props.flow.loadingMore ? this._renderFooter() : null) }
                </View>

            </ScrollView>

        )
    }
}

var styles = StyleSheet.create({
    list: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        width: (width / 100) * 50,
        paddingLeft: width / 100 * 2,
    },
    row: {
        marginBottom: 0,
        paddingTop: 10,
        backgroundColor: '#f1f1f1',
        alignItems: 'flex-start',
    },
    boxContainer: {
        flexDirection: 'column',
    },
    thumb: {
        width: (width / 100) * 47,
        height: 200,
        overflow: 'hidden',
    },
    title: {
        height: 28,
        margin: 6,
        marginTop: 24,
    },
    text: {
        flex: 1,
        color: '#4a4a4a',
        fontSize: 11,
        lineHeight: 13,
    },
    container: {
        paddingTop: 0,
        marginBottom: 50,
        flex: 1
    },
    portraitContainer: {
        zIndex: 10,
        position: 'absolute',
        right: 15
    },
    portrait: {
        backgroundColor: '#d8d8d8',
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 1.5,
        alignSelf: 'flex-end',
    },
    portraitImg: {
        borderRadius: 15,
    },
    price: {
        position: 'absolute',
        top: 20,
        left: 0,
        width: 60,
        height: 22,
        borderBottomRightRadius: 11,
        borderTopRightRadius: 11,
        backgroundColor: 'rgba(109, 109, 109, 0.8)',
        opacity: 0
    },
    priceText: {
        color: '#fc7d30',
        lineHeight: 20,
        paddingLeft: 5,
    },
    interaction: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: (width / 100) * 47 - 20,
        borderTopWidth: .6,
        paddingTop: 2,
        marginBottom: 10,
        borderColor: '#cecece',
    },
    star: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 6
    },
    like: {
        flexDirection: 'row',
        minWidth: 24,
        alignItems: 'center'
    },
    interText: {
        fontSize: 7,
        paddingLeft: 4,
        marginRight: 8,
        width: 10,
        height: 10,
        color: '#9b9b9b'
    },
    comment: {
        flexDirection: 'row',
    },
    commentInterText: {
        marginRight: 0,
    },
    center: {
        alignItems: 'center'
    },
    dataEmpty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        marginTop: 10,
        bottom: 10
    },
    footerText: {
        textAlign: 'center',
        fontSize: 12,
        marginLeft: 10,
        color: '#bdbdbd'
    },
    heart: {
        width: 20,
        height: 20
    },
    button: {
        height: 36,
        backgroundColor: '#fc7d30',
        margin: 80,
        marginTop: 40,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonFont: {
        fontSize: 16,
        lineHeight: 26,
        color: '#fff'
    }
});

function mapStateToProps(state) {
    const { flow, detail, home } = state;
    return {
        flow,
        detail,
        home
    };
}

export default connect(mapStateToProps)(Flow);
