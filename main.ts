import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One funny single-line one-star review from a house cat about its human.
const ENTRY =
  "One star. He fills the bowl, then sits on MY chair and types on MY laptop like he pays rent. He does not. I do. In hair.";

// Gate: 1 to under 200 characters, a single line, not only white space.
if (ENTRY.length < 1 || ENTRY.length >= 200) {
  throw new Error(`entry must be 1 to under 200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, ENTRY, "utf8");
// Round-trip check: the file on disk must be exactly the validated entry.
if (readFileSync(dst, "utf8") !== ENTRY) {
  throw new Error(`round-trip mismatch: ${dst} differs from the validated entry`);
}
console.log(`wrote ${dst} (${ENTRY.length} characters)`);
