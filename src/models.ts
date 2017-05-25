export interface IDictionary<T> {
    [key: string]: T
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

export interface IPage {
    name: string
    path: string
    viewPaths: string[]
    componentType: string
    posts?: IPost[]
    slides?: any[]
}

export interface IBar {
    heading: string
    quantity: number
}

export interface IComponentType {
    handle: string
    component: JSX.Element
}

export interface IHomeParams {
    activePage: string
    activeView: string
}

export interface IWorkshopLink {
    name: string
    category: string
    path: string
    parts?: string[] | JSX.Element[]
    image: string
}

export interface IShowroomLink {
    name: string
    category: string
    path: string
    parts?: string[]
    image: string
}

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

export interface ISocialMediaLink {
    name: string
    iconPath: string
    link: string
}
