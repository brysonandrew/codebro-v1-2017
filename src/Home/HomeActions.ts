import {IParams} from "../data/models"
// r o u t i n g
export module UPDATE__LOCATION {
    export let type = "UPDATE__LOCATION"
}
export interface UPDATE__LOCATION {
    location: Location
}
export module UPDATE__PARAMS {
    export let type = "SAVE__PARAMS"
}
export interface UPDATE__PARAMS {
    savedParams: IParams
}
// s c r o l l i n g
export module UPDATE__SCROLL_TYPE {
    export const type = "UPDATE__SCROLL_TYPE"
}
export interface UPDATE__SCROLL_TYPE {
    isAnimating: boolean
}
export module UPDATE__WHEEL_EVENT {
    export const type = "UPDATE__WHEEL_EVENT"
}
export interface UPDATE__WHEEL_EVENT {
    isWheel: boolean
}
// v i e w s
export module OPEN__MENU {
    export const type = "OPEN__MENU"
}
export interface OPEN__MENU {
    isMenuOpen: boolean
}
export module EXTEND__PREVIEW {
    export const type = "EXTEND__PREVIEW";
}
export interface EXTEND__PREVIEW {
    isPreviewExtended: boolean
}
export module UPDATE__VIEWPORT_DIMENSIONS {
    export let type = "UPDATE__VIEWPORT_DIME"
}
export interface UPDATE__VIEWPORT_DIMENSIONS {
    width: number
    height: number
}
