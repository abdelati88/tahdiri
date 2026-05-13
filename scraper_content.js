const fs = require('fs');
const path = require('path');
const { decryptContentPayload } = require('./decryptCompetitorPayload');

const OUTPUT_DIR = path.join(__dirname, 'competitor_content_db');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getUniqueSubjectIds() {
    const dbDir = path.join(__dirname, 'competitor_database');
    if (!fs.existsSync(dbDir)) {
        console.error('Database directory not found!');
        return [];
    }
    
    const files = fs.readdirSync(dbDir);
    const subjectIds = new Set();
    
    for (const file of files) {
        if (file.startsWith('subject_') && file.endsWith('.json')) {
            const match = file.match(/subject_(\d+)\.json/);
            if (match && match[1]) {
                subjectIds.add(parseInt(match[1], 10));
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
            const response = await fetch(`https://k.tahdiri.com/t/getlessonq.php?p_subj=${scid}`, {
                method: 'GET',
                headers: {
                    "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"macOS\"",
                    "Referer": "https://schools.madrasati.sa/"
                }
            });

            if (!response.ok) {
                console.log(`❌ Failed: HTTP ${response.status}`);
                continue;
            }

            const rawText = await response.text();
            const cleanText = rawText.trim();

            if (cleanText.toLowerCase().includes('<html') || cleanText.toLowerCase().includes('<div')) {
                console.log(`⚠️ Skipped: Server returned HTML (Not Found)`);
                continue;
            }

            // لو الرد قصير جداً (أقل من 50 حرف) يبقى السيرفر مرجعش داتا حقيقية
            if (!cleanText || cleanText.length < 50) {
                console.log(`⚠️ Skipped: No valid data (Server returned: ${cleanText})`);
            } else {
                try {
                    const jsonData = decryptContentPayload(cleanText);
                    const filePath = path.join(OUTPUT_DIR, `content_${scid}.json`);
                    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
                    console.log(`✅ Success! Saved to content_${scid}.json`);
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