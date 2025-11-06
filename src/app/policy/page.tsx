import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Политика",
	description: "Дескрипшн политики",
};

export default function Policy() {
	return (
		<div>
			<h1>Политика</h1>
			<p>Текст политики</p>
		</div>
	);
}
