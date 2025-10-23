'use client'

import styles from './Actions.module.scss'
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

const data = [
    { id: 1, title: 'Автокредит с выгодой до 400 000₽', subtitle: 'Одобрение по 2-ум документам', link: '', icon: '' },
    { id: 2, title: 'Гарантия 3 года или комплект резины в подарок!', subtitle: 'на любую модель при покупке', link: '', icon: '' },
    { id: 3, title: 'Выгоды по Трейд-ин до 300 000₽', subtitle: 'Только 20 автомобилей', link: '', icon: '' },
    { id: 4, title: 'Новые SWM по сниженной цене от 1 395 000₽!', subtitle: 'Только 20 автомобилей', link: '', icon: '' },
]

export function Actions() {
    return <div className={`${styles.actions} container`}>
        <h2 className={`${styles.title} section-title`}>Акции</h2>
        <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            breakpoints={{
                640: {slidesPerView: 1},
                768: {slidesPerView: 2},
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
                        <a href={item.link} target="_blank">
                            Узнать подробнее
                        </a>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
}