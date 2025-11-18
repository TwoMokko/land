import { socialLinks } from "./model-base";

export interface SocialRatingItem {
	id: string;
	logo: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	rating: string;
	reviewsText: string;
	link: {
		label: string;
		url: string;
	};
	badge?: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
}

export const socialRatings: SocialRatingItem[] = [
	{
		id: "yandex",
		logo: {
			src: "/images/socials-with-reels/ya-logo.png",
			alt: "Яндекс",
			width: 121,
			height: 24,
		},
		rating: "5,0",
		reviewsText: "На основе 5 000 отзывов",
		link: {
			label: "Перейти в Я.Карты",
			url: "https://yandex.ru/maps/org/peleton_avto_s_probegom/177034082797/?ll=37.469854%2C55.628937&z=17",
		},
		badge: {
			src: "/images/socials-with-reels/ya-icon.svg",
			alt: "Яндекс",
			width: 28,
			height: 28,
		},
	},
	{
		id: "avito",
		logo: {
			src: "/images/socials-with-reels/avito-logo.svg",
			alt: "Авито",
			width: 76,
			height: 24,
		},
		rating: "4,9",
		reviewsText: "На основе 5 000 отзывов",
		link: {
			label: "Перейти в Авито",
			url: "https://www.avito.ru/brands/peleton/all/avtomobili",
		},
	},
	{
		id: "2gis",
		logo: {
			src: "/images/socials-with-reels/gis-logo.png",
			alt: "2ГИС",
			width: 82,
			height: 24,
		},
		rating: "4,8",
		reviewsText: "На основе 5 000 отзывов",
		link: {
			label: "Перейти в 2ГИС",
			url: "https://2gis.ru/moscow/firm/70000001089638586",
		},
	},
];

export interface SocialPromoItem {
	id: string;
	logo: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	stat: {
		desktop: string;
		mobileLines?: string[];
		description: string;
	};
	button: {
		label: string;
		url: string;
	};
	footerNote?: string;
	footerLink?: {
		prefix?: string;
		label: string;
		url: string;
	};
}

export const socialPromos: SocialPromoItem[] = [
	{
		id: "instagram",
		logo: {
			src: "/images/socials-with-reels/right-inst.svg",
			alt: "Instagram",
			width: 76,
			height: 76,
		},
		stat: {
			desktop: "10 000 000 +",
			mobileLines: ["10+", "млн"],
			description: "Просмотров наших Reels \nСледи за авто-трендами",
		},
		button: {
			label: "Перейти в Instagram*",
			url: socialLinks.instagram,
		},
		footerNote:
			"*Instagram — проект Meta Platforms Inc., \nдеятельность которой запрещена в России",
	},
	{
		id: "telegram",
		logo: {
			src: "/images/socials-with-reels/right-tg.svg",
			alt: "Telegram",
			width: 76,
			height: 76,
		},
		stat: {
			desktop: "400+",
			description: "Эксклюзивных постов \nо скидках и новостях",
		},
		button: {
			label: "Перейти в Telegram",
			url: socialLinks.telegram,
		},
		footerLink: {
			prefix: "Telegram:",
			label: "@peletonofficial",
			url: socialLinks.telegram,
		},
	},
];
