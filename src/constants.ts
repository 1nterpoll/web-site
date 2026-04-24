/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Category, Transaction, Order } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Одежда', icon: 'Checkroom' },
  { id: '2', name: 'Игрушки', icon: 'Gamepad2' },
  { id: '3', name: 'Кормление', icon: 'Baby' },
  { id: '4', name: 'Коляски', icon: 'Stroller' },
  { id: '5', name: 'Гигиена', icon: 'Soap' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Интерактивный обучающий робот CyberBuddy',
    category: 'Игрушки',
    brand: 'RoboTech Kids',
    price: 89.99,
    oldPrice: 110.00,
    rating: 4.5,
    reviewsCount: 128,
    isBestseller: true,
    onSale: true,
    description: 'CyberBuddy — идеальный компаньон для юных исследователей 5-10 лет. Он оснащен передовым распознаванием голоса, 50+ выражениями лица и базовыми уроками программирования.',
    stock: 'in_stock',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUm8EaT7Wy5YPqMLUarXHODliDYZNN0dZYpBArArrt2_dYUfj3zmQpN3DQuO18gDVtcJpeVcXeBNxMUKmhYK7nHnXsUCgEOSAXHet7oaErUjwq8P6Lcw-xjgfTf_5Xg-rxi8SbDnxr1R2FvPh12LJD2uHIAZJonMkhq8_9XbBuRdxO5uXlRw40j1ivpt3Vbaq4gulAXwB4YAXZ-gMFrGss5yeReUzdv_MDbrZF3jKakcq5Keua3Z-CYMTBKk5PR_RoKcS9cm22dzZ3',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQPzNV-MrX9eAG0v43nbmOH7pPxiN476hmxGTtrLa1_fPUp4TAfYVbpN1y9I8KJx5jT80BbcTnfOVNx4ks86_xK73X1btSzRAkaRmjIlTMhra6gPJth3NsYOo2vyOR4uk8zzpqp37hSDGxquixp6QBZZy5sdnCG8KRcUc0hZ_zgQthuU7SNg_-_ekG1k9lAAF-j-93fGJ_zezz9EwnSJK0D5KN36PkmC5UzDfdDIhC5DoHuJUhD4_oDMYRNDPRAfvD0Yb4aOef-1q_'
    ],
    specs: {
      'Возраст': '5 - 12 лет',
      'Материал': 'Пластик без BPA',
      'Питание': 'USB-C аккумулятор',
      'Связь': 'Bluetooth 5.0, Wi-Fi'
    },
    reviews: [
      {
        id: 'r1',
        userName: 'Марина С.',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        rating: 5,
        comment: 'Замечательный робот! Ребенок в восторге, играет уже неделю. Очень качественные материалы.',
        date: '20 мар. 2024'
      },
      {
        id: 'r2',
        userName: 'Дмитрий К.',
        rating: 4,
        comment: 'Хорошая игрушка, но иногда теряет связь с Wi-Fi. В остальном все отлично.',
        date: '15 мар. 2024'
      }
    ]
  },
  {
    id: 'p2',
    name: 'Красочный космический набор LEGO',
    category: 'Игрушки',
    brand: 'LEGO',
    price: 49.99,
    oldPrice: 59.99,
    rating: 5.0,
    reviewsCount: 342,
    isBestseller: true,
    onSale: true,
    description: 'Исследуйте звезды с этим ярким и детализированным набором для строительства космической станции.',
    stock: 'low_stock',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBp7sh4mwzq5cFUnKjYwtfCv5cN7nvvdPqQL2cgld_fFwE7QFovadvDVt4yoi9G2BsF0vBbmaEDuHSK1n5lsAuCLSspTtJsoFJnXnOnM4pVl0U7UJaw-F16HLRn__bbvuyneMlpF3mp8rd_DB174EUkFJ2zD3a5D3vrjS4MQ-TL0268fpa-Rau3FmSeKlMjgw9mVJVf7odx56SuUggPwDwZ6U7RH8n19mpQF2bocRePgPThlkgJ_Ry1zxKxDHOy-8D9P_Bpb7z4WAfE'],
    reviews: [
      {
        id: 'r3',
        userName: 'Елена П.',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        rating: 5,
        comment: 'LEGO как всегда на высоте. Ребенку очень понравилась космическая тематика.',
        date: '10 мар. 2024'
      }
    ]
  },
  {
    id: 'p3',
    name: 'Боди из органического хлопка "Облако"',
    category: 'Одежда',
    brand: 'BabyStyle',
    price: 29.00,
    rating: 4.8,
    reviewsCount: 89,
    description: 'Мягкий органический хлопок, идеальный для чувствительной кожи новорожденных.',
    stock: 'in_stock',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCrN82bp2oY5_rxFhv7wKw0V3ofbVZOER98GYuOh4K96wmclm_Z3aRvymPGua2QQ0qG1El1puaXoKGDTAG7adPvFPSYgkdIcoP2K26Y_xePqQh4SGQER75vEIq7pvN-PkLRsoBSaDO1wiSW17zqjjJPZDcsoCc0vTLFPap52Hp7Ef_9ND_sHl-qhWXFA6AYoy_NoZKILyqHcAn4yOX2AJ8HhonVEonFbGeI6jWn272o8ALG9Ua9PMeZQbLReYWISF6rYgwkG11FcG0c'],
  },
  {
    id: 'p4',
    name: 'Антиколиковая стеклянная бутылочка',
    category: 'Кормление',
    brand: 'SafeFeed',
    price: 18.50,
    oldPrice: 24.00,
    rating: 4.9,
    reviewsCount: 215,
    onSale: true,
    description: 'Бутылочка из термостойкого стекла с силиконовым покрытием и системой анти-колик.',
    stock: 'out_of_stock',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAxzbU6L9hX4TgO0NBenYoh13WnTZG12gZbfebpR5nMqKofJtX1xT9L6JQW4eOnx76lLGBFLqrPjB873DJqU65IyEyqM8GVYQl3BPZdAKHYLjyKUf4lvSYBviS5qahCk-ncbHqcuErc_-unBkH4QylKE0E-_4Rb8CrT9VRqEYgJlKS8ojVcmqso2JJZ7jA9GLwazSZfi91WnWSBUrJ-DmbXuuduKAzxBtQCXdV3ys-X59Zc5-gAcKIaWzfDWFwC2sLSp6MZlxUq-e_H'],
  },
  {
    id: 'p5',
    name: 'Развивающая деревянная башня',
    category: 'Игрушки',
    brand: 'EcoToys',
    price: 29.99,
    rating: 4.7,
    reviewsCount: 156,
    isNew: true,
    description: 'Натуральное дерево и безопасные краски для развития моторики вашего ребенка.',
    stock: 'in_stock',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAhBqhoJqhZ5-_4SENzT7cwtYX2JOuxeklMeEfD_6O4ZA2W5b1Rxso53qV88YGASvSz0osfK6RlGC6oJK1YMspcaepXL3GDSugZhivC2uT3ayLk1T0vddS1GIbvDRpMlK0FrHH5s4BhSw-hRr5lNSCU04pl2n-IIqhxrsvHtCYOPq3Z_cu44QRbw5dVxpV9RKaXgtXN5CiEDiezRnH_R0EjgPDBIctIeGrp_K6gXYxfqdheaCw-zBcJWozQrM9Da480A5D0nxF4wFJ0'],
  },
  {
    id: 'p6',
    name: 'Коляска Urban Glide',
    category: 'Коляски',
    brand: 'MoveKids',
    price: 299.00,
    rating: 4.9,
    reviewsCount: 67,
    description: 'Маневренная и легкая коляска для городских прогулок и путешествий.',
    stock: 'in_stock',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDcdYvjRRxv5uZTTufl7xk5nXFBn3Rp6hhNiJb6El7aWQWEmf5l0xzVBtuRi_MNWu4YTEP_g2nh-pR3OZE6Kpkx7Ne4H_B1SKh0jxiBLCA-t76mfyubEzjoYUu5IeqQoVRONNzDr6b2Yw7ecyUjFduV7JE5TTrFSfUG9krMPHWQG3Ss1PT_jzaUmAK2R1i64X_or3s6PrOs2h0G45RtAm8LHQpPagugRucKRahJ6BnjLt59BIcSnNaxCwYTuTNW2-RhwqG9uDAqWK8g'],
  },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'add', title: 'Кэшбэк за заказ #KM-8921', date: '12 дек. 2023', amount: 42 },
  { id: 't2', type: 'remove', title: 'Оплата части заказа #KM-8910', date: '08 дек. 2023', amount: 150 },
  { id: 't3', type: 'add', title: 'Приветственный бонус', date: '01 дек. 2023', amount: 500 },
];

