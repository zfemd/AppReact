/**
 * Created by xiewang on 7/13/16.
 */

'use strict';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Main from './pages/home';

const store = configureStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}

export default App;