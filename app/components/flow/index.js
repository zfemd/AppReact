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
import {fetchList} from '../../actions/flow';
import { connect } from 'react-redux';

const {height, width} = Dimensions.get('window');

class Flow extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._jumpToDetailPage = this._jumpToDetailPage.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._renderChildren = this._renderChildren.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchList());
    }

    _onRefresh(isFlow) {
        const { dispatch } = this.props;
        if (isFlow)
            dispatch(fetchList(true, false, false));
        else
            dispatch(fetchList(true, false, true));
    }

    _jumpToDetailPage() {
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: DetailPage,
                name: 'DetailPage',
                sceneConfigs: Navigator.SceneConfigs.FloatFromRight
            });
        });
    }

    _jumpToUserPage() {
        const { navigator } = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: UserPage,
                name: 'UserPage',
                sceneConfigs: Navigator.SceneConfigs.FloatFromRight
            });
        });
    }

    _renderFooter() {
        return (
            <View
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center', padding: 5, width: width, marginTop: 10 , position: 'absolute', bottom: 0, }}
                >
                <ActivityIndicator size="small" color="#3e9ce9"/>
                <Text style={{ textAlign: 'center', fontSize: 16, marginLeft: 10 }}>
                    数据加载中……
                </Text>
            </View>
        );
    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        return (
            <TouchableOpacity onPress={() => this._jumpToDetailPage()} underlayColor="transparent" activeOpacity={0.5}>
                <View>
                    <View style={styles.row}>
                        <PrefetchImage
                            imageUri={rowData.image}
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
                                    source={{uri: rowData.portrait , width: 30, height: 30}}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            <Text style={styles.text} lineBreakMode={'middle'}>
                                {rowData.title}
                            </Text>
                        </View>
                        <View style={styles.interaction}>
                            <View style={styles.star}>
                                <Image source={require('../../assets/flow/star_filled.png')}/>
                                <Image source={require('../../assets/flow/star_filled.png')}/>
                                <Image source={require('../../assets/flow/star_filled.png')}/>
                                <Image source={require('../../assets/flow/star_filled.png')}/>
                                <Image source={require('../../assets/flow/star_unfilled.png')}/>
                            </View>
                            <View style={styles.like}>
                                <Image source={require('../../assets/flow/heart.png')}/>
                                <Text style={styles.interText}>11</Text>
                            </View>
                            <View style={styles.like}>
                                <Image source={require('../../assets/flow/comment.png')}/>
                                <Text style={styles.interText}>34</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _renderChildren(){
        return this.props.flow.flowList.map((val, key) => {
            let height = val.imageHeight / val.imageWidth * ((width/100)*47);
            return (

                <View key={key} style={this._getChildrenStyle(height)}>
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
                            <Image source={require('../../assets/flow/star_filled.png')}/>
                            <Image source={require('../../assets/flow/star_filled.png')}/>
                            <Image source={require('../../assets/flow/star_filled.png')}/>
                            <Image source={require('../../assets/flow/star_filled.png')}/>
                            <Image source={require('../../assets/flow/star_unfilled.png')}/>
                        </View>
                        <View style={styles.like}>
                            <Image source={require('../../assets/flow/heart.png')}/>
                            <Text style={styles.interText}>11</Text>
                        </View>
                        <View style={styles.like}>
                            <Image source={require('../../assets/flow/comment.png')}/>
                            <Text style={styles.interText}>34</Text>
                        </View>
                    </View>
                </View>

                //<View style={this._getChildrenStyle()} key={key}>
                //    <Text style={styles.text}>{val.title}</Text>
                //</View>
            );
        }, this);
    }


    _getAutoResponsiveProps() {
        return {
            itemMargin: 8,
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

    render() {
        const {flow} = this.props;
        let list = null;
        if (flow.loading && !flow.refreshing) {
            return (
                <View style={styles.center}>
                    <Text>loading...</Text>
                </View>
            )
        } else {
            list = flow.flowList;
        }

        if (list.length === 0) {
            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    contentContainerStyle={styles.dataEmpty}
                    refreshControl={
                        <RefreshControl
                          refreshing={flow.refreshing}
                          onRefresh={() => this._onRefresh(true)}
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
                automaticallyAdjustContentInsets={false}
                horizontal={false}
                refreshControl={
                          <RefreshControl
                            refreshing={flow.flowRefreshing}
                            onRefresh={() => this._onRefresh(true)}
                            colors={['#fc7d30']}
                            tintColor={['#fc7d30']}
                          />
                      }
                style={styles.container}
                >

                    <AutoResponsive {...this._getAutoResponsiveProps()} >
                        {this._renderChildren()}
                    </AutoResponsive>
            </ScrollView>

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
        flex: 1,
        width: (width / 100) * 47,
        marginTop: 8,
        marginBottom: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
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
        marginBottom: 60,
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
});

function mapStateToProps(state) {
    const { flow } = state;
    return {
        flow
    };
}

export default connect(mapStateToProps)(Flow);
