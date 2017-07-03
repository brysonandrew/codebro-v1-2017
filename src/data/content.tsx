import * as React from 'react';
// import { IPage } from './models';
import { toPath } from "./helpers/toPath";
import {IDictionary, IProject, ISocialMediaSelector} from "./models";

function Project(name, date, photoNumber, link) {
    this.name= name;
    this.path= toPath(this.name);
    this.link= link;
    this.imagePaths = new Array(photoNumber).fill("").map((_, i) => `/images/${this.path}/${i}.PNG`);
    this.date= date;
}

export const projectList: IProject[] = [
    new Project(
        "Porizi",
        "2016",
        11,
        "https://porizi.herokuapp.com/"
    ),
    new Project(
        "Coworkz",
        "2017",
        10,
        "https://cb-coworking.herokuapp.com"
    ),
    new Project(
        "Gulumjan Consulting",
        "2017",
        6,
        "https://gulumjan-consulting.herokuapp.com/"
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

function Preview(name, date) {
    this.name= name;
    this.path=
    this.date= date;
}
