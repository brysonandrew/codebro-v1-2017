import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../App/App';
import { HomeFromStore } from '../Home/Home';

const routes = (
        <Route component={App}>
            {/*//main*/}
            <Route path="/" component={HomeFromStore}/>
            <Route path="/:activePage" component={HomeFromStore}/>
            <Route path="/:activePage/:activeView" component={HomeFromStore}/>
        </Route>
);

export default routes;
