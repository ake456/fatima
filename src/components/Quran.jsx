import { useEffect, useRef, useState } from "react";
import { get, strip, nm, ar, save, load } from "../lib/quran.js";

const BISMILLAH = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
const Muted = ({ children }) => (
  <p className="text-center" style={{ color: "var(--muted)" }}>{children}</p>
);

export default function Quran() {
  const [list, setList] = useState(null);
  const [err, setErr] = useState(false);
  const [cur, setCur] = useState(null);
  const [ayahs, setAyahs] = useState(null);
  const [q, setQ] = useState("");
  const [fs, setFs] = useState(30);
  const [tick, setTick] = useState(0);
  const cache = useRef({});
  const last = +load("lastSurah") || 0;

  const fetchList = () => {
    setErr(false);
    get("/surah").then(setList).catch(() => setErr(true));
  };
  useEffect(fetchList, []);

  useEffect(() => {
    if (!cur) return;
    save("lastSurah", cur);
    window.scrollTo(0, 0);
    setErr(false);
    if (cache.current[cur]) { setAyahs(cache.current[cur]); return; }
    setAyahs(null);
    get(`/surah/${cur}/quran-uthmani`)
      .then((d) => { cache.current[cur] = d.ayahs; setAyahs(d.ayahs); })
      .catch(() => setErr(true));
  }, [cur, tick]);

  const errBox = (
    <div className="card p-6 text-center">
      <p>تعذّر تحميل البيانات، تأكد من اتصال الإنترنت.</p>
      <button className="btn on mt-3" onClick={() => (cur ? setTick((t) => t + 1) : fetchList())}>
        إعادة المحاولة
      </button>
    </div>
  );

  /* ---- قائمة السور ---- */
  if (!cur) {
    if (err) return errBox;
    if (!list) return <Muted>جارٍ التحميل…</Muted>;
    const term = q.trim();
    const filtered = list.filter(
      (s) =>
        !term ||
        strip(s.name).includes(strip(term)) ||
        String(s.number) === term ||
        s.englishName.toLowerCase().includes(term.toLowerCase())
    );
    return (
      <div>
        {last > 0 && (
          <button className="btn on mb-4" onClick={() => setCur(last)}>
            متابعة القراءة: سورة {nm(list[last - 1].name)}
          </button>
        )}
        <input
          className="search mb-4"
          placeholder="ابحث عن سورة بالاسم أو الرقم"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <button key={s.number} onClick={() => setCur(s.number)} className="card p-3 flex items-center gap-3 text-right" style={{ cursor: "pointer" }}>
              <span className="badge" style={{ margin: 0 }}>{ar(s.number)}</span>
              <span>
                <span className="quran block text-lg" style={{ lineHeight: 1.6 }}>{nm(s.name)}</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>{ar(s.numberOfAyahs)} آية</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ---- القراءة ---- */
  const info = list && list[cur - 1];
  const hasBasmala = cur !== 1 && cur !== 9;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <button className="btn" onClick={() => setCur(null)}>→ كل السور</button>
        <div className="flex gap-2">
          <button className="btn" onClick={() => setFs(Math.max(20, fs - 4))}>أ-</button>
          <button className="btn" onClick={() => setFs(Math.min(56, fs + 4))}>أ+</button>
        </div>
      </div>

      {err ? errBox : !ayahs ? <Muted>جارٍ التحميل…</Muted> : (
        <div className="card p-6 sm:p-8">
          <h2 className="text-center text-2xl font-bold quran" style={{ color: "var(--accent2)" }}>
            سورة {info ? nm(info.name) : ar(cur)}
          </h2>
          {hasBasmala && <p className="quran text-center mt-2" style={{ fontSize: fs }}>{BISMILLAH}</p>}
          <p className="quran text-center mt-4" style={{ fontSize: fs }}>
            {ayahs.map((a) => {
              // الـ API يضع البسملة في أول آية من كل سورة (عدا الفاتحة والتوبة)، فنفصلها
              const text = hasBasmala && a.numberInSurah === 1 ? a.text.split(" ").slice(4).join(" ") : a.text;
              return (
                <span key={a.number}>
                  {text}
                  <span className="badge">{ar(a.numberInSurah)}</span>{" "}
                </span>
              );
            })}
          </p>
        </div>
      )}

      <div className="flex justify-between mt-5">
        <button className="btn" disabled={cur <= 1} style={{ opacity: cur <= 1 ? 0.4 : 1 }} onClick={() => setCur(cur - 1)}>
          → السورة السابقة
        </button>
        <button className="btn" disabled={cur >= 114} style={{ opacity: cur >= 114 ? 0.4 : 1 }} onClick={() => setCur(cur + 1)}>
          السورة التالية ←
        </button>
      </div>
    </div>
  );
}
