'use strict';

import React  from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    DeviceEventEmitter,
    Platform,
    ListView,
    Image
} from 'react-native';
import styles from './style';
import Toolbar from '../../components/toolbar';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/toolbar/ImageButton.js';
import * as common from '../../utils/common';
import { connect } from 'react-redux';
var backImg = require('../../assets/upload/rg_left.png');
import Taobao from 'react-native-taobao-baichuan-api';

class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.search.itemList)
        };
    }

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        return (
            <TouchableOpacity  underlayColor="transparent" activeOpacity={0.5}
                         onPress={() => this._jumpToTaobaoPage(rowData.itemId.toString())}>
                <View style={styles.itemRow}>
                    <Image style={styles.pic}
                           source={{uri: (rowData.itemPicUrl ? rowData.itemPicUrl : images.DEFAULT_PORTRAIT), width: 100, height: 100}}/>
                    <View style={styles.itemContent}>

                        <View>
                            <Text style={[styles.baseText,styles.title]} >
                                {rowData.itemTitle}
                            </Text>
                        </View>

                        <View>
                            <Text style={[styles.baseText,styles.price]}>
                                ￥{rowData.itemPrice}
                            </Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _jumpToTaobaoPage(itemId) {
        Taobao.jump(itemId);
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    contentContainerStyle={styles.itemList}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    />
            </View>
        )

    }
}

function mapStateToProps(state) {
    const { search } = state;
    return {
        search
    };
}

export default connect(mapStateToProps)(SearchItem);