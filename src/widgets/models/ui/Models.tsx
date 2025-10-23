'use client'

import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './Models.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from "next/image";

import { Model } from "@/src/shared/api/types";
import { getModels } from "@/src/shared/api";


export function Models() {
    const [products, setProducts] = useState<Model[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                setIsLoading(true);
                const models = await getModels();
                setProducts(models);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки');
            } finally {
                setIsLoading(false);
            }
        }

        loadModels();
    }, [])


    if (isLoading) {
        return (
            <div className={styles.loading}>Загрузка...</div>
        )
    }

    if (error) {
        return (
            <div className={styles.error}>{error}</div>
        )
    }

    return (
        <div className={`${styles.models} container`}>
            <h2 className={`${styles.title} section-title`}>Модельный ряд </h2>

            <div className={styles.cardWrap}>
                {products.map(product => (
                    <article key={product.id} className={styles.card}>
                        <div className={styles.imgWrap}>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                className={styles.swiper}
                            >
                                {product.images?.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={image}
                                            alt={'img' + index}
                                            height={400}
                                            width={100}
                                            sizes="100vw"
                                            className={styles.image}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className={styles.infoWrap}>
                            <h3>{product.name}</h3>
                            <div>
                                {product.price} ₽
                            </div>
                            <button>
                                Оставить заявку
                            </button>
                        </div>
                    </article>
                ))}
            </div>

        </div>
    )
}