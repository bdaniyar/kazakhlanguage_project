import { useEffect, useState } from "react";
import { apiFetch } from "../api/client.js";
import "./Page.css";
import "./HelpPage.css";

export default function HelpPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch("/help");
        if (!cancelled) setContacts(data);
      } catch (e) {
        if (!cancelled)
          setError(e.message || "Деректерді алу мүмкін болмады.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1 className="page-title">Көмек</h1>
      <p className="page-lead">
        Психолог және сенімді желілер — өзіңізге жақын қолдау табу үшін. Телефон
        нөмірлерін мектеп немесе жергілікті қызметтер арқылы растаңыз.
      </p>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="help-skeletons" aria-busy="true">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton help-sk" />
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="help-grid">
          {contacts.map((c) => (
            <article key={c.id} className="help-card card">
              <p className="help-type">{c.type_kz}</p>
              <h2 className="help-title">{c.title_kz}</h2>
              <p className="help-detail">{c.detail_kz}</p>
              {c.phone && (
                <a className="help-phone btn btn-primary" href={`tel:${c.phone.replace(/\s/g, "")}`}>
                  Қабылдау: {c.phone}
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
