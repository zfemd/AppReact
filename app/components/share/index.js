'use strict';

import React, { PropTypes } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import { connect } from 'react-redux';

var {height, width} = Dimensions.get('window');
const propTypes = {
    press: PropTypes.func
};

class HomeFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            dropAnim: new Animated.Value(-150),
        }
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(
                this.state.fadeAnim,
                {toValue: 0.4}
            ),
            Animated.timing(
                this.state.dropAnim,
                {toValue: 0}
            )
        ]).start();

    }

    componentWillMount() {
    }

    render() {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.share}>
                    <Animated.View style={[styles.shareContent,{bottom: this.state.dropAnim}]}>
                        <View style={styles.list}>
                            <TouchableOpacity style={styles.shareItem}>
                                <Image style={styles.follow} source={require('../../assets/note/wechat.png')}/>
                                <Text style={styles.shareFont}>微信</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareItem}>
                                <Image style={styles.follow} source={require('../../assets/note/moment.png')}/>
                                <Text style={styles.shareFont}>朋友圈</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareItem}>
                                <Image style={styles.follow} source={require('../../assets/note/qq.png')}/>
                                <Text style={styles.shareFont}>QQ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareItem}>
                                <Image style={styles.follow} source={require('../../assets/note/weibo.png')}/>
                                <Text style={styles.shareFont}>微博</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.props.press}>
                            <Text style={styles.buttonFont} >取消</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <TouchableWithoutFeedback onPress={this.props.press}>
                        <Animated.View  style={[styles.shareShadow, {opacity: this.state.fadeAnim}]}>

                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

const styles = StyleSheet.create({
    share: {
        flex: 1,
        top: 0,
        left: 0,
        zIndex: 10,
        flexDirection: 'column',
        position: 'absolute',
    },
    shareShadow: {
        top: 0,
        left: 0,
        backgroundColor: '#000',
        width: width,
        height: height,
    },
    shareContent: {
        position: 'absolute',
        backgroundColor: '#fff',
        opacity: 1,
        zIndex: 100,
        flexDirection: 'column',
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: width,
        padding: 50,
        height: 120,
    },
    shareItem: {
        height: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    shareFont: {
        fontSize: 14,
        color: '#9b9b9b'
    },
    button: {
        height: 36,
        backgroundColor: '#efefef',
        margin: 50,
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonFont: {
        fontSize: 16,
        lineHeight: 26,
        color: '#9b9b9b'
    }
});

function mapStateToProps(state) {
    const { home } = state;
    return {
        home
    };
}

export default connect(mapStateToProps)(HomeFilter);