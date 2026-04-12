import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../api/client.js";
import "./Page.css";
import "./AdvicePage.css";

const CATEGORY_LABELS = {
  stress: "Стресс басқару",
  sleep: "Ұйқы",
  focus: "Назар аудару",
};

export default function AdvicePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch("/advice");
        if (!cancelled) setItems(data);
      } catch (e) {
        if (!cancelled)
          setError(e.message || "Деректерді жүктеу мүмкін болмады.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const m = { stress: [], sleep: [], focus: [] };
    for (const it of items) {
      if (m[it.category]) m[it.category].push(it);
    }
    return m;
  }, [items]);

  return (
    <div>
      <h1 className="page-title">Кеңестер</h1>
      <p className="page-lead">
        Стресс, ұйқы және назар аудару туралы қысқа, пайдалы кеңестер. Бұл
        медициналық емес, жалпы түсініктеме ғана.
      </p>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="advice-skeletons" aria-busy="true" aria-label="Жүктелуде">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton advice-sk" />
          ))}
        </div>
      )}

      {!loading &&
        !error &&
        ["stress", "sleep", "focus"].map((key) => (
          <section key={key} className="advice-section">
            <h2 className="advice-cat-title">{CATEGORY_LABELS[key]}</h2>
            <div className="grid-cards">
              {grouped[key].map((it) => (
                <article key={it.id} className="advice-card card">
                  <h3 className="advice-card-title">{it.title_kz}</h3>
                  <p className="advice-card-text">{it.text_kz}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
