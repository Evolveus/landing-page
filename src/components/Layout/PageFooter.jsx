export default function PageFooter({ dark = false }) {
  return (
    <div
      className="footer-strip"
      style={dark ? { borderTopColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' } : {}}
    >
      <div className="fs-meta" style={dark ? { color: 'rgba(255,255,255,0.22)' } : {}}>
        EVALIFY &nbsp;&middot;&nbsp; BROCHURE &nbsp;&middot;&nbsp; 2026 EDITION
      </div>
    </div>
  );
}
