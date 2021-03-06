import { assertEquals } from "https://deno.land/std@0.146.0/testing/asserts.ts";

import Humanity, {
    createCustomHumanity,
    createHumanity,
} from "../src/Humanity.ts";

import { DefaultLocales } from "../mod.ts";

Deno.test("Test humanity class", () => {
    assertEquals(Humanity.number(1), "1", "one");
    assertEquals(Humanity.number(100000), "100 thousand", "100 thousand");
    assertEquals(Humanity.number(1000000), "1 million", "1 million");
    assertEquals(Humanity.number(10000000), "10 million", "10 million");
    assertEquals(Humanity.number(100000000), "100 million", "100 million");
    assertEquals(Humanity.number(1000000000), "1 billion", "1 billion");
    assertEquals(Humanity.number(10000000000), "10 billion", "10 billion");
    assertEquals(Humanity.number(100000000000), "100 billion", "100 billion");
    assertEquals(Humanity.number(1000000000000), "1 trillion", "1 trillion");
    assertEquals(Humanity.number(10000000000000), "10 trillion", "10 trillion");
    assertEquals(
        Humanity.number(100000000000000),
        "100 trillion",
        "100 trillion"
    );
    assertEquals(
        Humanity.number(1000000000000000),
        "1 quadrillion",
        "1 quadrillion"
    );
    assertEquals(
        Humanity.number(10000000000000000n),
        "10 quadrillion",
        "10 quadrillion"
    );
    assertEquals(
        Humanity.number(100000000000000000n),
        "100 quadrillion",
        "100 quadrillion"
    );
    assertEquals(
        Humanity.number(1000000000000000000n),
        "1 quintillion",
        "1 quintillion"
    );
    assertEquals(Humanity.number(2500000), "2 million", "2 million");
    // 2 000 000 000
    assertEquals(Humanity.number(2500000000), "2 billion", "2 billion");
    // 200 000 000 000
    assertEquals(Humanity.number(250000000000), "200 billion", "200 billion");

    assertEquals(
        Humanity.number(10000000000000000000n),
        "10 quintillion",
        "10 quintillion"
    );
    assertEquals(
        Humanity.number(100000000000000000000n),
        "100 quintillion",
        "100 quintillion"
    );
    assertEquals(
        Humanity.number(1000000000000000000000n),
        "1 sextillion",
        "1 sextillion"
    );
});

Deno.test("Ru locale with declinations", () => {
    const Humanity = createHumanity("ru_RU");

    assertEquals(Humanity.number(1), "1", "one");
    assertEquals(Humanity.number(100000), "100 ??????????", "100 thousand");
    assertEquals(Humanity.number(2000000), "2 ????????????????", "2 million");
    assertEquals(Humanity.number(30000000), "30 ??????????????????", "30 million");
    assertEquals(
        Humanity.number(1000000000000000000),
        "1 ??????????????????????",
        "1 quintillion"
    );

    assertEquals(
        Humanity.number(2000000000000000000),
        "2 ????????????????????????",
        "1 quintillion"
    );
});

Deno.test("Custom Locale", () => {
    const Humanity = createCustomHumanity({
        locale: "custom",
        separator: ",",
        words: {
            ...DefaultLocales.en_US.words,
        },
        numbers: {
            thousand: "tis",
            million: "er",
            billion: "pe",
            trillion: "xe",
            quadrillion: "fa",
            quintillion: "ier",
            sexillion: "sex",
        },
    });

    assertEquals(Humanity.number(1), "1", "one");
    assertEquals(Humanity.number(100000), "100 tis", "100 thousand");
    assertEquals(Humanity.number(1000000), "1 er", "1 million");
});

Deno.test("Disabling features", () => {
    const Humanity = createHumanity();
    Humanity.disableFeature("spacing");
    assertEquals(Humanity.number(100000), "100thousand", "100 thousand");
});

Deno.test("Test humanity class", () => {
    const Humanity = createCustomHumanity({
        locale: "custom",
        separator: ",",
        excludeNumbers: ["billion"],
        words: {
            ...DefaultLocales.en_US.words,
        },
        numbers: {
            thousand: "thousand",
            million: "million",
            billion: "billion",
            trillion: "trillion",
            quadrillion: "quadrillion",
            quintillion: "quintillion",
            sexillion: "sextillion",
        },
    });
    assertEquals(Humanity.number(1), "1", "one");
    assertEquals(Humanity.number(100000), "100 thousand", "100 thousand");
    assertEquals(Humanity.number(1000000), "1 million", "1 million");
    assertEquals(Humanity.number(10000000), "10 million", "10 million");
    assertEquals(Humanity.number(100000000), "100 million", "100 million");
    assertEquals(Humanity.number(1000000000), "1000000000", "1 billion");
    assertEquals(Humanity.number(10000000000), "10000000000", "10 billion");
    assertEquals(Humanity.number(100000000000), "100000000000", "100 billion");
    assertEquals(Humanity.number(1000000000000), "1 trillion", "1 trillion");
    assertEquals(Humanity.number(10000000000000), "10 trillion", "10 trillion");
    assertEquals(
        Humanity.number(100000000000000),
        "100 trillion",
        "100 trillion"
    );
    assertEquals(
        Humanity.number(1000000000000000),
        "1 quadrillion",
        "1 quadrillion"
    );
    assertEquals(
        Humanity.number(10000000000000000n),
        "10 quadrillion",
        "10 quadrillion"
    );
    assertEquals(
        Humanity.number(100000000000000000n),
        "100 quadrillion",
        "100 quadrillion"
    );
    assertEquals(
        Humanity.number(1000000000000000000n),
        "1 quintillion",
        "1 quintillion"
    );
    assertEquals(Humanity.number(2500000), "2 million", "2 million");
    // 2 000 000 000
    assertEquals(Humanity.number(2500000000), "2500000000", "2 billion");
    // 200 000 000 000
    assertEquals(Humanity.number(250000000000), "250000000000", "200 billion");

    assertEquals(
        Humanity.number(10000000000000000000n),
        "10 quintillion",
        "10 quintillion"
    );
    assertEquals(
        Humanity.number(100000000000000000000n),
        "100 quintillion",
        "100 quintillion"
    );
    assertEquals(
        Humanity.number(1000000000000000000000n),
        "1 sextillion",
        "1 sextillion"
    );
});

