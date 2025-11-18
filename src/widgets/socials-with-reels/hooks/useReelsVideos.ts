import { useCallback, useEffect, useMemo, useRef } from "react";

import type { ReelsItem } from "@/src/shared/types/types";

import { pauseVideo, playVideoSafely } from "./videoControls";

const getRealIndex = (index: number, length: number): number => index % length;
const getPrevIndex = (realIndex: number, length: number): number =>
	(realIndex - 1 + length) % length;
const getNextIndex = (realIndex: number, length: number): number => (realIndex + 1) % length;

interface UseReelsVideosParams {
	videos: ReelsItem[];
	isMobile: boolean;
	activeIndex: number;
}

export const useReelsVideos = ({ videos, isMobile, activeIndex }: UseReelsVideosParams) => {
	const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

	const realIndex = useMemo(
		() => (videos.length ? getRealIndex(activeIndex, videos.length) : 0),
		[activeIndex, videos.length],
	);

	useEffect(() => {
		if (!isMobile || videos.length === 0) return;

		videoRefs.current.forEach((video) => {
			pauseVideo(video);
		});

		const activeVideo = videoRefs.current.get(realIndex) ?? null;
		void playVideoSafely(activeVideo);

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

	const handleVideoRef = useCallback(
		(index: number) => (el: HTMLVideoElement | null) => {
			if (el) {
				videoRefs.current.set(index, el);
				if (isMobile && videos.length > 0 && index === realIndex) {
					void playVideoSafely(el);
				}
			} else {
				videoRefs.current.delete(index);
			}
		},
		[isMobile, realIndex, videos.length],
	);

	const handleVideoHover = useCallback(
		(index: number) => {
			if (isMobile) return;
			const video = videoRefs.current.get(index) ?? null;
			void playVideoSafely(video);
		},
		[isMobile],
	);

	const handleVideoLeave = useCallback(
		(index: number) => {
			if (isMobile) return;
			const video = videoRefs.current.get(index) ?? null;
			pauseVideo(video);
		},
		[isMobile],
	);

	const getVideoPreload = useCallback(
		(index: number): "auto" | "metadata" => {
			if (!isMobile || videos.length === 0) return "metadata";

			const localRealIndex = getRealIndex(activeIndex, videos.length);
			const prevIndex = getPrevIndex(localRealIndex, videos.length);
			const nextIndex = getNextIndex(localRealIndex, videos.length);

			return index === prevIndex || index === localRealIndex || index === nextIndex
				? "auto"
				: "metadata";
		},
		[activeIndex, isMobile, videos.length],
	);

	return {
		videoRefs,
		realIndex,
		handleVideoRef,
		handleVideoHover,
		handleVideoLeave,
		getVideoPreload,
	};
};

