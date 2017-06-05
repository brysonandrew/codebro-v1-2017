import * as React from 'react';
import { HomeFromStore } from '../Home/Home';
import { IPageRoute } from "../data/models";

function Route(path, component) {
    this.path = path;
    this.component = component;
}

const routes: IPageRoute[] = [
    new Route("/", HomeFromStore),
    new Route("/:activePagePath", HomeFromStore),
    new Route("/:activePagePath/:activeViewPath", HomeFromStore)
];

export default routes;
