# HSK Vocabulary Dataset

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](./LICENSE)
[![Data: 19,216 entries](https://img.shields.io/badge/Data-19,216_entries-green)](#whats-inside)
[![Standards: HSK 2.0 + 3.0 + GSC](https://img.shields.io/badge/Standards-HSK_2.0_+_3.0_+_GSC-orange)](#sources--licensing)
[![Pinyin: GB/T 16159](https://img.shields.io/badge/Pinyin-GB%2FT_16159-red)](#pinyin-format--gbt-16159-2012)

Structured vocabulary data for **both** Chinese proficiency standards (HSK 2.0 + HSK 3.0), cross-referenced against the **Table of General Standard Chinese Characters (通用规范汉字表, 2013)**.

**19,216 unique entries · 34 MB of plain JSON · No sign-up, no API key, no scraping required.**

## Quick Start

```bash
# Clone or download
git clone https://github.com/marpalo/hsk-vocabulary-dataset.git

# Or grab a single level
curl -O https://raw.githubusercontent.com/marpalo/hsk-vocabulary-dataset/main/data/hsk30-words-1.json

# Parse any file
jq '.items[0].word' data/hsk30-words-1.json
# → "爱"
```

Full schema with per-key comments: **[schema.ts](./schema.ts)**

## Contents

- [What's Inside](#whats-inside)
- [Unified Entries (Schema)](#unified-entries-schema)
- [Pinyin Format — GB/T 16159-2012](#pinyin-format--gbt-16159-2012)
- [Attribution](#attribution)
- [Sources & Licensing](#sources--licensing)
- [Site](#site)
- [Changelog](#changelog)

## What's Inside

```
data/
├── hsk20-words-{1..6}.json     HSK 2.0 word lists (5,000 words, levels 1–6)
├── hsk30-words-{1..6}.json     HSK 3.0 word lists (11,000 words, 2025 outline)
├── hsk30-words-7-9.json        HSK 3.0 levels 7–9 (one file; the outline lists them jointly)
└── gsc-tier-{1,2,3}.json       Table of General Standard Chinese Characters (3,500 / 3,000 / 1,605)
```

| Dataset | Content | Source |
|---|---|---|
| HSK 2.0 (2009 standard) | 5,000 words, levels 1–6 | Official word lists — [chinesetest.cn](https://www.chinesetest.cn/HSK) |
| HSK 3.0 (2025 exam outline) | 11,000 words, levels 1–9 (7–9 listed jointly) | Official exam outline PDF — [chinesetest.cn](https://hsk.cn-bj.ufileos.com/3.0/%E6%96%B0%E7%89%88HSK%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B21219.pdf) |
| Table of General Standard Chinese Characters | 8,105 characters, tiers 1–3 | State Council gazette (2013) — [gov.cn](https://www.gov.cn/gongbao/content/2013/content_2481095.htm) |

Data difference: 9 characters used by HSK 2.0 vocabulary — 桔 甭 嗨 伶 俐 儒 啥 斯 咋 — are absent from the HSK 3.0 reading-character list. **桔 (a variant form) is replaced by the standard character 橘.**

## Unified Entries (Schema)

Every entry in every file is a **unified object** carrying all sources together (`null` where a source is absent):

- **CharEntry** (single character): HSK 2.0 / HSK 3.0 / General Standard Characters annotations in one place
- **WordEntry** (multi-character word): same shape, plus a `chars` array — per-character annotations (leveling, readings, source ids)

Two definition layers per entry:

- `official_definitions` — **official HSK data** (readings, part-of-speech, official glosses; `[]` when the source has none). Multi-reading words expand to one entry per reading (谁 → `shéi` + `shuí`); multi-POS words expand per POS atom (代表 → `verb` + `noun`). The gsc-tier-* files do not contain this field.
- `full_definitions` — **CC-CEDICT** dictionary entries, grouped by reading, all senses

Each entry's top-level `id` is its primary key **in the file's own collection** (HSK 2.0 vocabulary ordinal / HSK 3.0 outline ordinal 1–11000 / character-table ordinal 1–8105).

Files are **views**: the same entry appears in every file it belongs to (女 can appear in hsk20-words-2, hsk30-words-1 and gsc-tier-1 — identical shape, `official_definitions` sourced from the file's own standard).

Full field reference with per-key comments: **[schema.ts](./schema.ts)**.

## Pinyin Format — GB/T 16159-2012

Pinyin fields follow [GB/T 16159-2012, Basic Rules for Chinese Pinyin Orthography](http://www.moe.gov.cn/ewebeditor/uploadfile/2015/01/13/20150113091717604.pdf). Words are written as single units:

- word-joined: `xièxie` 谢谢, `wǒmen` 我们, `rújiā` 儒家
- erhua `-r` attached: `yīdiǎnr` 一点儿, `hǎowánr` 好玩儿 — the non-syllabic suffix itself is `r` too (儿 → `r`)
- ü retained: `nǚ’ér` 女儿 (with the apostrophe separator)
- proper nouns capitalized: `Hànyǔ` 汉语
- neutral tone unmarked: `māma`, `xuésheng`

`pinyin` carries tone marks on the main vowel; `pinyin_num` transcribes the same form with tone digits (**5 = neutral tone**): `yīdiǎnr → yi1dian3r`, `Hànyǔ → Han4yu3`, `xièxie → xie4xie5`.

## Attribution

If you use this dataset, please credit:

```
Data: chinese-typing-practice.com/data/
License: CC BY 4.0
```

Attribution should link to `https://chinese-typing-practice.com/data/`.

## Sources & Licensing

- The underlying standards are official government publications (HSK outline by the Center for Language Education and Cooperation; the 2013 character table by the State Council) — official documents, not subject to copyright
- **This transcription, schema, and cross-reference layer are licensed under [CC BY 4.0](./LICENSE)**

The `full_definitions` layer is derived from **CC-CEDICT** and included under **CC BY-SA 4.0** ([cc-cedict.org](https://cc-cedict.org)) — when you redistribute these files or derivatives, keep the CC BY-SA 4.0 notice and credit CC-CEDICT. See [NOTICE.md](./NOTICE.md).

## Site

This project is maintained by [chinese-typing-practice.com](https://chinese-typing-practice.com/).

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
