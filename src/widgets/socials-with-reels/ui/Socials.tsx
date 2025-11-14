"use client";

import React from "react";

import { ReelsBlock } from "./ReelsBlock";
import { SocialLinksBlock } from "./SocialLinksBlock";

import styles from "./Socials.module.scss";

export function SocialsWithReels({ idSection }: { idSection: string }) {
	return (
		<section id={idSection} className={styles.socials}>
			<div className="container">
				<h2 className={`${styles.sectionTitle} section-title`}>Пелетон в социальных сетях</h2>
			</div>
			<ReelsBlock />
			<div className="container">
				<SocialLinksBlock />
			</div>
		</section>
	);
}
