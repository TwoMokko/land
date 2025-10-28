'use client'

import styles from "@/src/widgets/models/ui/Models.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import React, { useState } from "react";
import { Model } from "@/src/shared/api/types";
import type { Swiper as SwiperType } from "swiper";
import { ModalType, useModal } from "@/src/app/providers/ModalProvider";
import { Button } from "@/src/shared/ui/button/Button";
import { useModelImages } from "@/src/shared/lib/hooks/use-model-images";

interface ModelCardProps {
    model: Model
}

export function ModelCard({ model }: ModelCardProps) {
    const { openModal } = useModal();
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const { currentImages, getImagePath, hasMultipleColors, availableColors, selectedColor, setSelectedColor } = useModelImages({
        modelSlug: model.slug,
        colors: model.colors
    })

    const galleryId = `gallery-${model.id}`;

    const handleModal = (id: ModalType) => {
        openModal(id, { model });
    }

    return (
        <article key={model.id} className={styles.card}>
            <div className={styles.imgWrap}>
                {/* Мини-галерея (превью) */}
                {currentImages.length > 1 && (
                    <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        spaceBetween={8}
                        slidesPerView={5}
                        watchSlidesProgress
                        className={styles.thumbSwiper}
                        direction="vertical"
                    >
                        {currentImages?.map((image, index) => (
                            <SwiperSlide key={index} className={styles.thumbSlide}>
                                <Image
                                    src={getImagePath(image)}
                                    alt={`${model.name} - превью ${index + 1}`}
                                    fill
                                    sizes="57px"
                                    className={styles.thumbImage}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                {/* Основной слайдер */}
                <Swiper
                    modules={[Navigation, Thumbs]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    thumbs={{ swiper: thumbsSwiper }}
                    className={styles.mainSwiper}
                >
                    {currentImages.map((image, index) => (
                        <SwiperSlide key={index} className={styles.swiperSlide}>
                            <a
                                href={getImagePath(image)}
                                data-fancybox={galleryId}
                                data-caption={model.name}
                                data-thumb={image}
                            >
                                <Image
                                    src={getImagePath(image)}
                                    alt={`${model.name} - изображение ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 1000px"
                                    className={styles.image}
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>



            </div>
            <div className={styles.infoWrap}>
                <h3>{model.name}</h3>

                {hasMultipleColors && (
                    <div className={styles.colorSelector}>
                        {availableColors.map((colorSlug) => (
                            <button
                                key={colorSlug}
                                className={`${styles.colorButton} ${
                                    selectedColor === colorSlug ? styles.colorButtonActive : ''
                                }`}
                                onClick={() => setSelectedColor(colorSlug)}
                            >
                                <p className={`${styles.color} ${styles[colorSlug]}`}></p>
                            </button>
                        ))}
                    </div>
                )}

                <div>
                    {model.price} ₽
                </div>

                <div className={styles.btnWrap}>
                    <Button onClick={() => handleModal('credit')} >Рассчитать кредит</Button>
                    <Button onClick={() => handleModal('order')}  variant={'secondary'} withArrow>Получить предложение</Button>
                </div>
            </div>
        </article>
    )
}