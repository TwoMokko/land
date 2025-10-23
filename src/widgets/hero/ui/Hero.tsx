'use client'

import styles from './Hero.module.scss'
import Image from "next/image";
import React from "react";

export function Hero() {
    return <div className={styles.hero}>
        <Image
            src='/images/hero-desk.png'
            alt='hero'
            width={100}
            height={100}
            sizes="100vw"
            className={styles.image}
        />
    </div>
}