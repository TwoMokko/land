import { useEffect, useState } from "react";

import { useModels } from "@/src/app/providers/ModelsContext";
import { getEquipments } from "@/src/shared/api/equipments";
import { Equipment, Model } from "@/src/shared/types/types";

interface OptionType {
	value: string;
	label: string;
}

interface UseEquipmentsReturn {
	equipments: Equipment[];
	models: Model[];
	filteredEquipments: Equipment[];
	displayedEquipments: Equipment[];
	isLoading: boolean;
	error: string | null;
	selectedBrand: OptionType | null;
	selectedModel: OptionType | null;
	selectedEquipment: OptionType | null;
	brandOptions: OptionType[];
	modelOptions: OptionType[];
	equipmentOptions: OptionType[];
	showMoreVisible: boolean;
	handleBrandChange: (selectedOption: OptionType | null) => void;
	handleModelChange: (selectedOption: OptionType | null) => void;
	handleEquipmentChange: (selectedOption: OptionType | null) => void;
	handleShowMore: () => void;
}

export function useEquipments(): UseEquipmentsReturn {
	const { models, isLoading: modelsLoading, error: modelsError } = useModels();
	const [equipments, setEquipments] = useState<Equipment[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
	const [displayedEquipments, setDisplayedEquipments] = useState<Equipment[]>([]);

	const [selectedBrand, setSelectedBrand] = useState<OptionType | null>(null);
	const [selectedModel, setSelectedModel] = useState<OptionType | null>(null);
	const [selectedEquipment, setSelectedEquipment] = useState<OptionType | null>(null);
	const [equipmentOptions, setEquipmentOptions] = useState<OptionType[]>([
		{ value: "", label: "Комплектация" },
	]);

	const [itemsPerPage] = useState<number>(3);
	const [visibleCount, setVisibleCount] = useState<number>(3);
	const [showMoreVisible, setShowMoreVisible] = useState<boolean>(true);

	const brandOptions: OptionType[] = (() => {
		const uniqueBrands = [...new Set(models.map((model) => model.brand))]
			.filter((brand) => brand)
			.map((brand) => ({
				value: brand,
				label: brand,
			}));

		return uniqueBrands.length > 0 ? [...uniqueBrands] : [{ value: "", label: "Бренд" }];
	})();

	const modelOptions: OptionType[] = models
		.filter((model) => !selectedBrand?.value || model.brand === selectedBrand.value)
		.map((model) => ({
			value: model.slug,
			label: model.name,
		}));

	const combinedIsLoading = isLoading || modelsLoading;
	const combinedError = error || modelsError;

	useEffect(() => {
		const loadEquipments = async () => {
			try {
				setIsLoading(true);
				const equipmentsData = await getEquipments();

				setEquipments(equipmentsData);
				setFilteredEquipments(equipmentsData);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Ошибка загрузки комплектаций");
			} finally {
				setIsLoading(false);
			}
		};

		loadEquipments();
	}, []);

	useEffect(() => {
		if (selectedModel && selectedBrand?.value) {
			const modelBelongsToBrand = models.some(
				(model) =>
					model.slug === selectedModel.value && model.brand === selectedBrand.value,
			);
			if (!modelBelongsToBrand) {
				setSelectedModel(null);
			}
		}
	}, [selectedBrand, selectedModel, models]);

	useEffect(() => {
		let filtered = [...equipments];

		if (selectedBrand?.value) {
			filtered = filtered.filter((equip) => equip.brand === selectedBrand.value);
		}

		if (selectedModel?.value) {
			filtered = filtered.filter((equip) => equip.model === selectedModel.value);
		}

		if (selectedEquipment?.value) {
			filtered = filtered.filter((equip) => equip.id.toString() === selectedEquipment.value);
		}

		setFilteredEquipments(filtered);
		setVisibleCount(itemsPerPage);
	}, [selectedBrand, selectedModel, selectedEquipment, equipments, itemsPerPage]);

	useEffect(() => {
		const displayed = filteredEquipments.slice(0, visibleCount);
		setDisplayedEquipments(displayed);
		setShowMoreVisible(visibleCount < filteredEquipments.length);
	}, [filteredEquipments, visibleCount]);

	useEffect(() => {
		let filtered = [...equipments];

		if (selectedBrand?.value) {
			filtered = filtered.filter((equip) => equip.brand === selectedBrand.value);
		}

		if (selectedModel?.value) {
			filtered = filtered.filter((equip) => equip.model === selectedModel.value);
		}

		const uniqueOptions = [
			...new Map(
				filtered.map((equip) => [
					equip.id,
					{
						value: equip.id.toString(),
						label: equip.name,
					},
				]),
			).values(),
		];

		setEquipmentOptions(
			uniqueOptions.length > 0 ? uniqueOptions : [{ value: "", label: "Комплектация" }],
		);

		if (
			selectedEquipment &&
			!uniqueOptions.some((option) => option.value === selectedEquipment.value)
		) {
			setSelectedEquipment(null);
		}
	}, [equipments, selectedBrand, selectedModel, selectedEquipment]);

	const handleBrandChange = (selectedOption: OptionType | null): void => {
		setSelectedBrand(selectedOption);
		setSelectedModel(null);
		setSelectedEquipment(null);
		setVisibleCount(itemsPerPage);
	};

	const handleModelChange = (selectedOption: OptionType | null): void => {
		setSelectedModel(selectedOption);
		setSelectedEquipment(null);
		setVisibleCount(itemsPerPage);
	};

	const handleEquipmentChange = (selectedOption: OptionType | null): void => {
		setSelectedEquipment(selectedOption);
		setVisibleCount(itemsPerPage);
	};

	const handleShowMore = (): void => {
		setVisibleCount((prevCount) => prevCount + itemsPerPage);
	};

	return {
		equipments,
		models,
		filteredEquipments,
		displayedEquipments,
		isLoading: combinedIsLoading,
		error: combinedError,
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
	};
}
