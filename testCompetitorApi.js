/**
 * testCompetitorApi.js
 * ────────────────────────────────────────────────────────────────────────────
 * Full two-endpoint chain against the competitor's API.
 *
 * ENDPOINT 1 — getlessonq.php
 *   GET  https://k.tahdiri.com/t/getlessonq.php?p_subj=<subjectId>
 *   Returns: array of lesson-ID groups (one group per lesson section).
 *   Decode: pipeline A (10 steps, window['decodeResponse'])
 *
 * ENDPOINT 2 — lessonsofsubject2.php
 *   POST https://k.tahdiri.com/public/gets2/lessonsofsubject2.php
 *   Body: scid=<subjectId>   ← same subject ID as above
 *   Returns: flat array of { id: "subj,chapter,lessonId", name: "Arabic name" }
 *   Decode: pipeline B (10 steps, _0x2c9b5b / _0x26a59e)
 *
 * The two responses are joined by the 3rd token in the id string.
 * e.g.  id "277,4689,27497" → lessonId token = 27497 = appears in group[0]
 *        name = "الطرح -- قصص الطرح"
 *
 * Run with: node testCompetitorApi.js [subjectId]   (default: 277)
 */

// ── helpers ──────────────────────────────────────────────────────────────────

function chunkReverse(str, n) {
  let r = '';
  for (let i = 0; i < str.length; i += n)
    r += str.slice(i, i + n).split('').reverse().join('');
  return r;
}
const fullReverse = s => s.split('').reverse().join('');

/**
 * Endpoint 1 decoder — window['decodeResponse'] from competitor.js
 * Pipeline: C(7) C(2) C(5) C(4) F C(9) C(8) C(7) C(6) C(5)
 *           → atob (charCode map) → decodeURIComponent → JSON.parse
 */
function decodeEndpoint1(raw) {
  let t = raw.trim();
  t = chunkReverse(t, 7);
  t = chunkReverse(t, 2);
  t = chunkReverse(t, 5);
  t = chunkReverse(t, 4);
  t = fullReverse(t);
  t = chunkReverse(t, 9);
  t = chunkReverse(t, 8);
  t = chunkReverse(t, 7);
  t = chunkReverse(t, 6);
  t = chunkReverse(t, 5);
  const binary = Buffer.from(t, 'base64').toString('binary');
  const uri = binary.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('');
  return JSON.parse(decodeURIComponent(uri));
}

/**
 * Endpoint 2 decoder — _0x2c9b5b / _0x26a59e from competitor.js
 * Pipeline: C(11) C(2) C(3) C(4) F C(9) C(8) C(7) C(6) C(5)
 *           → atob (TextDecoder utf-8) → JSON.parse
 *
 * Differs from pipeline A in the first step (11 vs 7) and step 3 (3 vs 5).
 */
function decodeEndpoint2(raw) {
  let t = raw.trim();
  t = chunkReverse(t, 11);
  t = chunkReverse(t, 2);
  t = chunkReverse(t, 3);
  t = chunkReverse(t, 4);
  t = fullReverse(t);
  t = chunkReverse(t, 9);
  t = chunkReverse(t, 8);
  t = chunkReverse(t, 7);
  t = chunkReverse(t, 6);
  t = chunkReverse(t, 5);
  return JSON.parse(Buffer.from(t, 'base64').toString('utf8'));
}

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': '*/*',
  'Origin': 'https://k.tahdiri.com',
  'Referer': 'https://k.tahdiri.com/',
};

// ── main ──────────────────────────────────────────────────────────────────────

(async () => {
  const subjectId = process.argv[2] || '277';

  // ════════════════════════════════════════════════════════════════════════════
  // STEP 1 — getlessonq.php  →  lesson-ID groups
  // ════════════════════════════════════════════════════════════════════════════
  console.log('═'.repeat(60));
  console.log(`STEP 1 — getlessonq.php  (p_subj=${subjectId})`);
  console.log('═'.repeat(60));

  const r1 = await fetch(
    `https://k.tahdiri.com/t/getlessonq.php?p_subj=${subjectId}`,
    { headers: HEADERS }
  );
  console.log('Status:', r1.status, r1.statusText);

  const raw1 = await r1.text();
  console.log('Raw length:', raw1.trim().length, 'chars | first 60:', raw1.trim().slice(0, 60));

  const groups = decodeEndpoint1(raw1);
  console.log(`\n✔ Decoded: ${groups.length} lesson groups`);
  groups.forEach((g, i) => console.log(`  Group ${String(i).padStart(2)}: [${g.join(', ')}]`));

  // ════════════════════════════════════════════════════════════════════════════
  // STEP 2 — lessonsofsubject2.php  →  lesson names + composite IDs
  // ════════════════════════════════════════════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log(`STEP 2 — lessonsofsubject2.php  (scid=${subjectId})`);
  console.log('═'.repeat(60));

  const r2 = await fetch(
    'https://k.tahdiri.com/public/gets2/lessonsofsubject2.php',
    {
      method: 'POST',
      headers: { ...HEADERS, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ scid: subjectId }),
    }
  );
  console.log('Status:', r2.status, r2.statusText);

  const raw2 = await r2.text();
  console.log('Raw length:', raw2.trim().length, 'chars | first 60:', raw2.trim().slice(0, 60));

  const lessonList = decodeEndpoint2(raw2);
  console.log(`\n✔ Decoded: ${lessonList.length} lesson entries`);

  // Build a lookup map: lessonId (3rd token) → { name, chapter }
  const lessonMap = new Map();
  for (const entry of lessonList) {
    const parts = entry.id.split(',');   // "subjectId,chapterId,lessonId"
    const lessonId = parseInt(parts[2], 10);
    lessonMap.set(lessonId, {
      compositeId: entry.id,
      chapterId:   parseInt(parts[1], 10),
      name:        entry.name,
    });
  }

  // ════════════════════════════════════════════════════════════════════════════
  // STEP 3 — Join: annotate each group with lesson names
  // ════════════════════════════════════════════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('STEP 3 — Resolved lesson structure');
  console.log('═'.repeat(60) + '\n');

  for (let gi = 0; gi < groups.length; gi++) {
    const group = groups[gi];
    console.log(`─── Group ${gi} ──────────────────────────────────`);
    for (const id of group) {
      const info = lessonMap.get(id);
      if (info) {
        console.log(`  ID ${id}  →  "${info.name}"`);
        console.log(`           composite: ${info.compositeId}`);
      } else {
        console.log(`  ID ${id}  →  (not found in lesson list)`);
      }
    }
  }

  // ════════════════════════════════════════════════════════════════════════════
  // STEP 4 — Full schema dump for integration reference
  // ════════════════════════════════════════════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('STEP 4 — Complete lessonsofsubject2 schema (all entries)');
  console.log('═'.repeat(60));
  console.log(JSON.stringify(lessonList, null, 2));

})().catch(err => { console.error('Fatal:', err); process.exit(1); });
