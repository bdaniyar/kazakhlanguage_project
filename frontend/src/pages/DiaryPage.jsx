import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../api/client.js";
import { formatKZDateTime } from "../utils/datetime.js";
import "./Page.css";
import "./DiaryPage.css";

const LOCAL_KEY = "jansaqta_diary_local";

function readLocalEntries() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalEntries(entries) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
}

function mergeEntries(apiList, localList) {
  const map = new Map();
  for (const e of apiList) {
    map.set(`a-${e.id}`, { ...e, _sort: new Date(e.created_at).getTime() });
  }
  for (const e of localList) {
    map.set(`l-${e.id}`, { ...e, _sort: new Date(e.created_at).getTime() });
  }
  return [...map.values()].sort((x, y) => y._sort - x._sort);
}

export default function DiaryPage() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [offlineNotice, setOfflineNotice] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const local = readLocalEntries();
    try {
      const apiList = await apiFetch("/diary");
      setEntries(mergeEntries(apiList, local));
      setOfflineNotice(false);
    } catch {
      setEntries(mergeEntries([], local));
      setOfflineNotice(true);
      if (local.length === 0) {
        setError(
          "Серверге қосылу мүмкін болмады. Жазбалар браузерде сақталады."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await apiFetch("/diary", {
        method: "POST",
        body: JSON.stringify({ content: trimmed }),
      });
      setText("");
      setSuccess("Жазба сақталды.");
      setOfflineNotice(false);
      await refresh();
    } catch {
      const localEntry = {
        id: `local-${Date.now()}`,
        content: trimmed,
        created_at: new Date().toISOString(),
      };
      const nextLocal = [localEntry, ...readLocalEntries()];
      writeLocalEntries(nextLocal);
      setText("");
      setSuccess("Интернет болмаса, жазба браузерде сақталды.");
      setOfflineNotice(true);
      setEntries((prev) => {
        const apiOnly = prev.filter((x) => typeof x.id === "number");
        return mergeEntries(apiOnly, nextLocal);
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="page-title">Эмоциялық күнделік</h1>
      <p className="page-lead">
        Өзіңіздің көңіл-күйіңіз бен ойларыңызды еркін жазыңыз. Бұл жазбалар
        серверде сақталады; сервер жоқ болса — браузерде қалады.
      </p>

      {offlineNotice && (
        <div className="alert alert-error" role="status">
          Сервермен байланыс шектелген. Жазбалар браузерде де сақталуы мүмкін.
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="status">
          {success}
        </div>
      )}

      <form className="diary-form card" onSubmit={handleSubmit}>
        <label htmlFor="diary-text" className="diary-label">
          Бүгінгі көңіл-күйіңіз қалай?
        </label>
        <textarea
          id="diary-text"
          className="diary-textarea"
          rows={4}
          value={text}
          onChange={(ev) => setText(ev.target.value)}
          placeholder="Мысалы: бүгін емтиханға аздап алаңдаймын…"
          maxLength={5000}
        />
        <div className="diary-actions">
          <button type="submit" className="btn btn-primary" disabled={saving || !text.trim()}>
            {saving ? "Сақталуда…" : "Сақтау"}
          </button>
        </div>
      </form>

      <section className="diary-list-section" aria-labelledby="diary-prev">
        <h2 id="diary-prev" className="diary-prev-title">
          Алдыңғы жазбалар
        </h2>
        {loading && <div className="skeleton diary-sk-line" aria-hidden />}
        {!loading && entries.length === 0 && (
          <p className="diary-empty">
            Әлі жазба жоқ. Алғашқы жазбаңызды қосыңыз.
          </p>
        )}
        <ul className="diary-list">
          {entries.map((en) => (
            <li key={`${typeof en.id === "number" ? "a" : "l"}-${en.id}`} className="diary-item card">
              <time className="diary-time" dateTime={en.created_at}>
                {formatKZDateTime(en.created_at)}
              </time>
              <p className="diary-content">{en.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
