"use client";

import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useCallback, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

import { useModal } from "@/src/app/providers/ModalProvider";
import { ReelsData } from "@/src/shared/types/types";

import styles from "./ReelsModal.module.scss";

export function ReelsModal() {
	const { closeModal, modalData } = useModal();
	const reelsData = modalData as ReelsData;
	const swiperRef = useRef<SwiperType | null>(null);
	const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

	const isValidData = reelsData?.videos?.length > 0;

	// Управление видео
	const manageVideoPlayback = useCallback((activeIndex?: number) => {
		videoRefs.current.forEach((video, index) => {
			if (!video) return;

			if (index === activeIndex) {
				video.muted = false;
				video.controls = true;

				const playPromise = video.play();
				if (playPromise !== undefined) {
					playPromise.catch((error) => {
						if (error.name !== "AbortError") {
							console.warn("Video play failed:", error);
						}
					});
				}
			} else {
				video.pause();
				video.currentTime = 0;
				video.controls = false;
				video.muted = true;
			}
		});
	}, []);

	// Обработчик клавиш
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!swiperRef.current) return;

			const activeVideo = videoRefs.current.get(swiperRef.current.activeIndex);

			switch (e.code) {
				case "Escape":
					closeModal();
					break;
				case "ArrowLeft":
					swiperRef.current.slidePrev();
					break;
				case "ArrowRight":
					swiperRef.current.slideNext();
					break;
				case "Space":
				case "Enter":
					e.preventDefault();
					if (activeVideo) {
						activeVideo.paused ? activeVideo.play() : activeVideo.pause();
					}
					break;
			}
		},
		[closeModal],
	);

	useEffect(() => {
		if (!isValidData) {
			closeModal();
			return;
		}
	}, [isValidData, closeModal]);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => handleKeyDown(e);
		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("keydown", handleKey);
		};
	}, [handleKeyDown]);

	const handleSwiperInit = (swiper: SwiperType) => {
		swiperRef.current = swiper;

		setTimeout(() => {
			manageVideoPlayback(reelsData.initialIndex || 0);
		}, 100);
	};

	const handleVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
		if (el) {
			videoRefs.current.set(index, el);

			el.onended = () => {
				const isLastVideo = index === reelsData.videos.length - 1;

				if (isLastVideo) {
					closeModal();
				} else {
					swiperRef.current?.slideTo(index + 1);
				}
			};
		} else {
			videoRefs.current.delete(index);
		}
	};

	if (!isValidData) {
		return null;
	}

	return (
		<div className={styles.reelsModalOverlay} onClick={closeModal}>
			<button className={styles.closeButton} onClick={closeModal}>
				<MdOutlineClose />
			</button>

			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<Swiper
					effect={"coverflow"}
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={"auto"}
					spaceBetween={20}
					initialSlide={reelsData.initialIndex || 0}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 0,
						modifier: 0,
						scale: 0.7,
						slideShadows: false,
					}}
					navigation={{
						nextEl: `.${styles.swiperButtonNext}`,
						prevEl: `.${styles.swiperButtonPrev}`,
					}}
					modules={[EffectCoverflow, Navigation]}
					className={styles.videoSwiper}
					onTransitionEnd={(swiper) => {
						manageVideoPlayback(swiper.activeIndex);
					}}
					onSwiper={handleSwiperInit}
					slideToClickedSlide={true}
				>
					{reelsData.videos.map((video, index) => (
						<SwiperSlide key={video.id} className={styles.videoSlide}>
							<div className={styles.videoContainer}>
								<video
									ref={handleVideoRef(index)}
									src={video.url}
									muted
									preload="auto"
									playsInline
								/>
								{video.title && (
									<div className={styles.videoTitle}>{video.title}</div>
								)}
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<div className={styles.swiperButtonPrev}>
					<IoIosArrowBack />
				</div>
				<div className={styles.swiperButtonNext}>
					<IoIosArrowForward />
				</div>
			</div>
		</div>
	);
}
