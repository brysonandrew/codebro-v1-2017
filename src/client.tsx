import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes/index';
import {store} from './redux/store';

// Render the application
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            { routes }
        </Router>
    </Provider>,
    document.getElementById('root')
);
