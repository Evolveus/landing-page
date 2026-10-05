export default function PageFooter({ chapter }) {
  return (
    <div className="colophon">
      <div className="rule" />
      <span>EVOLVEUS · 2026</span>
      <span>{chapter}</span>
    </div>
  );
}
