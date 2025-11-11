import { useEffect, useMemo, useState } from "react";

import { useModels } from "@/src/app/_providers/ModelsContext";
import { getEquipments } from "@/src/shared/api/equipments";
import { PAGINATION_CONFIG } from "@/src/shared/config";
import { Equipment } from "@/src/shared/types/types";

interface OptionType {
	value: string;
	label: string;
}

interface FilterState {
	brand: string;
	model: string;
	equipment: string;
}

interface UseEquipmentsReturn {
	// Данные
	allEquipments: Equipment[];
	displayedEquipments: Equipment[];
	filteredEquipments: Equipment[];

	// Состояние
	isLoading: boolean;
	error: string | null;
	filters: FilterState;
	visibleCount: number;

	// Опции для селектов
	brandOptions: OptionType[];
	modelOptions: OptionType[];
	equipmentOptions: OptionType[];

	// Значения для селектов
	selectedBrand: OptionType | null;
	selectedModel: OptionType | null;
	selectedEquipment: OptionType | null;

	// Флаги
	showMoreVisible: boolean;

	// Обработчики
	handleBrandChange: (selectedOption: any) => void;
	handleModelChange: (selectedOption: any) => void;
	handleEquipmentChange: (selectedOption: any) => void;
	handleShowMore: () => void;
	resetFilters: () => void;
}

export const useEquipments = (): UseEquipmentsReturn => {
	const { models, isLoading: modelsLoading, error: modelsError } = useModels();
	const [allEquipments, setAllEquipments] = useState<Equipment[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Состояние фильтров
	const [filters, setFilters] = useState<FilterState>({
		brand: "",
		model: "",
		equipment: "",
	});

	// Пагинация
	const [visibleCount, setVisibleCount] = useState<number>(PAGINATION_CONFIG.EQUIPMENT.INITIAL);
	const loadMoreCount = PAGINATION_CONFIG.EQUIPMENT.LOAD_MORE;

	// Загрузка данных
	useEffect(() => {
		const loadEquipmentsData = async () => {
			try {
				setIsLoading(true);
				const equipmentsData = await getEquipments();
				setAllEquipments(equipmentsData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Ошибка загрузки комплектаций");
			} finally {
				setIsLoading(false);
			}
		};

		loadEquipmentsData();
	}, []);

	// Опции для брендов (из моделей)
	const brandOptions = useMemo(() => {
		const uniqueBrands = [...new Set(models.map((model) => model.brand))]
			.filter((brand) => brand)
			.map((brand) => ({
				value: brand,
				label: brand,
			}));

		return uniqueBrands.length > 0 ? uniqueBrands : [];
	}, [models]);

	// Опции для моделей (зависят от выбранного бренда)
	const modelOptions = useMemo(() => {
		if (!filters.brand) {
			return models.map((model) => ({
				value: model.slug,
				label: model.name,
			}));
		}

		return models
			.filter((model) => model.brand === filters.brand)
			.map((model) => ({
				value: model.slug,
				label: model.name,
			}));
	}, [models, filters.brand]);

	// Опции для комплектаций (зависят от выбранных бренда и модели)
	const equipmentOptions = useMemo(() => {
		// Тут и ниже в filteredEquipments дублируется (можно ли использовать тот код здесь)
		let filteredEquipments = allEquipments;

		if (filters.brand) {
			filteredEquipments = filteredEquipments.filter(
				(equip) => equip.brand === filters.brand,
			);
		}

		if (filters.model) {
			filteredEquipments = filteredEquipments.filter(
				(equip) => equip.model === filters.model,
			);
		}

		return [
			...new Map(
				filteredEquipments.map((equip) => [
					equip.id,
					{
						value: equip.id.toString(),
						label: equip.name,
					},
				]),
			).values(),
		];
	}, [allEquipments, filters.brand, filters.model]);

	// Значения для селектов
	const selectedBrand = useMemo(() => {
		return brandOptions.find((option) => option.value === filters.brand) || null;
	}, [filters.brand, brandOptions]);

	const selectedModel = useMemo(() => {
		return modelOptions.find((option) => option.value === filters.model) || null;
	}, [filters.model, modelOptions]);

	const selectedEquipment = useMemo(() => {
		return equipmentOptions.find((option) => option.value === filters.equipment) || null;
	}, [filters.equipment, equipmentOptions]);

	// Отфильтрованные комплектации
	const filteredEquipments = useMemo(() => {
		let result = allEquipments;

		// Фильтрация по бренду
		if (filters.brand) {
			result = result.filter((equip) => equip.brand === filters.brand);
		}

		// Фильтрация по модели
		if (filters.model) {
			result = result.filter((equip) => equip.model === filters.model);
		}

		// Фильтрация по комплектации
		if (filters.equipment) {
			result = result.filter((equip) => equip.id.toString() === filters.equipment);
		}

		return result;
	}, [allEquipments, filters]);

	// Комплектации для отображения (с пагинацией)
	const displayedEquipments = useMemo(() => {
		return filteredEquipments.slice(0, visibleCount);
	}, [filteredEquipments, visibleCount]);

	// Проверка, нужно ли показывать кнопку "Показать еще"
	const showMoreVisible = visibleCount < filteredEquipments.length;

	// Комбинированные состояния загрузки и ошибок
	const combinedIsLoading = isLoading || modelsLoading;
	const combinedError = error || modelsError;

	// Обработчики изменений фильтров
	const handleBrandChange = (selectedOption: any) => {
		const brandValue = selectedOption?.value || "";
		setFilters((prev) => ({
			...prev,
			brand: brandValue,
			model: "", // Сбрасываем модель при изменении бренда
			equipment: "", // Сбрасываем комплектацию при изменении бренда
		}));
		setVisibleCount(PAGINATION_CONFIG.EQUIPMENT.INITIAL); // Сбрасываем пагинацию
	};

	const handleModelChange = (selectedOption: any) => {
		const modelValue = selectedOption?.value || "";
		setFilters((prev) => ({
			...prev,
			model: modelValue,
			equipment: "", // Сбрасываем комплектацию при изменении модели
		}));
		setVisibleCount(PAGINATION_CONFIG.EQUIPMENT.INITIAL);
	};

	const handleEquipmentChange = (selectedOption: any) => {
		setFilters((prev) => ({
			...prev,
			equipment: selectedOption?.value || "",
		}));
		setVisibleCount(PAGINATION_CONFIG.EQUIPMENT.INITIAL);
	};

	// Показать еще
	const handleShowMore = () => {
		setVisibleCount((prev) => prev + loadMoreCount);
	};

	// Сброс всех фильтров
	const resetFilters = () => {
		setFilters({
			brand: "",
			model: "",
			equipment: "",
		});
		setVisibleCount(PAGINATION_CONFIG.EQUIPMENT.INITIAL);
	};

	return {
		// Данные
		allEquipments,
		displayedEquipments,
		filteredEquipments,

		// Состояние
		isLoading: combinedIsLoading,
		error: combinedError,
		filters,
		visibleCount,

		// Опции
		brandOptions,
		modelOptions,
		equipmentOptions,

		// Значения для селектов
		selectedBrand,
		selectedModel,
		selectedEquipment,

		// Флаги
		showMoreVisible,

		// Обработчики
		handleBrandChange,
		handleModelChange,
		handleEquipmentChange,
		handleShowMore,
		resetFilters,
	};
};
