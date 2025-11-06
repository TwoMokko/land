"use client";

import React from "react";

import styles from "./StockModels.module.scss";

export function StockModels({
	idSection,
	titleSection,
}: {
	idSection: string;
	titleSection: string;
}) {
	return (
		<section id={idSection} className="container">
			<div className={styles.stockModels}>
				<h2 className={`${styles.title} section-title`}>{titleSection}</h2>
			</div>
		</section>
	);
}
