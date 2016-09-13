import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    Animated,
    PanResponder,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#222',
        overflow: 'hidden'
    },
    image: {
        width: Dimensions.get('window').width
    },
    buttons: {
        height: 15,
        marginTop: -15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        margin: 3,
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
        backgroundColor: '#ccc',
        opacity: 0.9
    },
    buttonSelected: {
        opacity: 1,
        backgroundColor: '#fff',
    }
});

export default class ImageSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            height: new Animated.Value(this._scaleHeight(this.props.images[0])),
            left: new Animated.Value(0),
            scrolling: false,
            timeout: null
        };

        // Enable LayoutAnimation under Android
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

    }

    _move(index) {
        const width = Dimensions.get('window').width;
        const to = index * -width;
        const scaleH = this._scaleHeight(this.props.images[index]);
        if (!this.state.scrolling) {
            return;
        }
        Animated.timing(this.state.left, {toValue: to, friction: 10, tension: 10, velocity: 1, duration: 2000}).start();
        Animated.timing(this.state.height, {
            toValue: scaleH,
            friction: 10,
            tension: 10,
            velocity: 1,
            duration: 2000
        }).start();

        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
        this.setState({
            position: index, timeout: setTimeout(() => {
                this.setState({scrolling: false, timeout: null});
                if (this.props.onPositionChanged) {
                    this.props.onPositionChanged(index);
                }
            }, 1000)
        });
    }

    _scaleHeight(image) {
        const imageWidth = image.width;
        const imageHeight = image.height;
        return Dimensions.get('window').width * imageHeight / imageWidth;
    }
    _getPosition() {
        if (typeof this.props.position === 'number') {
            return this.props.position;
        }
        return this.state.position;
    }

    componentWillReceiveProps(props) {
        if (props.position !== undefined) {
            this.setState({scrolling: true});
            this._move(props.position);
        }
    }

    componentWillMount() {
        const width = Dimensions.get('window').width;

        if (typeof this.props.position === 'number') {
            this.state.left.setValue(-(width * this.props.position));
        }

        let release = (e, gestureState) => {
            const width = Dimensions.get('window').width;
            const relativeDistance = gestureState.dx / width;
            const vx = gestureState.vx;
            let change = 0;

            if (relativeDistance < -0.5 || (relativeDistance < 0 && vx <= 0.5)) {
                change = 1;
            } else if (relativeDistance > 0.5 || (relativeDistance > 0 && vx >= 0.5)) {
                change = -1;
            }
            const position = this._getPosition();
            if (position === 0 && change === -1) {
                change = 0;
            } else if (position + change >= this.props.images.length) {
                change = (this.props.images.length) - (position + change);
            }
            this._move(position + change);
            return true;
        };

        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => Math.abs(gestureState.dx) > 5,
            onPanResponderRelease: release,
            onPanResponderTerminate: release,
            onPanResponderMove: (e, gestureState) => {
                const dx = gestureState.dx;
                const width = Dimensions.get('window').width;
                const position = this._getPosition();
                let left = -(position * width) + Math.round(dx);
                if (left > 0) {
                    left = Math.sin(left / width) * (width / 2);
                } else if (left < -(width * (this.props.images.length - 1))) {
                    const diff = left + (width * (this.props.images.length - 1));
                    left = Math.sin(diff / width) * (width / 2) - (width * (this.props.images.length - 1));
                }
                this.state.left.setValue(left);
                if (!this.state.scrolling) {
                    this.setState({scrolling: true});
                }
            },
            onShouldBlockNativeResponder: () => true
        });
    }

    componentWillUnmount() {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
    }

    componentWillUpdate() {
        const CustomLayoutAnimation = {
            duration: 180,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.linear
            }
        };
        LayoutAnimation.configureNext(CustomLayoutAnimation);
        //LayoutAnimation.linear();
    }

    render() {
        const customStyles = this.props.style ? this.props.style : {};
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').width * this.props.images[0].height / this.props.images[0].width;
        const scale = this.props.height / this.state.height._value;
        const position = this._getPosition();
        return (<View>
            <Animated.View
                style={[styles.container, customStyles, {height: this.state.height, width: width * this.props.images.length, transform: [{translateX: this.state.left}]}]}
                {...this._panResponder.panHandlers}>
                {this.props.images.map((image, index) => {

                    const imageWidth = image.width;
                    const imageHeight = image.height;
                    const scaleH = Dimensions.get('window').width * imageHeight / imageWidth;
                    const imageComponent = <Animated.Image
                        key={index}
                        source={{uri: image.uri}}
                        style={{height: this.state.height, width}}
                        />;
                    if (this.props.onPress) {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    this.props.onPress({ image, index })
                                }}
                                delayPressIn={200}
                                >
                                {imageComponent}
                            </TouchableOpacity>
                        );
                    } else {
                        return imageComponent;
                    }
                })}
            </Animated.View>
            <View style={styles.buttons}>
                {this.props.images.map((image, index) => {
                    return (<TouchableHighlight
                        key={index}
                        underlayColor="#ccc"
                        onPress={() => {
                            this.setState({scrolling: true});
                            return this._move(index);
                        }}
                        style={[styles.button, position === index && styles.buttonSelected]}>
                        <View></View>
                    </TouchableHighlight>);
                })}
            </View>
        </View>);
    }
}
