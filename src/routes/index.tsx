import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import { HomeFromStore } from '../Home/Home';

const routes = (
        <Route component={App}>
            <Route path="/" component={HomeFromStore}/>
            <Route path="/:activePagePath" component={HomeFromStore}/>
            <Route path="/:activePagePath/:activeViewPath" component={HomeFromStore}/>
        </Route>
);

export default routes;
