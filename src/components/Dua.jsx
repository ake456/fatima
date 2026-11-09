import { DUAS } from "../data/duas.js";

export default function Dua() {
  return (
    <div className="space-y-3">
      {DUAS.map((d, k) => (
        <div key={k} className="card p-5">
          <p className="quran text-xl text-center">{d}</p>
        </div>
      ))}
    </div>
  );
}
