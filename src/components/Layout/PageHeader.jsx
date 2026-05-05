import Logo from '../ui/Logo';

export default function PageHeader({ label, light = false }) {
  return (
    <div className="header">
      <Logo light={light} />
      <div className="header-meta" style={light ? { color: 'rgba(255,255,255,0.35)' } : {}}>
        {label}
      </div>
    </div>
  );
}
