import { en_US, ru_RU, de_DE, LocaleObject } from "./Locales.ts";

export type LocaleHumanity = "ru_RU" | "en_US" | "de_DE" | "custom";

class Humanity {
    private localeObject: LocaleObject;

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
        n: number | bigint
    ): "plural" | "singular" | "pluar_singular" {
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
        switch (lenZeros) {
            case 5:
                // 100 000
                return this.localeObject.numbers.thousand;
            case 6:
                // 1 000 000
                return this.localeObject.numbers.million;
            case 7:
                // 10 000 000
                return this.localeObject.numbers.million;
            case 8:
                // 100 000 000
                return this.localeObject.numbers.million;
            case 9:
                // 1 000 000 000
                return this.localeObject.numbers.billion;
            case 10:
                // 10 000 000 000
                return this.localeObject.numbers.billion;
            case 11:
                // 100 000 000 000
                return this.localeObject.numbers.billion;
            case 12:
                // 1 000 000 000 000
                return this.localeObject.numbers.trillion;
            case 13:
                // 10 000 000 000 000
                return this.localeObject.numbers.trillion;
            case 14:
                // 100 000 000 000 000
                return this.localeObject.numbers.trillion;
            case 15:
                // 1 000 000 000 000 000
                return this.localeObject.numbers.quadrillion;
            case 16:
                // 10 000 000 000 000 000
                return this.localeObject.numbers.quadrillion;
            case 17:
                // 100 000 000 000 000 000
                return this.localeObject.numbers.quadrillion;
            case 18:
                // 1 000 000 000 000 000 000
                return this.localeObject.numbers.quintillion;
            default:
                return lenZeros.toString();
        }
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

        const declination = this.declinationNumbers(firstDigit);

        const zeros = this.getZerosByCountZeros(lenZeros);
        const numberStr = firstDigit + zeros;
        const nameOfNumber = this.switchWord(lenZeros);

        if (nameOfNumber == lenZeros.toString()) {
            return n.toString();
        }

        if (this.localeObject.declinations) {
            return `${numberStr} ${nameOfNumber}${this.localeObject.declinations[declination]}`;
        } else {
            return `${numberStr} ${nameOfNumber}`;
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
