const fs = require('fs');

console.log("⏳ جاري قراءة الملف الضخم...");
const rawData = JSON.parse(fs.readFileSync('madrasati_courses_db.json', 'utf8'));

console.log("🧹 جاري فلترة المواد الفارغة...");
// هنفلتر الداتا وناخد بس المواد اللي فيها دروس فعلية
const cleanData = rawData.filter(subject => {
    return subject.rawLessonsList && subject.rawLessonsList.length > 0;
});

console.log("💾 جاري حفظ الملف النظيف...");
fs.writeFileSync('madrasati_courses_clean.json', JSON.stringify(cleanData, null, 2), 'utf8');

console.log("====================================");
console.log(`✅ تمت العملية بنجاح!`);
console.log(`📊 إجمالي الـ IDs اللي السكربت مر عليها: ${rawData.length}`);
console.log(`💎 إجمالي المواد الحقيقية (اللي فيها دروس): ${cleanData.length}`);
console.log("====================================");