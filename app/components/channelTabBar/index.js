const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated,
    ListView,
    TouchableOpacity,
    Dimensions
    } = ReactNative;
const Button = require('./Button');
var {height, width} = Dimensions.get('window');

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const ChannelTabBar = React.createClass({
    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        underlineColor: React.PropTypes.string,
        underlineHeight: React.PropTypes.number,
        backgroundColor: React.PropTypes.string,
        activeTextColor: React.PropTypes.string,
        inactiveTextColor: React.PropTypes.string,
        textStyle: Text.propTypes.style,
        tabStyle: View.propTypes.style,
    },

    getDefaultProps() {
        return {
            activeTextColor: 'navy',
            inactiveTextColor: 'black',
            underlineColor: 'navy',
            backgroundColor: null,
            underlineHeight: 4,
        };
    },

    getInitialState() {
        return {
            dataSource: ds.cloneWithRows(this.props.tabs),
        };
    },

    renderTabOption(name, page) {
        const isTabActive = this.props.activeTab === page;
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        return <Button
            style={{flex: name.length}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => this.props.goToPage(page)}
            >
            <View style={[styles.tab, this.props.tabStyle]}>
                <Text style={[styles.textStyle, {color: textColor, fontWeight, }, textStyle, ]}>
                    {name}
                </Text>
            </View>
        </Button>;
    },

    _renderRow(rowData:string, sectionID:number, rowID:number) {
        return this.renderTabOption(rowData, parseInt(rowID));
    },

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: containerWidth / numberOfTabs,
            height: this.props.underlineHeight,
            backgroundColor: this.props.underlineColor,
            bottom: 0,
        };

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
        });

        return (
            <View style={[styles.tabView, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                <ListView
                    contentContainerStyle={styles.tabs}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    />
                <Animated.View style={[tabUnderlineStyle, { left, }, ]} />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    tabView: {
        width: width,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 10,
        marginRight: 10
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: '#ccc',
    },
    textStyle: {
        minWidth: 10,
        writingDirection: 'ltr',
        textAlign: 'center'
    }
});

module.exports = ChannelTabBar;
