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

Deno.test("Ru Locale with declinations", () => {
    const Humanity = createHumanity("ru_RU");

    assertEquals(Humanity.number(1), "1", "one");
    assertEquals(Humanity.number(100000), "100 тысяч", "100 thousand");
    assertEquals(Humanity.number(2000000), "2 миллиона", "2 million");
    assertEquals(Humanity.number(30000000), "30 миллионов", "30 million");
    assertEquals(
        Humanity.number(1000000000000000000),
        "1 квинтиллион",
        "1 quintillion"
    );

    assertEquals(
        Humanity.number(2000000000000000000),
        "2 квинтиллиона",
        "1 quintillion"
    );
});

Deno.test("Custom Locale", () => {
    const Humanity = createCustomHumanity({
        locale: "custom",
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
        excludeNumbers: ["billion"],
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
