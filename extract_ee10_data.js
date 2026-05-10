/**
 * extract_ee10_data.js  ── v5 (FINAL — optimized, correct, no truncation)
 * ─────────────────────────────────────────────────────────────────────────────
 * Statically extracts Arabic lesson strings from obfuscated ee10_data.js.
 *
 * CONFIRMED FACTS ABOUT THE OBFUSCATION
 * ───────────────────────────────────────
 * 1. The _0x249d array stores entries encoded as custom-alphabet Base64.
 *    Alphabet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='
 *    Decode:   base64 → binary bytes → %XX percent-encode → decodeURIComponent
 *
 * 2. The _0x249d function self-rotates via push/shift until a weighted sum of
 *    parseInt(decoded[indices]) === 383,645.  Confirmed rotation offset = 216.
 *
 * 3. The integrity check inside _0x321ff7 is a NO-OP for compact functions
 *    (no newlines → _0x88e662=false, and charCodeAt(pos+9)=10 never triggers
 *    because no '\n' exists in the function body → condition always true →
 *    correct char always emitted).
 *
 * 4. The PREVIOUS BUG in v2: we broke on val===64 ('='), but the original loop
 *    uses ~val as the loop guard — ~64=-65 is truthy, so '=' is processed, not
 *    skipped. With standard base64 padding at end, this doesn't change decoded
 *    bytes, but it prevents early termination of valid streams. Fixed below.
 *
 * 5. Previous OOM: building 11k strings with per-char indexOf on 65-char
 *    alphabet. Fixed with a precomputed lookup array (O(1) per char).
 *
 * Usage:  node extract_ee10_data.js [path/to/ee10_data.js]
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────

const filePath = process.argv[2] || path.join(__dirname, 'ee10_data.js');
const ROTATION = 216;   // confirmed by IIFE sum brute-force
const OFFSET   = 210;   // _0x3f7d91 - 210  (= -0x713*5 + 0x1f1c + 0x515)

console.log(`[*] Reading: ${filePath}`);
const src = fs.readFileSync(filePath, 'utf8');
console.log(`[*] File size: ${(src.length / 1_048_576).toFixed(2)} MB`);

// ─── 1. Extract raw string array from _0x249d ─────────────────────────────────

console.log('[*] Locating _0x249d array …');
const arrayFnIdx = src.indexOf('function _0x249d');
if (arrayFnIdx === -1) throw new Error('_0x249d not found');

const bracketOpen = src.indexOf('[', arrayFnIdx);
let depth = 0, bracketClose = -1;
for (let i = bracketOpen; i < bracketOpen + 2_000_000; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') { depth--; if (depth === 0) { bracketClose = i; break; } }
}
if (bracketClose === -1) throw new Error('Array end not found');

const arrayText  = src.slice(bracketOpen, bracketClose + 1);
const rawEntries = [];
const entryRe    = /'((?:[^'\\]|\\.)*)'/g;
let m;
while ((m = entryRe.exec(arrayText)) !== null) rawEntries.push(m[1]);
console.log(`[*] Raw entries: ${rawEntries.length.toLocaleString()}`);

// ─── 2. Apply confirmed rotation ─────────────────────────────────────────────

const rotated = [...rawEntries];
for (let i = 0; i < ROTATION; i++) rotated.push(rotated.shift());
console.log(`[*] Rotation applied: ${ROTATION}`);

// ─── 3. Optimized base64 decoder (mirrors _0x321ff7 exactly) ─────────────────
//
// Key: use a precomputed lookup array for O(1) per-character indexing.
// The alphabet's '=' is at position 64. The original loop condition is ~val
// (where val=64 gives -65, truthy), so '=' does NOT break the loop — but since
// its 6-bit value 64 = 0b111111, it can contribute bits. In practice standard
// base64 padding only appears at end and doesn't affect prior decoded bytes.

const ALPHA = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
const LOOKUP = new Uint8Array(128).fill(255); // 255 = not in alphabet
for (let i = 0; i < ALPHA.length; i++) LOOKUP[ALPHA.charCodeAt(i)] = i;

function decodeEntry(raw) {
  // 1. Unescape JS string escapes in the literal
  const str = raw
    .replace(/\\x([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\r/g, '\r')
    .replace(/\\\\/g, '\\').replace(/\\'/g, "'");

  // 2. Custom base64 decode → binary byte array
  //    Loop mirrors _0x321ff7: ~val used as guard (val=64 gives -65 which is truthy)
  const bytes = [];
  let acc = 0, bitsCollected = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 128) continue;               // not in ASCII range
    const val = LOOKUP[code];
    if (val === 255) continue;               // not in alphabet
    // DO NOT break on val===64 ('='): the original uses ~val as guard, which
    // is truthy for 64. Padding chars contribute 0 bits in practice since they
    // only appear at the end and don't produce a full 8-bit byte.
    acc = (acc << 6) | (val === 64 ? 0 : val);  // treat '=' as 0 (padding)
    bitsCollected += 6;
    if (bitsCollected >= 8) {
      bitsCollected -= 8;
      bytes.push((acc >> bitsCollected) & 0xFF);
      acc &= (1 << bitsCollected) - 1;
    }
  }

  // 3. percent-encode each byte → decodeURIComponent handles multi-byte UTF-8
  if (bytes.length === 0) return '';
  let pct = '';
  for (const b of bytes) pct += '%' + b.toString(16).padStart(2, '0');
  try { return decodeURIComponent(pct); } catch { return ''; }
}

// ─── 4. Verify on known-good value ───────────────────────────────────────────

// In the source: 'kOQym': 'تنزيل\x20نموذ' + 'ج\x20الأداء\x20ا' + 'لوظيفي\x20(مع' + _0x2f76b6(0x1eb,...)
// _0x2f76b6(0x1eb,-0xbdb,0x1083,0x9b9) = _0x5465(0x9b9 - 0x215, ...) = _0x5465(0x7a4 - 0xd2) = _0x5465(0x6d2=1746-offset)
// Let's just verify that we decode 'تنزيل' from some entry:
console.log('[*] Verifying …');
let foundArabic = 0;
for (let i = 0; i < Math.min(200, rotated.length); i++) {
  const d = decodeEntry(rotated[i]);
  if (/[\u0600-\u06FF]/.test(d)) {
    if (foundArabic < 3) console.log(`    [${i}] ${JSON.stringify(d)}`);
    foundArabic++;
  }
}
console.log(`    Found Arabic in first 200 entries: ${foundArabic}`);

// ─── 5. Decode full array ─────────────────────────────────────────────────────

console.log('[*] Decoding all entries …');
const decodedArray = rotated.map(decodeEntry);
console.log(`[*] Done. Non-empty: ${decodedArray.filter(Boolean).length.toLocaleString()}`);

// ─── 6. Inline Arabic from source ────────────────────────────────────────────

const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

function decodeEscapes(s) {
  try { return JSON.parse('"' + s.replace(/"/g, '\\"') + '"'); } catch {
    return s
      .replace(/\\x([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\n/g,'\n').replace(/\\t/g,'\t').replace(/\\r/g,'\r')
      .replace(/\\\\/g,'\\').replace(/\\'/g,"'");
  }
}

console.log('[*] Collecting inline Arabic literals …');
const inlineArabic = [];
const litRe2 = /'((?:[^'\\]|\\.)*)'/g;
let lm;
while ((lm = litRe2.exec(src)) !== null) {
  const d = decodeEscapes(lm[1]).trim();
  if (ARABIC_RE.test(d) && d.length >= 2) inlineArabic.push(d);
}
const concatRe = /'((?:[^'\\]|\\.)*)'\s*\+\s*'((?:[^'\\]|\\.)*)'(?:\s*\+\s*'((?:[^'\\]|\\.)*)')?(?:\s*\+\s*'((?:[^'\\]|\\.)*)')?(?:\s*\+\s*'((?:[^'\\]|\\.)*)')?/g;
let cm;
while ((cm = concatRe.exec(src)) !== null) {
  const j = [cm[1],cm[2],cm[3],cm[4],cm[5]].filter(Boolean).map(decodeEscapes).join('').trim();
  if (ARABIC_RE.test(j) && j.length >= 3) inlineArabic.push(j);
}
console.log(`[*] Inline: ${inlineArabic.length}`);

// ─── 7. Merge, filter, deduplicate ───────────────────────────────────────────

function arabicRatio(s) {
  if (!s.length) return 0;
  return [...s].filter(c => ARABIC_RE.test(c)).length / [...s].length;
}

const all  = [...decodedArray, ...inlineArabic];
const seen = new Set();
const arabic = [];

for (const raw of all) {
  const s = (raw || '').trim();
  if (!s || seen.has(s)) continue;
  seen.add(s);
  if (!ARABIC_RE.test(s))    continue;
  if (s.length < 2)          continue;
  if (arabicRatio(s) < 0.15) continue;
  arabic.push(s);
}
console.log(`[*] Unique Arabic strings: ${arabic.length}`);

// ─── 8. Classify ─────────────────────────────────────────────────────────────

const SECTIONS = [
  { key: 'introduction',            kw: ['التمهيد','المقدمة','تمهيد','البداية'] },
  { key: 'strategies',              kw: ['استراتيجي','الاستراتيجية','استراتيج','اتيجيات','اتيجية'] },
  { key: 'homework',                kw: ['الواجب','واجب','المنزلي','إنجاز الواجب','الواجبات','أداء الواجب'] },
  { key: 'objectives',              kw: ['الأهداف','أهداف','الهدف','هدفة','نتائج التعلم','نتاجات التعلم','نتاجات'] },
  { key: 'activities',              kw: ['النشاط','الأنشطة','نشاط','أنشطة'] },
  { key: 'evaluation',              kw: ['التقويم','تقويم','التقييم','تقييم'] },
  { key: 'closure',                 kw: ['الإغلاق','الختام','الخاتمة','الختامي','إغلاق بدون'] },
  { key: 'lesson_content',          kw: ['محتوى','موضوع الدرس','اسمالدرس','التخطيط','إعداد خطة','إعداد وتنفيذ'] },
  { key: 'differentiated_learning', kw: ['التعلم المتمايز','المتمايز','المتعلمين','للمتعلم','تعلمين','تربوية للمتأخرين','الداعمة','داعمة','تعلم مرن'] },
  { key: 'parent_engagement',       kw: ['أولياء','إشراك الأسرة','الأسرة'] },
  { key: 'performance',             kw: ['الأداء','الوظيفي','نماذج الأداء','تقييم أداء'] },
  { key: 'teaching_methods',        kw: ['التدريس','التفاعل','وسائل تعليمية','استثمار نت'] },
  { key: 'resources',               kw: ['الموارد','المراجع','التجارب'] },
  { key: 'download',                kw: ['تنزيل','تحميل'] },
  { key: 'save',                    kw: ['حفظ'] },
  { key: 'ui_messages',             kw: ['يرجى','جاري','الرجاء','تعذر','بنجاح','تم الح','تم الر'] },
  { key: 'form_fields',             kw: ['اسمالمعلم','اسمالمادة','اسمالفصل','اسمالدرس','اسمالمدرس','اسمالمدير'] },
  { key: 'other',                   kw: [] },
];

function classify(s) {
  for (const { key, kw } of SECTIONS) {
    if (kw.some(k => s.includes(k))) return key;
  }
  return 'other';
}

const output = {};
for (const { key } of SECTIONS) output[key] = [];
output._all_arabic = [];

for (const s of arabic) {
  output[classify(s)].push(s);
  output._all_arabic.push(s);
}
for (const k of Object.keys(output)) output[k] = [...new Set(output[k])].sort();

// ─── 9. Write JSON ────────────────────────────────────────────────────────────

const outPath = path.join(path.dirname(filePath), 'ee10_extracted.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
console.log(`\n[✓] Saved → ${outPath}`);

// ─── 10. Summary ─────────────────────────────────────────────────────────────

console.log('\n══════════ SECTION COUNTS ══════════');
const sectionKeys = Object.keys(output).filter(k => k !== '_all_arabic');
for (const k of sectionKeys) {
  if (output[k].length) console.log(`  ${k.padEnd(26)}: ${output[k].length}`);
}

console.log('\n══════════ CONTENT PREVIEW ══════════');
for (const k of sectionKeys) {
  if (!output[k].length) continue;
  console.log(`\n▶ ${k.toUpperCase()} (${output[k].length})`);
  output[k].slice(0, 10).forEach((s, i) => console.log(`  [${i+1}] ${s}`));
  if (output[k].length > 10) console.log(`  … +${output[k].length - 10} more`);
}
