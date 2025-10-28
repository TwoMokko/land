export interface Model {
    id: number
    name: string
    price: number
    slug: string
    colors: string[]
}

export type ColorSlug = string;

export interface ModelImages {
    [color: string]: string[];
}