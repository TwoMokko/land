"use client";

import React from "react";
import { IoMdStar } from "react-icons/io";

import Image from "next/image";
import Link from "next/link";

import { socialPromos, socialRatings } from "@/src/shared/config";
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
					{socialRatings.map((item) => (
						<div key={item.id} className={styles.socialsLeftContentItem}>
							<Image
								src={item.logo.src}
								alt={item.logo.alt}
								width={item.logo.width}
								height={item.logo.height}
								className={styles.leftContentItemLogo}
							/>
							<div className={styles.leftContentItemBottom}>
								<div className={styles.leftContentItemBottomRating}>
									{!isMobile && item.badge && (
										<Image
											src={item.badge.src}
											alt={item.badge.alt}
											width={item.badge.width}
											height={item.badge.height}
											className={styles.leftContentItemBottomRatingLogo}
										/>
									)}
									{item.rating}
									<div className={styles.leftContentItemBottomRatingStars}>
										{Array.from({ length: 5 }).map((_, index) => (
											<IoMdStar key={index} aria-hidden="true" />
										))}
									</div>
								</div>
								<div className={styles.leftContentItemBottomReviews}>
									{item.reviewsText}
								</div>
								<a
									href={item.link.url}
									target="_blank"
									rel="noopener noreferrer"
									className={styles.leftContentItemBottomHref}
								>
									{item.link.label}
								</a>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={styles.socialsRight}>
				<p className={styles.socialsBottomTitle}>Будь в центре событий</p>
				<div className={styles.socialsRightContent}>
					{socialPromos.map((promo) => (
						<div key={promo.id} className={styles.socialsRightContentItem}>
							<div className={styles.rightContentItemTop}>
								<Image
									src={promo.logo.src}
									alt={promo.logo.alt}
									width={promo.logo.width}
									height={promo.logo.height}
									className={styles.rightLogo}
								/>
								<div className={styles.rightContentItemTopInfo}>
									<div className={styles.rightContentItemTopInfoTitle}>
										{isMobile && promo.stat.mobileLines ? (
											(() => {
												const mobileLines = promo.stat.mobileLines ?? [];
												return (
													<p
														className={
															styles.rightContentItemTopInfoNum
														}
													>
														{mobileLines.map((line, idx) => (
															<React.Fragment
																key={`${promo.id}-stat-mobile-${line}-${idx}`}
															>
																{line}
																{idx !== mobileLines.length - 1 && (
																	<br />
																)}
															</React.Fragment>
														))}
													</p>
												);
											})()
										) : (
											<p className={styles.rightContentItemTopInfoNum}>
												{promo.stat.desktop}
											</p>
										)}
										<p className={styles.rightContentItemTopInfoText}>
											{promo.stat.description
												.split("\n")
												.map((line, idx, arr) => (
													<React.Fragment key={`${promo.id}-desc-${idx}`}>
														{line}
														{idx !== arr.length - 1 && <br />}
													</React.Fragment>
												))}
										</p>
									</div>
									<Link
										href={promo.button.url}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.rightContentItemTopInfoBtn}
									>
										{promo.button.label}
									</Link>
								</div>
							</div>
							<div className={styles.rightContentItemBottom}>
								{promo.footerNote &&
									promo.footerNote.split("\n").map((line, idx, arr) => (
										<React.Fragment key={`${promo.id}-note-${idx}`}>
											{line}
											{idx !== arr.length - 1 && <br />}
										</React.Fragment>
									))}
								{promo.footerLink && (
									<>
										{promo.footerNote && <br />}
										{promo.footerLink.prefix && `${promo.footerLink.prefix} `}
										<a
											href={promo.footerLink.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											{promo.footerLink.label}
										</a>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
