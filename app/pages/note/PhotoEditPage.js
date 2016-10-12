/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ImageEditor,
    ImageStore,
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
const arrowImg = require('../../assets/header/arrow.png');
import styles from './style';

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
            tagData: [],
            clickedPos: {x:0, y:0},
            beautify: 'default'
        };
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

        dispatch({type:StoreActions.ADD_TAGS, tags: this.state.tagData.slice()});

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
        this.setState({brand:rowData.title});
        this.showBrandModal(false);
    }

    _onCurrencySelect(rowData) {
        this.setState({currency:rowData.title});
        this.showCurrencyModal(false);
    }

    _onNationSelect(rowData) {
        this.setState({nation:rowData.title});
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
        let {tagData} = this.state;

        let data = {
            name: this.state.name,
            nation: this.state.nation,
            currency: this.state.currency,
            brand: this.state.brand,
            price: this.state.price,
            address: this.state.address,
            position: {
                offsetX: this.state.clickedPos.x,
                offsetY: this.state.clickedPos.y
            }
        }

        console.log(data);
        tagData.push(data);
        webviewbridge.sendToBridge(JSON.stringify({type:'addTag', data: data}));

        this.state.tagData = tagData;
        this.setState({tagOverlayVisible: false});
    }

    _onPressBrightness() {
        this.state.bShowTabsBar = false;
        this._resetTabBars();
        this.setState({beautify: 'brightness'});
    }

    _onPressContrast() {
        this.state.bShowTabsBar = false;
        this._resetTabBars();
        this.setState({beautify: 'contrast'});
    }

    _resetTabBars() {
        this.state.oTabsBar = this.state.bShowTabsBar ? this.state.oDefaultTabsBar : false;
    }

    _adjustImageBrightness(dBrightness) {
        const { webviewbridge } = this.refs;
        webviewbridge.sendToBridge(JSON.stringify({type:'brightness', value: dBrightness}));

        //let imageFilter = ImageFilter({imageData:base64.toByteArray(this.state.sBase64Data)});
        //imageFilter.brightness({adjustment:dBrightness});

    }

    _createImageSource() {
        let obj = {
            html: '<html><head><meta name="viewport" content="width=device-width,target-densitydpi=high-dpi,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/></head>' +
            '<body style="margin: 0;padding:0;border:1px solid #f00;background:#000;flex-direction:column;align-items:center;justify-content:center;">' +
            '<div style="display:flex;flex-direction:row;align-items:center;justify-content:center;height:300px;"><canvas id="c" style="border:1px solid #fff;flex:1"></canvas></div>' +
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
                    let tag = {x:message.x, y:message.y};
                    this.setState({tagOverlayVisible:true, clickedPos:tag});
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

    render() {
        let {height, width} = Dimensions.get('window');

        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#F5FCFF',
        };
        var innerContainerTransparentStyle = this.state.transparent
            ? {backgroundColor: '#fff', padding: 20}
            : null;
        var activeButtonStyle = {
            backgroundColor: '#ddd'
        };

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
                    style={{marginTop: 0, }}
                    tabBarPosition='overlayBottom'
                    initialPage={0}
                    renderTabBar={this.state.oTabsBar}
                    onChangeTab={this._onChangeTab.bind(this)}
                    >
                    <ScrollView navigator={this.props.navigator}  tabLabel="美化">
                        <ScrollableTabView
                            style={{marginTop: 0, }}
                            tabBarPosition='top'
                            initialPage={0}
                            renderTabBar={() => <DefaultTabBar {...this.props}/>}
                            onChangeTab={this._onChangeTab.bind(this)}
                            >
                            <ScrollView navigator={this.props.navigator}  tabLabel="滤镜库">

                            </ScrollView>
                            <ScrollView navigator={this.props.navigator}  tabLabel="美化照片">
                                {
                                    this.state.beautify == 'default' ? (<View style={{flexDirection: 'row'}}>
                                        <TouchableHighlight onPress={this._onPressBrightness.bind(this)}>
                                            <Text>亮度</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={this._onPressContrast.bind(this)}>
                                            <Text>对比度</Text>
                                        </TouchableHighlight>
                                    </View>) : null
                                }

                                {
                                    this.state.beautify == 'brightness' ? (<View style={{flex:1}}>
                                        <Slider value={0.5} onValueChange={(value) => this._adjustImageBrightness(value)}></Slider>
                                        <ConfirmBar style={styles.confirmBar} title='亮度'></ConfirmBar>
                                    </View>) : null
                                }
                            </ScrollView>
                        </ScrollableTabView>
                    </ScrollView>

                    <ScrollView tabLabel="标签" >
                        <View style={[styles.tabView, {height:100}]}>
                            <Text>点击照片</Text>
                            <Text>选择添加相关信息</Text>
                        </View>
                    </ScrollView>

                    <ScrollView navigator={this.props.navigator} tabLabel="贴图"/>
                </ScrollableTabView>

                {this.state.tagOverlayVisible ?
                    (<View style={[styles.overlay]}>
                        <View style={styles.formRow}>
                            <TextInput value={this.state.brand} placeholder='品牌' placeholderTextColor='#fff' style={styles.textInput} onFocus={()=>this._onBrandInputFocus()}/>
                            <TextInput placeholder="名称" placeholderTextColor='#fff' autoCapitalize='none' style={styles.textInput} onEndEditing={(event) => {this.state.name = event.nativeEvent.text;}} />
                        </View>
                        <View style={styles.formRow}>
                            <TextInput value={this.state.currency} placeholder='币种' placeholderTextColor='#fff' style={styles.textInput} onFocus={this._onCurrencyInputFocus.bind(this)}/>
                            <TextInput placeholder='价格' placeholderTextColor='#fff' style={styles.textInput} onEndEditing={(event) => {this.state.price = event.nativeEvent.text;}}/>
                        </View>
                        <View style={styles.formRow}>
                            <TextInput value={this.state.nation} placeholder='国家' placeholderTextColor='#fff' style={styles.textInput} onFocus={this._onNationInputFocus.bind(this)} />
                            <TextInput placeholder='具体地址' placeholderTextColor='#fff' style={styles.textInput} onEndEditing={(event) => {this.state.address = event.nativeEvent.text;}}/>
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

var injectScript = fabrics + `
(function () {
    if (!WebViewBridge) return;

    if (WebViewBridge) {
        var imageClickable = false;
        var canvas = document.getElementById('c');
        var canvasFab = new fabric.Canvas('c', {isDrawingMode:false, renderOnAddRemove: true});
        var canvasParent = canvas.parentElement;
        var tags = {};
        var padding = 10;
        var activeTag = null;
        var tagUID = 0;

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
            var textFab = new fabric.Text(text, {selectable:false, fill:"#fff", fontSize:12, evented:true});
            var posSet = getPosSet1(textFab.getWidth(), textFab.getHeight());
            textFab.setLeft(e.offsetX + posSet.textPositions[index].left);
            textFab.setTop(e.offsetY + posSet.textPositions[index].top);

            var poly = new fabric.Polyline(posSet.polylines[index], {selectable:false,stroke: 'white',fill:null});
            poly.setLeft(e.offsetX + posSet.polylinePositions[index].left);
            poly.setTop(e.offsetY + posSet.polylinePositions[index].top);
            group.add(textFab, poly);
        };

        WebViewBridge.onMessage = function (message) {
            if (message && message.startsWith("{")) {
                message = JSON.parse(message);
                if (message.type === 'brightness') {
                    WebViewBridge.send('Filter loadding');
                    var filter = new fabric.Image.filters.Brightness({
                      brightness: 200
                    });
                    WebViewBridge.send('Filter loadded');
                    //filter.apply();
                } else if (message.type === 'imageLoaded') {
                    WebViewBridge.send('Image loading');

                    var imgElement = document.getElementById('image');
                    imgElement.addEventListener('load', function(){
                        var imgFab = new fabric.Image(imgElement, {left: 0,top: 0,angle: 0,opacity: 1,meetOrSlice: "meet", selectable:false, evented:false});
                        canvasFab.setDimensions({width:imgElement.width, height:imgElement.height});
                        canvasFab.add(imgFab);

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
                    var position = message.data.position || {offsetX:100, offsetY:100};
                    var circle = new fabric.Circle({radius: 6,fill:"#fff", left:(position.offsetX-6), top:(position.offsetY-6), selectable:true, evented:true, hasControls:false});
                    circle.id = ++tagUID;

                    var group = new fabric.Group(null,{subTargetCheck:true, evented:true, selectable:true}, false);

                    //group.setOriginX(e.offsetX);
                    //group.setOriginY(e.offsetY);

                    addTagLabel(message.data.brand + message.data.name, position, group, 0);
                    addTagLabel(message.data.nation, position, group, 1);
                    addTagLabel(message.data.price + message.data.currency, position, group, 2);
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