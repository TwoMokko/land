import { useEffect, useMemo, useState } from "react";

import { getStocks } from "@/src/shared/api/stocks";
import { PAGINATION_CONFIG } from "@/src/shared/config";
import { Stock } from "@/src/shared/types/types";

interface OptionType {
	value: string;
	label: string;
}

interface FilterState {
	brands: string[];
	models: string[];
	category: string;
	sort: string;
}

interface UseStockFiltersReturn {
	// Данные
	allStocks: Stock[];
	displayedStocks: Stock[];
	filteredStocks: Stock[];

	// Состояние
	isLoading: boolean;
	error: string | null;
	filters: FilterState;
	visibleCount: number;

	// Опции для селектов
	brandOptions: OptionType[];
	modelOptions: OptionType[];
	categoryOptions: OptionType[];
	sortOptions: OptionType[];

	// Значения для селектов
	selectedBrands: OptionType[];
	selectedModels: OptionType[];
	selectedCategory: OptionType | null;
	selectedSort: OptionType | null;

	// Флаги
	showMoreVisible: boolean;

	// Обработчики
	handleBrandChange: (selectedOptions: any) => void;
	handleModelChange: (selectedOptions: any) => void;
	handleCategoryChange: (selectedOption: any) => void;
	handleSortChange: (selectedOption: any) => void;
	handleShowMore: () => void;
	resetFilters: () => void;
}

