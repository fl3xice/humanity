import DateTime from "./DateTimeHumanity.ts";
import { en_US, ru_RU, de_DE, LocaleObject } from "./Locales.ts";

export type Feature = "spacing";
export type LocaleHumanity = "ru_RU" | "en_US" | "de_DE" | "custom";

class Humanity {
    private localeObject: LocaleObject;
    private withSpace = true;
    private suffixes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    public dateTime = DateTime;

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
        type KeysOfUnion<T> = T extends T ? keyof T : string;

        /**
         * MAP OF SUFFIXES
         */
        const mapSuffixes = {
            Bytes: 0,
            KiloBytes: 1,
            MegaBytes: 2,
            GigaBytes: 3,
            TeraBytes: 4,
            PetaBytes: 5,
            ExaBytes: 6,
            ZettaBytes: 7,
            YottaBytes: 8,
        };

        // Replace suffixes on custom suffixes
        if (this.localeObject.binarySuffixes) {
            Object.entries(this.localeObject.binarySuffixes).forEach(
                (value) => {
                    const key = value[0];
                    const valueOfKey = value[1];
                    // @ts-ignore - typescript doesn't know about this
                    this.suffixes[mapSuffixes[key]] = valueOfKey;
                }
            );
        }
    }

    /**
     * Disable functionality of features
     * ```typescript
     * // This feature disable space between number and word
     * const Humanity = createHumanity();
     * Humanity.disableFeature("spacing");
     * console.log(Humanity.number(100000));
     * // Output: 100thousand
     * ```
     * @param feature Feature to be used
     */
    disableFeature(feature: Feature) {
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
        if (lenZeros < 5 || lenZeros > (numbers.length + 1) * 3) {
            return lenZeros.toString();
        }

        const found = Math.floor(lenZeros / 3) - 1;
        if (
            this.localeObject.excludeNumbers &&
            this.localeObject.excludeNumbers.some((x) => x == numbers[found])
        ) {
            return lenZeros.toString();
        }

        return Object.values(this.localeObject.numbers)[found];
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
            return `${numberStr}${this.spaceIf()}${nameOfNumber}${
                this.localeObject.declinations[declination]
            }`;
        } else {
            return `${numberStr}${this.spaceIf()}${nameOfNumber}`;
        }
    }

    private spaceIf() {
        return this.withSpace ? " " : "";
    }

    /**
     * Truncate string to max length and paste in end '...'
     * ```typescript
     *  const str = Humanity.truncate(
     *      "Humanity is a library for humanizing data in a human-readable form.",
     *      24
     *  );
     *
     *  console.log(str);
     *
     * // Output: Humanity is a library fo...
     * ```
     * @param n Number to be converted to a string
     * @param lengthMax
     * @returns string
     */
    truncate(n: string | number | bigint, lengthMax: number): string {
        if (typeof n == "number") {
            n = n.toString();
        }
        if (typeof n == "bigint") {
            n = n.toString();
        }
        if (n.length > lengthMax) {
            return n.substring(0, lengthMax) + "...";
        }
        return n;
    }

    /**
     * Convert arabic number to roman numerals
     * @param n Number to be converted to a roman numerals
     * @returns string
     */
    toRoman(n: number): string {
        const roman = {
            M: 1000,
            CM: 900,
            D: 500,
            CD: 400,
            C: 100,
            XC: 90,
            L: 50,
            XL: 40,
            X: 10,
            IX: 9,
            V: 5,
            IV: 4,
            I: 1,
        };
        let romanNum = "";
        for (const [key, value] of Object.entries(roman)) {
            while (n >= value) {
                romanNum += key;
                n -= value;
            }
        }
        return romanNum;
    }

    /**
     * Convert bytes to human readable format
     * ### Example
     * 0 B
     *
     * 1.00 B
     *
     * 1.00 KB
     *
     * 1.00 KB
     * @param bytes Number of bytes
     * @param fixed Number of decimal places
     * @returns string
     */
    binarySuffix(bytes: number, fixed = 2): string {
        if (bytes == 0) {
            return `0${this.spaceIf()}${this.suffixes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(fixed)}${this.spaceIf()}${
            this.suffixes[i]
        }`;
    }

    /**
     * Collection data to string
     * ```typescript
     * const chatMembers = ["Dustin", "Leda", "Tristin", "Maybelle", "Dee", "Stephon"];
     * const r = Humanity.arrayToText(chatMembers, 3);
     * console.log(r);
     * // Output: Dustin, Leda, Tristin and 3 others
     * ```
     * @param arr Array with your content
     * @param n length to slice of array
     * @returns string
     */
    arrayToText<T = string>(arr: T[], n = 2): string {
        const SEPARATOR = this.localeObject.separator + " ";

        if (n == 0 || arr.length == 1) {
            return String(arr[0]);
        }

        if (arr.length < n) {
            return arr.slice(0).join(SEPARATOR);
        }

        if (arr.length > n) {
            return (
                arr.slice(0, n).join(SEPARATOR) +
                " " +
                this.localeObject.words.and +
                " " +
                (arr.length - n) +
                " " +
                this.localeObject.words.others
            );
        }

        return arr.slice(0, n).join(SEPARATOR) + "...";
    }

    humanCase(data: string): string {
        const lengthOfString = data.length;

        const wordsMap: number[] = [];

        let isCamelCase = false;
        let isUpperCamelCase = false;
        let isSnakeCase = false;

        if (lengthOfString <= 1) {
            return data;
        }

        const firstLetter = data.charAt(0);

        // Check first letter for future check for camelCase
        if (this.isUpperCase(firstLetter)) {
            isUpperCamelCase = true;
        } else {
            isCamelCase = true;
        }

        // Check if string is a snake case
        if (data.includes("_")) {
            isSnakeCase = true;
        }

        // Change state two variables if detecting that string is not camelCase
        isCamelCase = !isSnakeCase;
        isUpperCamelCase = !isSnakeCase;

        // Foreach all string by char to char
        for (let i = 1; i < lengthOfString; i++) {
            const letter = data.charAt(i);

            // Check if letter is upper case
            if (this.isUpperCase(letter) && (isUpperCamelCase || isCamelCase)) {
                addWordToMap(i);
            }

            // Check if is underscore
            if (letter == "_") {
                addWordToMap(i);
            }
        }

        let result: string[] = [];
        let i = 0;

        wordsMap.forEach((word) => {
            result.push(data.slice(i, word));
            i = word;
        });

        result.push(data.slice(i));

        result = result.map((word, i) => {
            if (isSnakeCase && i != 0) {
                return word.slice(1);
            }

            if (i == 0) {
                return word.slice(0, 1).toUpperCase() + word.slice(1);
            }

            return word.toLowerCase();
        });

        console.log(result.join(" "));

        function addWordToMap(index: number) {
            wordsMap.push(index);
        }

        return "";
    }

    /**
     * If char is uppercase
     * @param char
     * @returns boolean
     */
    isUpperCase(char: string): boolean {
        return char.toUpperCase() === char;
    }

    /**
     * If char is lowercase
     * @param char
     * @returns boolean
     */
    isLowerCase(char: string): boolean {
        return char.toLowerCase() === char;
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
