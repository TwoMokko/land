import { Equipment, Model } from "@/src/shared/api/types";
import { useEffect, useState } from "react";
import { getEquipments } from "@/src/shared/api/equipments";
import { getModels } from "@/src/shared/api";

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
    selectedModel: OptionType | null;
    selectedEquipment: OptionType | null;
    modelOptions: OptionType[];
    equipmentOptions: OptionType[];
    showMoreVisible: boolean;
    handleModelChange: (selectedOption: OptionType | null) => void;
    handleEquipmentChange: (selectedOption: OptionType | null) => void;
    handleShowMore: () => void;
}

export function useEquipments(): UseEquipmentsReturn {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
    const [displayedEquipments, setDisplayedEquipments] = useState<Equipment[]>([]);

    const [selectedModel, setSelectedModel] = useState<OptionType | null>(null);
    const [selectedEquipment, setSelectedEquipment] = useState<OptionType | null>(null);
    const [equipmentOptions, setEquipmentOptions] = useState<OptionType[]>([
        { value: '', label: 'Комплектация' }
    ]);

    const [itemsPerPage] = useState<number>(3);
    const [visibleCount, setVisibleCount] = useState<number>(3);
    const [showMoreVisible, setShowMoreVisible] = useState<boolean>(true);

    const modelOptions: OptionType[] = models.map(model => ({
        value: model.slug,
        label: model.name
    }));

    // Загрузка данных
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const [equipmentsData, modelsData] = await Promise.all([
                    getEquipments(),
                    getModels()
                ]);

                setEquipments(equipmentsData);
                setModels(modelsData);
                setFilteredEquipments(equipmentsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки комплектаций');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Применение фильтров
    useEffect(() => {
        applyFilter();
    }, [selectedModel, selectedEquipment, equipments]);

    // Обновление массива для отображения
    useEffect(() => {
        const displayed = filteredEquipments.slice(0, visibleCount);
        setDisplayedEquipments(displayed);
        setShowMoreVisible(visibleCount < filteredEquipments.length);
    }, [filteredEquipments, visibleCount]);

    const handleModelChange = (selectedOption: OptionType | null): void => {
        setSelectedModel(selectedOption);
        updateEquipmentOptions(selectedOption?.value || null);
        setVisibleCount(itemsPerPage);
    };

    const handleEquipmentChange = (selectedOption: OptionType | null): void => {
        setSelectedEquipment(selectedOption);
        setVisibleCount(itemsPerPage);
    };

    const updateEquipmentOptions = (modelSlug: string | null): void => {
        const currentEquips = !modelSlug
            ? equipments
            : equipments.filter(equip => equip.model === modelSlug);

        const uniqueOptions = [...new Map(
            currentEquips.map(equip => [equip.id, {
                value: equip.id.toString(),
                label: equip.name
            }])
        ).values()];

        setEquipmentOptions(uniqueOptions);
        setSelectedEquipment(null);
    };

    const applyFilter = (): void => {
        let filtered = [...equipments];

        if (selectedModel?.value) {
            filtered = filtered.filter(equip => equip.model === selectedModel.value);
        }

        if (selectedEquipment?.value) {
            filtered = filtered.filter(equip => equip.id.toString() === selectedEquipment.value);
        }

        setFilteredEquipments(filtered);
        setVisibleCount(itemsPerPage);
    };

    const handleShowMore = (): void => {
        setVisibleCount(prevCount => prevCount + itemsPerPage);
    };

    return {
        equipments,
        models,
        filteredEquipments,
        displayedEquipments,
        isLoading,
        error,
        selectedModel,
        selectedEquipment,
        modelOptions,
        equipmentOptions,
        showMoreVisible,
        handleModelChange,
        handleEquipmentChange,
        handleShowMore
    };
}