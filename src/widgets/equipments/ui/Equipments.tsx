"use client";

import React from "react";
import Select from "react-select";

import { customSelectStyles } from "@/src/shared/config";
import { useEquipments } from "@/src/shared/lib/hooks/useEquipments";
import { Button } from "@/src/shared/ui/button/Button";

import styles from "./Equipments.module.scss";
import { EquipCard } from "./EquipCard";

export function Equipments({
	idSection,
	titleSection,
}: {
	idSection: string;
	titleSection: string;
}) {
	const {
		displayedEquipments,
		isLoading,
		error,
		selectedBrand,
		selectedModel,
		selectedEquipment,
		brandOptions,
		modelOptions,
		equipmentOptions,
		showMoreVisible,
		handleBrandChange,
		handleModelChange,
		handleEquipmentChange,
		handleShowMore,
	} = useEquipments();

	if (isLoading) {
		return <div className={styles.loading}>Загрузка комплектаций...</div>;
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	return (
		<section id={idSection}>
			<div className={styles.equipments}>
				<div className={`${styles.top} container`}>
					<h2 className={`${styles.title} section-title`}>{titleSection}</h2>
					<div className={styles.filters}>
						<Select
							options={brandOptions}
							value={selectedBrand}
							onChange={handleBrandChange}
							placeholder="Бренд"
							className={styles.select}
							styles={customSelectStyles}
							isClearable
						/>
						<Select
							options={modelOptions}
							value={selectedModel}
							onChange={handleModelChange}
							placeholder="Модель"
							className={styles.select}
							styles={customSelectStyles}
							isClearable
						/>
						<Select
							options={equipmentOptions}
							value={selectedEquipment}
							onChange={handleEquipmentChange}
							placeholder="Комплектация"
							className={styles.select}
							styles={customSelectStyles}
							isClearable
						/>
					</div>
				</div>

				<div className={styles.cardWrap}>
					{displayedEquipments.map((equip) => (
						<EquipCard key={equip.id} equip={equip} />
					))}
				</div>

				{showMoreVisible && (
					<div className={`${styles.showMoreWrap} container`}>
						<Button onClick={handleShowMore} variant="secondary">
							Показать ещё
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}
