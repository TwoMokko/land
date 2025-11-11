import { Metadata } from "next";

import { metaDataPolicyPage } from "@/src/shared/config";

export const metadata: Metadata = metaDataPolicyPage;

export default function Policy() {
	return (
		<div className="other-page container">
			<h1>Политика</h1>
			<p>Текст политики</p>
		</div>
	);
}