export const useStockFilters = (): UseStockFiltersReturn => {
	const [allStocks, setAllStocks] = useState<Stock[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Состояние фильтров
	const [filters, setFilters] = useState<FilterState>({
		brands: [],
		models: [],
		category: "",
		sort: "",
	});

	// Пагинация
	const [visibleCount, setVisibleCount] = useState<number>(PAGINATION_CONFIG.STOCK.INITIAL);
	const loadMoreCount = PAGINATION_CONFIG.STOCK.LOAD_MORE;

	// Загрузка данных
	useEffect(() => {
		const loadStock = async () => {
			try {
				setIsLoading(true);
				const stocksData = await getStocks();

				// Фильтруем только электромобили и гибриды с фото
				const filteredStocks = stocksData.filter(
					(car) =>
						(car.engine === "Электро" || car.engine === "Гибрид") &&
						Array.isArray(car.photos) &&
						car.photos.length > 0,
				);

				setAllStocks(filteredStocks);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Ошибка загрузки авто");
			} finally {
				setIsLoading(false);
			}
		};

		loadStock();
	}, []);

	// Опции для брендов
	const brandOptions = useMemo(() => {
		const brands = [...new Set(allStocks.map((car) => car.brand))];
		return brands.map((brand) => ({ value: brand, label: brand }));
	}, [allStocks]);

	// Опции для моделей (зависят от выбранных брендов)
	const modelOptions = useMemo(() => {
		if (filters.brands.length === 0) {
			const allModels = [...new Set(allStocks.map((car) => car.model))];
			return allModels.map((model) => ({ value: model, label: model }));
		}

		// Сначала выбираем модели для отображения по бренду
		const filteredModels = allStocks
			.filter((car) => filters.brands.includes(car.brand))
			.map((car) => car.model);

		// А на основе моделей для отображения меняем select моделей
		const uniqueModels = [...new Set(filteredModels)];
		return uniqueModels.map((model) => ({ value: model, label: model }));
	}, [allStocks, filters.brands]);

	// Опции для категорий (можно вынести для удобного изменения)
	const categoryOptions = useMemo(
		() => [
			{ value: "", label: "Все" },
			{ value: "new", label: "Новые" },
			{ value: "used", label: "С пробегом" },
		],
		[],
	);

	// Опции для сортировки (можно вынести для удобного изменения)
	const sortOptions = useMemo(
		() => [
			{ value: "", label: "По умолчанию" },
			{ value: "popularity", label: "По популярности" },
			{ value: "price_asc", label: "Цена по возрастанию" },
			{ value: "price_desc", label: "Цена по убыванию" },
			{ value: "date", label: "По дате" },
			{ value: "mileage", label: "По пробегу" },
			{ value: "year_asc", label: "Год по возрастанию" },
			{ value: "year_desc", label: "Год по убыванию" },
		],
		[],
	);

	// Значения для селектов
	const selectedBrands = useMemo(() => {
		return filters.brands.map((brand) => ({ value: brand, label: brand }));
	}, [filters.brands]);

	const selectedModels = useMemo(() => {
		return filters.models.map((model) => ({ value: model, label: model }));
	}, [filters.models]);

	const selectedCategory = useMemo(() => {
		return categoryOptions.find((option) => option.value === filters.category) || null;
	}, [filters.category, categoryOptions]);

	const selectedSort = useMemo(() => {
		return sortOptions.find((option) => option.value === filters.sort) || null;
	}, [filters.sort, sortOptions]);

	// Отфильтрованные и отсортированные автомобили
	const filteredStocks = useMemo(() => {
		// взято из electro-peleton (какие на самом деле?)
		const popularBrands = ["lixiang", "zeekr", "rox"];

		let result = allStocks.filter((car) => {
			// Фильтрация по брендам
			const isBrandMatch = filters.brands.length === 0 || filters.brands.includes(car.brand);

			// Фильтрация по моделям
			const isModelMatch = filters.models.length === 0 || filters.models.includes(car.model);

			// Фильтрация по категории
			let isCatMatch = true;
			if (filters.category === "new") {
				isCatMatch = car.mileage < 100;
			} else if (filters.category === "used") {
				isCatMatch = car.mileage > 100;
			}

			return isBrandMatch && isModelMatch && isCatMatch;
		});

		// Сортировка
		if (filters.sort) {
			result.sort((a, b) => {
				switch (filters.sort) {
					case "popularity": {
						const aIndex = popularBrands.indexOf(a.brand.toLowerCase());
						const bIndex = popularBrands.indexOf(b.brand.toLowerCase());

						if (aIndex !== -1 && bIndex !== -1) {
							return aIndex - bIndex;
						}
						if (aIndex !== -1) return -1;
						if (bIndex !== -1) return 1;
						return a.model.localeCompare(b.model);
					}
					case "price_asc":
						return (a.discountSellingPrice || 0) - (b.discountSellingPrice || 0);
					case "price_desc":
						return (b.discountSellingPrice || 0) - (a.discountSellingPrice || 0);
					case "date":
						return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
					case "mileage":
						return a.mileage - b.mileage;
					case "year_asc":
						return a.year - b.year;
					case "year_desc":
						return b.year - a.year;
					default:
						return 0;
				}
			});
		}

		return result;
	}, [allStocks, filters]);

	// Автомобили для отображения (с пагинацией)
	const displayedStocks = useMemo(() => {
		return filteredStocks.slice(0, visibleCount);
	}, [filteredStocks, visibleCount]);

	// Проверка, нужно ли показывать кнопку "Показать еще"
	const showMoreVisible = visibleCount < filteredStocks.length;

	// Обработчики изменений фильтров
	const handleBrandChange = (selectedOptions: OptionType[]) => {
		const selectedBrands = selectedOptions
			? selectedOptions.map((opt: OptionType) => opt.value)
			: [];
		setFilters((prev) => ({
			...prev,
			brands: selectedBrands,
			models: [], // Сбрасываем модели при изменении брендов
		}));
		setVisibleCount(PAGINATION_CONFIG.STOCK.INITIAL); // Сбрасываем пагинацию
	};

	const handleModelChange = (selectedOptions: OptionType[]) => {
		const selectedModels = selectedOptions
			? selectedOptions.map((opt: OptionType) => opt.value)
			: [];
		setFilters((prev) => ({ ...prev, models: selectedModels }));
		setVisibleCount(PAGINATION_CONFIG.STOCK.INITIAL);
	};

	const handleCategoryChange = (selectedOption: OptionType) => {
		setFilters((prev) => ({
			...prev,
			category: selectedOption?.value || "",
		}));
		setVisibleCount(PAGINATION_CONFIG.STOCK.INITIAL);
	};

	const handleSortChange = (selectedOption: OptionType) => {
		setFilters((prev) => ({
			...prev,
			sort: selectedOption?.value || "",
		}));
		setVisibleCount(PAGINATION_CONFIG.STOCK.INITIAL);
	};

	// Показать еще
	const handleShowMore = () => {
		setVisibleCount((prev) => prev + loadMoreCount);
	};

	// Сброс всех фильтров
	const resetFilters = () => {
		setFilters({
			brands: [],
			models: [],
			category: "",
			sort: "",
		});
		setVisibleCount(PAGINATION_CONFIG.STOCK.INITIAL);
	};

	return {
		// Данные
		allStocks,
		displayedStocks,
		filteredStocks,

		// Состояние
		isLoading,
		error,
		filters,
		visibleCount,

		// Опции
		brandOptions,
		modelOptions,
		categoryOptions,
		sortOptions,

		// Значения для селектов
		selectedBrands,
		selectedModels,
		selectedCategory,
		selectedSort,

		// Флаги
		showMoreVisible,

		// Обработчики
		handleBrandChange,
		handleModelChange,
		handleCategoryChange,
		handleSortChange,
		handleShowMore,
		resetFilters,
	};
};
