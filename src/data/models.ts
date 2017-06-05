import {RouteComponentProps} from "react-router";
export interface IDictionary<T> {
    [key: string]: T
}

///NAVIGATION
export interface IPageLinks {
    [link: string]: IPageLink
}

export interface IPageLink {
    name?: string
    linkComponent: JSX.Element
    path?: string
    content?: any[]
    viewPaths?: string[]
    component?: JSX.Element
}

export interface IPageRoute {
    path: string
    component?: React.SFC<RouteComponentProps<any> | undefined>
}

export interface IPost {
    name: string
    category: string
    path: string
    link: string
    date: string
    content: any[]
    image: string
}

export interface IParams {
    activePagePath: string
    activeViewPath: string
}

///DISPLAY
export interface IBar {
    heading: string
    quantity: number
}

export interface ISocialMediaLink {
    name: string
    iconPath: string
    link: string
}

///BACKGROUND
export interface IBackground {
    name: string
    displayTest: boolean
    component: JSX.Element
}

export interface IParticle {
    size: number
    src: string
    opacity: number
    hueRotate: number
    life: number
    x: number
    y: number
}
