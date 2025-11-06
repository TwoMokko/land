"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { getModels } from "@/src/shared/api";
import { Model } from "@/src/shared/types/types";

interface ModelsContextType {
	models: Model[];
	displayedModels: Model[];
	visibleCount: number;
	showMoreVisible: boolean;
	isLoading: boolean;
	error: string | null;
	ensureModelVisible: (modelSlug: string) => void;
	handleShowMore: () => void;
}

const ModelsContext = createContext<ModelsContextType | undefined>(undefined);

export function ModelsProvider({ children }: { children: React.ReactNode }) {
	const [models, setModels] = useState<Model[]>([]);
	const [displayedModels, setDisplayedModels] = useState<Model[]>([]);
	const [visibleCount, setVisibleCount] = useState<number>(3);
	const [showMoreVisible, setShowMoreVisible] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const itemsPerPage = 3;

	// Загрузка моделей
	useEffect(() => {
		const loadModels = async () => {
			try {
				setIsLoading(true);
				const modelsData = await getModels();
				setModels(modelsData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Ошибка загрузки моделей");
			} finally {
				setIsLoading(false);
			}
		};

		loadModels();
	}, []);

	// Обновление displayedModels
	useEffect(() => {
		const displayed = models.slice(0, visibleCount);
		setDisplayedModels(displayed);
		setShowMoreVisible(visibleCount < models.length);
	}, [models, visibleCount]);

	const handleShowMore = (): void => {
		setVisibleCount((prevCount) => prevCount + itemsPerPage);
	};

	const ensureModelVisible = (modelSlug: string): void => {
		const modelIndex = models.findIndex((model) => model.slug === modelSlug);
		if (modelIndex !== -1 && modelIndex >= visibleCount) {
			setVisibleCount(modelIndex + 1);
		}

		setTimeout(() => {
			const element = document.getElementById(modelSlug);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}, 100);
	};

	const value: ModelsContextType = {
		models,
		displayedModels,
		visibleCount,
		showMoreVisible,
		isLoading,
		error,
		ensureModelVisible,
		handleShowMore,
	};

	return <ModelsContext.Provider value={value}>{children}</ModelsContext.Provider>;
}

export function useModels() {
	const context = useContext(ModelsContext);
	if (context === undefined) {
		throw new Error("useModels must be used within a ModelsProvider");
	}
	return context;
}
