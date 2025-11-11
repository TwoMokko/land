"use client";

import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";

import React from "react";

import Image from "next/image";

import { useModels } from "@/src/app/_providers/ModelsContext";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import styles from "@/src/widgets/models/ui/Models.module.scss";

export function ModelNav() {
	const { ensureModelVisible, models } = useModels();
	const { isMobile } = useDevice();

	const swiperConfig: SwiperOptions = {
		slidesPerView: "auto",
		spaceBetween: 10,
		freeMode: true,

		breakpoints: {
			1024: {
				slidesPerView: models.length,
				spaceBetween: 20,
				freeMode: false,
				navigation: false,
			},
		},
	};

	return (
		<div className={styles.navWrap}>
			<Swiper modules={[A11y]} {...swiperConfig}>
				{models.map((model) => (
					<SwiperSlide key={model.slug} className={styles.swiperSlide}>
						<a
							href={`#${model.slug}`}
							className={styles.navItem}
							onClick={() => ensureModelVisible(model.slug)}
						>
							<div className={styles.imageContainer}>
								<Image
									src={`/images/equipments/${model.slug}.png`}
									alt={model.name}
									fill
									sizes={isMobile ? "150px" : "100px"}
									className={styles.navImage}
								/>
							</div>
							<div className={styles.navInfo}>{model.name}</div>
						</a>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
