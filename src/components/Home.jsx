const CARDS = [
  ["quran", "القرآن الكريم", "المصحف كاملًا، ١١٤ سورة"],
  ["adhkar", "الأذكار", "الصباح والمساء وبعد الصلاة والنوم"],
  ["dua", "الدعاء", "أدعية للمرحومة وللأحياء"],
];

export default function Home({ go }) {
  return (
    <div className="space-y-5">
      <div className="card p-6 text-center">
        <p className="quran text-2xl" style={{ color: "var(--accent2)" }}>كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ</p>
        <p className="mt-3 leading-8" style={{ color: "var(--muted)" }}>
          هذا الموقع صدقة جارية عن روح المرحومة فاطمة عادل عزت. كل حرف يُقرأ وكل ذكر يُقال ودعاء يُرفع،
          نرجو أن يصلها أجره بإذن الله.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CARDS.map(([k, t, d]) => (
          <button key={k} onClick={() => go(k)} className="card p-5 text-right" style={{ cursor: "pointer" }}>
            <div className="text-lg font-bold" style={{ color: "var(--accent)" }}>{t}</div>
            <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>{d}</div>
          </button>
        ))}
      </div>
      <p className="text-center text-sm" style={{ color: "var(--muted)" }}>
        قال ﷺ: «إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية، أو علم يُنتفع به، أو ولد صالح يدعو له»
      </p>
    </div>
  );
}
