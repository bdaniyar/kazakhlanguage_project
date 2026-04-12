import { useState } from "react";
import { apiFetch } from "../api/client.js";
import "./Page.css";
import "./TestPage.css";

const SCALE = [
  { value: 0, label: "Жоқ" },
  { value: 1, label: "Азырақ" },
  { value: 2, label: "Кейде" },
  { value: 3, label: "Жиі" },
];

const QUESTIONS = [
  "Соңғы аптада өзіңізді шаршаған сезіндіңіз бе?",
  "Оқу не тапсырмалар бойынша мерзімге жетіп жүрмей жатсыз ба?",
  "Ұйқыңыз бөлшектеніп, жақсы дем алай алмай жатырсыз ба?",
  "Денеңізде шаршау не ашушаңдық сезімі бар ма?",
  "Терең дем алу қиындасып, көңіл-күйіңіз тұрақсыз ба?",
  "Адамдардан немесе топтан алыстауға құмарлығыңыз бар ма?",
];

const initialAnswers = () => QUESTIONS.map(() => null);

export default function TestPage() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const allAnswered = answers.every((a) => a !== null);

  function setAnswer(index, value) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setResult(null);
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!allAnswered) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await apiFetch("/test/submit", {
        method: "POST",
        body: JSON.stringify({ answers }),
      });
      setResult(data);
    } catch (err) {
      setError(err.message || "Қате болды. Қайта көріңіз.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setAnswers(initialAnswers());
    setResult(null);
    setError(null);
  }

  return (
    <div>
      <h1 className="page-title">Стресс тесті</h1>
      <p className="page-lead">
        Төмендегі сұрақтарға өзіңізге жақын жауап беріңіз. Бұл анонимді: жауаптар
        серверде сақталмайды — тек жиынтық балл есептеледі.
      </p>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      {result && (
        <div className="result-card card" role="status">
          <p className="result-label">Стресс деңгейі</p>
          <p className="result-level">{result.level_label_kz}</p>
          <p className="result-score">
            Ұпай: {result.score} / {result.max_score}
          </p>
          <p className="result-msg">{result.message_kz}</p>
          <button type="button" className="btn btn-ghost" onClick={handleReset}>
            Қайта бастау
          </button>
        </div>
      )}

      <form className="test-form" onSubmit={handleSubmit}>
        <ol className="test-list">
          {QUESTIONS.map((q, i) => (
            <li key={i} className="test-item card">
              <p className="test-q">
                <span className="test-num">{i + 1}.</span> {q}
              </p>
              <fieldset className="test-fieldset">
                <legend className="visually-hidden">Жауап {i + 1}</legend>
                <div className="test-options">
                  {SCALE.map(({ value, label }) => (
                    <label key={value} className="radio-pill">
                      <input
                        type="radio"
                        name={`q-${i}`}
                        value={value}
                        checked={answers[i] === value}
                        onChange={() => setAnswer(i, value)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
        <div className="test-submit-wrap">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!allAnswered || loading}
          >
            {loading ? "Жіберілуде…" : "Нәтижені көру"}
          </button>
        </div>
      </form>
    </div>
  );
}
