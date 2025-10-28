import { Metadata } from 'next';
import { Hero } from "@/src/widgets/hero";
import { Actions } from "@/src/widgets/actions";
import { Models } from "../widgets/models";

import 'swiper/css';
import 'swiper/css/navigation';

export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Дескрипшн главной страницы',
}

export default function Home() {
    return (
        <>
            <Hero />
            <Actions />
            <Models idSection={'models'} />
        </>
    );
}
