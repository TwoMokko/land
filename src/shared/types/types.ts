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
export interface Equipment {
    id: number
    name: string
    model: string
    imagePath: string
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
export interface SubmitModel {
    slug?: string
    brand?: string
    model?: string
    equipment?: string
    price?: number
    reprice?: number
    color?: string
}
export interface SubmitData {
    name: string
    phone: string
    model?: SubmitModel
}
export type FormData = Pick<SubmitData, 'name' | 'phone'>

export enum SectionId {
    MODELS = 'models',
    SOCIAL = 'social',
    EQUIPMENTS = 'equipments',
    TRADE_IN = 'tradein',
    CONTACTS = 'contacts',
    CREDIT = 'credit',
}

export type SectionKey = keyof typeof SectionId;

export interface NavigationLink {
    title: string;
    href: string;
}