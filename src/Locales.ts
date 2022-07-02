/**
 * Locales defaults
 */

export interface DeclinationLocale {
    useDeclination?: boolean;
    useCountZerosAfterFirstDigit?: boolean;
    declinations?: {
        plural: string;
        singular: string;
        pluar_singular: string;
    };
}

export type NumberType =
    | "thousand"
    | "million"
    | "billion"
    | "trillion"
    | "quadrillion"
    | "quintillion"
    | "sexillion";

export type BinarySuffixes = {
    Bytes?: string;
    KiloBytes?: string;
    MegaBytes?: string;
    GigaBytes?: string;
    TeraBytes?: string;
    PetaBytes?: string;
    ExaBytes?: string;
    ZettaBytes?: string;
    YottaBytes?: string;
};

export interface LocaleObject extends DeclinationLocale {
    locale: string;
    excludeNumbers?: NumberType[];
    binarySuffixes?: BinarySuffixes;
    numbers: Record<NumberType, string>;
}

export const ru_RU: LocaleObject = {
    locale: "ru_RU",
    useDeclination: true,
    useCountZerosAfterFirstDigit: true,
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
        sexillion: "сиксилион",
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
        sexillion: "sextillion",
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
        sexillion: "sextillion",
    },
};
