const fs = require('fs');
const path = '/Users/abdelati88/Downloads/tahdiri-10.0.0/content.js';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const startLine = 1398; // 0-indexed, so line 1399 is 1398
const endLine = 1565; // 0-indexed, so line 1566 is 1565

const newCode = `      // 3. NOW fetch ManageLecture to find the actual preparation form link
      let formHtml = "";
      let finalUrl = scrapeUrl;
      try {
        const formRes = await fetch(scrapeUrl, { credentials: "same-origin" });
        formHtml = await formRes.text();
        finalUrl = formRes.url;
      } catch (e) {
        console.error("[Tahdiri] Failed to fetch ManageLecture page", e);
        return false;
      }

      const doc = new DOMParser().parseFromString(formHtml, "text/html");
      
      // Look for the actual prep link (MlutiLessonPlan or PrepareLesson)
      let prepUrl = "";
      const anchors = doc.querySelectorAll('a, button');
      for (const el of anchors) {
        const href = el.getAttribute('href') || "";
        const onclick = el.getAttribute('onclick') || "";
        
        if (href.includes('MlutiLessonPlan') || href.includes('PrepareLesson') || href.includes('LessonDetails')) {
           prepUrl = href;
           break;
        }
        
        const match = onclick.match(/(?:window\\.location\\.href\\s*=\\s*|location\\.href\\s*=\\s*)['"]([^'"]+)['"]/i);
        if (match && (match[1].includes('MlutiLessonPlan') || match[1].includes('PrepareLesson') || match[1].includes('LessonDetails'))) {
           prepUrl = match[1];
           break;
        }
      }

      // Resolve relative URLs
      if (prepUrl && !prepUrl.startsWith('http')) {
         if (prepUrl.startsWith('/')) {
             prepUrl = window.location.origin + prepUrl;
         } else {
             prepUrl = finalUrl.substring(0, finalUrl.lastIndexOf('/') + 1) + prepUrl;
         }
      }

      const finalForm = new FormData();
      let isHydrated = false;
      let freshCsrf = "";

      if (prepUrl) {
         console.log("[Tahdiri] MlutiLessonPlan probe URL:", prepUrl);
         try {
            const prepRes = await fetch(prepUrl, { credentials: "same-origin" });
            const prepHtml = await prepRes.text();
            const prepDoc = new DOMParser().parseFromString(prepHtml, "text/html");
            
            const mainForm = prepDoc.querySelector('form');
            if (mainForm) {
               const elements = mainForm.querySelectorAll('input, select, textarea');
               let fieldCount = 0;
               elements.forEach(el => {
                  if (el.name) {
                     // For checkboxes/radios, only append if checked
                     if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) {
                         return;
                     }
                     finalForm.append(el.name, el.value);
                     fieldCount++;
                  }
               });
               
               freshCsrf = finalForm.get('__RequestVerificationToken') || prepDoc.querySelector('input[name="__RequestVerificationToken"]')?.value;
               console.log(\`[Tahdiri] Form hydrated with \${fieldCount} fields from MlutiLessonPlan.\`);
               isHydrated = true;
            } else {
               console.warn("[Tahdiri] No <form> found in the fetched prep page!");
            }
         } catch (e) {
            console.error("[Tahdiri] Failed to fetch prep page for hydration:", e);
         }
      } else {
         console.warn("[Tahdiri] No prep-form link found in ManageLecture — falling back to manual FormData build.");
      }

      // Increased buffer to 15000ms to ensure the DB commits the activity before SaveLastLessonPlan runs
      await new Promise(r => setTimeout(r, 15000));

      if (!isHydrated) {
         // FALLBACK: Manual FormData build
         let fallbackCsrf = doc.querySelector('input[name="__RequestVerificationToken"]')?.value || getCsrfToken();
         if (!fallbackCsrf) {
            console.error("[Tahdiri] CSRF token not found. Aborting.");
            return false;
         }
         freshCsrf = fallbackCsrf;
         
         const hiddenInputs = doc.querySelectorAll('form input[type="hidden"]');
         hiddenInputs.forEach(input => {
            if (input.name) finalForm.set(input.name, input.value);
         });

         const scrapedTimeTableId = finalForm.get('TimeTableId');
         const looksLikeRealToken = (v) => {
            if (!v) return false;
            const s = String(v).trim();
            if (/^\\d{1,3}$/.test(s)) return false;
            return s.length >= 16;
         };
         
         const classroomIdMatch = (scrapeUrl || "").match(/[?&]classroomId=([^&]+)/i);
         const classroomId = classroomIdMatch ? classroomIdMatch[1] : "";
         
         let finalTimeTableId = "";
         if (looksLikeRealToken(scrapedTimeTableId)) {
            finalTimeTableId = scrapedTimeTableId;
         } else if (looksLikeRealToken(token)) {
            finalTimeTableId = token;
         } else {
            console.error("[Tahdiri] Could NOT obtain a valid encrypted TimeTableId for fallback.", lessonCardDiv);
            return false;
         }
         
         finalForm.set('TimeTableId', finalTimeTableId);
         if (classroomId) finalForm.set('classroomId', classroomId);
         
         const scrapedSchoolId = finalForm.get('SchoolId');
         if (!scrapedSchoolId || String(scrapedSchoolId).trim() === '') {
            finalForm.set('SchoolId', realSchoolId);
         }
      }

      if (freshCsrf) finalForm.set('__RequestVerificationToken', freshCsrf);

      // Overwrite specific automation fields (applies to both hydrated and manual paths)
      finalForm.set('SubjectId', String(finalSubjectId).trim());
      finalForm.set('LessonIds[0].Id', String(lessonId).trim());
      finalForm.set('LessonIds[0].Name', lessonName);
      finalForm.set('SelectedTrees_2', String(chapterId).trim());
      finalForm.set('SelectedTrees_3', String(lessonId).trim());

      finalForm.set('strategies', '4');
      finalForm.set('ThinkingSkills', "التركيز والتحليل والملاحظة");
      finalForm.set('LectureClassPreparationText', "تمهيد مناسب يربط الدرس بالخبرات السابقة.");
      finalForm.set('LectureClassCloseText', "ملخص شامل لأهم نقاط الدرس.");
      finalForm.set('LessonVocabulary', "المصطلحات والمفاهيم الأساسية الواردة.");
      finalForm.set('TeacherNote', "متابعة أداء الطلاب وتقديم التغذية الراجعة.");

      try {
        const saveRes = await fetch("https://schools.madrasati.sa/Teacher/Lessons/SaveLastLessonPlan", {
          method: "POST",
          credentials: "same-origin",
          body: finalForm
        });

        if (saveRes.url && (saveRes.url.includes('ManageLecture') || saveRes.url.includes('NotPermitted') || saveRes.url.includes('Error'))) {
          console.error("[Tahdiri] Save rejected by server due to missing resource or slow DB sync. Redirected to:", saveRes.url);
          return false;
        }

        console.log("[Tahdiri] SaveLastLessonPlan response — status:", saveRes.status);
        return saveRes.ok;
      } catch (e) {
        console.error("[Tahdiri] Failed to POST Final Lesson Save", e);
        return false;
      }`;

lines.splice(startLine, endLine - startLine + 1, newCode);
fs.writeFileSync(path, lines.join('\n'));
console.log('File successfully patched.');
