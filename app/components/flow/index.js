'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Dimensions
    } = ReactNative;

var {height, width} = Dimensions.get('window');

var THUMB_URLS = [
    require('../../assets/test/test.png'),
    require('../../assets/test/test1.png'),
    require('../../assets/test/test.png'),
    require('../../assets/test/test.png'),
    require('../../assets/test/test1.png'),
    require('../../assets/test/test1.png'),
    require('../../assets/test/test1.png'),
    require('../../assets/test/test1.png'),
    require('../../assets/test/test.png'),
    require('../../assets/test/test1.png'),
    require('../../assets/test/test.png'),
    require('../../assets/test/test1.png'),
];

var ListViewGridLayoutExample = React.createClass({

    statics: {
        title: '<ListView> - Grid Layout',
        description: 'Flexbox grid layout.'
    },

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this._genRows({})),
            stars:ds.cloneWithRows([
                '1','2','3','4','5'
            ])
        };
    },

    _pressData: ({}: {[key: number]: boolean}),

    componentWillMount: function() {
        this._pressData = {};
    },

    render: function() {
        let {
                tabs , press
            } = this.props;
        return (
            // ListView wraps ScrollView and so takes on its properties.
            // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
            <ListView
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                initialListSize={21}
                pageSize={3} // should be a multiple of the no. of visible cells per row
                scrollRenderAheadDistance={500}
                renderRow={this._renderRow}
                />
        );
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
        return (
            <TouchableHighlight onPress={() => this.props.press()} underlayColor="transparent">
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource} />
                        <Text style={styles.text}>
                            miya2016夏装新品宽松镂空短袖蕾丝衫女韩系显瘦性感度假上衣潮
                        </Text>
                        <View style={[{flexDirection:'row',width: (width/100)*47 -20,flex: 1,borderTopWidth: .6,paddingTop: 10,borderColor: '#9b9b9b',}]}>

                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />
                            <Image style={{width:8 ,height:8}} source={require('../../assets/flow/star_filled.png')} />

                            <Image style={{width:8 ,height:8, marginLeft:(width/100)*47 -100}} source={require('../../assets/flow/heart.png')}/>
                            <Image style={{width:10 ,height:10, marginLeft:10}} source={require('../../assets/flow/comment.png')}/>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    },

    _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
        var dataBlob = [];
        for (var ii = 0; ii < 100; ii++) {
            var pressedText = pressData[ii] ? ' (X)' : '';
            dataBlob.push('Cell ' + ii + pressedText);
        }
        return dataBlob;
    },

    _pressRow: function(rowID: number) {
        //this._pressData[rowID] = !this._pressData[rowID];
        //this.setState({dataSource: this.state.dataSource.cloneWithRows(
        //    this._genRows(this._pressData)
        //)});
        //this.props.tabs.navigator.push(DetailPage());
    },
});

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

var styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
    },
    row: {
        flex: 1,
        marginLeft: width/100*2,
        marginTop: 8,
        width: (width/100)*47 ,
        backgroundColor: '#fff',
        alignItems: 'center',
        top: 0
    },
    thumb: {
        width: width/100*47,
        height: 200
    },
    text: {
        flex: 1,
        margin: 10,
        color: '#4a4a4a',
        fontSize: 11,
    },
});

module.exports = ListViewGridLayoutExample;

