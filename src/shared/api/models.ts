import { mockModels } from "@/src/shared/api/mocks/models";
import { Model } from "@/src/shared/types/types";

export async function getModels(): Promise<Model[]> {
    // Для разработки - моки
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockModels), 500)
    })
}

export async function getModelById(id: number): Promise<Model> {
    const model = mockModels.find(p => p.id === id)

    if (!model) {
        throw new Error('Product not found')
    }

    return model
}