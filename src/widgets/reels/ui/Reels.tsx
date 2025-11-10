"use client";

import React from "react";
import { FaPlay } from "react-icons/fa";

import { useModal } from "@/src/app/providers/ModalProvider";
import { modelReels } from "@/src/shared/config";
import { ReelsItem } from "@/src/shared/types/types";

import styles from "./Reels.module.scss";

export function Reels(): React.ReactNode {
	const { openModal } = useModal();
	const videos: ReelsItem[] = modelReels;

	const handleVideoClick = (index: number) => {
		openModal("video", {
			videos: videos,
			initialIndex: index,
		});
	};

	return (
		<section className={`${styles.reels} container`}>
			<div className={styles.reelsLine}>
				{videos.map((video, index) => (
					<div
						key={video.id}
						className={styles.reelsItem}
						onClick={() => handleVideoClick(index)}
					>
						<video className={styles.video} src={video.url} muted preload="metadata" />
						<div className={styles.play}>
							<FaPlay size={24} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
