import React from 'react';
import {
    Dimensions,
    Image,
    InteractionManager
} from 'react-native';
import {
    Token
} from '../../utils/common';
import Home from '../home';
import LoginPage from '../login/LoginPage';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../../assets/logo/splash.png');

class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }

    componentDidMount() {
        const { navigator } = this.props;

        InteractionManager.runAfterInteractions(() => {
            navigator.resetTo({
                component: Home,
                name: 'Home',
                params: {store: this.props.store}
            });
        });

        //this.timer = setTimeout(() => {
        //    InteractionManager.runAfterInteractions(() => {
        //        navigator.resetTo({
        //            component: Home,
        //            name: 'Home',
        //            params: {store: this.props.store}
        //        });
        //    });
        //}, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        // This will be replaced to webView for ads or user guide
        return (
            <Image
                style={{ width: 284, height: 200, top: (maxHeight-200)/2, left: (maxWidth-284)/2, borderRadius: 20 }}
                source={splashImg}
                />
        );

    }
}

export default Splash;