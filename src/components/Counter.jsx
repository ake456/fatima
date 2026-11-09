import { useState } from "react";
import { ar } from "../lib/quran.js";

export default function Counter({ item }) {
  const [c, setC] = useState(0);
  const done = c >= item.n;
  return (
    <div className="card p-5 flex items-center justify-between gap-4">
      <p className="quran text-xl flex-1" style={{ lineHeight: 2.2 }}>{item.t}</p>
      <div className="flex items-center gap-2 shrink-0">
        <button className="btn" onClick={() => setC(0)} aria-label="إعادة">↺</button>
        <button
          onClick={() => setC(c + 1)}
          className="font-bold"
          style={{
            minWidth: "5.5rem", padding: ".6rem 1rem", borderRadius: "12px", border: "none",
            cursor: "pointer", color: "#fff", background: done ? "var(--accent2)" : "var(--accent)",
          }}
        >
          {ar(c)} / {ar(item.n)}
        </button>
      </div>
    </div>
  );
}
