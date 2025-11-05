import { Model } from "@/src/shared/types/types";

export const mockModels: Model[] = [
    { id: 1, brand: 'SWM', name: 'Модель 1', slug: 'model1', price: 1395000, recprice: 14580000, creditPay: 17880,
        colors: [
            'red',
            'grey',
            'blue',
            'black'
        ]
    },
    { id: 2, brand: 'SWM', name: 'Модель 2', slug: 'model2', price: 2678000, recprice: 15000200, creditPay: 17710,
        colors: [
            'green',
            'blue',
            'red',
        ]
    },
    { id: 3, brand: 'SWM', name: 'Модель 3', slug: 'model3', price: 3000, recprice: 1200, creditPay: 17250,
        colors: [
            'green',
            'blue',
            'red',
        ]
    },
    { id: 4, brand: 'SWM', name: 'Модель 4', slug: 'model4', price: 4000, recprice: 1200, creditPay: 16580,
        colors: [
            'green',
            'blue'
        ]
    },
    { id: 6, brand: 'OTHER', name: 'Модель другой бренд', slug: 'model5', price: 4000, recprice: 1200, creditPay: 14000,
        colors: [
            'green',
            'blue'
        ]
    },
] as const

// export type MockModel = typeof mockModels[number]


const test = {
    "id": 2898,
    "dmsCarId": 69729678,
    "vin": "WAUZZZ8T6FA045198",
    "is_new": 0,
    "brand_id": 15,
    "model_id": 124,
    "mileage": 153727,
    "year": 2015,
    "modification": "2.0 AMT (225 л.с.) 4WD",
    "equipment": null,
    "power": 225,
    "drive": "Полный",
    "wheel": "Левый",
    "body": "Купе",
    "gear": "Робот",
    "engine": "Бензин",
    "volume": 2,
    "owners_number": "3",
    "pts": "Дубликат",
    "doors_count": 4,
    "custom": "Растаможен",
    "color": "Синий",
    "description": "**Купе | Полный привод | Автомат | Зимний пакет | S-Line | Бензин 249 л.с.**\n\n**Как эксплуатировался**\n•\tПодтвержденный пробег 153 727 км \n•\tНе использовался в коммерции\n\n**Как обслуживали**\n•\tОбслуживание в профильном сервисе с применением качественных расходников\n•\tПpoизвeдeнa пpедпродажнaя подгoтовка: химчиcткa/пoлиpовкa/замена жидкоcтeй\n\n**Что с документами**\n•\tАвто приобретено новым у официального дилера в РФ\n•\tВладельцы – физические лица\n•\tКомплект ключей\n•\tТранспортное средство без обременений и ограничений на регистрационные действия\n•\tВозможна любая форма продажи и оплаты\n\n Чем подтвердим**\n•\tОрганизуем бесплатный подъемник\n•\tПредоставим лист диагностики систем автомобиля\n•\tПокажем отчет по истории его эксплуатации \n\n**Чем выделяется**\n•\tКузов в **цвете ультрамарин**\n•\tБензиновый двигатель 225 л.с.\n•\t**Полный привод Quattro**\n•\t**Автоматическая КПП**\n•\tПакет S-Line\n•\tТрехспицевый **мультируль в коже**\n•\t**Многозонный климат-контроль**\n•\tКонтроль **давления в шинах**\n•\t**Многофункциональная мультимедиа**\n•\t**Парктроники**\n•\t**Электрообогрев передних сидений\n•\tЭргономичные передние сидения с боковой поддержкой и расширенной регулировкой положения**\n•\tОтделка салона комбинацией из **черной кожи и ткани**\n•\t**Черный потолок**\n•\t**Центральный подлокотник для пассажиров 2-го ряда\n•\t**Электропривод** передних сидений, зеркал и стеклоподъемников\n•\t**Элекроручник**\n•\t**Тонировка**\n•\t**Омыватель фар**\n•\t**Линзованная оптика**\n•\t**Противотуманные фары**\n•\tКолеса на **летних шинах Dunlop**\n\n**Как приобрести выгодно? Запишитесь на тест-драйв и получите скидку до 5% при покупке любого авто с пробегом**",
    "state": "Хорошее",
    "discountCredit": 120000,
    "discountInsurance": 0,
    "discountTradeIn": 80000,
    "max_discount": 200000,
    "sellingPrice": 1800000,
    "discountSellingPrice": 1600000,
    "published": 1,
    "created_at": "2025-08-26T11:00:45.000000Z",
    "updated_at": "2025-10-28T09:02:36.000000Z",
    "generation": "I (8T) Рестайлинг",
    "source": "API CM.Expert",
    "pseudoModel": "A5 ",
    "sellingPricePercent": 85,
    "brand": {
        "id": 15,
        "autoru_id": 1,
        "name": "Audi"
    },
    "model": {
        "id": 124,
        "autoru_id": null,
        "name": "A5",
        "brand_id": 15
    },
    "options": [
        {
            "id": 1,
            "name": "Бортовой компьютер",
            "category_id": 6,
            "key": "hasOnBoardComputer",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 1
            }
        },
        {
            "id": 2,
            "name": "Климат-контроль 1-зонный",
            "category_id": 6,
            "key": "climate_cc1zone",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 2
            }
        },
        {
            "id": 45,
            "name": "Подогрев передних сидений",
            "category_id": 7,
            "key": "seatsHeat_front",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 45
            }
        },
        {
            "id": 102,

            "name": "Электрические стеклоподъёмники передних окон",
            "category_id": 6,
            "key": "electricWindows_front",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 102
            }
        },
        {
            "id": 5,
            "name": "Датчик давления в шинах",
            "category_id": 1,
            "key": "hasTirePressureSensor",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 5
            }
        },
        {
            "id": 8,
            "name": "Парктроник задний",
            "category_id": 6,
            "key": "hasParkSensorRear",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 8
            }
        },
        {
            "id": 99,
            "name": "электрорегулировка сиденья водителя",
            "category_id": 7,
            "key": "driverSeatAdjusting_electro",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 99
            }
        },
        {
            "id": 48,
            "name": "электрорегулировка сиденья пассажира",
            "category_id": 7,
            "key": "passengerSeatAdjusting_electro",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 48
            }
        },
        {
            "id": 11,
            "name": "Система старт-стоп",
            "category_id": 6,
            "key": "hasStartStopSystem",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 11
            }
        },
        {
            "id": 12,
            "name": "Усилитель рулевого управления",
            "category_id": 6,
            "key": "hasPowerSteering",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 12
            }
        },
        {
            "id": 13,
            "name": "Антиблокировочная система тормозов (ABS)",
            "category_id": 1,
            "key": "hasAbs",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 13
            }
        },
        {
            "id": 14,
            "name": "Система курсовой стабилизации (ESP / ESC / DSC / VSA)",
            "category_id": 1,
            "key": "hasEsp",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 14
            }
        },
        {
            "id": 15,
            "name": "Крепление для детского кресла (задний ряд)",
            "category_id": 1,
            "key": "hasIsofix",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 15
            }
        },
        {
            "id": 52,
            "name": "Блокировка замков задних дверей",
            "category_id": 1,
            "key": "hasRearDoorsLocking",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",

            "pivot": {
                "car_id": 2898,
                "option_id": 52
            }
        },
        {
            "id": 17,
            "name": "Датчик усталости водителя",
            "category_id": 1,
            "key": "hasDriverFatigueSensor",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 17
            }
        },
        {
            "id": 18,
            "name": "Подушка безопасности водителя",
            "category_id": 1,
            "key": "hasAirbagFront",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 18
            }
        },
        {
            "id": 19,
            "name": "Подушка безопасности пассажира",
            "category_id": 1,
            "key": "hasAirbagPassengerFront",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 19
            }
        },
        {
            "id": 20,
            "name": "Боковые подушки безопасности",
            "category_id": 1,
            "key": "hasAirbagSide",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 20
            }
        },
        {
            "id": 21,
            "name": "Оконные подушки безопасности (шторки)",
            "category_id": 1,
            "key": "hasAirbagWindow",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 21
            }
        },
        {
            "id": 142,
            "name": "Ксеноновые фары",
            "category_id": 2,
            "key": "headLightType_xenon",
            "created_at": "2025-06-11T10:07:06.000000Z",
            "updated_at": "2025-06-11T10:07:06.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 142
            }
        },
        {
            "id": 54,
            "name": "Автоматический корректор фар",
            "category_id": 2,
            "key": "hasLightAutoCorrection",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 54
            }
        },
        {
            "id": 55,
            "name": "Датчик дождя",
            "category_id": 1,
            "key": "hasRainSensor",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 55
            }
        },
        {
            "id": 27,
            "name": "Датчик света",
            "category_id": 2,
            "key": "hasLightSensor",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 27
            }
        },
        {
            "id": 56,
            "name": "Обогрев зеркал",
            "category_id": 2,
            "key": "hasHeatesMirrors",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 56
            }
        },
        {
            "id": 94,
            "name": "Омыватель фар",
            "category_id": 2,
            "key": "hasHeadLightWasher",
            "created_at": "2025-06-11T10:07:02.000000Z",

            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 94
            }
        },
        {
            "id": 84,
            "name": "Противотуманные фары",
            "category_id": 2,
            "key": "hasFogLights",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 84
            }
        },
        {
            "id": 28,
            "name": "Электрорегулировка зеркал",
            "category_id": 6,
            "key": "hasElectricMirrors",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 28
            }
        },
        {
            "id": 108,
            "name": "Диски R18",
            "category_id": 9,
            "key": "wheelRimDiameter_18",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 108
            }
        },
        {
            "id": 31,
            "name": "Центральный замок",
            "category_id": 4,
            "key": "hasCentralLock",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 31
            }
        },
        {
            "id": 32,
            "name": "Иммобилайзер",
            "category_id": 4,
            "key": "hasOemImmobiliser",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 32
            }
        },
        {
            "id": 125,
            "name": "Обивка салона: комбинированый",
            "category_id": 7,
            "key": "salon_combination",
            "created_at": "2025-06-11T10:07:03.000000Z",
            "updated_at": "2025-06-11T10:07:03.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 125
            }
        },
        {
            "id": 64,
            "name": "Накладки на пороги",
            "category_id": 7,
            "key": "hasDoorSillPlates",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 64
            }
        },
        {
            "id": 66,
            "name": "Отделка кожей рулевого колеса",
            "category_id": 7,
            "key": "hasLeatherSteeringWheel",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 66
            }
        },
        {
            "id": 97,
            "name": "Отделка кожей рычага КПП",
            "category_id": 7,
            "key": "hasLeatherGearShift",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 97
            }
        },
        {
            "id": 36,
            "name": "Передний центральный подлокотник",
            "category_id": 7,
            "key": "hasFrontCenterArmrest",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 36
            }
        },
        {
            "id": 68,
            "name": "Спортивные передние сидения",
            "category_id": 7,
            "key": "hasFrontSportSeats",

            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 68
            }
        },
        {
            "id": 69,
            "name": "Функция складывания спинки сиденья пассажира",
            "category_id": 7,
            "key": "hasFoldingRearSeats",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 69
            }
        },
        {
            "id": 37,
            "name": "Аудиосистема",
            "category_id": 5,
            "key": "hasAudioSystem",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 37
            }
        },
        {
            "id": 38,
            "name": "Розетка 12V",
            "category_id": 5,
            "key": "hasSocket12V",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 38
            }
        },
        {
            "id": 72,
            "name": "AUX",
            "category_id": 5,
            "key": "hasAux",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 72
            }
        },
        {
            "id": 39,
            "name": "Bluetooth",
            "category_id": 5,
            "key": "hasBluetooth",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 39
            }
        },
        {
            "id": 42,
            "name": "Мультифункциональное рулевое колесо",
            "category_id": 6,
            "key": "hasMultiWheel",
            "created_at": "2025-06-11T10:07:02.000000Z",
            "updated_at": "2025-06-11T10:07:02.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 42
            }
        },
        {
            "id": 122,
            "name": "Отделка потолка чёрной тканью",
            "category_id": 7,
            "key": "hasBlackRoof",
            "created_at": "2025-06-11T10:07:03.000000Z",
            "updated_at": "2025-06-11T10:07:03.000000Z",
            "pivot": {
                "car_id": 2898,
                "option_id": 122
            }
        }
    ],
    "photos": [
        {
            "id": 36461,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/8b33671eb122c0cec2155e9582fab823.webp",
            "order": 0
        },
        {
            "id": 36462,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/81b47427defe01e34ec436fe339d14ec.webp",
            "order": 1
        },
        {
            "id": 36465,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/b434ecf221a5d0d25dd9a296f6d0c311.webp",
            "order": 2
        },
        {
            "id": 36466,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/4f1b27612fa922e1e2b803f62579c725.webp",
            "order": 3
        },
        {
            "id": 36467,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/5c7a4f75b5fca22f84d96a8fc4f3b19d.webp",
            "order": 4
        },
        {
            "id": 36468,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/0db81caa610b2e60df03ce1c8f80aefb.webp",
            "order": 5
        },
        {

            "id": 36469,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/fa06de884be68fc8b1f500b2f3d4b5b4.webp",
            "order": 6
        },
        {
            "id": 36470,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/39d35e9aa019cdb7d849920ffbe0e251.webp",
            "order": 7
        },
        {
            "id": 36471,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/208e052f538b8b64263a7907c08548a2.webp",
            "order": 8
        },
        {
            "id": 36472,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/f4a09b09305e8875603338a0553339c0.webp",
            "order": 9
        },
        {
            "id": 36473,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/144ba8a7a5d2b7c84d2a2d0e127710ee.webp",
            "order": 10
        },
        {
            "id": 36474,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/51767fe15c3f3be656a6ea6e93c638ea.webp",
            "order": 11
        },
        {
            "id": 36475,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/7e415f36ce3219239cf82a724485a00b.webp",
            "order": 12
        },
        {
            "id": 36476,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/85b4be4c9ad90405968cb0756b3b7249.webp",
            "order": 13
        },
        {
            "id": 36477,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/4c3134e69c5fcaeb369caf823f56b10d.webp",
            "order": 14
        },
        {
            "id": 36500,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/15e94f0690249148a7454186e4244ac7.webp",
            "order": 15
        },
        {
            "id": 36501,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/7f224c49707b32b47f39727aa9862fe3.webp",
            "order": 16
        },
        {
            "id": 36502,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/f05d205633bb56fc964427bf7c55333a.webp",
            "order": 17
        },
        {
            "id": 36479,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/e5a46f12973db647fbac4ade317e306c.webp",
            "order": 18
        },
        {
            "id": 36478,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/3355b2b414b285bac4970df24e847174.webp",
            "order": 19
        },
        {
            "id": 36480,
            "car_id": 2898,
            "path": "https://40ad8e7c-peleton.s3.timeweb.cloud/69729678/659d0059febe6d6d29517a86123f7114.webp",
            "order": 20
        }
    ]
}