"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useRef } from "react";

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
										<svg
											width="5"
											height="9"
											viewBox="0 0 5 9"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M4.81499 1.12358L4.13896 0.454901L0.456824 4.09918C0.39747 4.15758 0.350366 4.22702 0.318222 4.30351C0.286079 4.37999 0.269531 4.46202 0.269531 4.54486C0.269531 4.62771 0.286079 4.70973 0.318222 4.78622C0.350366 4.86271 0.39747 4.93215 0.456824 4.99054L4.13896 8.63672L4.81435 7.96804L1.3584 4.54581L4.81499 1.12358Z"
												fill="#E73843"
											/>
										</svg>
									</div>
									<div className={styles.actionButtonNext}>
										<svg
											width="5"
											height="10"
											viewBox="0 0 5 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M0.185014 1.62358L0.861039 0.954901L4.54318 4.59918C4.60253 4.65758 4.64963 4.72702 4.68178 4.80351C4.71392 4.87999 4.73047 4.96202 4.73047 5.04486C4.73047 5.12771 4.71392 5.20973 4.68178 5.28622C4.64963 5.36271 4.60253 5.43215 4.54318 5.49054L0.861039 9.13672L0.185652 8.46804L3.6416 5.04581L0.185014 1.62358Z"
												fill="#E73843"
											/>
										</svg>
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
