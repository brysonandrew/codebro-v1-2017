import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App/App";
const rootEl = document.getElementById('root');

ReactDOM.render(
    <Provider store={store()}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    rootEl
);