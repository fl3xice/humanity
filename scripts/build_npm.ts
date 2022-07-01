// deno run -A scripts/build_npm.ts 0.1.0
import { build, emptyDir } from "https://deno.land/x/dnt@0.27.0/mod.ts";

await emptyDir("./npm");

await build({
    entryPoints: ["./mod.ts"],
    outDir: "./npm",
    shims: {
        deno: true,
    },
    package: {
        name: "humanity-deno",
        version: Deno.args[0],
        description:
            "Humanity is a library for humanizing data in a human-readable form.",
        license: "AGPL-3.0",
        repository: {
            type: "git",
            url: "git+https://github.com/fl3xice/humanity.git",
        },
        bugs: {
            url: "https://github.com/fl3xice/humanity/issues",
        },
    },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
