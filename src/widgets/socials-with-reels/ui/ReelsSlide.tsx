import React from "react";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";

import type { ReelsItem } from "@/src/shared/types/types";

import styles from "./ReelsBlock.module.scss";

interface ReelsSlideProps {
	video: ReelsItem;
	index: number;
	isMobile: boolean;
	isActive: boolean;
	isSoundOn: boolean;
	onVideoClick: (index: number) => void;
	onVideoHover: (index: number) => void;
	onVideoLeave: (index: number) => void;
	onSoundToggle: () => void;
	getVideoPreload: (index: number) => "auto" | "metadata";
	videoRef: (el: HTMLVideoElement | null) => void;
}

export const ReelsSlide: React.FC<ReelsSlideProps> = ({
	video,
	index,
	isMobile,
	isActive,
	isSoundOn,
	onVideoClick,
	onVideoHover,
	onVideoLeave,
	onSoundToggle,
	getVideoPreload,
	videoRef,
}) => {
	const handleSoundToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onSoundToggle();
	};

	return (
		<div
			className={styles.videoItem}
			onClick={() => onVideoClick(index)}
			onMouseEnter={() => onVideoHover(index)}
			onMouseLeave={() => onVideoLeave(index)}
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
			{isMobile && isActive && (
				<button
					type="button"
					className={styles.soundToggle}
					onClick={handleSoundToggle}
					aria-label={isSoundOn ? "Выключить звук" : "Включить звук"}
				>
					{isSoundOn ? <IoMdVolumeHigh size={18} /> : <IoMdVolumeOff size={18} />}
				</button>
			)}

			<video
				ref={videoRef}
				className={styles.video}
				src={video.url}
				muted={isMobile ? !isActive || !isSoundOn : true}
				loop
				playsInline
				preload={getVideoPreload(index)}
				poster={video.poster}
			/>

			<div className={styles.overlay}>
				<p className={styles.reelTitle}>{video.title}</p>
				{video.subtitle && !isMobile && <p className={styles.reelViews}>{video.subtitle}</p>}
			</div>
		</div>
	);
};

