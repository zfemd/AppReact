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
        this._renderRow1 = this._renderRow1.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._jumpToDetailPage = this._jumpToDetailPage.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchList());
    }

    _onRefresh() {
        const { dispatch } = this.props;
        dispatch(fetchList(true,false));
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

    _renderRow1(rowData:string, sectionID:number, rowID:number) {
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

    render() {
        const {flow} = this.props;
        let list = null;
        if (flow.loading && !flow.refreshing) {
            return (
                <View style={styles.center}>
                    <Text>loading</Text>
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
                          onRefresh={this._onRefresh}
                          title="努力加载中..."
                          colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                      }
                    >
                    <View style={styles.center} >
                        <Text style={{ fontSize: 16 }}>
                            目前没有数据，请刷新重试……
                        </Text>
                    </View>
                </ScrollView>
            )
        }
        if(this.state.dataSource.rowIdentities.length === 0){
            return(
                <ScrollView
                    refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                          />
                      }
                    >
                    <View style={styles.container}>
                        <ListView
                            contentContainerStyle={styles.list}
                            dataSource={this.state.dataSource.cloneWithRows(this.props.flow.flowList)}
                            initialListSize={21}
                            pageSize={3} // should be a multiple of the no. of visible cells per row
                            scrollRenderAheadDistance={500}
                            renderRow={this._renderRow}
                            enableEmptySections={true}
                            />
                        <ListView
                            contentContainerStyle={[styles.list, {paddingLeft: width/100*1}]}
                            dataSource={this.state.dataSource.cloneWithRows(this.props.flow.flowList)}
                            initialListSize={21}
                            pageSize={3} // should be a multiple of the no. of visible cells per row
                            scrollRenderAheadDistance={500}
                            renderRow={this._renderRow1}
                            enableEmptySections={true}
                            />
                    </View>
                </ScrollView>

            )
        } else {
            return (
                <ScrollView
                    refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                          />
                      }
                    >

                </ScrollView>


            );
        }

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
        marginTop: 8,
        marginBottom: 0,
        width: (width / 100) * 47,
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        marginBottom: 60,
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
