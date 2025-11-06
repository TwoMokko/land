"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";

import Image from "next/image";

import { formatPrice } from "@/src/shared/lib/utils/format-price";
import { Stock } from "@/src/shared/types/types";

import styles from "./StockModels.module.scss";

interface StockCardProps {
	stock: Stock;
}
export function StockCard({ stock }: StockCardProps) {
	const galleryId: string = `gallery-${stock.id}`;

	return (
		<article className={styles.card}>
			<div className={styles.imgWrap}>
				<Swiper
					modules={[Navigation]}
					slidesPerView={1}
					navigation
					className={styles.mainSwiper}
				>
					{stock.photos.map((photo, index) => (
						<SwiperSlide key={index} className={styles.swiperSlide}>
							<a
								href={photo.path}
								data-fancybox={galleryId}
								data-caption={stock.model.name}
							>
								<div className={styles.imageContainer}>
									<Image
										src={photo.path}
										alt={`${stock.model.name} - изображение ${index + 1}`}
										fill
										className={styles.image}
									/>
								</div>
							</a>
						</SwiperSlide>
					))}
				</Swiper>

				{/* проверка */}
				<div className={styles.label}>с пробегом</div>
			</div>
			<div className={styles.infoWrap}>
				<h3 className={styles.modelTitle}>
					{stock.brand.name} <span>{stock.model.name}</span>
				</h3>
				<div className={styles.chars}>
					<span>{stock.drive}</span>
					<span>{stock.modification.match(/\((.*?)\)/)?.[1]}</span>
					<span>{formatPrice(stock.mileage)}</span>
					<span>2 владельца</span>
					<span>мкпп</span>
				</div>
				<div className={styles.prices}>
					<div className={styles.price}>
						от {formatPrice(stock.discountSellingPrice)} ₽
					</div>
					<div className={styles.oldPrice}>{formatPrice(stock.sellingPrice)} ₽</div>
				</div>
			</div>
		</article>
	);
}
