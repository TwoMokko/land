import { Metadata } from 'next';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Hero } from "@/src/widgets/hero";
import Marquee from "@/src/shared/ui/marquee/Marquee";
import { Actions } from "@/src/widgets/actions";
import { Models } from "@/src/widgets/models";
import { Social } from "@/src/widgets/social";
import { Equipments } from "@/src/widgets/equipments";
import { Trade } from "@/src/widgets/trade";
import { Contacts } from "@/src/widgets/contact";
import { SectionId } from "@/src/shared/types/types";
import { modelMarquee, sectionTitles } from "@/src/shared/config";

export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Дескрипшн главной страницы',
}

export default function Home() {
    return (
        <>
            <Hero />
            <Marquee text={modelMarquee} speed={50} />
            <Actions />
            <Models idSection={SectionId.MODELS} titleSection={sectionTitles[SectionId.MODELS]} />
            <Social idSection={SectionId.SOCIAL} />
            <Equipments idSection={SectionId.EQUIPMENTS} titleSection={sectionTitles[SectionId.EQUIPMENTS]} />
            <Trade idSection={SectionId.TRADE_IN} />
            <Contacts idSection={SectionId.CONTACTS} titleSection={sectionTitles[SectionId.CONTACTS]} />
        </>
    );
}
