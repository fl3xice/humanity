import { de_DE, en_US, ru_RU } from "./src/Locales.ts";

export { default as Humanity } from "./src/Humanity.ts";
export { createCustomHumanity, createHumanity } from "./src/Humanity.ts";
export type { LocaleHumanity } from "./src/Humanity.ts";
export const DefaultLocales = { de_DE, en_US, ru_RU };
export type {
    DeclinationLocale,
    LocaleObject,
    NumberType,
    BinarySuffixes,
} from "./src/Locales.ts";
