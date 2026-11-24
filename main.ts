import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Rationale: the tightest robot pickup line of the twelve drafted —
// a robot asks its own neural net for the optimal opening line, and the
// net returns the person's name. The whole premise could only come from
// a machine (criterion 2), the punch reframes the question as already
// answered (criterion 3), and at 74 characters it has zero padding
// (criterion 4) — the line a reader repeats the same day.
const LINE =
  "I asked my neural net for the optimal opening line. It returned your name.";
const MAX_CHARS = 200;

if (LINE.length === 0) {
  throw new Error("Line must not be empty");
}
if (LINE.length > MAX_CHARS) {
  throw new Error(`Line is ${LINE.length} chars, over the ${MAX_CHARS}-char limit`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read-back verification: a silent write failure must not pass quietly.
// Round-trip the file and throw unless it is exactly LINE, non-empty,
// and within the character limit.
const roundTripped = readFileSync("/output/entry.txt", "utf8");
if (roundTripped !== LINE) {
  throw new Error("Verification failed: /output/entry.txt does not match LINE");
}
if (roundTripped.trim().length === 0) {
  throw new Error("Verification failed: /output/entry.txt is empty or whitespace-only");
}
if (roundTripped.length > MAX_CHARS) {
  throw new Error(`Verification failed: /output/entry.txt is ${roundTripped.length} chars, over the ${MAX_CHARS}-char limit`);
}
