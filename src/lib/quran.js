// واجهة المصحف: https://alquran.cloud/api (مجانية، بدون مفتاح)
const API = "https://api.alquran.cloud/v1";

export async function get(path) {
  const r = await fetch(API + path);
  if (!r.ok) throw new Error(r.status);
  return (await r.json()).data;
}

// إزالة التشكيل وتوحيد الحروف للبحث
export const strip = (s) =>
  s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "")
    .replace(/[ٱأإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");

// حذف كلمة "سورة" من اسم السورة
export const nm = (s) => {
  const w = s.split(" ");
  return strip(w[0]) === "سوره" ? w.slice(1).join(" ") : s;
};

export const ar = (n) => Number(n).toLocaleString("ar-EG");

export const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
export const load = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
