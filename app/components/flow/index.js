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
    ActivityIndicator
} from 'react-native';

import AutoResponsive from '../autoResponsive';
import PrefetchImage from '../prefetchImage';
import DetailPage from '../../pages/detail';
import UserPage from '../../pages/user';
import LoginPage from '../../pages/login';
import {fetchList} from '../../actions/flow';
import { connect } from 'react-redux';
import { Token,like } from '../../utils/common';
import {fetchDetail} from '../../actions/detail';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');
let fetchParams = {
    refreshing : false,
    loadingMore : false,
    flowRefreshing : false,
    tag : 'all',
    loadedSize : 0,
    timestamp : 0,
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
        };
        fetchParams.myFollowOnly = this.props.home.isFollowed;
    }

    componentDidMount() {
        const { dispatch ,tag} = this.props;
        let params = _.cloneDeep(fetchParams);
        params.tag = tag;
        if(typeof tag !== 'undefined')
            dispatch(fetchList(params));
    }

    _onRefresh(isFlow) {
        const { dispatch ,tag } = this.props;
        let params = _.cloneDeep(fetchParams);
        params.refreshing = true;
        params.tag = tag;
        params.loadingMore = false;
        params.loadedSize = 0;
        params.myFollowOnly = this.props.home.isFollowed;
        if (isFlow){
            params.flowRefreshing = true;
            dispatch(fetchList(params));
        } else {
            params.flowRefreshing = false;
            dispatch(fetchList(params));
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

    _jumpToUserPage() {
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
                if (token) {
                    InteractionManager.runAfterInteractions(() => {
                        navigator.push({
                            component: UserPage,
                            name: 'UserPage',
                            sceneConfigs: Navigator.SceneConfigs.FloatFromRight
                        });
                    });
                }
            }
        );

    }

    _like(noteId) {
        const { navigator } = this.props;
        Token.getToken(navigator).then((token) => {
                if (token) {
                    like(noteId);
                }
            }
        );
    }

    _renderFooter( noMoreData ) {
        if(noMoreData){
            return(
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

    _renderChildren(tag){
        return this.props.flow.flowList[tag].map((val, key) => {
            let height = val.imageHeight / val.imageWidth * ((width/100)*47);
            return (
                <TouchableOpacity key={key} style={this._getChildrenStyle(height)} onPress={() => this._jumpToDetailPage(val)} underlayColor="transparent" activeOpacity={0.5}>
                    <View>
                        <PrefetchImage
                            imageUri={val.image}
                            imageStyle={styles.thumb}
                            resizeMode="cover"
                            width={(width/100)*47}
                            />
                        <View style={styles.price}>
                            <Text style={styles.priceText}>￥100</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => this._jumpToUserPage()}>
                            <View style={styles.portrait}>
                                <Image
                                    source={{uri: val.portrait , width: 30, height: 30}}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={styles.text} lineBreakMode={'middle'}>
                                {val.title}
                            </Text>
                        </View>
                        <View style={styles.interaction}>
                            <View style={styles.star}>
                                {
                                    (()=>{
                                        const rating = Math.ceil(val.rating);
                                        let stars = [];
                                        for(let i = 0; i< rating; i++){
                                            stars.push(<Image key={i} source={require('../../assets/flow/star_filled.png')}/>);

                                        }
                                        for(let i = 5; i > rating; i--){
                                            stars.push(<Image key={i} source={require('../../assets/flow/star_unfilled.png')}/>);
                                        }
                                        return stars;
                                    })()
                                }
                            </View>
                            <View style={styles.like}>
                                <TouchableOpacity onPress={()=> this._like(val.noteId)}>
                                    <Icon
                                        name={'ios-heart'}
                                        size={18}
                                        color={'#bebdbd'}
                                        style={{marginTop : -4}}
                                        />
                                </TouchableOpacity>

                                <Text style={styles.interText}>{val.likeCount}</Text>
                            </View>
                            <View style={styles.like}>
                                <Image source={require('../../assets/flow/comment.png')}/>
                                <Text style={styles.interText}>{val.commentCount}</Text>
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
            height: height + 70
        };
    }

    _onLayout(event) {
        console.log(event.nativeEvent.layout.height)
    }

    _onScroll(event) {
        const { dispatch, tag } = this.props;
        let maxOffset = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
        let offset = event.nativeEvent.contentOffset.y;
        let params = _.cloneDeep(fetchParams);
        if ((maxOffset - offset) < 0 && !this.props.flow.loadingMore && !this.props.flow.noMoreData) {
            params.loadedSize = this.props.flow.flowList[tag].length;
            params.timestamp = this.props.flow.timestamp[tag];
            params.refreshing = true;
            params.tag = tag;
            params.loadingMore = true;
            params.myFollowOnly = this.props.home.isFollowed;
            dispatch(fetchList(params));
        }
    }

    componentDidUpdate(){
        const {flow, tag, dispatch, home} = this.props;
        if(flow.pageRefresh && flow.currentTag === tag){
            let params = _.cloneDeep(fetchParams);
            params.myFollowOnly = home.isFollowed;
            params.tag = tag;
            dispatch(fetchList(params));
        }
    }

    render() {
        const {flow, tag} = this.props;
        let list = null;
        if (flow.loading && !flow.refreshing) {
            return (
                <View style={styles.center}>
                    <Text>loading...</Text>
                </View>
            )
        } else {
            list = flow.flowList[tag];
        }

        if (!list || list.length === 0) {
            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    contentContainerStyle={styles.dataEmpty}
                    refreshControl={
                        <RefreshControl
                          refreshing={flow.refreshing}
                          onRefresh={() => this._onRefresh(false)}
                          title="努力加载中..."
                          titleColor="#fc7d30"
                          colors={['#fc7d30']}
                          tintColor={['#fc7d30']}
                        />
                      }
                    >
                    <View style={styles.center}>
                        <Text style={{ fontSize: 16 }}>
                            目前没有数据，请刷新重试……
                        </Text>
                    </View>
                </ScrollView>
            )
        }

        return (
            <ScrollView
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
    thumb: {
        width: (width / 100) * 47,
        height: 200,
        overflow: 'hidden',
    },
    text: {
        flex: 1,
        margin: 6,
        color: '#4a4a4a',
        fontSize: 11,
        lineHeight: 13,
    },
    container: {
        paddingTop: 0,
        marginBottom: 50,
        flex: 1
    },
    portrait: {
        backgroundColor: '#d8d8d8',
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: 2,
        marginTop: -15,
        marginRight: 15,
        alignSelf: 'flex-end',
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
        flex: 1,
        borderTopWidth: .6,
        paddingTop: 6,
        marginBottom: 10,
        borderColor: '#9b9b9b',
    },
    star: {
        flexDirection: 'row',
        flex: 1,
    },
    like: {
        flexDirection: 'row',
    },
    comment: {
        flexDirection: 'row',
    },
    interText: {
        fontSize: 7,
        paddingLeft: 4,
        paddingRight: 4,
        color: '#9b9b9b'
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
        marginTop: 10 ,
        bottom: 10
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 10
    },
    heart: {
        width: 20,
        height: 20
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
