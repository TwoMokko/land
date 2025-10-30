'use client'

import styles from './Hero.module.scss';
import Image from "next/image";
import { Button } from "@/src/shared/ui/button/Button";
import { useModal } from "@/src/app/providers/ModalProvider";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";

export function Hero() {
    const { openModal } = useModal();
    const { isMobile, isReady } = useDevice();

    const imageSrc = !isReady ? '/images/hero/hero-desk.png' :
        isMobile ? '/images/hero/hero-mob.png' :
            '/images/hero/hero-desk.png'

    return <div className={styles.hero}>
        <Image
            src={imageSrc}
            alt='hero'
            width={100}
            height={100}
            sizes="100vw"
            className={styles.image}
            loading="eager"
        />
        <div className={styles.infoWrap}>
            <div className='container'>
                <p className={styles.subtitle}>выгоды до <span>700 000 ₽ на все модели</span></p>
                <h1 className={styles.title}>
                    Осенний ценопад  на новые SWM <br></br>
                    <span>от 1 604 250 ₽</span>
                </h1>
                <Button minWidth={240} onClick={() => openModal('order')}>Зафиксировать цену</Button>
            </div>
        </div>
    </div>
}