import * as React from 'react';
import { nameToPath } from "./helpers/nameToPath";
import { Link } from 'react-router';
import { IPageLink } from "./models";
import { blogPosts } from "./blog/blogPosts";
import { PhilosophyFromStore } from "../Philosophy/Philosophy";
import { BlogFromStore } from "../Blog/Blog";
import {leavePage, changePageIndex} from "../Home/HomeActionCreators";
import { store } from '../redux/store';

const linkStyle = {
    color: "#fafafa",
    fontSize: 22
};

function handleExternalLinkClick() {
    store.dispatch(leavePage(true));
}

///CONSTRUCTORS
function InternalPageLink(name, content, component) {
    this.path = nameToPath(name);
    this.viewPaths = content.map(content => nameToPath(content.name));
    this.content = content;
    this.component = component;
    this.linkComponent = <Link style={linkStyle}
                           to={nameToPath(name)}>{name}</Link>;
}

function ExternalPageLink(name, link) {
    this.path = nameToPath(name); // unused but required so it doesn't return undefined when changing home params
    this.linkComponent = <a style={linkStyle}
                            onClick={() => handleExternalLinkClick()}
                            href={link}>{name}</a>
}
///EXPORTS
export const pageLinks: IPageLink[] = [
    new InternalPageLink("Philosophy", [], <PhilosophyFromStore/>),
    new ExternalPageLink("Work", "http://showroom.codebro.io"),
    new InternalPageLink("Blog", blogPosts, <BlogFromStore/>),
];
