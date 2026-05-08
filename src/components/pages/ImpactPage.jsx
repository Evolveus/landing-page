import PageHeader from "../Layout/PageHeader";
import "../../styles/impact.css";

const STATS = [
  { num: "2,000+", cap: "Quizzes conducted" },
  { num: "2,00,000", cap: "Responses processed" },
  { num: "93%", cap: "Faculty agreement with AI grades" },
  { num: "0.8s", cap: "Average grade time per response" },
];

export default function ImpactPage() {
  return (
    <div className="page p7">
      <div className="p7-glow" aria-hidden />
      <PageHeader folio="07" light />

      <div className="p7-stage">
        <div className="kicker kicker--light">Chapter VI — Close</div>

        <div className="p7-hero">
          <div className="p7-hero-num">
            <span className="p7-hero-from">50 hr</span>
            <span className="p7-hero-arr">→</span>
            <span className="p7-hero-to">14 min</span>
          </div>
          <p className="p7-hero-sub">
            420 descriptive papers, mid-term cycle, CS-301.
            <br />
            <span>
              The same rubric, the same defensible audit, the same faculty in
              the loop.
            </span>
          </p>
        </div>

        <div className="p7-stats">
          {STATS.map(({ num, cap }, i) => (
            <div key={cap} className="p7-stat">
              <div className="p7-stat-num">{num}</div>
              <div className="p7-stat-cap">{cap}</div>
              {i < STATS.length - 1 && <div className="p7-stat-rule" />}
            </div>
          ))}
        </div>

        <blockquote className="p7-quote">
          <p>
            <span className="p7-q-mark">"</span>
            It's a real upgrade from MS Forms. We have far more flexibility and
            control over how exams are conducted — and that matters a lot when
            you're running assessments at scale.
          </p>
          <footer>— Faculty, School of AI · Amrita Vishwa Vidyapeetham</footer>
        </blockquote>

        <div className="p7-close">
          <div className="p7-close-l">
            <div className="caption caption-light">
              Bring Evolveus to your institution
            </div>
            <h2 className="p7-close-title">
              Book a 30-minute walkthrough.
              <br />
              <em>We'll tailor it to your departments.</em>
            </h2>
            <div className="p7-close-cta">
              <a href="#" className="p7-btn">
                Book a demo →
              </a>
              <a href="#" className="p7-btn-text">
                Download datasheet
              </a>
            </div>
          </div>

          <div className="p7-close-r">
            <div className="p7-contact-row">
              <span className="p7-contact-key">Email</span>
              <span className="p7-contact-val">info@evolveus.in</span>
            </div>
            <div className="p7-contact-row">
              <span className="p7-contact-key">Phone</span>
              <span className="p7-contact-val">
                +91 97914 70801 / +91 93447 69532
              </span>
            </div>
            <div className="p7-contact-row">
              <span className="p7-contact-key">Web</span>
              <span className="p7-contact-val">evolveus.in</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p7-foot">
        <span>EVOLVEUS · 2026</span>
        <span>End — 07 / 07</span>
      </div>
    </div>
  );
}
