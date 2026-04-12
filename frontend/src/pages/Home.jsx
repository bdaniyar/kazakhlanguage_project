import { Link } from "react-router-dom";
import "./Page.css";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <section className="hero card">
        <p className="hero-badge">Студенттер үшін</p>
        <h1 className="hero-title">Қош келдіңіз, JanSaqtaға!</h1>
        <p className="hero-text">
          Бұл платформа стресс пен мазасыздықты түсінуге, психикалық әл-ауқатыңызды
          сақтауға және қажет болған жағдайда көмек алуға арналған. Барлық тесттер
          анонимді өтеді; жауаптарыңыз сақталмайды.
        </p>
        <div className="hero-actions">
          <Link to="/test" className="btn btn-primary">
            Тесттен өту
          </Link>
          <Link to="/advice" className="btn btn-ghost">
            Кеңестерді көру
          </Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Бұл не үшін маңызды?</h2>
        <div className="grid-cards three">
          <article className="info-card card">
            <h3 className="info-card-title">Өзіңізді таныңыз</h3>
            <p className="info-card-text">
              Стресс деңгейіңізді бөлекше көру үшін қысқа тесттен өтіңіз —
              нәтиже тек сізге көрсетіледі.
            </p>
          </article>
          <article className="info-card card">
            <h3 className="info-card-title">Күнделік пен көңіл-күй</h3>
            <p className="info-card-text">
              Эмоцияларыңызды жазып, күндер бойы өзгерісті бақылаңыз. Бұл ақыл-ой
              үшін емес, өзіңіз үшін пайдалы әдіс.
            </p>
          </article>
          <article className="info-card card">
            <h3 className="info-card-title">Көмек жақын</h3>
            <p className="info-card-text">
              Психолог және желілер бойынша байланыстар — қауіпсіз жағдайда қолдау
              табу оңай.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
