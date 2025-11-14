"use client";

import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { modelReels } from "@/src/shared/config";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { ReelsItem } from "@/src/shared/types/types";

import styles from "./ReelsBlock.module.scss";

const getRealIndex = (index: number, length: number): number => index % length;
const getPrevIndex = (realIndex: number, length: number): number =>
	(realIndex - 1 + length) % length;
const getNextIndex = (realIndex: number, length: number): number => (realIndex + 1) % length;

const playVideoSafely = async (video: HTMLVideoElement | null, muted = true): Promise<void> => {
	if (!video) return;
	video.muted = muted;
	try {
		await video.play();
	} catch (error) {
		if (error instanceof Error && error.name !== "AbortError") {
			console.warn(error);
		}
	}
};

const pauseVideo = (video: HTMLVideoElement | null): void => {
	if (!video) return;
	video.pause();
	video.currentTime = 0;
	video.load();
};

export function ReelsBlock(): React.ReactNode {
	const { openModal } = useModal();
	const { isMobile } = useDevice();
	const videos: ReelsItem[] = modelReels;
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);
	const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
	const swiperRef = useRef<SwiperType | null>(null);
	const [activeIndex, setActiveIndex] = useState(isMobile ? 1 : 0);
	const [isSoundOn, setIsSoundOn] = useState(false);
	const realIndex = videos.length ? getRealIndex(activeIndex, videos.length) : 0;

	useEffect(() => {
		if (!isMobile || videos.length === 0) return;

		videoRefs.current.forEach((video) => {
			pauseVideo(video);
		});

		const activeVideo = videoRefs.current.get(realIndex) ?? null;
		playVideoSafely(activeVideo);

		const prevIndex = getPrevIndex(realIndex, videos.length);
		const nextIndex = getNextIndex(realIndex, videos.length);
		[prevIndex, nextIndex].forEach((idx) => {
			const video = videoRefs.current.get(idx);
			if (video) {
				video.preload = "auto";
				video.load();
			}
		});
	}, [activeIndex, isMobile, realIndex, videos.length]);

	useEffect(() => {
		if (!swiperRef.current || !prevRef.current || !nextRef.current) return;

		const swiper = swiperRef.current;
		const navigationParams = swiper.params.navigation;

		if (navigationParams && typeof navigationParams === "object") {
			navigationParams.prevEl = prevRef.current;
			navigationParams.nextEl = nextRef.current;
			swiper.navigation.init();
			swiper.navigation.update();
		}

		if (isMobile && swiper.slides.length > 1) {
			const currentIndex = swiper.realIndex ?? swiper.activeIndex;
			if (currentIndex !== 1) {
				swiper.slideTo(1, 0);
			}
		}
	}, [isMobile]);

	const handleVideoClick = (index: number) => {
		if (isMobile) return;
		openModal("socials-video", {
			videos: videos,
			initialIndex: index,
		});
	};

	const handleVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
		if (el) {
			videoRefs.current.set(index, el);
			if (isMobile && videos.length > 0 && index === realIndex) {
				playVideoSafely(el, !isSoundOn);
			}
		} else {
			videoRefs.current.delete(index);
		}
	};

	const handleVideoHover = (index: number) => {
		if (isMobile) return;
		const video = videoRefs.current.get(index) ?? null;
		playVideoSafely(video);
	};

	const handleVideoLeave = (index: number) => {
		if (isMobile) return;
		const video = videoRefs.current.get(index) ?? null;
		pauseVideo(video);
	};

	const handleSlideChange = (swiper: SwiperType) => {
		const realIndex = swiper.realIndex ?? swiper.activeIndex;
		setActiveIndex(realIndex);
	};

	const getVideoPreload = (index: number): "auto" | "metadata" => {
		if (!isMobile || videos.length === 0) return "metadata";

		const realIndex = getRealIndex(activeIndex, videos.length);
		const prevIndex = getPrevIndex(realIndex, videos.length);
		const nextIndex = getNextIndex(realIndex, videos.length);

		return index === prevIndex || index === realIndex || index === nextIndex
			? "auto"
			: "metadata";
	};

	useEffect(() => {
		if (!isMobile) return;
		const activeVideo = videoRefs.current.get(realIndex);
		if (!activeVideo) return;
		activeVideo.muted = !isSoundOn;
		if (isSoundOn && activeVideo.paused) {
			void playVideoSafely(activeVideo, false);
		}
	}, [isMobile, isSoundOn, realIndex]);

	const toggleSound = () => {
		if (!isMobile) return;
		const nextState = !isSoundOn;
		setIsSoundOn(nextState);

		const activeVideo = videoRefs.current.get(realIndex);
		if (activeVideo) {
			activeVideo.muted = !nextState;
			if (nextState && activeVideo.paused) {
				void playVideoSafely(activeVideo, false);
			}
		}
	};

	const paginationConfig = useMemo(
		() =>
			isMobile
				? {
						clickable: true,
						el: `.${styles.reelsPagination}`,
						dynamicBullets: true,
					}
				: false,
		[isMobile],
	);

	const navigationConfig = useMemo(
		() => ({
			nextEl: nextRef.current,
			prevEl: prevRef.current,
		}),
		[],
	);

	return (
		<>
			<div className={styles.reelsWrapper}>
				<div className="container">
					<Swiper
						modules={[Navigation, Pagination]}
						slidesPerView={"auto"}
						loop={true}
						spaceBetween={isMobile ? 0 : 4}
						initialSlide={isMobile ? 1 : 0}
						centeredSlides={isMobile}
						pagination={paginationConfig}
						navigation={navigationConfig}
						onSwiper={(swiper) => {
							swiperRef.current = swiper;
							if (isMobile && swiper.slides.length > 1) {
								setTimeout(() => {
									const realIndex = swiper.realIndex ?? swiper.activeIndex;
									if (realIndex !== 1) {
										swiper.slideTo(1, 0);
									}
								}, 0);
							}
						}}
						onSlideChange={handleSlideChange}
						onInit={(swiper) => {
							const realIndex = swiper.realIndex ?? swiper.activeIndex;
							setActiveIndex(realIndex);
							if (isMobile && swiper.slides.length > 1) {
								setTimeout(() => {
									if (realIndex !== 1) {
										swiper.slideTo(1, 0);
									}
								}, 0);
							}
						}}
						className={styles.reelsSwiper}
					>
						{videos.map((video, index) => (
							<SwiperSlide key={video.id} className={styles.videoWrapper}>
								<div
									className={styles.videoItem}
									onClick={() => handleVideoClick(index)}
									onMouseEnter={() => handleVideoHover(index)}
									onMouseLeave={() => handleVideoLeave(index)}
									style={
										isMobile && video.poster
											? {
													backgroundImage: `url(${video.poster})`,
													backgroundSize: "cover",
													backgroundPosition: "center",
												}
											: undefined
									}
								>
									{isMobile && index === realIndex && (
										<button
											type="button"
											className={styles.soundToggle}
											onClick={(event) => {
												event.stopPropagation();
												toggleSound();
											}}
											aria-label={
												isSoundOn ? "Выключить звук" : "Включить звук"
											}
										>
											{isSoundOn ? (
												<IoMdVolumeHigh size={18} />
											) : (
												<IoMdVolumeOff size={18} />
											)}
										</button>
									)}
									<video
										ref={handleVideoRef(index)}
										className={styles.video}
										src={video.url}
										muted={isMobile ? index !== realIndex || !isSoundOn : true}
										loop
										playsInline
										preload={getVideoPreload(index)}
										poster={video.poster}
									/>
									<div className={styles.overlay}>
										<p className={styles.reelTitle}>{video.title}</p>
										{video.subtitle && !isMobile && (
											<p className={styles.reelViews}>{video.subtitle}</p>
										)}
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					{!isMobile && (
						<div className={styles.reelsNavWrapper}>
							<div className={styles.reelsNav}>
								<button
									ref={prevRef}
									className={styles.reelsPrev}
									aria-label="Предыдущий слайд"
								>
									<IoIosArrowBack size={30} />
								</button>
								<button
									ref={nextRef}
									className={styles.reelsNext}
									aria-label="Следующий слайд"
								>
									<IoIosArrowForward size={30} />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{isMobile && (
				<>
					<Image
						src="/images/socials-with-reels/reels-phone.webp"
						alt="reels-phone"
						width={249}
						height={500}
						className={styles.reelsPhone}
						priority={false}
					/>
					<div className={styles.reelsNavMob}>
						<div className={styles.reelsPagination}></div>
						<div className={styles.reelsNav}>
							<button
								ref={prevRef}
								className={styles.reelsPrev}
								aria-label="Предыдущий слайд"
							>
								<IoIosArrowBack size={30} />
							</button>
							<button
								ref={nextRef}
								className={styles.reelsNext}
								aria-label="Следующий слайд"
							>
								<IoIosArrowForward size={30} />
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}
