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

import { connect } from 'react-redux';
import WebViewBridge from 'react-native-webview-bridge';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import Button from '../../components/button/Button';
import Toolbar from '../../components/toolbar';
import ConfirmBar from '../../components/bar/ConfirmBar';
import StoreActions from '../../constants/actions';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ImageButton from '../../components/toolbar/ImageButton';
import BrandOptionList from './BrandOptionList';
import CurrencyOptionList from './CurrencyOptionList';
import NationOptionList from './NationOptionList';
import PostNotePage from './PostNotePage';
import {fabrics} from '../../constants/fabrics';
import {fabricContrast} from '../../constants/imageFilters';
const arrowImg = require('../../assets/header/arrow.png');
import styles from './style';

const originImg = require('../../assets/photo/origin.png');
const sepia2Img = require('../../assets/photo/sepia2.jpg');
const sepiaImg = require('../../assets/photo/sepia.jpg');
const sharpenImg = require('../../assets/photo/sharpen.jpg');

import stickers from '../../assets/stickers.js';

var clone = require('lodash/clone');

var contrastIcon = <Icon name="adjust" size={30} color="#333" />;
var brightnessIcon = <Icon name="sun-o" size={30} color="#333" />;

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
                let imageProps = {uri,width,height} = this.state.avatarSource;

                // get base64data of image
                ImageEditor.cropImage(imageProps.uri, {offset:{x:0, y:0},size:{width: imageProps.width, height: imageProps.height}}, (url) => {
                    ImageStore.getBase64ForTag(url, (base64Data) => {
                        const { webviewbridge } = this.refs;
                        let {height, width} = Dimensions.get('window');
                        let sImageBase64Data = 'data:image/jpg;base64,' + base64Data;
                        webviewbridge.sendToBridge(JSON.stringify({type:"imageLoaded", window:{width:width, height:height}, image:imageProps, data: sImageBase64Data}));
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
        this.setState({tagOverlayVisible:false});
        const { navigator } = this.props;

        if(navigator) {
            navigator.pop();
        }
    }

    _onContinue() {
        const { navigator, dispatch } = this.props;

        dispatch({type:StoreActions.ADD_TAGS, tags: this.state.tags.slice()});

        if(navigator) {
            navigator.push({
                name: 'PostNotePage',
                component: PostNotePage
            })
        }
    }

    /**
     * @param args: {i:currentPage, from: prevPage, ref: currentPage component}
     * @private
     */
    _onChangeTab(args) {
        const { webviewbridge } = this.refs;
        webviewbridge.sendToBridge(JSON.stringify({type:'changeTab', imageClickable: (args.i == 1)}));
    }

    _onBrandInputFocus() {
        this.showBrandModal(true);
    }

    _onCurrencyInputFocus() {
        this.showCurrencyModal(true);
    }

    _onNationInputFocus() {
        this.showNationModal(true);
    }

    _onBrandSelect(rowData) {
        this.state.currentTag.brand = rowData.title;
        this.showBrandModal(false);
    }

    _onCurrencySelect(rowData) {
        this.state.currentTag.currency = rowData.title;
        this.showCurrencyModal(false);
    }

    _onNationSelect(rowData) {
        this.state.currentTag.nation = rowData.title;
        this.showCurrencyModal(false);
    }

    setOptionsModalVisible(flag) {
        this.setState({optionsModalVisible:flag});
    }

    showBrandModal(flag) {
        this.state.brandOptionsVisible = flag;
        this.state.nationOptionsVisible = false;
        this.state.currencyOptionsVisible = false;
        this.setOptionsModalVisible(flag);
    }

    showCurrencyModal(flag){
        this.state.currencyOptionsVisible = flag;
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

        let data = {name, nation, currency, brand, price, address, x, y} = this.state.currentTag;

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

    _createImageSource() {
        let obj = {
            html: '<html><head><meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/></head>' +
            '<body style="margin: 0;padding:0;border:0px solid #f00;background:#000;flex-direction:column;align-items:center;justify-content:center;">' +
            '<div style="display:flex;flex-direction:row;align-items:center;justify-content:center;height:300px;"><canvas id="c" style="border:0px solid #fff;flex:1"></canvas></div>' +
            //'<image id="image" style="max-width:100%;max-height:100%" src="' + this.state.sImageBase64Data + '" />' +
            '<image id="image" style="max-width:100%;max-height:100%" />' +
            '</body></html>'
        };

        return obj;
    }

    _onBridgeMessage(message) {
        const { webviewbridge } = this.refs;

        if (message.startsWith("{")) {
            message = JSON.parse(message);
            switch(message.type) {
                case "clickImage":
                    this.setState({tagOverlayVisible:true, currentTag: {x:message.x, y:message.y}});
                    break;
                case "imageUpdated":
                    //this.setState({sImageBase64Data: message.data});
                    break;

            }
        }

        console.log(message);
        switch (message) {
            case "hello from webview":
                webviewbridge.sendToBridge("hello from react-native");
                break;
            case "got the message inside webview":
                console.log("we have got a message from webview! yeah");
                break;
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

        return (
            <View style={[styles.container, {minHeight: height}]}>
                <Toolbar
                    title="编辑照片"
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightText='继续'
                    rightImgPress={this._onContinue.bind(this)}
                    />

                <View style={styles.selectedPhotoContainer}>
                    <WebViewBridge ref="webviewbridge" javaScriptEnabled={true} onBridgeMessage={this._onBridgeMessage.bind(this)} scrollEnabled={false}
                        injectedJavaScript={injectScript} source={this._createImageSource()} style={[{height:300, padding: 0}]} onLoadEnd={this._onWebViewLoadEnd.bind(this)}>
                    </WebViewBridge>
                </View>

                <ScrollableTabView
                    tabBarPosition='bottom'
                    initialPage={0}
                    renderTabBar={this.state.oTabsBar}
                    onChangeTab={this._onChangeTab.bind(this)}
                    >
                    <ScrollView navigator={this.props.navigator}  tabLabel="美化" contentContainerStyle={{flex:1}}>
                        <ScrollableTabView
                            tabBarPosition='top'
                            initialPage={0}
                            renderTabBar={() => <DefaultTabBar {...this.props}/>}
                            >
                            <ScrollView navigator={this.props.navigator} tabLabel="滤镜库" horizontal={true}>
                                <TouchableHighlight onPress={() => {this._applyImageFilter.call(this, 'none');}} style={[styles.filterBox, (this.state.currentFilter == 'none' ? choseFilterStyle : null)]}>
                                    <View style={styles.filterImageFrame}>
                                        <Image source={originImg} style={styles.filterImage} resizeMode="contain" />
                                        <Text>原图</Text>
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
                                        <Slider value={this.state.beautify.brightness.oldValue} onValueChange={(value) => this._adjustImageBrightness(value)} style={{flex:1}}></Slider>
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
                                        <Slider value={this.state.beautify.contrast.oldValue} onValueChange={(value) => this._adjustImageContrast(value)} minimumValue={0} maximumValue={2} step={0.1} style={{flex:1}}></Slider>
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

                    <ScrollView horizontal={true} tabLabel="贴图" contentContainerStyle={{flex:1, justifyContent: 'center'}}>
                        <ListView  horizontal={true} contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}
                                   dataSource={this.state.stickersDataSource} enableEmptySections={true}
                                   renderRow={this._renderSticker.bind(this)} />
                    </ScrollView>
                </ScrollableTabView>

                {this.state.tagOverlayVisible ?
                    (<View style={[styles.overlay]}>
                        <View style={styles.formRow}>
                            <TextInput value={this.state.currentTag.brand} placeholder='品牌' placeholderTextColor='#fff' style={styles.textInput} onFocus={()=>this._onBrandInputFocus()}/>
                            <TextInput placeholder="名称" placeholderTextColor='#fff' autoCapitalize='none' style={styles.textInput} onSubmitEditing={(event) => {this.state.currentTag.name = event.nativeEvent.text;}} />
                        </View>
                        <View style={styles.formRow}>
                            <TextInput value={this.state.currentTag.currency} placeholder='币种' placeholderTextColor='#fff' style={styles.textInput} onFocus={this._onCurrencyInputFocus.bind(this)}/>
                            <TextInput placeholder='价格' placeholderTextColor='#fff' style={styles.textInput} onSubmitEditing={(event) => {this.state.currentTag.price = event.nativeEvent.text;}}/>
                        </View>
                        <View style={styles.formRow}>
                            <TextInput value={this.state.currentTag.nation} placeholder='国家' placeholderTextColor='#fff' style={styles.textInput} onFocus={this._onNationInputFocus.bind(this)} />
                            <TextInput placeholder='具体地址' placeholderTextColor='#fff' style={styles.textInput} onSubmitEditing={(event) => {this.state.currentTag.address = event.nativeEvent.text;}}/>
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
                    <View style={[styles.container, {height: height, marginTop:21}]}>
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

var injectScript = fabrics + fabricContrast + `
(function () {
    if (!WebViewBridge) return;

    if (WebViewBridge) {
        var imageClickable = false;
        var canvas = document.getElementById('c');
        var canvasFab = new fabric.Canvas('c', {isDrawingMode:false, renderOnAddRemove: true});
        var canvasParent = canvas.parentElement;
        var imgFab = null;
        var tags = {};
        var padding = 10;
        var activeTag = null;
        var tagUID = 0;
        var choseStickers = {};
        var imageFilters = {
            brightness: new fabric.Image.filters.Brightness({brightness: 0}),
            contrast: new fabric.Image.filters.Contrast({contrast: 1}),
            //pixelate: new fabric.Image.filters.Pixelate({blocksize: 4}),
            //invert: new fabric.Image.filters.Invert(),
            sepia: new fabric.Image.filters.Sepia(),
            sepia2: new fabric.Image.filters.Sepia2(),
            tint: new fabric.Image.filters.Tint({color: '#000000', opacity: 0.5}),
            //blur: new fabric.Image.filters.Convolute({matrix: [ 1/9, 1/9, 1/9,
            //    1/9, 1/9, 1/9,
            //    1/9, 1/9, 1/9 ]
            //}),
            sharpen: new fabric.Image.filters.Convolute({matrix: [  0, -1,  0,
                -1,  5, -1,
                 0, -1,  0 ]
            })
        };

        var getPosSet1 = function(textWidth, textHeight){
            return {
                textPositions: [
                    {left: padding,                top: - textHeight * 0.5},
                    {left: -(textWidth + padding), top: - textHeight * 0.5},
                    {left: padding,                top: - textHeight * 1.5},
                    {left: -(textWidth + padding), top: - textHeight * 1.5}],
                polylines : [
                    [{ x: 0, y: 0 }, { x: padding, y: textHeight * 0.5 }, { x: textWidth + padding, y: textHeight * 0.5}],
                    [{ x: 0, y: 0 }, { x: -padding, y: textHeight * 0.5 }, { x: -(textWidth + padding), y: textHeight * 0.5 }],
                    [{ x: 0, y: 0 }, { x: padding, y: -textHeight * 0.5 },{ x: textWidth + padding, y: -textHeight * 0.5}],
                    [{ x: 0, y: 0 }, { x: -padding, y: -textHeight * 0.5 }, { x: -(textWidth + padding), y: -textHeight * 0.5}]],
                polylinePositions: [
                    {left: 0, top: 0},
                    {left: -(textWidth + padding), top: 0},
                    {left: 0, top:  - textHeight * 0.5},
                    {left: -(textWidth + padding), top: - textHeight * 0.5}]
            };
        };

        var addTagLabel = function(text, e, group, index){
            if (!text || !e) {return}

            var textFab = new fabric.Text(text, {selectable:false, fill:"#fff", fontSize:12, evented:true});
            var posSet = getPosSet1(textFab.getWidth(), textFab.getHeight());
            textFab.setLeft(e.offsetX + posSet.textPositions[index].left);
            textFab.setTop(e.offsetY + posSet.textPositions[index].top);

            var poly = new fabric.Polyline(posSet.polylines[index], {selectable:false,stroke: 'white',fill:null});
            poly.setLeft(e.offsetX + posSet.polylinePositions[index].left);
            poly.setTop(e.offsetY + posSet.polylinePositions[index].top);
            group.add(textFab, poly);
        };

        var applyFilters = function(){
            WebViewBridge.send('imageFilters');
            var appliedFilters = Object.keys(imageFilters).filter(function(filterName){
                return imageFilters[filterName].checked;
            }).map(function(filterName){
                return imageFilters[filterName];
            });

            imgFab.filters =  appliedFilters;
            imgFab.applyFilters(canvasFab.renderAll.bind(canvasFab));
        }

        var applyBrightness = function(value) {
            var filterBrightness = imageFilters['brightness'];
            var filterTint = imageFilters['tint'];
            if (value > 0.5) {
                filterTint.checked = !(filterBrightness.checked = true);
                filterBrightness.setOptions({brightness: (value - 0.5) * 255});
            } else {
                filterBrightness.checked = !(filterTint.checked = true);
                filterTint.setOptions({opacity: (0.5 - value), color:'#000000'});
            }
            applyFilters();
        };

        var applyContrast = function(value) {
            var filterContrast = imageFilters['contrast'];
            filterContrast.setOptions({contrast:value});
            filterContrast.checked = true;
            applyFilters();
        };

        WebViewBridge.onMessage = function (message) {
            if (message && message.startsWith("{")) {
                message = JSON.parse(message);
                if (message.type === 'beautify') {
                    if (message.beautify == 'brightness') {
                        applyBrightness(message.value);
                    } else if (message.beautify == 'contrast') {
                        applyContrast(message.value);
                    }
                } else if (message.type === 'filter') {
                    Object.keys(imageFilters).forEach(function(filterName){
                        imageFilters[filterName].checked = false;
                    });

                    if(message.value != 'none'){
                        var filter = imageFilters[message.value];
                        filter.checked = !filter.checked;
                    }

                    applyFilters();
                } else if (message.type === 'addSticker') {

                    fabric.Image.fromURL(message.data, function(oImage) {
                        canvasFab.add(oImage);
                        choseStickers[message.name] = oImage;
                        //oImage.center();
                    }, {width:50, height:50, hasControls:true});
                    WebViewBridge.send(JSON.stringify({type:"addedSticker"}));
                } else if (message.type === 'removeSticker') {
                    canvasFab.remove(choseStickers[message.name]);
                    WebViewBridge.send(JSON.stringify({type:"removedSticker"}));
                } else if (message.type === 'imageLoaded') {
                    WebViewBridge.send('Image loading');

                    var imgElement = document.getElementById('image');
                    imgElement.addEventListener('load', function(){
                        imgFab = new fabric.Image(imgElement, {left: 0,top: 0,angle: 0,opacity: 1,meetOrSlice: "meet", selectable:false, evented:false});
                        canvasFab.backgroundImage = imgFab;
                        canvasFab.setDimensions({width:imgElement.width, height:imgElement.height});
                        //canvasFab.add(imgFab);

                        canvasFab.on("mouse:up", function(data){
                            if (!imageClickable) {return}

                            var target = data.target, e = data.e, position = {offsetX : e.pageX - canvasParent.offsetLeft, offsetY : e.pageY - canvasParent.offsetTop};

                            if (target == null) {
                                WebViewBridge.send(JSON.stringify({type:"clickImage", x:position.offsetX, y:position.offsetY}));
                            } else {
                               activeTag = null;
                            }
                        });

                        canvasFab.on("mouse:down", function(data){
                            var target = data.target, e = data.e;
                            if (target != null && target.type == 'circle' && target.id){
                                var group = tags[target.id].group;
                                activeTag = {tag: target, group: group, downEvent: e, groupOriginPos: {left: group.getLeft(), top: group.getTop()}};
                            } else {
                                activeTag = null;
                            }
                        });

                        canvasFab.on("mouse:move", function(data){
                            if (activeTag != null) {
                                var target = data.target, e = data.e, group = activeTag.group, downEvent = activeTag.downEvent, groupOriginPos = activeTag.groupOriginPos;
                                if (group != null)    {
                                    group.setLeft(groupOriginPos.left + e.offsetX - downEvent.offsetX);
                                    group.setTop(groupOriginPos.top + e.offsetY - downEvent.offsetY);
                                }
                            }
                        });
                    });
                    if (message.data) {
                        imgElement.src = message.data;
                    }

                    WebViewBridge.send(JSON.stringify({type:"imageUpdated",data:message.data}));
                } else if (message.type === "changeTab") {
                    imageClickable = !!message.imageClickable;
                } else if (message.type === "addTag") {
                    WebViewBridge.send(JSON.stringify(message));
                    var position =  {offsetX:message.data.x, offsetY:message.data.y};
                    var circle = new fabric.Circle({radius: 6,fill:"#fff", left:(position.offsetX-6), top:(position.offsetY-6), selectable:true, evented:true, hasControls:false});
                    circle.id = ++tagUID;

                    var group = new fabric.Group(null,{subTargetCheck:true, evented:true, selectable:true}, false);

                    //group.setOriginX(e.offsetX);
                    //group.setOriginY(e.offsetY);

                    addTagLabel((message.data.brand || '') + (message.data.name || ''), position, group, 0);
                    addTagLabel(message.data.nation, position, group, 1);
                    addTagLabel((message.data.price || '') + (message.data.currency || ''), position, group, 2);
                    addTagLabel(message.data.address, position, group, 3);

                    canvasFab.add(circle);
                    canvasFab.add(group);

                    tags[circle.id] = {circle: circle, group:group};
                    //var textFab = new fabric.Text(message.data.name, {left: message.data.position.left, top: message.data.position.top, selectable:false});
                    //canvasFab.add(textFab);
                }
            } else {
                if (message === "hello from react-native") {
                  WebViewBridge.send("got the message inside webview");
                }
            }
        };

        WebViewBridge.send("hello from webview");
    }
}());
`;
//console.log(injectScript);