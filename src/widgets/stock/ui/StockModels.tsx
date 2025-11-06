"use client";

import React, { useEffect, useState } from "react";

import { getStocks } from "@/src/shared/api/stocks";
import { Stock } from "@/src/shared/types/types";
import { StockCard } from "@/src/widgets/stock/ui/StockCard";

import styles from "./StockModels.module.scss";

export function StockModels({
	idSection,
	titleSection,
}: {
	idSection: string;
	titleSection: string;
}) {
	const [stocks, setStocks] = useState<Stock[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadStock = async () => {
			try {
				setIsLoading(true);
				const stocksData = await getStocks();

				setStocks(stocksData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Ошибка загрузки комплектаций");
			} finally {
				setIsLoading(false);
			}
		};

		loadStock();
	}, []);

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
				<div className={styles.cardWrap}>
					{stocks.map((item) => (
						<StockCard stock={item} key={item.id} />
					))}
				</div>
			</div>
		</section>
	);
}
