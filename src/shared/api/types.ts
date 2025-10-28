import {ModalType} from "@/src/app/providers/ModalProvider";
import React from "react";

export interface Model {
    id: number
    name: string
    price: number
    recprice: number
    slug: string
    colors: string[]
}

export type ColorSlug = string;

export interface ModelImages {
    [color: string]: string[];
}

export interface ActionItem {
    id: number,
    title: string,
    subtitle: string,
    link: ModalType,
    icon: string | React.ReactNode
}