'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import styles from './Slider.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export function Slider() {
    const slides = [
        {
            id: 1,
            title: 'Первый слайд',
            description: 'Описание первого слайда',
            image: '/images/1.webp'
        },
        {
            id: 2,
            title: 'Второй слайд',
            description: 'Описание второго слайда',
            image: '/images/2.webp'
        },
        {
            id: 3,
            title: 'Третий слайд',
            description: 'Описание третьего слайда',
            image: '/images/3.webp'
        }
    ]

    return (
        <div className={styles.slider}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                className={styles.swiper}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className={styles.slide}>
                        <div
                            className={styles.slideContent}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className={styles.overlay}>
                                <h2 className={styles.title}>{slide.title}</h2>
                                <p className={styles.description}>{slide.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}