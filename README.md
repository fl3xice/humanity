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

## Supported languages by default

-   `en_US`
-   `de_DE`
-   `ru_RU`
