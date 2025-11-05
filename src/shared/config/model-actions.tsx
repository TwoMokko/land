import { ActionItem } from "@/src/shared/types/types";
import { PiArrowsDownUpThin, PiCurrencyCircleDollarLight } from "react-icons/pi";
import { IoCarSportOutline } from "react-icons/io5";
import { BsShield } from "react-icons/bs";

export const dataActions: ActionItem[] = [
    {
        id: 1,
        title: "Автокредит с выгодой до 400 000₽",
        subtitle: "Одобрение по 2-ум документам",
        link: "credit",
        icon: <PiCurrencyCircleDollarLight />,
    },
    {
        id: 2,
        title: "Гарантия 3 года или комплект резины в подарок!",
        subtitle: "на любую модель при покупке",
        link: "order",
        icon: <BsShield />,
    },
    {
        id: 3,
        title: "Выгоды по Трейд-ин до 300 000₽",
        subtitle: "Только 20 автомобилей",
        link: "trade",
        icon: <PiArrowsDownUpThin />,
    },
    {
        id: 4,
        title: "Новые SWM по сниженной цене от 1 395 000₽!",
        subtitle: "Только 20 автомобилей",
        link: "order",
        icon: <IoCarSportOutline />,
    },
];
