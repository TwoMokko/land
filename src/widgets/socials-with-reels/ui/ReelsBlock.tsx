"use client";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Image from "next/image";

import { useModal } from "@/src/app/_providers/ModalProvider";
import { modelReels } from "@/src/shared/config";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";
import { ReelsItem } from "@/src/shared/types/types";

import { useReelsSound } from "../hooks/useReelsSound";
import { useReelsSwiper } from "../hooks/useReelsSwiper";
import { useReelsVideos } from "../hooks/useReelsVideos";

import { ReelsSlide } from "./ReelsSlide";

import styles from "./ReelsBlock.module.scss";

export function ReelsBlock(): React.ReactNode {
	const { openModal } = useModal();
	const { isMobile } = useDevice();
	const videos: ReelsItem[] = modelReels;
	const [activeIndex, setActiveIndex] = useState(isMobile ? 1 : 0);

	const {
		prevRef,
		nextRef,
		paginationConfig,
		navigationConfig,
		handleSlideChange,
		handleSwiperInit,
	} = useReelsSwiper({
		isMobile,
		onActiveIndexChange: setActiveIndex,
		paginationSelector: `.${styles.reelsPagination}`,
	});

	const {
		videoRefs,
		realIndex,
		handleVideoRef,
		handleVideoHover,
		handleVideoLeave,
		getVideoPreload,
	} = useReelsVideos({
		videos,
		isMobile,
		activeIndex,
	});

	const { isSoundOn, toggleSound } = useReelsSound({ isMobile, realIndex, videoRefs });

	const handleVideoClick = (index: number) => {
		if (isMobile) return;
		openModal("socials-video", {
			videos: videos,
			initialIndex: index,
		});
	};

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
						onSwiper={handleSwiperInit}
						onSlideChange={handleSlideChange}
						className={styles.reelsSwiper}
					>
						{videos.map((video, index) => (
							<SwiperSlide key={video.id} className={styles.videoWrapper}>
								<ReelsSlide
									video={video}
									index={index}
									isMobile={isMobile}
									isActive={index === realIndex}
									isSoundOn={isSoundOn}
									onVideoClick={handleVideoClick}
									onVideoHover={handleVideoHover}
									onVideoLeave={handleVideoLeave}
									onSoundToggle={toggleSound}
									getVideoPreload={getVideoPreload}
									videoRef={handleVideoRef(index)}
								/>
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
