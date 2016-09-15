/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
import {
    CameraRoll,
    Dimensions,
    Image,
    Modal,
    Navigator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import Button from '../../components/button/Button';
import Toolbar from '../../components/toolbar';
import Tag from '../../components/tag';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import ImageButton from '../../components/toolbar/ImageButton';
import BrandOptionList from './BrandOptionList';
import CurrencyOptionList from './CurrencyOptionList';
import NationOptionList from './NationOptionList';
import PostNotePage from './PostNotePage';
const arrowImg = require('../../assets/header/arrow.png');
import styles from './style';

class PhotoEditPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarSource: this.props.selectedPhoto,
            imageClickable: false,
            optionsModalVisible:false,
            currencyOptionsVisible: false,
            brandOptionsVisible: false,
            nationOptionsVisible: false,
            transparent:true,
            tagOverlayVisible: false,
            tags: [],
            tagData: [],
            clickedPos: {x:0, y:0}
        };

    }

    _onCancel() {
        this.setState({tagOverlayVisible:false});
        const { navigator } = this.props;

        if(navigator) {
            navigator.pop();
        }
    }

    _onContinue() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.push({
                name: 'PostNotePage',
                component: PostNotePage,
                params: {selectedPhoto:this.state.avatarSource}
            })
        }
    }

    /**
     * @param args: {i:currentPage, from: prevPage, ref: currentPage component}
     * @private
     */
    _onChangeTab(args) {
        this.state.imageClickable = (args.i == 1);
    }

    _onPressImage(event) {
        if (!this.state.imageClickable) return;

        let point = {locationX, locationY} = event.nativeEvent;
        let scope = this.state.imageScope;

        if (point.locationX < scope.left || point.locationX > scope.left + scope.width
            || point.locationY < scope.top || point.locationY > scope.top + scope.height) {
            console.log("not in image");
        } else {
            this.state.clickedPos = {x: point.locationX - scope.left, y: point.locationY - scope.top};
            this.setState({tagOverlayVisible: true});
        }
    }

    _onImageLoad() {
        let windowSize = {height, width} = Dimensions.get('window');
        let containerSize = {width: windowSize.width, height: 300};
        let imageSize = {height, width} =this.state.avatarSource;

        let ratio = imageSize.width > 0 ? imageSize.height / imageSize.width : 1;
        let scale = ratio > 1 ? containerSize.height / imageSize.height : windowSize.width / imageSize.width;
        let actualSize = {width: imageSize.width * scale, height: imageSize.height * scale};

        // left and top is the let top corner position of image in image container.
        this.state.imageScope = {left: (containerSize.width - actualSize.width) / 2, top: (containerSize.height - actualSize.height) / 2,
            width: actualSize.width, height: actualSize.height};
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
        let {tagData, tags} = this.state;

        let data = {
            nation: this.state.nation,
            currency: this.state.currency,
            brand: this.state.brand
        }

        tagData.push(data);

        let labels = [];
        data.nation && labels.push(data.nation);
        data.currency && labels.push(data.currency);
        data.brand && labels.push(data.brand);

        let position = {left: this.state.imageScope.left + this.state.clickedPos.x,
            top: this.state.imageScope.top + this.state.clickedPos.y};

        // position doesn't work here
        let tag = (
            <Tag key={position.left + '_' + position.top} labels={labels} position={position} style={{position: 'absolute', left: position.left, top: position.top}}/>
        );

        console.log(position);

        tags.push(tag);
        this.state.tags = tags;
        this.state.tagData = tagData;
        //this.setState({tags: tags, tagData: tagData});
        this.setState({tagOverlayVisible: false});
    }

    render() {
        let {height, width} = Dimensions.get('window');

        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
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
                    <TouchableHighlight onPress={this._onPressImage.bind(this)}>
                        <Image source={this.state.avatarSource} style={styles.selectedPhoto} width={width} height={300}
                        resizeMode='contain' onLoad={this._onImageLoad.bind(this)}/>
                    </TouchableHighlight>
                    {this.state.tags}
                </View>


                <ScrollableTabView
                    style={{marginTop: 0, }}
                    tabBarPosition='overlayBottom'
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar {...this.props}/>}
                    onChangeTab={this._onChangeTab.bind(this)}
                    >
                    <ScrollView navigator={this.props.navigator}  tabLabel="美化"  />

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
                            <TextInput placeholder="名称" placeholderTextColor='#fff' autoCapitalize='none' style={styles.textInput} />
                        </View>
                        <View style={styles.formRow}>
                            <TextInput value={this.state.currency} placeholder='币种' placeholderTextColor='#fff' style={styles.textInput} onFocus={this._onCurrencyInputFocus.bind(this)}/>
                            <TextInput placeholder='价格' placeholderTextColor='#fff' style={styles.textInput}/>
                        </View>
                        <View style={styles.formRow}>
                            <TextInput value={this.state.nation} placeholder='国家' placeholderTextColor='#fff' style={styles.textInput} onFocus={this._onNationInputFocus.bind(this)} />
                            <TextInput placeholder='具体地址' placeholderTextColor='#fff' style={styles.textInput}/>
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

export default PhotoEditPage;