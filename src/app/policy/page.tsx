import { Metadata } from "next";

import { metaDataPolicyPage } from "@/src/shared/config";

export const metadata: Metadata = metaDataPolicyPage;

export default function Policy() {
	return (
		<div>
			<h1>Политика</h1>
			<p>Текст политики</p>
		</div>
	);
}
