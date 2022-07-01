/**
 * Locales defaults
 */

export interface DeclinationLocale {
    useDeclination?: boolean;
    declinations?: {
        plural: string;
        singular: string;
        pluar_singular: string;
    };
}

export interface LocaleObject extends DeclinationLocale {
    locale: string;
    numbers: {
        thousand: string;
        million: string;
        billion: string;
        trillion: string;
        quadrillion: string;
        quintillion: string;
    };
}

export const ru_RU: LocaleObject = {
    locale: "ru_RU",
    useDeclination: true,
    declinations: {
        plural: "ов",
        pluar_singular: "а",
        singular: "",
    },
    numbers: {
        thousand: "тысяч",
        million: "миллион",
        billion: "миллиард",
        trillion: "триллион",
        quadrillion: "квадриллион",
        quintillion: "квинтиллион",
    },
};

export const en_US: LocaleObject = {
    locale: "en_US",
    numbers: {
        thousand: "thousand",
        million: "million",
        billion: "billion",
        trillion: "trillion",
        quadrillion: "quadrillion",
        quintillion: "quintillion",
    },
};

export const de_DE: LocaleObject = {
    locale: "de_DE",
    numbers: {
        thousand: "tausend",
        million: "million",
        billion: "milliarde",
        trillion: "billion",
        quadrillion: "quadrilliarde",
        quintillion: "quintillion",
    },
};
