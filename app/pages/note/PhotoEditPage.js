/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ImageEditor,
    ImageStore,
    ListView,
    Modal,
    Navigator,
    Platform,
    ScrollView,
    Slider,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import WebViewBridge from 'react-native-webview-bridge';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import Button from '../../components/button/Button';
import Loading from '../../components/loading';
import FramedTextInput from '../../components/textInput/FramedTextInput';
import Toolbar from '../../components/toolbar';
import ConfirmBar from '../../components/bar/ConfirmBar';
import StoreActions from '../../constants/actions';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ImageButton from '../../components/toolbar/ImageButton';
import BrandOptionList from './BrandOptionList';
import CurrencyOptionList from './CurrencyOptionList';
import NationOptionList from './NationOptionList';
import CategoryOptionList from './CategoryOptionList';
import PostNotePage from './PostNotePage';
import {fabrics} from '../../constants/fabrics';
import {fabricContrast} from '../../constants/imageFilters';
const arrowImg = require('../../assets/header/arrow.png');
import styles from './style';

const originImg = require('../../assets/photo/origin.png');
const sepia2Img = require('../../assets/photo/sepia2.jpg');
const sepiaImg = require('../../assets/photo/sepia.jpg');
const sharpenImg = require('../../assets/photo/sharpen.jpg');
const photoHtmlAndroid = require('../../assets/html/photo.html');
import photoHtmlIos from '../../assets/html/photo';

import stickers from '../../assets/stickers/index.js';
import ChannelTabBar from '../../components/channelTabBar';
import _ from 'lodash';

let clone = require('lodash/clone');

let contrastIcon = <Icon name="adjust" size={30} color="#333"/>;
let brightnessIcon = <Icon name="sun-o" size={30} color="#333"/>;
let cropIcon = <Icon name="crop" size={30} color="#333"/>;
let rotateIcon = <Icon name="rotate-right" size={30} color="#333"/>;

let maxSize = 1024;

