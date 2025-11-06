"use client";

import React from "react";

import { useModels } from "@/src/app/providers/ModelsContext";
import { Button } from "@/src/shared/ui/button/Button";
import { ModelCard } from "@/src/widgets/models/ui/ModelCard";
import { ModelNav } from "@/src/widgets/models/ui/ModelNav";

import styles from "./Models.module.scss";

export function Models({ idSection, titleSection }: { idSection: string; titleSection: string }) {
	const { displayedModels, showMoreVisible, isLoading, error, handleShowMore } = useModels();

	if (isLoading) {
		return <div className={styles.loading}>Загрузка моделей...</div>;
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	return (
		<section id={idSection} className="container">
			<div className={styles.models}>
				<h2 className={`${styles.title} section-title`}>{titleSection}</h2>

				<ModelNav />

				<div className={styles.cardWrap}>
					{displayedModels.map((model) => (
						<ModelCard key={model.slug} model={model} />
					))}
				</div>

				{showMoreVisible && (
					<div className={styles.showMoreWrap}>
						<Button onClick={handleShowMore} variant="secondary">
							Показать ещё
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
