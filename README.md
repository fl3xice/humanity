# Humanity

[![Deno](https://github.com/fl3xice/humanity/actions/workflows/deno.yml/badge.svg)](https://github.com/fl3xice/humanity/actions/workflows/deno.yml)
![GitHub](https://img.shields.io/github/license/fl3xice/humanity)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/fl3xice/humanity)
[![npm](https://img.shields.io/npm/v/humanity-deno)](https://www.npmjs.com/package/humanity-deno)

![GitHub Repo stars](https://img.shields.io/github/stars/fl3xice/humanity?style=social)

Humanity is a library for humanizing data in a human-readable form.

## How to use

### Deno

```typescript
import { createHumanity } from "https://deno.land/x/humanity/mod.ts";

const Humanity = createHumanity("en_US");

console.log(Humanity.number(500000)); // 500 000
// Output: 500 thousand
```

### NodeJS

You can use it library with NodeJS

```
npm i humanity-deno
```

```javascript
const { createHumanity } = require("humanity-deno");

const Humanity = createHumanity("en_US");

console.log(Humanity.number(500000)); // 500 000
// Output: 500 thousand
```

## You can use custom language

```typescript
import { createCustomHumanity } from "https://deno.land/x/humanity/mod.ts";
const Humanity = createCustomHumanity({
    locale: "custom",
    words: {
        ...DefaultLocales.en_US.words,
    },
    numbers: {
        thousand: "th",
        million: "m",
        billion: "b",
        trillion: "t",
        quadrillion: "q",
        quintillion: "qui",
    },
});

console.log(Humanity.number(500000)); // 500 th
```

## Disable spaces between number and word

```typescript
Humanity.disableFeature("spacing");
console.log(Humanity.number(500000)); // 500thousand
```

## Available functions

-   number(n: number | bigint): string <br/> `Humanity.number(500000) // 500 thousand`
-   truncate(n: string | number | bigint, lengthMax: number): string <br/> `Humanity.truncate("Humanity is a library for humanizing data in a human-readable form.", 24) // "Humanity is a library fo..."`
-   toRoman(n: number): string <br/> `Humanity.toRoman(505) // DV`
-   binarySuffix(n: number, fixed = 2): string <br/> `Humanity.binarySuffix(500, 0) // 500 B`
-   arrayToText(arr: any[], n = 2): string <br/> `Humanity.arrayToText(["Dustin", "Leda", "Tristin", "Maybelle", "Dee", "Stephon"], 3) // Dustin, Leda, Tristin and 3 others`
-   dateTime.difference(dateFirst: Date, dateAfter: Date): string <br/> `Humanity.dateTime.difference(1656532800000, 1659211200000); // 4 weeks ago`

## Supported languages by default

_You can customize defaults the language and create yourself language_

-   `en_US`
-   `de_DE`
-   `ru_RU`
