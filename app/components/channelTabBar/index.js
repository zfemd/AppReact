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
let numberOfTabs ;
let tabsLength ;
let tabLength ;
let arrowWidth = 38;

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
        const scrollLength =  tabLength*(page-1);
        if((scrollLength + tabLength) > 0 && (scrollLength + width - arrowWidth) < tabsLength){
            this.setState({barLeft: scrollLength});
            _scrollView.scrollTo({x: scrollLength});
        }

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
            <View style={[styles.tab, this.props.tabStyle,{width: tabLength}]}>
                <Text style={[styles.textStyle, {color: textColor, fontWeight, }, textStyle, ]} ellipsizeMode="tail" numberOfLines={1}>
                    {name}
                </Text>
            </View>
        </Button>;
    },

    _scrollTo(_scrollView ) {
        let left = this.state.barLeft;
        if((left + width - arrowWidth)< tabsLength){
            this.setState({barLeft: left + tabLength});
            _scrollView.scrollTo({x: left + tabLength});
        }
    },

    _onScroll(event) {
        let offset = event.nativeEvent.contentOffset.x;
        this.setState({barLeft: offset});
    },

    render() {
        //const containerWidth = this.props.containerWidth;
        numberOfTabs = this.props.tabs.length;
        tabsLength = Math.ceil(numberOfTabs/5) * (width -arrowWidth);
        tabLength = tabsLength / numberOfTabs;
        const tabUnderlineStyle = {
            position: 'absolute',
            width: tabLength,
            height: this.props.underlineHeight,
            backgroundColor: this.props.underlineColor,
            bottom: 0,
        };

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1, ], outputRange: [0,  tabLength, ],
        });


        return (
            <View style={[styles.tabView, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                <View style={{width: width - arrowWidth}}>
                    <ScrollView
                        ref={(scrollView) => { _scrollView = scrollView; }}
                        contentContainerStyle={[styles.tabs, {width: tabsLength}]}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={200}
                        onScroll={this._onScroll}
                        >
                        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                        <Animated.View style={[tabUnderlineStyle, { left, }, styles.tabUnderline ]} />
                    </ScrollView>
                </View>

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
let _scrollView =  ScrollView;
const styles = StyleSheet.create({
    tabView: {
        width: width,
        height: 38
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 38,
        //marginRight: 10
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: '#ccc',
        minWidth: width-arrowWidth,
        //paddingRight: arrowWidth
    },
    textStyle: {
        minWidth: 10,
        height: 38,
        textAlign: 'center'
    },
    arrow: {
        backgroundColor: '#fff',
        borderLeftWidth: 1,
        borderColor: '#f4f4f4',
        position: 'absolute',
        width: arrowWidth,
        height: arrowWidth,
        marginTop: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = ChannelTabBar;