Deno.test("String and Number truncate", () => {
    assertEquals(Humanity.truncate("123456789", 5), "12345...");
    assertEquals(Humanity.truncate(123456789, 5), "12345...");
    assertEquals(
        Humanity.truncate(
            "Humanity is a library for humanizing data in a human-readable form.",
            24
        ),
        "Humanity is a library fo..."
    );
});

Deno.test("Roman numbers", () => {
    assertEquals(Humanity.toRoman(1), "I");
    assertEquals(Humanity.toRoman(50), "L");
    assertEquals(Humanity.toRoman(505), "DV");
    assertEquals(
        Humanity.toRoman(54481),
        "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMCDLXXXI"
    );
});

Deno.test("Binary suffix", () => {
    assertEquals(Humanity.binarySuffix(0), "0 B");
    assertEquals(Humanity.binarySuffix(1), "1.00 B");
    assertEquals(Humanity.binarySuffix(1024, 0), "1 KB");
    assertEquals(Humanity.binarySuffix(1025), "1.00 KB");
    assertEquals(Humanity.binarySuffix(25451215, 0), "24 MB");
});

Deno.test("Custom English", () => {
    const CustomEnglish = DefaultLocales.en_US;

    CustomEnglish.binarySuffixes = {
        Bytes: "bytes",
        GigaBytes: "gigiabytes",
        TeraBytes: "terabytes",
    };

    const Humanity = createCustomHumanity(CustomEnglish);

    assertEquals(Humanity.binarySuffix(25, 0), "25 bytes");
    assertEquals(Humanity.binarySuffix(8000000000, 0), "7 gigiabytes");
    assertEquals(Humanity.binarySuffix(80000000, 0), "76 MB");
    assertEquals(Humanity.binarySuffix(8000005454400, 0), "7 terabytes");
});

Deno.test("array to text", () => {
    const chatMembers = [
        "Dustin",
        "Leda",
        "Tristin",
        "Maybelle",
        "Dee",
        "Stephon",
    ];

    assertEquals(
        Humanity.arrayToText(chatMembers, 3),
        "Dustin, Leda, Tristin and 3 others"
    );

    const DEHumanity = createHumanity("de_DE");

    assertEquals(
        DEHumanity.arrayToText(chatMembers, 3),
        "Dustin, Leda, Tristin und 3 andere"
    );

    const RUHumanity = createHumanity("ru_RU");

    assertEquals(
        RUHumanity.arrayToText(chatMembers, 3),
        "Dustin, Leda, Tristin ?? 3 ????????????"
    );

    assertEquals(
        Humanity.arrayToText(chatMembers, 2),
        "Dustin, Leda and 4 others"
    );

    assertEquals(
        Humanity.arrayToText(chatMembers, 6),
        "Dustin, Leda, Tristin, Maybelle, Dee, Stephon..."
    );
});

Deno.test("DateTime", () => {
    const MapDates = [
        {
            // 04 Jul 2014 15:20:50
            e: new Date(1404472850000),
            // 04 Jul 2022 15:20:50
            e2: new Date(1656933650000),
            result: "7 years ago",
        },
        {
            // 04 Jul 2022 15:20:50
            e: new Date(1656933650000),
            // 04 Jul 2022 15:20:55
            e2: new Date(1656933655000),
            result: "5 seconds ago",
        },
        {
            // 04 Jul 2022 15:20:55
            e: new Date(1656933655000),
            // 04 Jul 2022 15:23:55
            e2: new Date(1656933835000),
            result: "3 minutes ago",
        },
        {
            // 04 Jul 2022 15:20:55
            e: new Date(1656933655000),
            // 04 Jul 2022 15:20:55
            e2: new Date(1656933655000),
            result: "just now",
        },
        {
            // 04 Jul 2022 16:20:55
            e: new Date(1656933835000),
            // 04 Jul 2022 15:20:55
            e2: new Date(1656937435000),
            result: "1 hours ago",
        },
        {
            // 30 Jun 2022 00:00:0
            e: new Date(1656532800000),
            // 30 Jul 2022 00:00:0
            e2: new Date(1659211200000),
            result: "4 weeks ago",
        },
    ];

    MapDates.forEach((map) => {
        assertEquals(Humanity.dateTime.difference(map.e, map.e2), map.result);
    });
});

Deno.test("Human case", () => {
    assertEquals(Humanity.humanCase("isCamelCase"), "Is camel case");
    assertEquals(Humanity.humanCase("IsUpperCamelCase"), "Is upper camel case");
    assertEquals(Humanity.humanCase("is_snake_case"), "Is snake case");
    assertEquals(Humanity.humanCase("main Field"), "Main field");
});
