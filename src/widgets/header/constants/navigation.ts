export interface NavigationLink {
    title: string;
    href: string;
}

export const NAVIGATION_LINKS: NavigationLink[] = [
    { title: 'Модельный ряд', href: '#models' },
    { title: 'Комплектации', href: '#equipments' },
    { title: 'Контакты', href: '#contacts' },
];

export const CONTACT_INFO = {
    address: 'г. Москва 44км МКАД, влд. 1 стр. 2',
    phone: '+7 (495) 065-10-53',
    phoneLink: 'tel:+74950651053',
} as const;

export const SCROLL = 20;

