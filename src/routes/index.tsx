import * as React from 'react';
import { HomeFromStore } from '../Home/Home';
import { IPageRoute } from "../data/models";

function Route(path, component) {
    this.path = path;
    this.component = component;
}

const routes: IPageRoute[] = [
    new Route("/:activePagePath?/:activeProjectPath?/:activeViewPath?", HomeFromStore)
];

export default routes;
