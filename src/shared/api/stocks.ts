import { mockStocks } from "@/src/shared/api/mocks/stocks";
import { Stock } from "@/src/shared/types/types";

// написать типы
export async function getStocks(): Promise<Stock[]> {
	// Для разработки - моки
	return new Promise((resolve) => {
		setTimeout(() => resolve(mockStocks), 500);
	});
}

export async function getStockById(id: number): Promise<Stock> {
	const model = mockStocks.find((p) => p.id === id);

	if (!model) {
		throw new Error("Product not found");
	}

	return model;
}
