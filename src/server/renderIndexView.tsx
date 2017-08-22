import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { store } from "../redux/store";
import { Provider } from 'react-redux';
import { App } from "../App/App";

export const renderIndexView = (req: any, res: any) => {
    const context = {};
    if (context["url"]) {
        res.redirect(301, context["url"])
    } else {
        res.render('index', {
            renderedRoot: ReactDOMServer.renderToString(
                <Provider store={store()}>
                            <Router
                                location={req.url}
                                context={context} >
                                <App/>
                            </Router>
                        </Provider>
            )
        });
    }
};