export const ORDERS: Order[] = [
  {
    id: 'KM-8921',
    date: '12 дек. 2023',
    status: 'delivered',
    total: 84.50,
    items: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHb9x9-ifo9puSVprgbGpxCJWVTkgiQgqnLCAsOwfWTEK4o4Ye2RKjzmzZet7P06NvXZf37ttXCdn4N7NBEqNljtT2dY5cyzKJww9qPAH6Y0AXXn2rcB9-V2TkwI8FOAufijxMsICuvNW-F7ywZRfzOJv4mIPSznW-mg57PUe45tUt9TFJtReYRyMU7lxOcT8vfzLvH2CKwsnk6D5hmzZZtcOugI8Fd0y1MBzy-eb3-5eb1cswfBzcMeUPvPYTG-SGcTCIKnsPGin2',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5RAzkdfVF2PX8TusiPocyHkSNopA30zPoyU06BYTCE57MNzQyD9KChgTQCYlarF9gENbUMXCIG16fmY_oOUAqfc_-pFxMVMYbiWu0oUeU8ncnd8KMDlAaJqopGcf_PfmEEKS8i5ZcenKmQXJteNiAh-0Tjqmb8-tM5BBfXOMSQyKcQC5Dvx4lE1TjQ1GpEnRbXnwWstAP4VkFub1xGvGKQGHP07Qhm0YwuLjN_bJmqKbhib053avhLuS7FdALvks0f8zhd93psTNN'
    ],
    trackingNumber: 'KM123456789',
    estimatedDelivery: '15 дек. 2023',
    statusHistory: [
      { status: 'pending', label: 'Заказ принят', date: '12 дек. 09:00', completed: true },
      { status: 'processing', label: 'Сборка заказа', date: '12 дек. 11:30', completed: true },
      { status: 'shipped', label: 'Передано в доставку', date: '13 дек. 14:15', completed: true },
      { status: 'out_for_delivery', label: 'У курьера', date: '15 дек. 10:00', completed: true },
      { status: 'delivered', label: 'Доставлено', date: '15 дек. 16:45', completed: true },
    ]
  },
  {
    id: 'KM-8910',
    date: '08 апр. 2024',
    status: 'shipped',
    total: 320.00,
    items: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBVYsxA-eW1r_VOhUETleOTphXl6N5EKbvhwTbbe12gSqIpycEU9SHsvAdBQBFSH--pUtF59LA41KvfjySUKQJvsV61_WmsFJK-KXC9Q7En_JxqeyZuhSxBuz9dfcCiu3sSSD1zrF2LcJauJm-y59y6WjBRHjUfSSWIEIuK7-ItEprxlK5RWfqQn2s2rOd6fcz1YLemB6V-6WbhjwPJ0FBkrQDiJm8OBBV_k2ED0XCEWPp9nJf53RBQog4Rp5GmS-BpTkhE0Dius-KE'],
    trackingNumber: 'KM987654321',
    estimatedDelivery: '25 апр. 2024',
    statusHistory: [
      { status: 'pending', label: 'Заказ принят', date: '08 апр. 15:30', completed: true },
      { status: 'processing', label: 'Сборка заказа', date: '09 апр. 10:00', completed: true },
      { status: 'shipped', label: 'Передано в доставку', date: '10 апр. 12:00', completed: true },
      { status: 'out_for_delivery', label: 'В пути', date: '-', completed: false },
      { status: 'delivered', label: 'Доставлено', date: '-', completed: false },
    ]
  }
];

export const EXCHANGE_RATES = {
  USD: { rate: 1, symbol: '$' },
  KZT: { rate: 450, symbol: '₸' },
  RUB: { rate: 90, symbol: '₽' }
};

export type CurrencyCode = keyof typeof EXCHANGE_RATES;
