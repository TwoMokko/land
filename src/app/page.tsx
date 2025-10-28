import { Metadata } from 'next';
import { Hero } from "@/src/widgets/hero";
import { Actions } from "@/src/widgets/actions";
import { Models } from "../widgets/models";

import 'swiper/css';
import 'swiper/css/navigation';
import Marquee from "@/src/shared/ui/marquee/Marquee";
import {Social} from "@/src/widgets/social";
import {Equipments} from "@/src/widgets/equipments";

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
        </>
    );
}
