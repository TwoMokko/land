import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// если будет много страниц, вынести в layout для swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Marquee from "@/src/shared/ui/marquee/Marquee";
import { Actions } from "@/src/widgets/actions";
import { Hero } from "@/src/widgets/hero";
import { Models } from "@/src/widgets/models";
import { Social } from "@/src/widgets/social";
import { Equipments } from "@/src/widgets/equipments";
import { Contacts } from "@/src/widgets/contact";
import { SectionId } from "@/src/shared/types/types";
import { metaDataHomePage, modelMarquee, sectionTitles } from "@/src/shared/config";
import { Credit } from "@/src/widgets/credit";
import { StockModels } from "@/src/widgets/stock";
import { Trade } from "@/src/widgets/trade";
import { Metadata } from "next";

export const metadata: Metadata = metaDataHomePage;

export default function Home() {
	return (
		<>
			<Hero />
			<Marquee text={modelMarquee} speed={50} />
			<Actions />
			<Models idSection={SectionId.MODELS} titleSection={sectionTitles[SectionId.MODELS]} />
			<Social idSection={SectionId.SOCIAL} />
			<Equipments
				idSection={SectionId.EQUIPMENTS}
				titleSection={sectionTitles[SectionId.EQUIPMENTS]}
			/>
			<Trade idSection={SectionId.TRADE_IN} />
			<StockModels
				idSection={SectionId.STOCK}
				titleSection={sectionTitles[SectionId.STOCK]}
			/>
			<Credit idSection={SectionId.CREDIT} />
			<Contacts
				idSection={SectionId.CONTACTS}
				titleSection={sectionTitles[SectionId.CONTACTS]}
			/>
		</>
	);
}
