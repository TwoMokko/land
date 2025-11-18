import { useCallback, useEffect, useMemo, useRef } from "react";

import type { Swiper as SwiperType } from "swiper";
import type { SwiperOptions } from "swiper/types";

interface UseReelsSwiperParams {
	isMobile: boolean;
	onActiveIndexChange: (index: number) => void;
	paginationSelector: string;
}

export const useReelsSwiper = ({
	isMobile,
	onActiveIndexChange,
	paginationSelector,
}: UseReelsSwiperParams) => {
	const prevRef = useRef<HTMLButtonElement>(null);
	const nextRef = useRef<HTMLButtonElement>(null);
	const swiperRef = useRef<SwiperType | null>(null);

	const paginationConfig = useMemo(
		() =>
			isMobile
				? {
						clickable: true,
						el: paginationSelector,
						dynamicBullets: true,
					}
				: false,
		[isMobile, paginationSelector],
	);

	const navigationConfig = useMemo<SwiperOptions["navigation"]>(
		() => ({
			nextEl: nextRef.current,
			prevEl: prevRef.current,
		}),
		[],
	);

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

	const handleSlideChange = useCallback(
		(swiper: SwiperType) => {
			const realIndex = swiper.realIndex ?? swiper.activeIndex;
			onActiveIndexChange(realIndex);
		},
		[onActiveIndexChange],
	);

	const handleSwiperInit = useCallback(
		(swiper: SwiperType) => {
			swiperRef.current = swiper;
			const realIndex = swiper.realIndex ?? swiper.activeIndex;
			onActiveIndexChange(realIndex);

			if (isMobile && swiper.slides.length > 1) {
				setTimeout(() => {
					if (realIndex !== 1) {
						swiper.slideTo(1, 0);
					}
				}, 0);
			}
		},
		[isMobile, onActiveIndexChange],
	);

	return {
		prevRef,
		nextRef,
		paginationConfig,
		navigationConfig,
		handleSlideChange,
		handleSwiperInit,
	};
};

