// Unified Entry — CharEntry for single characters / WordEntry for multi-character words.
// Files are views (the same entry sliced by source; files may overlap):
//   hsk20-words-{1..6}.json     entries where hsk20.level == N
//   hsk30-words-{1..6,7-9}.json entries where hsk30.level == N (levels 7–9 share one file)
//   gsc-tier-{1,2,3}.json       single-character entries where gsc.tier == N
// Empty-value semantics: "" / null = the source has none — never "unknown".

/** A definition entry: one reading × one POS atom (shared shape of official_definitions and full_definitions). */
export type Def = {
  // GB/T 16159-2012 tone-marked form: word-joined, ü retained, proper nouns capitalized, apostrophe separator, neutral tone unmarked, erhua -r (hsk30 printed form preferred, incl. the outline's sandhi like yìdiǎnr; otherwise derived from hsk20 with dictionary tones)
  pinyin: string;
  // GB/T 16159-2012 numbered form: tone digits with 5 = neutral tone, ü retained, word-joined (Han4yu3, xie4xie5)
  pinyin_num: string;
  // official: POS in full English words, one atom per entry (a source "a/b" splits into multiple entries; secondary POS in parentheses). full: CC-CEDICT has no POS, always empty (reserved)
  pos: string;
  // Senses array. official: official glosses, empty = []. full: all CEDICT senses of that reading
  meanings: string[];
};

/** HSK 2.0 (2009 official word lists). */
export type Hsk20Source = {
  // Entry id; null when the character is not a standalone word entry
  id: number | null;
  // Level where the word first enters the list as new vocabulary (1–6); null when the character is not a standalone word entry
  level: number | null;
  // Single characters only: the lowest level whose word list contains the character
  char_entry?: number;
  // Single characters only: all levels containing the character, ascending
  char_levels?: number[];
};

/** HSK 3.0 (2025 exam outline). */
export type Hsk30Source = {
  // Entry id; null when the character is not a standalone word entry
  id: number | null;
  // Level where the word first enters the list as new vocabulary (1–7; the merged 7–9 band has primary level 7); null when the character is not a standalone word entry
  level: number | null;
  // Single characters only: the lowest level whose word list contains the character
  char_entry?: number;
  // Single characters only: all levels containing the character, ascending
  char_levels?: number[];
};

/** Table of General Standard Chinese Characters (通用规范汉字表, 2013). */
export type GscSource = {
  // Global table ordinal, continuous 1–8105 across the three tiers
  id: number;
  // Tier 1|2|3 (3,500 / 3,000 / 1,605 characters)
  tier: 1 | 2 | 3;
};

/** CharEntry — single-character entry; e.g. 女 (a standalone word in both lists, present in every source). */
export type CharEntry = {
  // Entry id
  id: number | null;
  // The character (simplified)
  word: string;
  // Official HSK definitions (one entry per reading × POS atom: reading + POS + gloss)
  official_definitions: Def[];
  // Full definitions: CC-CEDICT dictionary entries grouped by reading (one per reading: reading + all senses); [] when CC-CEDICT lacks the character
  full_definitions: Def[];
  // HSK 2.0 sub-object
  hsk20: Hsk20Source | null;
  // HSK 3.0 sub-object
  hsk30: Hsk30Source | null;
  // Table of General Standard Chinese Characters sub-object
  gsc: GscSource | null;
};

/** WordEntry — multi-character word entry; same structure as CharEntry, plus chars: per-character annotations joined in word order, no separate character lookup needed. */
export type WordEntry = {
  // Entry id
  id: number;
  // The word (multi-character, simplified)
  word: string;
  // Official HSK definitions (multi-character words have word-level readings only, no per-character readings; glosses from hsk20 official data, hsk30 has no English so always [])
  official_definitions: Def[];
  // Full definitions: CC-CEDICT dictionary entries; [] when CC-CEDICT lacks the word
  full_definitions: Def[];
  // HSK 2.0 sub-object (word-level identity, no char_* fields)
  hsk20: Hsk20Source | null;
  // HSK 3.0 sub-object (word-level identity, no char_* fields)
  hsk30: Hsk30Source | null;
  // Multi-character words are not in the character table, always null
  gsc: null;
  // Per-character annotations: a CharEntry per character of the word (without official_definitions), joined in word order
  chars: Omit<CharEntry, 'official_definitions'>[];
};

/** hsk20-words-{1..6}.json — entries where hsk20.level == N (view file envelope). */
export type Hsk20WordsFile = {
  // Source declaration
  source: string;
  // Level number (1–6)
  level: number;
  // Entry count
  count: number;
  // Entries: single-character words = CharEntry, multi-character words = WordEntry
  items: (CharEntry | WordEntry)[];
  // CC-CEDICT attribution key — see NOTICE.md
  cedict: string;
};

/** hsk30-words-{1..6,7-9}.json — entries where hsk30.level == N (the 7–9 band shares one file, N = 7). */
export type Hsk30WordsFile = {
  // Source declaration
  source: string;
  // Level number (1–7; 7 = the merged 7–9 band)
  level: number;
  // Entry count (== items.length)
  count: number;
  // Entries: single-character words = CharEntry, multi-character words = WordEntry
  items: (CharEntry | WordEntry)[];
  // CC-CEDICT attribution key — see NOTICE.md
  cedict: string;
};

/** gsc-tier-{1,2,3}.json — single-character entries where gsc.tier == N (pure character-table view, no words). */
export type GscTierFile = {
  // Source declaration
  source: string;
  // Tier 1|2|3
  tier: 1 | 2 | 3;
  // Entry count (== items.length)
  count: number;
  // Single-character entries (the gsc view has no official HSK identity and carries no official_definitions field)
  items: Omit<CharEntry, 'official_definitions'>[];
  // CC-CEDICT attribution key — see NOTICE.md
  cedict: string;
};
