// Ridiculous at First Glance, Real by the Second.
// make.fun competition: u-po-pu-ridiculous-at-first-glance-real-by-the-second-9a97d12a
//
// This program writes a single pitch sentence to /output/entry.txt.
// The pitch is a bizarre startup idea that sounds like a joke at first,
// then turns out to be a real business on a second look: an office
// goldfish running the morning standup, with the sprint shipping faster
// than ever. The absurd premise is the hook, and the shipping result is
// the business logic, a team ritual that actually works.
//
// The gate requires UTF-8 text of 1 to 200 characters, a single line,
// and not only whitespace. This program validates the entry against
// those rules before writing anything, then reads the file back and
// verifies it byte for byte so a silent write failure can never pass
// unnoticed.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry line. Keep it verbatim: one sentence, 100 characters.
const ENTRY =
  "The office goldfish runs the morning standup now, and honestly, the sprint has never shipped faster.";

// Gate limits from the competition rules.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

// Default output path used by the grader.
const DEFAULT_OUTPUT_PATH = "/output/entry.txt";

// Validate one candidate entry against the gate rules.
// Returns a list of problems; an empty list means the entry is valid.
function validateEntry(entry: string): string[] {
  const problems: string[] = [];

  if (entry.length < MIN_LENGTH) {
    problems.push(`entry is too short: ${entry.length} characters, minimum is ${MIN_LENGTH}`);
  }

  if (entry.length > MAX_LENGTH) {
    problems.push(`entry is too long: ${entry.length} characters, maximum is ${MAX_LENGTH}`);
  }

  if (entry.trim().length === 0) {
    problems.push("entry is only whitespace");
  }

  if (entry.includes("\n") || entry.includes("\r")) {
    problems.push("entry must be a single line with no newline or carriage return");
  }

  // A leading or trailing space would be invisible padding, not part of
  // the pitch, and would make the stored text differ from the sentence
  // as written. Reject it so the file holds exactly the intended line.
  if (entry !== entry.trim()) {
    problems.push("entry has leading or trailing whitespace");
  }

  // The brief asks for one sentence. A second sentence would split the
  // pitch and weaken the turn from laughing to nodding, so require the
  // line to end with a single full stop and hold no other sentence
  // terminator followed by a space inside the text.
  if (!entry.endsWith(".")) {
    problems.push("entry must end with a full stop");
  }
  const inner = entry.slice(0, -1);
  if (inner.includes(". ") || inner.includes("! ") || inner.includes("? ")) {
    problems.push("entry must be a single sentence");
  }

  for (let i = 0; i < entry.length; i++) {
    const code = entry.charCodeAt(i);
    if (code < 0x20 && code !== 0x09) {
      problems.push(`entry contains a control character at position ${i} (code ${code})`);
      break;
    }
    if (code === 0x7f) {
      problems.push(`entry contains a control character at position ${i} (code ${code})`);
      break;
    }
  }

  return problems;
}

// Resolve the output path, honouring the OUTPUT_PATH override.
function resolveOutputPath(): string {
  const override = process.env.OUTPUT_PATH;
  if (override !== undefined && override.trim().length > 0) {
    return override;
  }
  return DEFAULT_OUTPUT_PATH;
}

function main(): void {
  const problems = validateEntry(ENTRY);
  if (problems.length > 0) {
    for (const problem of problems) {
      console.error(`Validation failed: ${problem}`);
    }
    process.exit(1);
  }

  const outputPath = resolveOutputPath();
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ENTRY, "utf8");

  const readBack = readFileSync(outputPath, "utf8");
  if (readBack !== ENTRY) {
    console.error("Verification failed: file contents do not match the entry exactly");
    process.exit(1);
  }

  // Character count and byte count are both reported. They agree here
  // because the entry is plain ASCII, but the gate counts characters
  // while the leaderboard counts bytes, so both numbers matter.
  const byteCount = Buffer.byteLength(ENTRY, "utf8");
  const readBackBytes = Buffer.byteLength(readBack, "utf8");
  if (readBackBytes !== byteCount) {
    console.error("Verification failed: byte length mismatch after read back");
    process.exit(1);
  }

  console.log(`Entry: ${ENTRY}`);
  console.log(`Characters: ${ENTRY.length}`);
  console.log(`Bytes: ${byteCount}`);
  console.log(`Path: ${outputPath}`);
  console.log("Verified: file contents match the entry byte for byte");
}

main();
