import * as React from 'react';
// import { IPage } from './models';
import { toPath } from "./helpers/toPath";
import {IDictionary, IProject} from "./models";

function Project(name) {
    this.name= name;
    this.path= toPath(this.name);
}

export const projectList: IProject[] = [
    new Project(
        "Excalibur"
    ),
    new Project(
        "WWIII"
    ),
    new Project(
        "Beethoven vs Leo"
    )
];

export const projects: IDictionary<IProject> = projectList.reduce((acc, curr) => {
    acc[toPath(curr.name)] = curr;
    return acc;
}, {});
