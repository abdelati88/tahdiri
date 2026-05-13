const fs = require('fs');
const path = require('path');
const { decryptCompetitorPayload } = require('./decryptCompetitorPayload');

const OUTPUT_DIR = path.join(__dirname, 'competitor_database');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getUniqueSubjectIds() {
    const coursesPath = path.join(__dirname, 'madrasati_courses_clean.json');
    const coursesData = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
    const subjectIds = new Set();
    
    for (const course of coursesData) {
        if (course.rawLessonsList) {
            for (const lesson of course.rawLessonsList) {
                if (lesson.id) {
                    const parts = lesson.id.split(',');
                    if (parts.length >= 2) {
                        // Middle number is the scid
                        subjectIds.add(parseInt(parts[1], 10));
                    }
                }
            }
        }
    }
    return Array.from(subjectIds).sort((a, b) => a - b);
}

async function runScraper() {
    const subjectIds = getUniqueSubjectIds();
    console.log(`🚀 Starting the Ultimate Scraper... Destination: ${OUTPUT_DIR}`);
    console.log(`📊 Found ${subjectIds.length} unique subject IDs to scrape.\n`);

    for (const scid of subjectIds) {
        process.stdout.write(`[*] Fetching Subject ID [${scid}]... `);

        try {
            const response = await fetch('https://k.tahdiri.com/public/gets2/lessonsofsubject2.php', {
                method: 'POST',
                headers: {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "Referer": "https://schools.madrasati.sa/",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36"
                },
                body: `scid=${scid}`
            });

            if (!response.ok) {
                console.log(`❌ Failed: HTTP ${response.status}`);
                continue;
            }

            const rawText = await response.text();
            const cleanText = rawText.trim();

            // لو الرد قصير جداً (أقل من 50 حرف) يبقى السيرفر مرجعش داتا حقيقية
            if (!cleanText || cleanText.includes('<html') || cleanText.length < 50) {
                console.log(`⚠️ Skipped: No valid data (Server returned: ${cleanText})`);
            } else {
                try {
                    const jsonData = decryptCompetitorPayload(cleanText);
                    const filePath = path.join(OUTPUT_DIR, `subject_${scid}.json`);
                    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
                    console.log(`✅ Success! Saved to subject_${scid}.json`);
                } catch (decryptionError) {
                    // لو فشل في فك التشفير، يطبع أول حتة من الرد عشان نعرف السيرفر باعت إيه
                    console.log(`❌ Decryption failed! Server sent: ${cleanText.substring(0, 30)}...`);
                }
            }

        } catch (err) {
            console.log(`❌ Request Error: ${err.message}`);
        }

        await delay(1000);
    }

    console.log('\n🎉 Scraping Complete! Your database is ready.');
}

runScraper();