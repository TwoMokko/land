'use client'

import styles from './Header.module.scss'
import { Button } from "@/src/shared/ui/button/Button";
import React from "react";
import Image from "next/image";

const links: { title: string, href: string, class?: string }[] = [
    { title: 'Модельный ряд', href: '#models', class: '' },
    { title: 'Комплектации', href: '#equipments' },
    { title: 'Контакты', href: '#contacts' },
]

export function Header() {
    return (
        <header className={styles.header}>
            <div className='container'>
                <div className={styles.inner}>
                    <Image
                        src='/images/icons/logo.svg'
                        alt='logo'
                        width={245}
                        height={30}
                        loading='eager'
                    />
                    <nav className={styles.nav}>
                        { links.map((link, index) => (
                            <a key={index} className={`${styles.link} ${link.class ?? ''}`} href={link.href}>
                                {link.title}
                            </a>
                        ))}
                    </nav>
                    <Button variant='secondary' withArrow >Рассчитать кредит</Button>
                </div>
            </div>
        </header>
    )
}