export default function Logo({ light = false }) {
  return (
    <div className="logo" style={light ? { color: '#fff' } : {}}>
      <div className="logo-icon">
        <svg viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.5" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      Evalify
    </div>
  );
}
