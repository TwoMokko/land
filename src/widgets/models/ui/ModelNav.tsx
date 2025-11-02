'use client'

import { Model } from "@/src/shared/types/types";
import styles from "@/src/widgets/models/ui/Models.module.scss";
import Image from "next/image";
import React from "react";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import { useModels } from "@/src/app/providers/ModelsContext";


export function ModelNav() {
    const { ensureModelVisible, models } = useModels();
    const { isMobile } = useDevice();

    const swiperConfig: SwiperOptions = {
        slidesPerView: "auto",
        spaceBetween: 10,
        freeMode: true,
        navigation: true,

        breakpoints: {
            1024: {
                slidesPerView: models.length,
                spaceBetween: 20,
                freeMode: false,
                navigation: false,
            }
        }
    };


    // заменить путь до картинки

    return (
        <div className={styles.navWrap}>
            <Swiper
                modules={[Navigation, A11y]}
                {...swiperConfig}
            >
                {models.map(model => (
                    <SwiperSlide key={model.slug} className={styles.swiperSlide}>
                        <a href={`#${model.slug}`} className={styles.navItem} onClick={() => ensureModelVisible(model.slug)}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={`/images/equipments/${model.slug}.png`}
                                    alt={model.name}
                                    fill
                                    sizes={isMobile ? "150px" : "100px"}
                                    className={styles.navImage}
                                />
                            </div>
                            <div className={styles.navInfo}>
                                {model.name}
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}