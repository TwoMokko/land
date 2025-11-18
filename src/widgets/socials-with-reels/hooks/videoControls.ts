export const playVideoSafely = async (
	video: HTMLVideoElement | null,
	muted = true,
): Promise<void> => {
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

export const pauseVideo = (video: HTMLVideoElement | null): void => {
	if (!video) return;
	video.pause();
	video.currentTime = 0;
	video.load();
};
