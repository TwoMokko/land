'use client'

import styles from "@/src/widgets/models/ui/Models.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import { Model, SubmitModel } from "@/src/shared/types/types";
import type { Swiper as SwiperType } from "swiper";
import { ModalType, useModal } from "@/src/app/providers/ModalProvider";
import { Button } from "@/src/shared/ui/button/Button";
import { useModelImages } from "@/src/shared/lib/hooks/useModelImages";
import { formatPrice } from "@/src/shared/lib/utils/format-price";

interface ModelCardProps {
    model: Model
}

export function ModelCard({ model }: ModelCardProps) {
    const { openModal } = useModal();
    const [ thumbsSwiper, setThumbsSwiper ] = useState<SwiperType | null>(null);
    const { currentImages, getImagePath, hasMultipleColors, availableColors, selectedColor, setSelectedColor } = useModelImages({
        modelSlug: model.slug,
        colors: model.colors
    })

    const [ galleryId, setGalleryId ] = useState<string>(`gallery-${model.id}-${selectedColor}`);

    const handleModal = (id: ModalType) => {
        const submitModel: SubmitModel = {
            slug: model.slug,
            brand: 'SWM',
            model: model.name,
            price: model.price,
            reprice: model.recprice,
            color: selectedColor
        }

        openModal(id, submitModel);
    }

    useEffect(() => {
        setGalleryId(`gallery-${model.slug}-${selectedColor}`);
    }, [model.id, selectedColor, currentImages])

    return (
        <article key={model.slug} className={styles.card} id={model.slug}>
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
                        breakpoints={{
                            // На мобильных устройствах делаем горизонтальной
                            320: {
                                direction: "horizontal",
                                slidesPerView: 5,
                            },
                            // На планшетах и выше - вертикальная
                            1024: {
                                direction: "vertical",
                                slidesPerView: 5,
                            }
                        }}
                    >
                        {currentImages?.map((image, index) => (
                            <SwiperSlide key={index} className={styles.thumbSlide}>
                                <Image
                                    src={getImagePath(image)}
                                    alt={`${model.name} - превью ${index + 1}`}
                                    fill
                                    sizes="100px"
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
                                data-thumb={getImagePath(image)}
                            >
                                <div className={styles.imageContainer}>
                                    <Image
                                        src={getImagePath(image)}
                                        alt={`${model.name} - изображение ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                                        className={styles.image}
                                    />
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>


            </div>
            <div className={styles.infoWrap}>
                <h3 className={styles.modelTitle}>{model.brand} <span>{model.name}</span></h3>

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

                <div className={styles.list}>
                    <div className={styles.listItem}>
                        <span className={styles.listTitle}>Скидка за приезд день в день</span>
                        <span className={styles.listValue}>до 30 000 ₽</span>
                    </div>
                    <div className={styles.listItem}>
                        <span className={styles.listTitle}>Трейд-ин   </span>
                        <span className={styles.listValue}>до 300 000 ₽</span>
                    </div>
                    <div className={styles.listItem}>
                        <span className={styles.listTitle}>Гарантия</span>
                        <span className={styles.listValue}>3 года</span>
                    </div>
                </div>

                <div className={styles.prices}>
                    <div className={styles.price}>
                        {formatPrice(model.price)} ₽
                    </div>
                    <div className={styles.oldPrice}>
                        {formatPrice(model.recprice)} ₽
                    </div>
                </div>
                <div className={styles.creditPay}>
                    платеж от {formatPrice(model.creditPay)} ₽/мес
                </div>

                <div className={styles.btnWrap}>
                    <Button onClick={() => handleModal('credit')}>Рассчитать кредит</Button>
                    <Button onClick={() => handleModal('order')} variant={'secondary'} withArrow>Получить
                        предложение</Button>
                </div>
            </div>
        </article>
    )
}