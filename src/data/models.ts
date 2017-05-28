export interface IDictionary<T> {
    [key: string]: T
}

///NAVIGATION
export interface IPageLink {
    linkComponent: JSX.Element
    path?: string
    content?: any[]
    viewPaths?: string[]
    component?: JSX.Element
}

export interface IPost {
    name: string
    category: string
    link: string
    status: string
    date: string
    content: any[]
    parts?: string[]
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
