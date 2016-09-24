const React = require('react');
const ReactNative = require('react-native');
const {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image
    } = ReactNative;
const Button = require('./Button');
var {height, width} = Dimensions.get('window');

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
            barLeft : 0
        };
    },

    goToPage(page) {
        this.props.goToPage(page);
        this.setState({barLeft: (width/ 5-1)*page});
    },

    renderTabOption(name, page) {
        const isTabActive = this.props.activeTab === page;
        const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';

        return <Button
            style={{flex: 1}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => this.goToPage(page)}
            >
            <View style={[styles.tab, this.props.tabStyle]}>
                <Text style={[styles.textStyle, {color: textColor, fontWeight, }, textStyle, ]} ellipsizeMode="tail" numberOfLines={1}>
                    {name}
                </Text>
            </View>
        </Button>;
    },

    _scrollTo(_scrollView ) {
        let left = this.state.barLeft;
        this.setState({barLeft: left + width/ 5});
        _scrollView.scrollTo({x: this.state.barLeft});
    },

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const tabLength = Math.ceil(numberOfTabs/5) * width;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: tabLength / numberOfTabs,
            height: this.props.underlineHeight,
            backgroundColor: this.props.underlineColor,
            bottom: 0,
        };

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1, ], outputRange: [0,  tabLength / numberOfTabs, ],
        });

        let _scrollView =  ScrollView;
        return (
            <View style={[styles.tabView, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                <ScrollView
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    contentContainerStyle={[styles.tabs, {width: tabLength + 38}]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    >
                    {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                    <Animated.View style={[tabUnderlineStyle, { left, }, styles.tabUnderline ]} />
                </ScrollView>

                <Button
                    style={styles.arrow}
                    onPress={() => this._scrollTo(_scrollView)}
                    >
                    <Image style={styles.magnifier} source={require('../../assets/channel/channel_more.png')}/>
                </Button>
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
        minWidth: width,
        paddingRight: 38
    },
    textStyle: {
        minWidth: 10,
        textAlign: 'center'
    },
    arrow: {
        backgroundColor: '#fff',
        borderLeftWidth: 1,
        borderColor: '#f4f4f4',
        position: 'absolute',
        width: 38,
        height: 38,
        marginTop: -38,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = ChannelTabBar;
