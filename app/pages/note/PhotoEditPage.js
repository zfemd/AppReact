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
    View
} from 'react-native';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import WebViewBridge from 'react-native-webview-bridge';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import Button from '../../components/button/Button';
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

import stickers from '../../assets/stickers.js';

var clone = require('lodash/clone');

var contrastIcon = <Icon name="adjust" size={30} color="#333" />;
var brightnessIcon = <Icon name="sun-o" size={30} color="#333" />;
var maxSize = 1024;

class PhotoEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bShowTabsBar: true,
            oTabsBar: null,
            oDefaultTabsBar: <DefaultTabBar {...this.props}/>,
            dBrightness: 0.5,
            sBase64Data: null,
            oImageTag: null,
            sImageBase64Data: null,
            avatarSource: this.props.photo,
            optionsModalVisible:false,
            categoryOptionsVisible: false,
            currencyOptionsVisible: false,
            brandOptionsVisible: false,
            nationOptionsVisible: false,
            transparent:true,
            tagOverlayVisible: false,
            tags: [],
            currentTag: null,
            beautifyTab: 'default',
            beautify: {
                brightness: {oldValue: 0.5, newValue: 0.5 },
                contrast: {oldValue: 1, newValue: 1 }
            },
            currentFilter: null,
            updatedSticks: {}
        };

        let stickersDataSource =new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return (r1 !== r2 || this.state.updatedSticks[r1.name]);
            },
            sectionHeaderHasChanged: (s1, s2) => s1 != s2
        });

        this.state.stickers = clone(stickers);
        // here, datasource's argument must be original "stickers" object.
        this.state.stickersDataSource = stickersDataSource.cloneWithRowsAndSections(this.state.stickers);
    }

    _onWebViewLoadEnd() {
        if (this.props.draftNote) {
            let {currentPhotoIndex, notePhotos} = this.props.draftNote;
            if (notePhotos && notePhotos.length > currentPhotoIndex) {
                this.state.avatarSource = notePhotos[currentPhotoIndex].photo;
                let imageSize = {width,height} = this.state.avatarSource.image;
                let displaySize = {};

                if (imageSize.width > imageSize.height && imageSize.width > maxSize) {
                    displaySize = {width:maxSize, height: Math.round(maxSize / imageSize.width * imageSize.height)};
                } else if (imageSize.height > imageSize.width && imageSize.height > maxSize) {
                    displaySize = {height:maxSize, width: Math.round(maxSize / imageSize.height * imageSize.width)};
                } else {
                    displaySize = {height: imageSize.height , width: imageSize.width}
                }

                console.log(this.state.avatarSource);

                // get base64data of image
                ImageEditor.cropImage(this.state.avatarSource.image.uri, {offset:{x:0, y:0},size:imageSize, displaySize:displaySize, resizeMode:'contain'}, (url) => {
                    ImageStore.getBase64ForTag(url, (base64Data) => {
                        const { webviewbridge } = this.refs;
                        let {height, width} = Dimensions.get('window');
                        let sImageBase64Data = "data:" + this.state.avatarSource.type + ";base64," + base64Data.replace(/\n|\r/g, "");
                        //console.log('data:' + sImageBase64Data);

                        webviewbridge.sendToBridge(JSON.stringify({type:"imageReady", window:{width:width, height:height}, image:displaySize, data: sImageBase64Data}));
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

        dispatch({type:StoreActions.REMOVE_NOTE_PHOTO, index: currentPhotoIndex});

        if (navigator) {
            navigator.pop();
        }
    }

    _onContinue() {
        const { navigator, dispatch } = this.props;
        const { webviewbridge } = this.refs;

        dispatch({type:StoreActions.ADD_TAGS, tags: this.state.tags.slice()});

        webviewbridge.sendToBridge(JSON.stringify({type:'continue'}));
    }

    /**
     * @param args: {i:currentPage, from: prevPage, ref: currentPage component}
     * @private
     */
    _onChangeTab(args) {
        const { webviewbridge } = this.refs;
        webviewbridge.sendToBridge(JSON.stringify({type:'changeTab', imageClickable: (args.i == 1)}));
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
        this.state.currentTag.city = {title:rowData.title, id:rowData.id};
        this.showCurrencyModal(false);
    }

    setOptionsModalVisible(flag) {
        this.setState({optionsModalVisible:flag});
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

    showCurrencyModal(flag){
        this.state.currencyOptionsVisible = flag;
        this.state.categoryOptionsVisible = false;
        this.state.brandOptionsVisible = false;
        this.state.nationOptionsVisible = false;
        this.setOptionsModalVisible(flag);
    }

    showNationModal(flag){
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

        let data = {name, currency, brand, price, address, x, y} = this.state.currentTag;
        this.state.currentTag.category && (data.category = this.state.currentTag.category.id);
        this.state.currentTag.city && (data.city = this.state.currentTag.city.id);

        console.log(data);

        tags.push(data);
        webviewbridge.sendToBridge(JSON.stringify({type:'addTag', data: data}));

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

    _resetTabBars() {
        this.state.oTabsBar = this.state.bShowTabsBar ? this.state.oDefaultTabsBar : false;
    }

    _adjustImageBrightness(value) {
        const { webviewbridge } = this.refs;
        webviewbridge.sendToBridge(JSON.stringify({type:'beautify', beautify:'brightness', value: value}));
        this.state.beautify.brightness.newValue = value;
    }

    _adjustImageContrast(value){
        const { webviewbridge } = this.refs;
        webviewbridge.sendToBridge(JSON.stringify({type:'beautify', beautify:'contrast', value: value}));
        this.state.beautify.contrast.newValue = value;
    }

    _applyImageFilter(filter){
        const { webviewbridge } = this.refs;
        webviewbridge.sendToBridge(JSON.stringify({type:'filter', value: filter}));
        this.setState({currentFilter : filter});
    }

    _onBridgeMessage(message) {
        const { navigator, dispatch } = this.props;
        const { webviewbridge } = this.refs;

        //console.log(message);

        if (message.startsWith("{")) {
            message = JSON.parse(message);
            switch(message.type) {
                case "bridgeReady":
                    this._onWebViewLoadEnd();
                    break;
                case "clickImage":
                    this.setState({tagOverlayVisible:true, currentTag: {x:message.x, y:message.y}});
                    break;
                case "imageUpdated":
                    console.log(message.type);
                    //this.setState({sImageBase64Data: message.data});
                    break;
                case "continue":
                    dispatch({type:StoreActions.ADD_NOTE_PHOTO_DATA, imageData: message.imageData});

                    if(navigator) {
                        navigator.push({
                            name: 'PostNotePage',
                            component: PostNotePage
                        })
                    }
                    break;
            }
        }
    }

    _toggleSticker(stickerInfo, sectionID, rowID) {
        let { webviewbridge } = this.refs;

        if (!stickerInfo.added) {
            stickerInfo.added = true;
            this.state.updatedSticks[rowID] = true;
            webviewbridge.sendToBridge(JSON.stringify({type:"addSticker", data: stickerInfo.uri, name:rowID}));
            this.setState({stickersDataSource: this.state.stickersDataSource.cloneWithRowsAndSections(this.state.stickers) });
        } else {
            stickerInfo.added = false;
            this.state.updatedSticks[rowID] = true;
            webviewbridge.sendToBridge(JSON.stringify({type:"removeSticker", name:rowID}));
            this.setState({stickersDataSource: this.state.stickersDataSource.cloneWithRowsAndSections(this.state.stickers) });
        }
    }

    _renderSticker(rowData, sectionID, rowID, highlightRow) {
        let selectedStyle = rowData.added ? {backgroundColor:'#ccc'} : null;
        this.state.updatedSticks[rowID] = false; // reset
        return <TouchableHighlight style={[{marginHorizontal:10}, selectedStyle]}
                                   onPress={() => {
                                        highlightRow(sectionID, rowID);
                                        this._toggleSticker.call(this, rowData, sectionID, rowID);}}>
                <Image key={rowID} source={{uri:rowData.uri}} style={{width:80, height:80}} resizeMode="contain" />
            </TouchableHighlight>;
    }

    render() {
        let {height, width} = Dimensions.get('window');

        let choseFilterStyle = {backgroundColor: '#ccc'};
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

                <View style={styles.selectedPhotoContainer}>
                    {
                        Platform.OS === 'android'?
                            <WebViewBridge ref="webviewbridge" javaScriptEnabled={true} onBridgeMessage={this._onBridgeMessage.bind(this)}
                                           scrollEnabled={false} allowFileAccessFromFileURLs={true} allowUniversalAccessFromFileURLs={true}
                                           domStorageEnabled={true}
                                           source={photoHtmlAndroid} style={[{height:300, padding: 0}]}>
                            </WebViewBridge> :
                            <WebViewBridge ref="webviewbridge" javaScriptEnabled={true} onBridgeMessage={this._onBridgeMessage.bind(this)}
                                           scrollEnabled={false} allowFileAccessFromFileURLs={true} allowUniversalAccessFromFileURLs={true}
                                           domStorageEnabled={true}
                                           source={{html:photoHtmlIos}} style={[{height:300, padding: 0}]}>
                            </WebViewBridge>
                    }

                </View>

                <ScrollableTabView
                    tabBarPosition='bottom' locked={true}
                    renderTabBar={this.state.oTabsBar}
                    onChangeTab={this._onChangeTab.bind(this)}
                    >
                    <ScrollView navigator={this.props.navigator}  tabLabel="美化" contentContainerStyle={{flex:1}}>
                        <ScrollableTabView ref="nestedTabs" locked={true} tabBarPosition='top'>
                            <ScrollView navigator={this.props.navigator} tabLabel="滤镜库" removeClippedSubviews={false}
                                        horizontal={true} style={{flex:1}} contentContainerStyle={{alignItems:'stretch'}}>
                                <TouchableHighlight onPress={() => {this._applyImageFilter.call(this, 'none');}} style={[styles.filterBox, (this.state.currentFilter == 'none' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={originImg} style={styles.filterImage} resizeMode="contain" />
                                        <Text style={{marginTop: 0}}>原图</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => {this._applyImageFilter.call(this, 'sepia');}} style={[styles.filterBox, (this.state.currentFilter == 'sepia' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={sepiaImg} style={styles.filterImage} resizeMode="contain" />
                                        <Text>怀旧1</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => {this._applyImageFilter.call(this, 'sepia2');}} style={[styles.filterBox, (this.state.currentFilter == 'sepia2' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={sepia2Img} style={styles.filterImage} resizeMode="contain" />
                                        <Text>怀旧2</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => {this._applyImageFilter.call(this, 'sharpen');}} style={[styles.filterBox, (this.state.currentFilter == 'sharpen' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={sharpenImg} style={styles.filterImage} resizeMode="contain" />
                                        <Text>锐化</Text>
                                    </View>
                                </TouchableHighlight>
                            </ScrollView>
                            <ScrollView navigator={this.props.navigator}  tabLabel="美化照片" horizontal={true} style={{flex:1}} contentContainerStyle={{flex:1, backgroundColor:'#fff'}}>
                                {
                                    this.state.beautifyTab == 'default' ? (<View style={{flex:1, flexDirection: 'row', alignItems: 'stretch', justifyContent:'space-between', backgroundColor:'#999'}}>
                                        <TouchableHighlight onPress={this._onPressBrightness.bind(this)} style={{flex:1}}>
                                            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#eee'}}>
                                                {brightnessIcon}
                                                <Text>亮度</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={this._onPressContrast.bind(this)} style={{flex:1}}>
                                            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#eee'}}>
                                                {contrastIcon}
                                                <Text>对比度</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>) : null
                                }

                                {
                                    this.state.beautifyTab == 'brightness' ? (<View style={{flex:1, justifyContent:'flex-end'}}>
                                        <Slider value={this.state.beautify.brightness.oldValue} onSlidingComplete={(value) => this._adjustImageBrightness(value)} style={{flex:1}}></Slider>
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
                                    this.state.beautifyTab == 'contrast' ? (<View style={{flex:1, justifyContent:'flex-end'}}>
                                        <Slider value={this.state.beautify.contrast.oldValue} onSlidingComplete={(value) => this._adjustImageContrast(value)} minimumValue={0} maximumValue={2} step={0.1} style={{flex:1}}></Slider>
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

                    <ScrollView tabLabel="标签" horizontal={true} contentContainerStyle={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <View style={[styles.tabView]}>
                            <Text>点击照片</Text>
                            <Text>选择添加相关信息</Text>
                        </View>
                    </ScrollView>

                    <ListView tabLabel="贴图" style={{flex:1}} horizontal={true} contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                              dataSource={this.state.stickersDataSource} enableEmptySections={true}
                              renderRow={this._renderSticker.bind(this)} />

                </ScrollableTabView>

                {this.state.tagOverlayVisible ?
                    (<View style={[styles.overlay]}>
                        <View style={styles.formRow}>
                            <FramedTextInput ref="categoryInput" placeholder='品类' placeholderTextColor='#fff'
                                             clearTextOnFocus={true} enablesReturnKeyAutomatically={true} blurOnSubmit={true}
                                             value={this.state.currentTag.category && this.state.currentTag.category.title}
                                             contentContainerStyle={styles.framedTextInput}
                                             style={[styles.textInput, {color: '#fff'}]}
                                             onFocus={() => {this.showCategoryModal(true); this.refs.categoryInput.blur()}} />
                            <FramedTextInput ref="brandInput" value={this.state.currentTag.brand} placeholder='品牌' placeholderTextColor='#fff'
                                             clearTextOnFocus={true} enablesReturnKeyAutomatically={true} blurOnSubmit={true}
                                             contentContainerStyle={styles.framedTextInput} style={[styles.textInput, {color: '#fff'}]}
                                             onFocus={() => {this.showBrandModal(true);; this.refs.brandInput.blur();}} />
                        </View>
                        <View style={styles.formRow}>
                            <FramedTextInput placeholder="名称" placeholderTextColor='#fff' clearTextOnFocus={true}
                                             contentContainerStyle={styles.framedTextInput}
                                             style={[styles.textInput, {color: '#fff'}]}
                                             onSubmitEditing={(event) => {this.state.currentTag.name = event.nativeEvent.text;}} />
                            <FramedTextInput placeholder='价格' placeholderTextColor='#fff' clearTextOnFocus={true}
                                             keyboardType='numeric'
                                             contentContainerStyle={styles.framedTextInput} style={[styles.textInput, {color: '#fff'}]}
                                             onSubmitEditing={(event) => {this.state.currentTag.price = event.nativeEvent.text;}}/>
                        </View>
                        <View style={styles.formRow}>
                            <FramedTextInput ref="nationInput" placeholder='国家/城市' placeholderTextColor='#fff'
                                             clearTextOnFocus={true} contentContainerStyle={styles.framedTextInput}
                                             style={[styles.textInput, {color: '#fff'}]}
                                             value={this.state.currentTag.city}
                                             onFocus={() => {this.showNationModal(true); this.refs.nationInput.blur();}} />
                            <FramedTextInput placeholder='具体地点' placeholderTextColor='#fff' clearTextOnFocus={true}
                                             contentContainerStyle={styles.framedTextInput}
                                             style={[styles.textInput, {color: '#fff'}]}
                                             onSubmitEditing={(event) => {this.state.currentTag.address = event.nativeEvent.text;}}/>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Button style={styles.buttonText} containerStyle={styles.button} onPress={() => this._onAddTag.call(this)}>
                                完成
                            </Button>
                            <Button style={[styles.buttonText, styles.cancelBtnText]} containerStyle={[styles.button, styles.cancelBtn]}
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
                    <View style={[styles.container, {height: height - 21}, Platform.OS === 'android' ? null : {marginTop: 21}]}>
                        { this.state.categoryOptionsVisible ? <CategoryOptionList style={{flex:1}} onCancel={() => {this.showCategoryModal.call(this, false);}} onSelect={(rowData)=> this._onCategorySelect.call(this, rowData) }/> : null}
                        { this.state.brandOptionsVisible ? <BrandOptionList onCancel={() => this.showBrandModal.call(this, false)} onSelect={(rowData)=> this._onBrandSelect.call(this, rowData) }/> : null}
                        { this.state.currencyOptionsVisible ? <CurrencyOptionList onCancel={() => this.showCurrencyModal.call(this, false)} onSelect={(rowData)=> this._onCurrencySelect.call(this, rowData) }/> : null}
                        { this.state.nationOptionsVisible ? <NationOptionList onCancel={() => this.showNationModal.call(this, false)} onSelect={(rowData)=> this._onNationSelect.call(this, rowData) }/> : null}
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
