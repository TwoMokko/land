'use client'

import styles from './Social.module.scss'
import Link from "next/link";
import React from "react";
import { FaSquareInstagram, FaTelegram, FaVk } from "react-icons/fa6";
import Image from "next/image";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { socialLinks } from "@/src/shared/config/model-base";

export function Social({ idSection }: { idSection: string }) {
    const { isMobile, isLaptop, isReady } = useDevice();

    const imageSrc = !isReady ? '/images/social/social-bot-desk.png' :
        isMobile ? '/images/social/social-bot-mob.png' :
            isLaptop ? '/images/social/social-bot-tablet.png' :
                '/images/social/social-bot-desk.png';

    return <section id={idSection} className={styles.socialSection}>
        <div className={styles.social}>
            <h2 className={styles.title}>Peleton
                <br/>в социальных сетях</h2>
            <div className={styles.list}>
                <div className={styles.listItem}>
                    <Link
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='inst'
                    >
                        <FaSquareInstagram size={40} />
                    </Link>
                    <span className={styles.listTitle}>9 млн+</span>
                    <p className={styles.listSubtitle}>просмотров Reels
                        <br/>в Instagram</p>
                </div>
                <div className={styles.listItem}>
                    <Link
                        href={socialLinks.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTelegram size={40} />
                    </Link>
                    <span className={styles.listTitle}>400+</span>
                    <p className={styles.listSubtitle}>фото и видео контента
                        <br />о нашем Автомолле</p>
                </div>
                <div className={styles.listItem}>
                    <Link
                        href={socialLinks.vkontakte}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaVk size={40} />
                    </Link>
                    <span className={styles.listTitle}>300+</span>
                    <p className={styles.listSubtitle}>постов в нашем
                        <br />автоблоге в VK</p>
                </div>
            </div>
            <div className={styles.inst}><sup>*</sup>Instagram — проект Meta Platforms Inc., деятельность которой запрещена в России</div>
        </div>
        <div className={styles.socialBot}>
            <Image
                src={imageSrc}
                alt='hero'
                fill
                sizes="100vw"
                className={styles.image}
            />
        </div>
    </section>
}