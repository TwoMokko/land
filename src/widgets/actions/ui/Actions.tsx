'use client'

import styles from './Actions.module.scss';
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { useModal } from "@/src/app/providers/ModalProvider";
import { dataActions } from "@/src/shared/config/model-actions";

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
                {dataActions.map((item) => (
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