class PhotoEditPage extends Component {
    constructor(props) {
        super(props);
        this._stickerUpdateState = this._stickerUpdateState.bind(this);
        this.state = {
            bShowTabsBar: true,
            bHandlingFilter: false,
            oTabsBar: null,
            oDefaultTabsBar: <DefaultTabBar {...this.props}/>,
            dBrightness: 0.5,
            sBase64Data: null,
            oImageTag: null,
            sImageBase64Data: null,
            avatarSource: this.props.photo,
            optionsModalVisible: false,
            categoryOptionsVisible: false,
            currencyOptionsVisible: false,
            brandOptionsVisible: false,
            nationOptionsVisible: false,
            transparent: true,
            tagOverlayVisible: false,
            tags: [],
            currentTag: null,
            beautifyTab: 'default',
            beautify: {
                brightness: {oldValue: 0.5, newValue: 0.5},
                contrast: {oldValue: 1, newValue: 1}
            },
            currentFilter: null,
            updatedSticks: {},
            next: false,
            ready: false
        };

        this.stickersDataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return (r1 !== r2 || this.state.updatedSticks[r1.name]);
            },
            sectionHeaderHasChanged: (s1, s2) => s1 != s2
        });

        this.state.stickers = clone(stickers);
        // here, datasource's argument must be original "stickers" object.

        this.state.stickersBbs = {};
        this.state.stickersChz = {};
        this.state.stickersJbk = {};
        this.state.stickersJs = {};
        this.state.stickersMrz = {};
        this.state.stickersNrz = {};
        this.state.stickersPyyhh = {};
        this.state.stickersQqg = {};
        this.state.stickersSdp = {};
        _.each(this.state.stickers.myStickers, (v, k)=> {
            if (v.type === 'bbs')
                this.state.stickersBbs[k] = v;
            if (v.type === 'chz')
                this.state.stickersChz[k] = v;
            if (v.type === 'jbk')
                this.state.stickersJbk[k] = v;
            if (v.type === 'js')
                this.state.stickersJs[k] = v;
            if (v.type === 'mrz')
                this.state.stickersMrz[k] = v;
            if (v.type === 'nrz')
                this.state.stickersNrz[k] = v;
            if (v.type === 'pyyhh')
                this.state.stickersPyyhh[k] = v;
            if (v.type === 'qqg')
                this.state.stickersQqg[k] = v;
            if (v.type === 'sdp')
                this.state.stickersSdp[k] = v;
        });

        this.state.stickersDataSourceBbs = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersBbs});
        this.state.stickersDataSourceChz = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersChz});
        this.state.stickersDataSourceJbk = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersJbk});
        this.state.stickersDataSourceJs = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersJs});
        this.state.stickersDataSourceMrz = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersMrz});
        this.state.stickersDataSourceNrz = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersNrz});
        this.state.stickersDataSourcePyyhh = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersPyyhh});
        this.state.stickersDataSourceQqg = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersQqg});
        this.state.stickersDataSourceSdp = this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersSdp});
        this.state.stickersDataSource = this.stickersDataSource.cloneWithRowsAndSections(this.state.stickers);
    }

    _onWebViewLoadEnd() {
        if (this.props.draftNote) {
            let {currentPhotoIndex, notePhotos} = this.props.draftNote;
            if (notePhotos && notePhotos.length > currentPhotoIndex) {
                this.state.avatarSource = notePhotos[currentPhotoIndex].photo;
                let imageSize = {width,height} = this.state.avatarSource.image;
                let displaySize = {};

                if (imageSize.width > imageSize.height && imageSize.width > maxSize) {
                    displaySize = {width: maxSize, height: (maxSize / imageSize.width * imageSize.height)};
                } else if (imageSize.height > imageSize.width && imageSize.height > maxSize) {
                    displaySize = {height: maxSize, width: (maxSize / imageSize.height * imageSize.width)};
                } else {
                    displaySize = {height: imageSize.height, width: imageSize.width}
                }

                console.log(this.state.avatarSource);

                // get base64data of image
                ImageEditor.cropImage(this.state.avatarSource.image.uri, {
                    offset: {x: 0, y: 0},
                    size: imageSize,
                    displaySize: displaySize,
                    resizeMode: 'contain'
                }, (url) => {
                    ImageStore.getBase64ForTag(url, (base64Data) => {
                        const { webviewbridge } = this.refs;
                        let {height, width} = Dimensions.get('window');
                        let sImageBase64Data = "data:" + this.state.avatarSource.type + ";base64," + base64Data.replace(/\n|\r/g, "");
                        //console.log('data:' + sImageBase64Data);

                        webviewbridge.sendToBridge(JSON.stringify({
                            type: "imageReady",
                            window: {width: width, height: height},
                            image: displaySize,
                            data: sImageBase64Data
                        }));
                    }, (error) => {
                        console.log(error);
                    });
                }, (error) => {
                    console.log(error);
                });
            }
        }
    }

    _onCancel() {
        const { navigator, dispatch } = this.props;
        let {currentPhotoIndex} = this.props.draftNote;

        dispatch({type: StoreActions.REMOVE_NOTE_PHOTO, index: currentPhotoIndex});

        if (navigator) {
            navigator.pop();
        }
    }

    _onContinue() {
        const { navigator, dispatch } = this.props;
        const { webviewbridge } = this.refs;
        this.setState({next: true});

        dispatch({type: StoreActions.ADD_TAGS, tags: this.state.tags.slice()});

        webviewbridge.sendToBridge(JSON.stringify({type: 'continue'}));

    }

    /**
     * @param args: {i:currentPage, from: prevPage, ref: currentPage component}
     * @private
     */
    _onChangeTab(args) {
        const { webviewbridge } = this.refs;
        webviewbridge.sendToBridge(JSON.stringify({type: 'changeTab', imageClickable: (args.i == 1)}));
    }

    _onCurrencyInputFocus() {
        this.showCurrencyModal(true);
    }

    _onNationInputFocus() {
        this.showNationModal(true);
    }

    _onCategorySelect(rowData) {
        this.state.currentTag.category = {title: rowData.title, id: rowData.id};
        this.showBrandModal(false);
    }

    _onBrandSelect(rowData) {
        this.state.currentTag.brand = rowData.title;
        this.showBrandModal(false);
    }

    /*
     * @deprecated
     */
    _onCurrencySelect(rowData) {
        this.state.currentTag.currency = rowData.title;
        this.showCurrencyModal(false);
    }

    _onNationSelect(rowData) {
        this.state.currentTag.city = {title: rowData.title, id: rowData.id};
        this.showCurrencyModal(false);
    }

    setOptionsModalVisible(flag) {
        this.setState({optionsModalVisible: flag});
    }

    showCategoryModal(flag) {
        this.state.categoryOptionsVisible = flag;
        this.state.brandOptionsVisible = false;
        this.state.nationOptionsVisible = false;
        this.state.currencyOptionsVisible = false;
        this.setOptionsModalVisible(flag);
    }

    showBrandModal(flag) {
        this.state.brandOptionsVisible = flag;
        this.state.categoryOptionsVisible = false;
        this.state.nationOptionsVisible = false;
        this.state.currencyOptionsVisible = false;
        this.setOptionsModalVisible(flag);
    }

    showCurrencyModal(flag) {
        this.state.currencyOptionsVisible = flag;
        this.state.categoryOptionsVisible = false;
        this.state.brandOptionsVisible = false;
        this.state.nationOptionsVisible = false;
        this.setOptionsModalVisible(flag);
    }

    showNationModal(flag) {
        this.state.nationOptionsVisible = flag;
        this.state.currencyOptionsVisible = false;
        this.state.brandOptionsVisible = false;
        this.setOptionsModalVisible(flag);
    }

    _onModalCancel() {
        this.state.nation = this.state.currency = this.state.brand = "";
        this.setState({tagOverlayVisible: false});
    }

    _onAddTag() {
        const { webviewbridge } = this.refs;
        let {tags} = this.state;

        let tagData = {name, currency, brand, price, address, x, y} = this.state.currentTag;

        this.state.currentTag.category && (tagData.category = this.state.currentTag.category.id);
        this.state.currentTag.city && (tagData.city = this.state.currentTag.city.id);

        let data = clone(tagData);

        this.state.currentTag.category && (data.category = this.state.currentTag.category.title);
        this.state.currentTag.city && (data.city = this.state.currentTag.city.title);

        console.log(data);

        tags.push(tagData);
        webviewbridge.sendToBridge(JSON.stringify({type: 'addTag', data: data}));

        this.state.tags = tags;
        this.setState({tagOverlayVisible: false});
    }

    _onPressBrightness() {
        this.state.bShowTabsBar = false;
        this._resetTabBars();
        this.setState({beautifyTab: 'brightness'});
    }

    _onPressContrast() {
        this.state.bShowTabsBar = false;
        this._resetTabBars();
        this.setState({beautifyTab: 'contrast'});
    }

    _onPressRotate() {
        const { webviewbridge } = this.refs;
        this.setState({bHandlingFilter: true});
        webviewbridge.sendToBridge(JSON.stringify({type: 'beautify', beautify: 'rotate'}));
    }

    _resetTabBars() {
        this.state.oTabsBar = this.state.bShowTabsBar ? this.state.oDefaultTabsBar : false;
    }

    _adjustImageBrightness(value) {
        const { webviewbridge } = this.refs;
        this.setState({bHandlingFilter: true});
        webviewbridge.sendToBridge(JSON.stringify({type: 'beautify', beautify: 'brightness', value: value}));
        this.state.beautify.brightness.newValue = value;
    }

    _adjustImageContrast(value) {
        const { webviewbridge } = this.refs;
        this.setState({bHandlingFilter: true});
        webviewbridge.sendToBridge(JSON.stringify({type: 'beautify', beautify: 'contrast', value: value}));
        this.state.beautify.contrast.newValue = value;
    }

    _applyImageFilter(filter) {
        if (this.state.currentFilter === filter)
            return;
        const { webviewbridge } = this.refs;
        this.setState({bHandlingFilter: true});
        webviewbridge.sendToBridge(JSON.stringify({type: 'filter', value: filter}));
        this.setState({currentFilter: filter});
    }

    _onBridgeMessage(message) {
        const { navigator, dispatch } = this.props;
        const { webviewbridge } = this.refs;

        //console.log(message);

        if (message.startsWith("{")) {
            message = JSON.parse(message);
            switch (message.type) {
                case "bridgeReady":
                    this._onWebViewLoadEnd();
                    this.setState({ready: true});
                    break;
                case "clickImage":
                    this.setState({tagOverlayVisible: true, currentTag: {x: message.x, y: message.y}});
                    break;
                case "imageUpdated":
                    this.setState({bHandlingFilter: false});
                    console.log(message.type);
                    //this.setState({sImageBase64Data: message.data});
                    break;
                case "continue":
                    dispatch({type: StoreActions.ADD_NOTE_PHOTO_DATA, imageData: message.imageData, ImgSize: message.ImgSize});
                    this.setState({next: false});
                    if (navigator) {
                        navigator.push({
                            name: 'PostNotePage',
                            component: PostNotePage
                        })
                    }
                    break;
                case 'toSvg':
                    console.log(message.imageData)
            }
        }
    }

    _toggleSticker(stickerInfo, sectionID, rowID) {
        let { webviewbridge } = this.refs;

        if (!stickerInfo.added) {
            stickerInfo.added = true;
            this.state.updatedSticks[rowID] = true;
            webviewbridge.sendToBridge(JSON.stringify({type: "addSticker", name: rowID}));
            //this.setState({stickersDataSource: this.stickersDataSource.cloneWithRowsAndSections(this.state.stickers)});
        } else {
            stickerInfo.added = false;
            this.state.updatedSticks[rowID] = true;
            webviewbridge.sendToBridge(JSON.stringify({type: "removeSticker", name: rowID}));
            //this.setState({stickersDataSource: this.stickersDataSource.cloneWithRowsAndSections(this.state.stickers)});
        }

        this._stickerUpdateState(stickerInfo);
    }

    _stickerUpdateState(stickerInfo) {
        if (stickerInfo.type === 'bbs')
            this.setState({stickersDataSourceBbs: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersBbs})});
        if (stickerInfo.type === 'chz')
            this.setState({stickersDataSourceChz: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersChz})});
        if (stickerInfo.type === 'jbk')
            this.setState({stickersDataSourceJbk: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersJbk})});
        if (stickerInfo.type === 'js')
            this.setState({stickersDataSourceJs: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersJs})});
        if (stickerInfo.type === 'mrz')
            this.setState({stickersDataSourceMrz: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersMrz})});
        if (stickerInfo.type === 'nrz')
            this.setState({stickersDataSourceNrz: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersNrz})});
        if (stickerInfo.type === 'pyyhh')
            this.setState({stickersDataSourcePyyhh: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersPyyhh})});
        if (stickerInfo.type === 'qqg')
            this.setState({stickersDataSourceQqg: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersQqg})});
        if (stickerInfo.type === 'sdp')
            this.setState({stickersDataSourceSdp: this.stickersDataSource.cloneWithRowsAndSections({m: this.state.stickersSdp})});
    }

    _renderSticker(rowData, sectionID, rowID, highlightRow) {
        let selectedStyle = rowData.added ? {borderColor: '#fc7d30'} : {borderColor: '#f1f1f1'};
        this.state.updatedSticks[rowID] = false; // reset
        return <TouchableOpacity style={[{marginHorizontal:10,borderWidth: 2,backgroundColor:'#f1f1f1'}, selectedStyle]}
                                 onPress={() => {
                                        highlightRow(sectionID, rowID);
                                        this._toggleSticker.call(this, rowData, sectionID, rowID);}}>
            <Image key={rowID} source={rowData.thumb} style={{width:80, height:80}} resizeMode="contain"/>
        </TouchableOpacity>;
    }

    _toSvg() {
        const { webviewbridge } = this.refs;
        webviewbridge.sendToBridge(JSON.stringify({type: 'toSvg'}));
    }

    componentDidMount() {
        _.each(this.state.stickers.myStickers, (v, k)=> {
            this.state.stickers.myStickers[k].added = false;
        });
    }

    render() {
        let {height, width} = Dimensions.get('window');

        let choseFilterStyle = {borderColor: '#fc7d30'};
        console.log(height);

        return (
            <View style={[styles.container, {height: height - 21}, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                <Toolbar
                    title="编辑照片"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightText='继续'
                    onLeftIconClicked={this._onCancel.bind(this)}
                    onRightIconClicked={this._onContinue.bind(this)}
                    />

                {this.state.bHandlingFilter || this.state.next || !this.state.ready ? <Loading /> : null}

                <View style={styles.selectedPhotoContainer}>
                    {
                        Platform.OS === 'ios' ?
                            <WebViewBridge ref="webviewbridge" javaScriptEnabled={true}
                                           onBridgeMessage={this._onBridgeMessage.bind(this)}
                                           scrollEnabled={false} allowFileAccessFromFileURLs={true}
                                           allowUniversalAccessFromFileURLs={true}
                                           domStorageEnabled={true}
                                           source={photoHtmlAndroid}>
                            </WebViewBridge> :
                            <WebViewBridge ref="webviewbridge" javaScriptEnabled={true}
                                           onBridgeMessage={this._onBridgeMessage.bind(this)}
                                           scrollEnabled={false} allowFileAccessFromFileURLs={true}
                                           allowUniversalAccessFromFileURLs={true}
                                           domStorageEnabled={true}
                                           source={{html:photoHtmlIos}}>
                            </WebViewBridge>
                    }

                </View>

                <ScrollableTabView
                    tabBarPosition='bottom' locked={true}
                    renderTabBar={this.state.oTabsBar}
                    onChangeTab={this._onChangeTab.bind(this)}
                    tabBarActiveTextColor="#fc7d30"
                    style={{marginBottom:-1}}
                    tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 2}}
                    >
                    <ScrollView navigator={this.props.navigator} tabLabel="美化" contentContainerStyle={{flex:1}}>
                        <ScrollableTabView
                            ref="nestedTabs"
                            locked={true}
                            tabBarPosition='top'
                            tabBarActiveTextColor="#fc7d30"
                            tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 0}}
                            renderTabBar={() => <DefaultTabBar
                                    style={{height: 38,borderBottomWidth: 0}}
                                    tabStyle={{paddingBottom: 0,marginTop: 8,marginBottom: 8, borderRightWidth: 1, borderColor: '#f1f1f1'}}
                                />
                                }
                            >
                            <ScrollView navigator={this.props.navigator} tabLabel="滤镜库" removeClippedSubviews={false}
                                        horizontal={true} style={{flex:1}}
                                        contentContainerStyle={{alignItems:'stretch'}}>
                                <TouchableOpacity onPress={() => {this._applyImageFilter.call(this, 'none');}}
                                                  style={[styles.filterBox, (this.state.currentFilter == 'none' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={originImg}
                                               style={[styles.filterImage,(this.state.currentFilter == 'none' ? choseFilterStyle : null)]}
                                               resizeMode="contain"/>
                                        <Text
                                            style={[styles.baseText,{marginTop: 2},(this.state.currentFilter == 'none' ? {color: '#fc7d30'} : null)]}>原图</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this._applyImageFilter.call(this, 'sepia');}}
                                                  style={[styles.filterBox, (this.state.currentFilter == 'sepia' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={sepiaImg}
                                               style={[styles.filterImage,(this.state.currentFilter == 'sepia' ? choseFilterStyle : null)]}
                                               resizeMode="contain"/>
                                        <Text
                                            style={[styles.baseText,{marginTop: 2},(this.state.currentFilter == 'sepia' ? {color: '#fc7d30'} : null)]}>怀旧1</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this._applyImageFilter.call(this, 'sepia2');}}
                                                  style={[styles.filterBox, (this.state.currentFilter == 'sepia2' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={sepia2Img}
                                               style={[styles.filterImage,(this.state.currentFilter == 'sepia2' ? choseFilterStyle : null)]}
                                               resizeMode="contain"/>
                                        <Text
                                            style={[styles.baseText,{marginTop: 2},(this.state.currentFilter == 'sepia2' ? {color: '#fc7d30'} : null)]}>怀旧2</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {this._applyImageFilter.call(this, 'sharpen');}}
                                                  style={[styles.filterBox, (this.state.currentFilter == 'sharpen' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={sharpenImg}
                                               style={[styles.filterImage,(this.state.currentFilter == 'sharpen' ? choseFilterStyle : null)]}
                                               resizeMode="contain"/>
                                        <Text
                                            style={[styles.baseText,{marginTop: 2},(this.state.currentFilter == 'sharpen' ? {color: '#fc7d30'} : null)]}>锐化</Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                            <ScrollView navigator={this.props.navigator} tabLabel="美化照片" horizontal={true}
                                        style={{flex:1}} contentContainerStyle={{flex:1, backgroundColor:'#fff'}}>
                                {
                                    this.state.beautifyTab == 'default' ? (<View
                                        style={{flex:1, flexDirection: 'row', alignItems: 'stretch', justifyContent:'space-between', backgroundColor:'#999'}}>
                                        <TouchableHighlight onPress={this._onPressBrightness.bind(this)}
                                                            style={{flex:1}}>
                                            <View
                                                style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#eee'}}>
                                                {brightnessIcon}
                                                <Text>亮度</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={this._onPressRotate.bind(this)}
                                                            style={{flex:1}}>
                                            <View
                                                style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#eee'}}>
                                                {rotateIcon}
                                                <Text>旋转</Text>
                                            </View>
                                        </TouchableHighlight>

                                        <TouchableHighlight onPress={this._onPressContrast.bind(this)} style={{flex:1}}>
                                            <View
                                                style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#eee'}}>
                                                {contrastIcon}
                                                <Text>对比度</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>) : null
                                }

                                {
                                    this.state.beautifyTab == 'brightness' ? (
                                        <View style={{flex:1, justifyContent:'flex-end'}}>
                                            <Slider value={this.state.beautify.brightness.oldValue}
                                                    onSlidingComplete={(value) => this._adjustImageBrightness(value)}
                                                    style={{flex:1}}></Slider>
                                            <ConfirmBar style={styles.confirmBar} title='亮度'
                                                        onCancel={() => {
                                                            this._adjustImageBrightness(this.state.beautify.brightness.oldValue)
                                                            this.setState({beautifyTab:'default', oTabsBar:null})}
                                                        }
                                                        onConfirm={() => {
                                                            this.state.beautify.brightness.oldValue = this.state.beautify.brightness.newValue;
                                                            this.setState({beautifyTab:'default', oTabsBar:null})}
                                                        }></ConfirmBar>
                                        </View>) : null
                                }

                                {
                                    this.state.beautifyTab == 'contrast' ? (
                                        <View style={{flex:1, justifyContent:'flex-end'}}>
                                            <Slider value={this.state.beautify.contrast.oldValue}
                                                    onSlidingComplete={(value) => this._adjustImageContrast(value)}
                                                    minimumValue={0} maximumValue={2} step={0.1}
                                                    style={{flex:1}}></Slider>
                                            <ConfirmBar style={styles.confirmBar} title='对比度'
                                                        onCancel={() => {
                                                        this._adjustImageContrast(this.state.beautify.contrast.oldValue);
                                                        this.setState({beautifyTab:'default', oTabsBar:null})}}
                                                        onConfirm={() => {
                                                            this.state.beautify.contrast.oldValue = this.state.beautify.contrast.newValue;
                                                            this.setState({beautifyTab:'default', oTabsBar:null})}
                                                        }></ConfirmBar>
                                        </View>) : null
                                }
                            </ScrollView>
                        </ScrollableTabView>
                    </ScrollView>

                    <ScrollView tabLabel="标签" horizontal={true}
                                contentContainerStyle={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <View style={[styles.tabView]}>
                            <Text>点击照片</Text>
                            <Text>选择添加相关信息</Text>
                        </View>
                    </ScrollView>

                    <ScrollableTabView
                        tabLabel="贴图"
                        ref="nestedTabs"
                        locked={true}
                        tabBarPosition='top'
                        tabBarActiveTextColor="#fc7d30"
                        tabBarUnderlineStyle={{backgroundColor:'#fc7d30',height: 0}}
                        renderTabBar={() =>
                                  <ChannelTabBar
                                    underlineHeight={1}
                                    textStyle={{ fontSize: 14, marginTop: 8 }}
                                    style={{height: 38}}
                                    underlineColor="#fc7d30"
                                  />
                                }
                        >
                        <ListView tabLabel="便宜有好货" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourcePyyhh} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                        <ListView tabLabel="健身" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourceJs} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                        <ListView tabLabel="全球购" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourceQqg} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                        <ListView tabLabel="吃货志" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourceChz} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                        <ListView tabLabel="基本款" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourceJbk} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                        <ListView tabLabel="宝贝书" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourceBbs} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                        <ListView tabLabel="男人装" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourceNrz} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                        <ListView tabLabel="美人志" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourceMrz} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                        <ListView tabLabel="耍大牌" style={{flex:1}} horizontal={true}
                                  contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                  dataSource={this.state.stickersDataSourceSdp} enableEmptySections={true}
                                  renderRow={this._renderSticker.bind(this)}/>
                    </ScrollableTabView>


                </ScrollableTabView>

                {this.state.tagOverlayVisible ?
                    (<View style={[styles.overlay]}>
                        <View style={styles.formRow}>
                            <FramedTextInput placeholder="名称" placeholderTextColor='#fff' clearTextOnFocus={true}
                                             contentContainerStyle={styles.framedTextInput}
                                             style={[styles.textInput, {color: '#fff'}]}
                                             onChangeText={text => this.state.currentTag.name = text}
                                             onSubmitEditing={(event) => {this.state.currentTag.name = event.nativeEvent.text;}}/>
                        </View>
                        <View style={styles.formRow}>
                            <FramedTextInput placeholder='价格' placeholderTextColor='#fff' clearTextOnFocus={true}
                                             keyboardType='numeric'
                                             contentContainerStyle={styles.framedTextInput}
                                             style={[styles.textInput, {color: '#fff'}]}
                                             onChangeText={text => this.state.currentTag.price = text}
                                             onSubmitEditing={(event) => {this.state.currentTag.price = event.nativeEvent.text;}}/>
                        </View>
                        <View style={styles.formRow}>
                            <FramedTextInput ref="categoryInput" placeholder='品类' placeholderTextColor='#fff'
                                             clearTextOnFocus={true} enablesReturnKeyAutomatically={true}
                                             blurOnSubmit={true}
                                             value={this.state.currentTag.category && this.state.currentTag.category.title}
                                             contentContainerStyle={styles.framedTextInput}
                                             style={[styles.textInput, {color: '#fff'}]}
                                             onFocus={() => {this.showCategoryModal(true); this.refs.categoryInput.blur()}}/>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Button style={styles.buttonText} containerStyle={styles.button}
                                    onPress={() => this._onAddTag.call(this)}>
                                完成
                            </Button>
                            <Button style={[styles.buttonText, styles.cancelBtnText]}
                                    containerStyle={[styles.button, styles.cancelBtn]}
                                    onPress={() => this._onModalCancel.call(this)}>
                                取消
                            </Button>
                        </View>
                    </View>) : null}

                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.optionsModalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                    <View
                        style={[styles.container, {height: height - 21}, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                        { this.state.categoryOptionsVisible ? <CategoryOptionList style={{flex:1}}
                                                                                  onCancel={() => {this.showCategoryModal.call(this, false);}}
                                                                                  onSelect={(rowData)=> this._onCategorySelect.call(this, rowData) }/> : null}
                        { this.state.brandOptionsVisible ?
                            <BrandOptionList onCancel={() => this.showBrandModal.call(this, false)}
                                             onSelect={(rowData)=> this._onBrandSelect.call(this, rowData) }/> : null}
                        { this.state.currencyOptionsVisible ?
                            <CurrencyOptionList onCancel={() => this.showCurrencyModal.call(this, false)}
                                                onSelect={(rowData)=> this._onCurrencySelect.call(this, rowData) }/> : null}
                        { this.state.nationOptionsVisible ?
                            <NationOptionList onCancel={() => this.showNationModal.call(this, false)}
                                              onSelect={(rowData)=> this._onNationSelect.call(this, rowData) }/> : null}
                    </View>
                </Modal>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { draftNote } = state;
    return {
        draftNote
    };
}

export default connect(mapStateToProps)(PhotoEditPage);
