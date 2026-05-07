export default function PageFooter({ chapter, light = false }) {
  return (
    <div className={`colophon${light ? ' colophon--light' : ''}`}>
      <div className="rule" />
      <span>EVALIFY · 2026</span>
      <span>{chapter}</span>
    </div>
  );
}
