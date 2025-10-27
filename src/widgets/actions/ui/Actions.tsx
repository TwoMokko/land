'use client'

import styles from './Actions.module.scss';
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { ModalType, useModal } from "@/src/app/providers/ModalProvider";

interface dataActions {
    id: number,
    title: string,
    subtitle: string,
    link: ModalType,
    icon: string | React.ReactNode
}

const data: dataActions[]  = [
    { id: 1, title: 'Автокредит с выгодой до 400 000₽', subtitle: 'Одобрение по 2-ум документам', link: 'credit', icon: '' },
    { id: 2, title: 'Гарантия 3 года или комплект резины в подарок!', subtitle: 'на любую модель при покупке', link: 'order', icon: '' },
    { id: 3, title: 'Выгоды по Трейд-ин до 300 000₽', subtitle: 'Только 20 автомобилей', link: 'order', icon: '' },
    { id: 4, title: 'Новые SWM по сниженной цене от 1 395 000₽!', subtitle: 'Только 20 автомобилей', link: 'order', icon: '' },
]

export function Actions() {
    const { openModal } = useModal();

    return <div className="container">
        <div className={styles.actions}>
            <h2 className={`${styles.title} section-title`}>Акции</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                breakpoints={{
                    768: {slidesPerView: "auto"},
                    1024: {slidesPerView: 3},
                }}
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className={styles.card}>

                            <h3>{item.title}</h3>
                            <div>
                                {item.subtitle}
                            </div>
                            <button onClick={() => openModal(item.link)}>
                                Узнать подробнее
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
}