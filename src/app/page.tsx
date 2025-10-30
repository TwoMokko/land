import { Metadata } from 'next';

import 'swiper/css';
import 'swiper/css/navigation';

import { Hero } from "@/src/widgets/hero";
import Marquee from "@/src/shared/ui/marquee/Marquee";
import { Actions } from "@/src/widgets/actions";
import { Models } from "@/src/widgets/models";
import { Social } from "@/src/widgets/social";
import { Equipments } from "@/src/widgets/equipments";
import { Trade } from "@/src/widgets/trade";
import { Contacts } from "@/src/widgets/contact";

export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Дескрипшн главной страницы',
}

export default function Home() {
    return (
        <>
            <Hero />
            <Marquee text={'тестовый текст'} />
            <Actions />
            <Models idSection={'models'} />
            <Social idSection={'social'} />
            <Equipments idSection={'equipments'} />
            <Trade idSection={'tradein'} />
            <Contacts idSection={'contacts'} />
        </>
    );
}
