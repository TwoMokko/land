"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useModal } from "@/src/app/providers/ModalProvider";
import { dataActions } from "@/src/shared/config/model-actions";

import styles from "./Actions.module.scss";

export function Actions() {
	const { openModal } = useModal();
	const currentSlideRef = useRef<HTMLSpanElement>(null);
	const totalSlidesRef = useRef<HTMLSpanElement>(null);

	return (
		<section className={styles.action}>
			<div className="container">
				<Swiper
					modules={[Navigation, Pagination]}
					slidesPerView="auto"
					spaceBetween={6}
					allowTouchMove={true}
					loop={false}
					navigation={{
						prevEl: `.${styles.actionButtonPrev}`,
						nextEl: `.${styles.actionButtonNext}`,
					}}
					pagination={{
						el: `.${styles.actionPagination}`,
						clickable: true,
						type: "custom",
						renderCustom: function (swiper, current, total) {
							if (currentSlideRef.current && totalSlidesRef.current) {
								currentSlideRef.current.textContent = "0" + current;
								totalSlidesRef.current.textContent = " / 0" + total;
							}

							let bullets = "";
							for (let i = 1; i <= total; i++) {
								bullets += `<span class="swiper-pagination-bullet ${
									i === current ? "swiper-pagination-bullet-active" : ""
								}"></span>`;
							}
							return bullets;
						},
					}}
					breakpoints={{
						768: {
							slidesPerView: 3,
							spaceBetween: 18,
						},
					}}
					className={styles.swiperAction}
				>
					<div slot="container-start" className={styles.actionTop}>
						<h2 className={`${styles.actionLinksTitle} section-title`}>Акции</h2>
						<div className={styles.actionControls}>
							<div className={styles.actionControlsTop}>
								<div className={styles.actionButtonWrap}>
									<div className={styles.actionButtonPrev}>
										<IoIosArrowBack />
									</div>
									<div className={styles.actionButtonNext}>
										<IoIosArrowForward />
									</div>
								</div>
								<div className={styles.actionPaginationCounter}>
									<span ref={currentSlideRef}>01</span>
									<span ref={totalSlidesRef}> / 04</span>
								</div>
							</div>
							<div className={styles.actionPagination}></div>
						</div>
					</div>

					{dataActions.map((item) => (
						<SwiperSlide key={item.id} className={styles.actionSlide}>
							{item.icon && <div className={styles.actionIconWrap}>{item.icon}</div>}
							<h3 className={styles.actionTitle}>{item.title}</h3>
							<p className={styles.actionSubtitle}>{item.subtitle}</p>
							<a
								href="#"
								className={styles.actionLink}
								onClick={(e) => {
									e.preventDefault();
									openModal(item.link);
								}}
							>
								Узнать подробнее
							</a>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
