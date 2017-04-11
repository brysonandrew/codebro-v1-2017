import { IPage } from '../models';
import { blogPosts } from './blog/blogPosts';
import { workPosts } from './work/workPosts';

export const pages: IPage[] = [
    {
        name: "BLOG",
        link: "blogPosts",
        viewLinks: [],
        posts: blogPosts
    },
    {
        name: "WORK",
        link: "work",
        viewLinks: [],
        posts: workPosts
    }
];