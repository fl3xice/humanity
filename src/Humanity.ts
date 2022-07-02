import { en_US, ru_RU, de_DE, LocaleObject } from "./Locales.ts";

export type Feature = "spacing";
export type LocaleHumanity = "ru_RU" | "en_US" | "de_DE" | "custom";

class Humanity {
    private localeObject: LocaleObject;
    private withSpace = true;

    /**
     * Constructor for setting locale
     * @param locale Locale to be used
     */
    constructor(locale: LocaleHumanity = "en_US", customLocale?: LocaleObject) {
        if (locale == "custom" && customLocale) {
            this.localeObject = customLocale;
        } else {
            this.localeObject = this.getLocale(locale);
        }
    }

    /**
     * Disable functionality of features
     * ```typescript
     * // This feature disable space between number and word
     * const Humanity = createHumanity();
     * Humanity.disable("spacing");
     * console.log(Humanity.number(100000));
     * // Output: 100thousand
     * ```
     * @param feature Feature to be used
     */
    disable(feature: Feature) {
        switch (feature) {
            case "spacing":
                this.withSpace = false;
                break;
        }
    }

    getLocale(locale: LocaleHumanity): LocaleObject {
        switch (locale) {
            case "ru_RU":
                return ru_RU;
            case "en_US":
                return en_US;
            case "de_DE":
                return de_DE;
            default:
                return en_US;
        }
    }

    private declinationNumbers(
        n: number | bigint,
        lenZeros: number
    ): "plural" | "singular" | "pluar_singular" {
        if (
            this.localeObject.useCountZerosAfterFirstDigit == true &&
            lenZeros % 3 > 0 &&
            lenZeros > 5
        ) {
            return "plural";
        }

        if (n == 1) {
            return "singular";
        }
        if (n > 1 && n < 5) {
            return "pluar_singular";
        }

        return "plural";
    }

    /**
     * @param lenZeros Length of the number
     * @returns string
     */
    private getZerosByCountZeros(lenZeros: number): string {
        return lenZeros % 3 == 0
            ? ""
            : new Array(lenZeros % 3).fill("0").join("");
    }

    private switchWord(lenZeros: number): string {
        const numbers = Object.keys(this.localeObject.numbers);
        const len = lenZeros % numbers.length;
        return Object.values(this.localeObject.numbers)[len];
    }

    /**
     * Max returned number quintillion
     * ```typescript
     * Humanity.number(100); // return a humanized number
     * ```
     * @param n Number to be converted to a string
     * @returns string representation of the number
     */
    number(n: number | bigint): string {
        let number = Array.from(n.toString());
        if (number.indexOf(".") != -1) {
            number = number.splice(number.indexOf("."));
        }
        const lenZeros = number.length - 1;
        const firstDigit =
            typeof n == "bigint" ? BigInt(number[0]) : Number(number[0]);

        const declination = this.declinationNumbers(firstDigit, lenZeros);

        const zeros = this.getZerosByCountZeros(lenZeros);
        const numberStr = firstDigit + zeros;
        const nameOfNumber = this.switchWord(lenZeros);

        if (nameOfNumber == lenZeros.toString()) {
            return n.toString();
        }

        if (this.localeObject.declinations) {
            return `${numberStr}${this.withSpace ? " " : ""}${nameOfNumber}${
                this.localeObject.declinations[declination]
            }`;
        } else {
            return `${numberStr}${this.withSpace ? " " : ""}${nameOfNumber}`;
        }
    }
}

/**
 * create Humanity instance with default locale
 * ```typescript
 * const Humanity = createHumanity('en_US');
 * console.log(Humanity.number(500000)); // 500 000
 * // Output: 500 thousand
 * ```
 * @param locale Locale to be used
 * @returns Humanity instance
 */
function createHumanity(locale: LocaleHumanity = "en_US"): Humanity {
    return new Humanity(locale);
}

/**
 * create Humanity instance with custom locale
 * ```typescript
 * const Humanity = createCustomHumanity({
 *     locale: "custom",
 *     numbers: {
 *         thousand: "tis",
 *         million: "er",
 *         billion: "pe",
 *         trillion: "xe",
 *         quadrillion: "fa",
 *         quintillion: "ier",
 *     },
 * });
 *
 * console.log(Humanity.number(1000000)); // 1 000 000
 * // Output: 1 er
 * ```
 * @param locale Locale to be used
 * @returns Humanity instance
 */
function createCustomHumanity(locale: LocaleObject): Humanity {
    return new Humanity("custom", locale);
}

export default new Humanity();
export { createHumanity, createCustomHumanity };
