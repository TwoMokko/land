"use client";

import React from "react";
import Select from "react-select";

import { customSelectStyles } from "@/src/shared/config";
import { useStockFilters } from "@/src/shared/lib/hooks/ useStockFilters";
import { Button } from "@/src/shared/ui/button/Button";
import { StockCard } from "@/src/widgets/stock/ui/StockCard";

import styles from "./StockModels.module.scss";

export function StockModels({
	idSection,
	titleSection,
}: {
	idSection: string;
	titleSection: string;
}) {
	const {
		displayedStocks,
		isLoading,
		error,
		filteredStocks,
		brandOptions,
		modelOptions,
		categoryOptions,
		sortOptions,
		selectedBrands,
		selectedModels,
		selectedCategory,
		selectedSort,
		showMoreVisible,
		handleBrandChange,
		handleModelChange,
		handleCategoryChange,
		handleSortChange,
		handleShowMore,
		resetFilters,
	} = useStockFilters();

	if (isLoading) {
		return <div className={styles.loading}>Загрузка авто в наличии...</div>;
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	return (
		<section id={idSection} className="container">
			<div className={styles.stockModels}>
				<h2 className={`${styles.title} section-title`}>{titleSection}</h2>

				<div className={styles.filters}>
					<Select
						options={brandOptions}
						value={selectedBrands}
						onChange={handleBrandChange}
						placeholder="Марка"
						className={styles.select}
						styles={customSelectStyles}
						isMulti
						isClearable
					/>

					<Select
						options={modelOptions}
						value={selectedModels}
						onChange={handleModelChange}
						placeholder="Модель"
						className={styles.select}
						styles={customSelectStyles}
						isMulti
						isClearable
					/>

					<Select
						options={categoryOptions}
						value={selectedCategory}
						onChange={handleCategoryChange}
						placeholder="Категория"
						className={styles.select}
						styles={customSelectStyles}
						isClearable
					/>

					<Select
						options={sortOptions}
						value={selectedSort}
						onChange={handleSortChange}
						placeholder="Сортировка"
						className={styles.select}
						styles={customSelectStyles}
						isClearable
					/>
				</div>
				<div className={styles.filtersInfo}>
					<div className={styles.resultsCount}>Найдено: {filteredStocks.length} авто</div>
					<Button onClick={resetFilters} variant="outline" className={styles.resetButton}>
						Сбросить всё
					</Button>
				</div>

				<div className={styles.cardWrap}>
					{displayedStocks.map((item) => (
						<StockCard stock={item} key={item.id} />
					))}
				</div>

				{displayedStocks.length === 0 && (
					<div className={styles.noResults}>По вашему запросу ничего не найдено</div>
				)}

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
