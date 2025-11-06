import { NavigationLink, SectionId } from "@/src/shared/types/types";

import { sectionTitles } from "./model-sections";

export const navigationLinks: NavigationLink[] = [
	{ title: sectionTitles[SectionId.MODELS], href: `#${SectionId.MODELS}` },
	{ title: sectionTitles[SectionId.EQUIPMENTS], href: `#${SectionId.EQUIPMENTS}` },
	{ title: sectionTitles[SectionId.CONTACTS], href: `#${SectionId.CONTACTS}` },
];
