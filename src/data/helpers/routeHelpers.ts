import { IParams } from "../models";

export const isPage = (params: IParams) => {
    return {
        home: params.activePagePath==="home" || params.activePagePath==null
    };
};

export const isView = (params) => {
    return {
        welcome: params.activeViewPath==="welcome" || params.activeViewPath==null
    };
};
