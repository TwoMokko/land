import { useCallback, useEffect, useState } from "react";

import { playVideoSafely } from "./videoControls";

interface UseReelsSoundParams {
	isMobile: boolean;
	realIndex: number;
	videoRefs: React.MutableRefObject<Map<number, HTMLVideoElement>>;
}

export const useReelsSound = ({ isMobile, realIndex, videoRefs }: UseReelsSoundParams) => {
	const [isSoundOn, setIsSoundOn] = useState(false);

	useEffect(() => {
		if (!isMobile) return;
		const activeVideo = videoRefs.current.get(realIndex);
		if (!activeVideo) return;

		activeVideo.muted = !isSoundOn;
		if (isSoundOn && activeVideo.paused) {
			void playVideoSafely(activeVideo, false);
		}
	}, [isMobile, isSoundOn, realIndex, videoRefs]);

	const toggleSound = useCallback(() => {
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
	}, [isMobile, isSoundOn, realIndex, videoRefs]);

	return {
		isSoundOn,
		toggleSound,
	};
};

