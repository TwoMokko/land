// переписать, взято из electro-peleton
export function countOwners(ownersText: string): string | number {
	const map: { [key: string]: string } = {
		"1": "1 владелец",
		"2": "2 владельца",
		"3": "3 владельца",
		"4": "4+ владельцев",
	};

	return map[ownersText] ?? ownersText;
}
