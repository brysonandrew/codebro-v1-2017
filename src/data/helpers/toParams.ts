// import {emptyParams} from "../pages";
const params = [
    "/",
    "activePagePath",
    "activeViewPath"
];

export const toParams =
    (path) =>
        path.split("/")
            .reduce((acc, curr, i) => {
                acc[params[i]] = curr;
                return acc;
            }, {});

