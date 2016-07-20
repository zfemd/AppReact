import React from 'react';
import {
    Dimensions,
    Image,
    InteractionManager
} from 'react-native';

import Home from '../home';

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
        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                navigator.resetTo({
                    component: Home,
                    name: 'Main'
                });
            });
        }, 2000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Image
                style={{ width: 284, height: 200, top: (maxHeight-200)/2, left: (maxWidth-284)/2 }}
                source={splashImg}
                />
        );
    }
}

export default Splash;