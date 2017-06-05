import * as React from 'react';
import { toPath } from "./helpers/toPath";
import { Link } from 'react-router-dom';
import {IPageLink, IPageRoute, IPageLinks, IParams} from "./models";
import { blogPosts } from "./blog/blogPosts";
import { PhilosophyFromStore } from "../Philosophy/Philosophy";
import { BlogFromStore } from "../Blog/Blog";
import { leavePage } from "../Home/HomeActionCreators";
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
    this.name = name;
    this.path = toPath(name);
    this.viewPaths = Object.keys(content).map(key => key);
    this.content = content;
    this.component = component;
    this.linkComponent = <Link to={`/${toPath(name)}`}
                               style={linkStyle}>
                            {name}
                        </Link>;
}
function ExternalPageLink(name, link) {
    this.name = name;
    this.path = toPath(name); // unused but required so it doesn't return undefined when changing home params
    this.linkComponent = <a style={linkStyle}
                            onClick={() => handleExternalLinkClick()}
                            href={link}>{name}</a>
}
function PageLinkInfo(name, content, component) {
    this.name = name;
    this.content = content;
    this.component = component;
}
///EXPORTS
export const pages: IPageLinks = {
    philosophy: new PageLinkInfo("Philosophy", [], <PhilosophyFromStore/>),
    blog: new PageLinkInfo("Blog", blogPosts, <BlogFromStore/>)
};

export const pageLinks: IPageLink[] = [
    new InternalPageLink("Philosophy", [], PhilosophyFromStore),
    new ExternalPageLink("Work", "http://showroom.codebro.io"),
    new InternalPageLink("Blog", blogPosts, BlogFromStore)
];
