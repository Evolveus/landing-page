export default function PageHeader({ folio, light = false }) {
  return (
    <div className="brand-strip">
      <div className={`wordmark${light ? " wordmark--light" : ""}`}>
        <span className="mark" />
        Evolveus
      </div>
      <div className={`folio${light ? " folio--light" : ""}`}>
        {folio} <span className="of">/ 07</span>
      </div>
    </div>
  );
}
