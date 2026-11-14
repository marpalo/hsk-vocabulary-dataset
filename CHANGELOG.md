# Changelog

## 0.1.0 — 2026-11-15

Initial release.

- HSK 2.0 (2009) word lists: 5,000 words across levels 1–6 (official 2009 word lists; entries carry `hsk20_id` list-source entry ids; platform-only fields stripped; POS translated to English tags)
- HSK 3.0 (2025 exam outline) word lists: 11,000 words across levels 1–9 (PDF transcription, `hsk30_id` ordinals 1–11000 continuous); English glosses from CC-CEDICT, 85.4% coverage
- HSK 3.0 reading characters: 3,088 characters with official levels (per-level new: 246/125/284/441/431/413/1148)
- Table of General Standard Chinese Characters (2013): tiers 1–3, 8,105 characters
- Every entry is a unified object (see schema.js): HSK 2.0 / HSK 3.0 / General Standard Characters data in one shape, character-level annotations (GSC tier, HSK 2.0 dual-field leveling, HSK 3.0 reading level) embedded in single-character entries
- Pinyin in GB/T 16159-2012 orthography: `pinyin` tone-marked (word-joined `yīdiǎnr`, ü `nǚ’ér`, proper-noun caps `Hànyǔ`) and `pinyin_num` with tone digits (5 = neutral tone); HSK 3.0 keeps the outline's printed forms verbatim — known deviations declared in the README
- Validation: per-level ordinal continuity asserted; reading-character set ≡ word-list character set (mutual, zero diff); GB/T tone-form and machine-form assertions on every entry; 5/5 independent spot checks against source PDF pages
