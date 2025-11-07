"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";

import Image from "next/image";

import { ModalType, useModal } from "@/src/app/providers/ModalProvider";
import { countOwners } from "@/src/shared/lib/utils/count-owners";
import { formatPrice } from "@/src/shared/lib/utils/format-price";
import { Stock, SubmitModel } from "@/src/shared/types/types";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./StockModels.module.scss";

interface StockCardProps {
	stock: Stock;
}
export function StockCard({ stock }: StockCardProps) {
	const { openModal } = useModal();
	const galleryId: string = `gallery-${stock.id}`;

	const handleModal = (id: ModalType) => {
		const submitEquip: SubmitModel = {
			brand: stock.brand,
			model: stock.model,
			price: stock.discountSellingPrice,
			reprice: stock.sellingPrice,
		};

		openModal(id, submitEquip);
	};

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
								href={photo.value}
								data-fancybox={galleryId}
								data-caption={stock.model}
							>
								<div className={styles.imageContainer}>
									<Image
										src={photo.value}
										alt={`${stock.model} - изображение ${index + 1}`}
										fill
										className={styles.image}
									/>
								</div>
							</a>
						</SwiperSlide>
					))}
				</Swiper>

				{stock.mileage > 100 ? (
					<div className={styles.labelOld}>с пробегом</div>
				) : (
					<div className={styles.labelNew}>новый</div>
				)}
			</div>
			<div className={styles.infoWrap}>
				<div className={styles.infoTop}>
					<div>{stock.modification}</div>
					<div className={styles.colorWrap}>
						<span
							className={styles.color}
							style={{ backgroundColor: stock.color_code }}
						></span>
					</div>
				</div>
				<h3 className={styles.modelTitle}>
					{stock.brand} <span>{stock.model}</span>
				</h3>
				<div className={styles.chars}>
					<span>{stock.drive}</span>
					<span>{stock.modification.match(/\((.*?)\)/)?.[1]}</span>
					<span>{formatPrice(stock.mileage)} км</span>
					<span>{countOwners(stock.owners_count.toString())}</span>
					<span>{stock.gear}</span>
				</div>
				<div className={styles.prices}>
					<div className={styles.price}>
						от {formatPrice(stock.discountSellingPrice)} ₽
					</div>
					<div className={styles.oldPrice}>{formatPrice(stock.sellingPrice)} ₽</div>
				</div>
				<div className={styles.btnWrap}>
					<Button onClick={() => handleModal("order")} variant={"outline"}>
						Получить предложение ⭢
					</Button>
				</div>
			</div>
		</article>
	);
}
