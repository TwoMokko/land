import { FormData } from "@/src/shared/api/types";
import { useModal } from "@/src/app/providers/ModalProvider";
import { useState } from "react";


export function useSubmit() {
    const { openModal, modalData } = useModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (formData: FormData) => {
        if (!formData.name || !formData.phone) {
            console.log('Пожалуйста, заполните все поля');
            return false;
        }

        setIsLoading(true);

        try {
            // Отправка данных на API
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    slug: modalData?.slug,
                    brand: modalData?.brand,
                    model: modalData?.model,
                    equipment: modalData?.equipment,
                    price: modalData?.price,
                    reprice: modalData?.reprice,
                    color: modalData?.color
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Заявка отправлена:', result);
                openModal('success');
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            openModal('error');
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        handleSubmit,
        modalData
    }
}