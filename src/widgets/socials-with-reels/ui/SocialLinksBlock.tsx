"use client";

import React from "react";
import { IoMdStar } from "react-icons/io";

import Image from "next/image";
import Link from "next/link";

import { socialLinks } from "@/src/shared/config/model-base";
import { useDevice } from "@/src/shared/lib/hooks/useDevice";

import styles from "./SocialLinksBlock.module.scss";

export function SocialLinksBlock() {
	const { isMobile } = useDevice();

	return (
		<div className={styles.socialsBlocksWrapper}>
			<div className={styles.socialsLeft}>
				<p className={styles.socialsBottomTitle}>
					Присоединяйтесь
					{isMobile && <br />} к 1000 довольных клиентов
				</p>
				<div className={styles.socialsLeftContent}>
					{/* Яндекс */}
					<div className={styles.socialsLeftContentItem}>
						<Image
							src="/images/socials-with-reels/ya-logo.png"
							alt="Яндекс"
							width={121}
							height={24}
							className={styles.leftContentItemLogo}
						/>
						<div className={styles.leftContentItemBottom}>
							<div className={styles.leftContentItemBottomRating}>
								{!isMobile && (
									<Image
										src="/images/socials-with-reels/ya-icon.svg"
										alt="Яндекс"
										width={28}
										height={28}
										className={styles.leftContentItemBottomRatingLogo}
									/>
								)}
								5,0
								<div className={styles.leftContentItemBottomRatingStars}>
									{Array.from({ length: 5 }).map((_, index) => (
										<IoMdStar key={index} aria-hidden="true" />
									))}
								</div>
							</div>
							<div className={styles.leftContentItemBottomReviews}>
								На основе 5 000 отзывов
							</div>
							<a
								href="https://yandex.ru/maps/org/peleton_avto_s_probegom/177034082797/?ll=37.469854%2C55.628937&z=17"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.leftContentItemBottomHref}
							>
								Перейти в Я.Карты
							</a>
						</div>
					</div>

					{/* Авито */}
					<div className={styles.socialsLeftContentItem}>
						<Image
							src="/images/socials-with-reels/avito-logo.svg"
							alt="Авито"
							width={76}
							height={24}
							className={styles.leftContentItemLogo}
						/>
						<div className={styles.leftContentItemBottom}>
							<div className={styles.leftContentItemBottomRating}>
								4,9
								<div className={styles.leftContentItemBottomRatingStars}>
									{Array.from({ length: 5 }).map((_, index) => (
										<IoMdStar key={index} aria-hidden="true" />
									))}
								</div>
							</div>
							<div className={styles.leftContentItemBottomReviews}>
								На основе 5 000 отзывов
							</div>
							<a
								href="https://www.avito.ru/brands/peleton/all/avtomobili"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.leftContentItemBottomHref}
							>
								Перейти в Авито
							</a>
						</div>
					</div>

					{/* 2ГИС */}
					<div className={styles.socialsLeftContentItem}>
						<Image
							src="/images/socials-with-reels/gis-logo.png"
							alt="2ГИС"
							width={82}
							height={24}
							className={styles.leftContentItemLogo}
						/>
						<div className={styles.leftContentItemBottom}>
							<div className={styles.leftContentItemBottomRating}>
								4,8
								<div className={styles.leftContentItemBottomRatingStars}>
									{Array.from({ length: 5 }).map((_, index) => (
										<IoMdStar key={index} aria-hidden="true" />
									))}
								</div>
							</div>
							<div className={styles.leftContentItemBottomReviews}>
								На основе 5 000 отзывов
							</div>
							<a
								href="https://2gis.ru/moscow/firm/70000001089638586"
								target="_blank"
								rel="noopener noreferrer"
								className={styles.leftContentItemBottomHref}
							>
								Перейти в 2ГИС
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.socialsRight}>
				<p className={styles.socialsBottomTitle}>Будь в центре событий</p>
				<div className={styles.socialsRightContent}>
					{/* Instagram */}
					<div className={styles.socialsRightContentItem}>
						<div className={styles.rightContentItemTop}>
							<Image
								src="/images/socials-with-reels/right-inst.svg"
								alt="Instagram"
								width={76}
								height={76}
								className={styles.rightLogo}
							/>
							<div className={styles.rightContentItemTopInfo}>
								<div className={styles.rightContentItemTopInfoTitle}>
									{isMobile ? (
										<p className={styles.rightContentItemTopInfoNum}>
											10+
											<br />
											млн
										</p>
									) : (
										<p className={styles.rightContentItemTopInfoNum}>
											10 000 000 +
										</p>
									)}
									<p className={styles.rightContentItemTopInfoText}>
										Просмотров наших Reels <br />
										Следи за авто-трендами
									</p>
								</div>
								<Link
									href={socialLinks.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.rightContentItemTopInfoBtn}
								>
									Перейти в Instagram*
								</Link>
							</div>
						</div>
						<div className={styles.rightContentItemBottom}>
							*Instagram — проект Meta Platforms Inc., <br />
							деятельность которой запрещена в России
						</div>
					</div>

					{/* Telegram */}
					<div className={styles.socialsRightContentItem}>
						<div className={styles.rightContentItemTop}>
							<Image
								src="/images/socials-with-reels/right-tg.svg"
								alt="Telegram"
								width={76}
								height={76}
								className={styles.rightLogo}
							/>
							<div className={styles.rightContentItemTopInfo}>
								<div className={styles.rightContentItemTopInfoTitle}>
									<p className={styles.rightContentItemTopInfoNum}>400+</p>
									<p className={styles.rightContentItemTopInfoText}>
										Эксклюзивных постов <br />о скидках и новостях
									</p>
								</div>
								<Link
									href={socialLinks.telegram}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.rightContentItemTopInfoBtn}
								>
									Перейти в Telegram
								</Link>
							</div>
						</div>
						<div className={styles.rightContentItemBottom}>
							Telegram:{" "}
							<a
								href={socialLinks.telegram}
								target="_blank"
								rel="noopener noreferrer"
							>
								@peletonofficial
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
