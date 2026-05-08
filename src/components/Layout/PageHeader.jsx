export default function PageHeader({ folio, light = false }) {
  return (
    <div className="brand-strip">
      <div className={`wordmark${light ? " wordmark--light" : ""}`}>
        <img
          src="/evolveus_logo_v1.svg"
          alt="Evolveus"
          className="mark"
          style={{ height: "36px", width: "auto", verticalAlign: "middle" }}
        />
        <span>Evolve<span style={{ color: "var(--indigo)" }}>us</span></span>
      </div>
      <div className={`folio${light ? " folio--light" : ""}`}>
        {folio} <span className="of">/ 09</span>
      </div>
    </div>
  );
}
