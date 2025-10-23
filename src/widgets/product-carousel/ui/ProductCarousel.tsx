'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import styles from './ProductCarousel.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'

const products = [
    { id: 1, name: 'Товар 1', price: 1000, image: '/images/1.webp' },
    { id: 2, name: 'Товар 2', price: 2000, image: '/images/2.webp' },
    { id: 3, name: 'Товар 3', price: 3000, image: '/images/3.webp' },
    { id: 4, name: 'Товар 4', price: 4000, image: '/images/4.webp' },
]

export function ProductCarousel() {
    return (
        <div style={{ padding: '40px 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Наши товары</h2>

            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className={styles.card}>
                            <img
                                src={product.image}
                                alt={product.name}

                            />
                            <h3>{product.name}</h3>
                            <div>
                                {product.price} ₽
                            </div>
                            <button>
                                Оставить заявку
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}