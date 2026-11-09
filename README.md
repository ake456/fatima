# صدقة جارية عن روح فاطمة عادل عزت

موقع React + Vite + Tailwind CSS فيه: القرآن الكريم كاملًا (من alquran.cloud API)، والأذكار، والأدعية.

## التشغيل على جهازك
```bash
npm install
npm run dev        # التجربة على http://localhost:5173
```

## البناء والرفع على الاستضافة
```bash
npm run build      # ينتج مجلد dist
```
ارفع **محتويات** مجلد `dist` (وليس المجلد نفسه) إلى `public_html` أو مجلد الموقع.
(Netlify / Vercel / GitHub Pages: أمر البناء `npm run build` ومجلد النشر `dist`.)

## تعديل المحتوى
- الأذكار: `src/data/adhkar.js`
- الأدعية: `src/data/duas.js`
- اسم المرحومة: `src/components/Header.jsx` و `src/components/Home.jsx`
- الألوان: المتغيرات في أعلى `src/index.css`

## هيكل المشروع
```
src/
  App.jsx               التبويبات الرئيسية
  components/           Header, Home, Quran, Adhkar, Counter, Dua
  data/                 adhkar.js, duas.js
  lib/quran.js          دوال الـ API والبحث
  index.css             Tailwind + الألوان (فاتح/داكن)
```
