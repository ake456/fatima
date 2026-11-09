import { useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Quran from "./components/Quran.jsx";
import Adhkar from "./components/Adhkar.jsx";
import Dua from "./components/Dua.jsx";

const TABS = [
  ["home", "الرئيسية"],
  ["quran", "القرآن"],
  ["adhkar", "الأذكار"],
  ["dua", "الدعاء"],
];
const VIEWS = { home: Home, quran: Quran, adhkar: Adhkar, dua: Dua };

export default function App() {
  const [tab, setTab] = useState("home");
  const View = VIEWS[tab];
  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      <Header />
      <nav className="flex justify-center gap-2 mb-8 flex-wrap">
        {TABS.map(([k, t]) => (
          <button key={k} className={"btn" + (k === tab ? " on" : "")} onClick={() => setTab(k)}>
            {t}
          </button>
        ))}
      </nav>
      <View go={setTab} />
      <footer className="text-center text-sm mt-12" style={{ color: "var(--muted)" }}>
        لا تنسوها من صالح دعائكم، وانشروا الموقع ليعمّ الأجر.
      </footer>
    </div>
  );
}
