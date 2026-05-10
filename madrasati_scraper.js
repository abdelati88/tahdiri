/**
 * madrasati_scraper.js
 * ────────────────────────────────────────────────────────────────────────────
 * Data Extraction Tool for Tahdiri API
 * Features: Loop over Subject IDs, Decode Payloads, Rate Limiting, JSON Export.
 */

const fs = require('fs').promises;
const path = require('path');

// ── دوال فك التشفير ──────────────────────────────────────────────────────────

function chunkReverse(str, n) {
    let r = '';
    for (let i = 0; i < str.length; i += n)
        r += str.slice(i, i + n).split('').reverse().join('');
    return r;
}

const fullReverse = s => s.split('').reverse().join('');

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

// ── إعدادات السحب ─────────────────────────────────────────────────────────────

const HEADERS = {
    // هيدر جاهز يحاكي متصفح الماك الخاص بك
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Accept': '*/*',
    'Origin': 'https://k.tahdiri.com',
    'Referer': 'https://k.tahdiri.com/',
};

// دالة التأخير (Rate Limiting) لتجنب حظر الـ IP
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ── الدالة الرئيسية (The Loop) ────────────────────────────────────────────────

async function startScraping(startId, endId, delayMs) {
    const allSubjectsData = [];
    console.log(`🚀 بدء عملية السحب من Subject ID: ${startId} إلى ${endId}...`);
    console.log('═'.repeat(60));

    for (let subjectId = startId; subjectId <= endId; subjectId++) {
        console.log(`\n⏳ جاري سحب بيانات المادة: ${subjectId}`);

        try {
            // 1. جلب بيانات الـ Groups
            const r1 = await fetch(`https://k.tahdiri.com/t/getlessonq.php?p_subj=${subjectId}`, { headers: HEADERS });
            const raw1 = await r1.text();
            console.log(`[استخبارات 1] حالة: ${r1.status} | الرد الخام: ${raw1.substring(0, 60)}...`);

            let groups = [];
            if (r1.ok && raw1.trim()) {
                try { groups = decodeEndpoint1(raw1); } catch (e) { console.error(`❌ خطأ تشفير 1:`, e.message); }
            }

            // 2. جلب بيانات الأسماء (Lesson Names)
            const r2 = await fetch('https://k.tahdiri.com/public/gets2/lessonsofsubject2.php', {
                method: 'POST',
                headers: { ...HEADERS, 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ scid: subjectId.toString() }),
            });
            const raw2 = await r2.text();
            console.log(`[استخبارات 2] حالة: ${r2.status} | الرد الخام: ${raw2.substring(0, 60)}...`);

            let lessonList = [];
            if (r2.ok && raw2.trim()) {
                try { lessonList = decodeEndpoint2(raw2); } catch (e) { console.error(`❌ خطأ تشفير 2:`, e.message); }
            }
            // إذا كانت المادة لا تحتوي على أي بيانات، نتخطاها
            if (groups.length === 0 && lessonList.length === 0) {
                console.log(`⚠️ لا توجد بيانات صحيحة للمادة ${subjectId} (ربما غير موجودة).`);
            } else {
                // ربط البيانات ببعضها (Join)
                const lessonMap = new Map();
                for (const entry of lessonList) {
                    const parts = entry.id.split(',');
                    const lessonId = parseInt(parts[2], 10);
                    lessonMap.set(lessonId, {
                        compositeId: entry.id,
                        chapterId: parseInt(parts[1], 10),
                        name: entry.name,
                    });
                }

                const resolvedGroups = groups.map(group => {
                    return group.map(id => ({
                        id: id,
                        info: lessonMap.get(id) || null
                    }));
                });

                // إضافة الداتا للمصفوفة الكلية
                allSubjectsData.push({
                    subjectId: subjectId,
                    groups: resolvedGroups,
                    rawLessonsList: lessonList
                });

                console.log(`✔ تمت قراءة وتشفير المادة ${subjectId} بنجاح.`);
            }

        } catch (err) {
            console.error(`❌ حدث خطأ غير متوقع أثناء سحب المادة ${subjectId}:`, err.message);
        }

        // تطبيق التأخير الزمني (Delay) بين الطلبات
        if (subjectId < endId) {
            console.log(`⏱️ انتظار ${delayMs} مللي ثانية لتجنب الحظر...`);
            await sleep(delayMs);
        }
    }

    // ── حفظ البيانات في ملف ──────────────────────────────────────────────────────
    console.log('\n' + '═'.repeat(60));
    console.log(`💾 جاري حفظ البيانات المجمعة...`);

    const filePath = path.join(__dirname, 'madrasati_courses_db.json');
    await fs.writeFile(filePath, JSON.stringify(allSubjectsData, null, 2), 'utf8');

    console.log(`🎉 اكتملت العملية بنجاح! تم حفظ الملف في:\n📂 ${filePath}`);
}

// ── نقطة الانطلاق ────────────────────────────────────────────────────────────
const START_ID = 1;
const END_ID = 5000;

const DELAY_MS = 2500;

startScraping(START_ID, END_ID, DELAY_MS);
startScraping(START_ID, END_ID, DELAY_MS);