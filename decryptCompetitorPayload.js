/**
 * decryptCompetitorPayload.js
 * ────────────────────────────────────────────────────────────────────────────
 * Standalone decryption function — reverse-engineered from competitor.js.
 *
 * HOW THE ALGORITHM WORKS
 * ────────────────────────────────────────────────────────────────────────────
 * The competitor's PHP server encodes lesson data with a custom scrambling
 * scheme before returning it from getlessonq.php (and similar endpoints).
 *
 * The client-side decryption is stored in window['decodeResponse'] inside
 * competitor.js. It consists of:
 *
 *   STEP   OPERATION
 *   ─────  ───────────────────────────────────────────────────────────────
 *    1     chunkReverse(input, 7)   ← reverse chars inside every 7-char chunk
 *    2     chunkReverse(result, 2)
 *    3     chunkReverse(result, 5)
 *    4     chunkReverse(result, 4)
 *    5     fullReverse(result)      ← reverse the entire string
 *    6     chunkReverse(result, 9)
 *    7     chunkReverse(result, 8)
 *    8     chunkReverse(result, 7)
 *    9     chunkReverse(result, 6)
 *   10     chunkReverse(result, 5)
 *   ─────  ───────────────────────────────────────────────────────────────
 *   11     atob(result)             ← Base-64 decode (via charCode mapping)
 *   12     decodeURIComponent(…)   ← URL-decode the resulting string
 *   13     JSON.parse(…)           ← parse as JSON (done by the caller)
 *
 * chunkReverse(str, n) is its own inverse, so applying it again recovers the
 * original chunk. The full-reverse in step 5 is likewise self-inverse.
 *
 * USAGE (Node.js)
 * ────────────────────────────────────────────────────────────────────────────
 *   const { decryptCompetitorPayload } = require('./decryptCompetitorPayload');
 *   const lessons = decryptCompetitorPayload(rawResponseText);
 *
 * Or run directly:
 *   node decryptCompetitorPayload.js "<encryptedString>"
 */

// ── core primitive ─────────────────────────────────────────────────────────

/**
 * Walk `str` in consecutive windows of `chunkSize` characters and reverse
 * the characters inside every window. Windows stay in the same order; only
 * the characters within each window are flipped.
 *
 * This operation is its own inverse: applying it twice returns the original.
 *
 * @param {string} str
 * @param {number} chunkSize  Positive integer ≥ 1.
 * @returns {string}
 */
function chunkReverse(str, chunkSize) {
  if (!str) return '';
  const chunks = str.match(new RegExp('.{1,' + chunkSize + '}', 'g')) || [];
  return chunks.map(c => c.split('').reverse().join('')).join('');
}

// ── public API ─────────────────────────────────────────────────────────────

/**
 * Decrypt the obfuscated payload returned by the competitor's
 * `getlessonq.php?p_subj=<id>` (or `lessonsofsubject`) endpoint.
 *
 * Mirrors `window['decodeResponse']` from competitor.js exactly.
 *
 * @param {string} encryptedString  Raw response body (may contain leading /
 *                                  trailing whitespace — it is trimmed).
 * @returns {*}  Parsed JSON value — an Array of lesson-ID groups, e.g.:
 *               [ [55822, 27497, 27506], [27510, 27508, 27507], … ]
 * @throws {Error}  If the string cannot be decoded or parsed as JSON.
 */
function decryptCompetitorPayload(encryptedString) {
  if (typeof encryptedString !== 'string' || !encryptedString.trim()) {
    throw new Error('decryptCompetitorPayload: input must be a non-empty string');
  }

  try {
    let s = encryptedString.trim();

    //  10-step unscrambling pipeline
    s = chunkReverse(s, 11);                     // step 1
    s = chunkReverse(s, 2);                     // step 2
    s = chunkReverse(s, 3);                     // step 3
    s = chunkReverse(s, 4);                     // step 4
    s = s.split('').reverse().join('');          // step 5 — full-string reverse
    s = chunkReverse(s, 9);                     // step 6
    s = chunkReverse(s, 8);                     // step 7
    s = chunkReverse(s, 7);                     // step 8
    s = chunkReverse(s, 6);                     // step 9
    s = chunkReverse(s, 5);                     // step 10

    // Step 11+12: atob → decodeURIComponent
    // The extension uses Array.prototype.map to build '%XX' sequences from
    // the binary string, then calls decodeURIComponent on the joined result.
    const binary     = Buffer.from(s, 'base64').toString('binary');
    const uriEncoded = binary
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('');
    const jsonStr = decodeURIComponent(uriEncoded);

    // Step 13: JSON.parse
    // Strip BOM or weird hidden characters before parsing
    const cleanJsonStr = jsonStr.replace(/^\uFEFF/, '').trim();
    try {
        return JSON.parse(cleanJsonStr);
    } catch (parseErr) {
        throw new Error("JSON Parse failed on: " + cleanJsonStr.substring(0, 100));
    }

  } catch (err) {
    throw new Error('decryptCompetitorPayload: ' + err.message);
  }
}

/**
 * Decrypt the obfuscated payload returned by the competitor's
 * `getlessonq.php?p_subj=<id>` endpoint (Content).
 * Uses the original 7, 2, 5, 4 sequence.
 */
function decryptContentPayload(encryptedString) {
  if (typeof encryptedString !== 'string' || !encryptedString.trim()) {
    throw new Error('decryptContentPayload: input must be a non-empty string');
  }

  try {
    let s = encryptedString.trim();

    //  10-step unscrambling pipeline
    s = chunkReverse(s, 7);                     // step 1
    s = chunkReverse(s, 2);                     // step 2
    s = chunkReverse(s, 5);                     // step 3
    s = chunkReverse(s, 4);                     // step 4
    s = s.split('').reverse().join('');          // step 5 — full-string reverse
    s = chunkReverse(s, 9);                     // step 6
    s = chunkReverse(s, 8);                     // step 7
    s = chunkReverse(s, 7);                     // step 8
    s = chunkReverse(s, 6);                     // step 9
    s = chunkReverse(s, 5);                     // step 10

    const binary     = Buffer.from(s, 'base64').toString('binary');
    const uriEncoded = binary
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('');
    const jsonStr = decodeURIComponent(uriEncoded);

    // Strip BOM or weird hidden characters before parsing
    const cleanJsonStr = jsonStr.replace(/^\uFEFF/, '').trim();
    try {
        return JSON.parse(cleanJsonStr);
    } catch (parseErr) {
        throw new Error("JSON Parse failed on: " + cleanJsonStr.substring(0, 100));
    }

  } catch (err) {
    throw new Error('decryptContentPayload: ' + err.message);
  }
}

// ── module export + CLI entry-point ────────────────────────────────────────

if (typeof module !== 'undefined') {
  module.exports = { decryptCompetitorPayload, decryptContentPayload, chunkReverse };
}

if (typeof require !== 'undefined' && require.main === module) {
  const payload = process.argv[2];
  if (!payload) {
    console.error('Usage: node decryptCompetitorPayload.js "<encryptedPayload>"');
    process.exit(1);
  }
  try {
    const result = decryptCompetitorPayload(payload);
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
