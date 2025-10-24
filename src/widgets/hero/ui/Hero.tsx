'use client'

import styles from './Hero.module.scss';
import Image from "next/image";
import React from "react";
import { Button } from "@/src/shared/ui/button/Button";

export function Hero() {
    return <div className={styles.hero}>
        <Image
            src='/images/hero/hero-desk.png'
            alt='hero'
            width={100}
            height={100}
            sizes="100vw"
            className={styles.image}
            loading="eager"
        />
        <div className={styles.infoWrap}>
            <div className='container'>
                <h1 className={styles.title}>
                    Осенний ценопад  на новые SWM <br></br>
                    <span>от 1 604 250 ₽</span>
                </h1>
                <Button minWidth={300}>Зафиксировать цену</Button>
            </div>
        </div>
    </div>
}