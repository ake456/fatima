import { useState } from "react";
import Counter from "./Counter.jsx";
import { ADHKAR, CATS } from "../data/adhkar.js";

export default function Adhkar() {
  const [cat, setCat] = useState(CATS[0]);
  const items = ADHKAR.filter((x) => x.c.includes(cat));
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {CATS.map((c) => (
          <button key={c} className={"btn" + (c === cat ? " on" : "")} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="space-y-3">
        {items.map((x, k) => <Counter key={cat + k} item={x} />)}
      </div>
    </div>
  );
}
