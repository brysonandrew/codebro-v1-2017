import { IPage } from '../models';
import { blogPosts } from './blog/blogPosts';
import { workPosts } from './work/workPosts';
import { showroomLinks } from './showroom';
import { workshopLinks } from './workshop';

const convertPostToSlides = (input) => {
    return {
        name: input.name,
        parts: input.parts,
        category: input.category,
        image: input.image
    }
};

const convertNameToPath =
    (name) =>
        name.replace(/-/g, "")
            .replace(/\s/g, "-")
            .replace(/[.,]/g, "")
            .toLowerCase();

export const pages: IPage[] = [
    {
        name: "BLOG",
        path: "blog-posts",
        componentType: "post",
        viewPaths: blogPosts.map(post => convertNameToPath(post.name)),
        posts: blogPosts,
        slides: blogPosts.map(post => convertPostToSlides(post))
    },
    {
        name: "WORK",
        path: "work",
        componentType: "post",
        viewPaths: workPosts.map(post => convertNameToPath(post.name)),
        posts: workPosts,
        slides: workPosts.map(post => convertPostToSlides(post))
    }
];
