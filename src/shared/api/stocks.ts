import { mockStocks } from "@/src/shared/api/mocks/stocks";
import { Stock } from "@/src/shared/types/types";

// переписать типы
export async function getStocks(): Promise<Stock[]> {
	// Для разработки - моки
	return new Promise((resolve) => {
		setTimeout(() => resolve(mockStocks), 500);
	});

	// const response = await fetch('/stockmodels', {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	mode: 'cors',
	// });
	//
	// if (!response.ok) {
	// 	throw new Error(`Failed to fetch stock: ${response.status}`);
	// }
	//
	// return response.json();
}

export async function getStockById(id: number): Promise<Stock> {
	const model = mockStocks.find((p) => p.id === id);

	if (!model) {
		throw new Error("Product not found");
	}

	return model;
}
