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

        Token.getToken(navigator).then((token) => {
                console.log(token);

                if (!token) {
                    InteractionManager.runAfterInteractions(() => {
                        navigator.resetTo({
                            component: Home,
                            name: 'Home',
                            params: {store: this.props.store}
                        });
                    });
                } else {
                    InteractionManager.runAfterInteractions(() => {
                        navigator.resetTo({
                            component: LoginPage,
                            name: 'LoginPage',
                            params: {store: this.props.store}
                        });
                    });
                }
            }
        );
    }

    render() {
        return (
            <Image
                style={{ width: 284, height: 200, top: (maxHeight-200)/2, left: (maxWidth-284)/2, borderRadius: 20 }}
                source={splashImg}
                />
        );
    }
}

export default Splash;