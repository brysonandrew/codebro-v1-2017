import * as React from 'react';
// import { IPage } from './models';
import { toPath } from "./helpers/toPath";
import {IDictionary, IProject, ISocialMediaSelector} from "./models";

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


export const headingMenuLeft: ISocialMediaSelector[] = [
    {
        name: "medium link",
        link: "https://medium.com/@codebroio",
        icon: "/images/social media/medium.png",
        label: "blog"
    },
    {
        name: "youtube link",
        link: "https://www.youtube.com/channel/UCF1SvsAZTJL4Bw9qj0hdNLA",
        icon: "/images/social media/youtube.png",
        label: "vlog"
    }
];
