import * as React from 'react';
import { nameToPath } from "./helpers/nameToPath";
import { Link } from 'react-router';
import { IPageLink } from "./models";
import { blogPosts } from "./blog/blogPosts";
import { Philosophy } from "../Philosophy/Philosophy";
import { BlogFromStore } from "../Blog/Blog";

const linkStyle = {
    fontFamily: "PlayfairBold, 'arial', sans-serif",
    color: "#fafafa",
    fontSize: 22
};

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
                        href={link}>{name}</a>
}
///EXPORTS
export const pageLinks: IPageLink[] = [
    new InternalPageLink("Philosophy", [], <Philosophy/>),
    new ExternalPageLink("Work", "http://showroom.codebro.io"),
    new InternalPageLink("Blog", blogPosts, <BlogFromStore/>),
];
