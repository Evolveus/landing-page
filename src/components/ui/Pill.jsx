export default function Pill({ children, variant = 'indigo', style }) {
  return (
    <div className={`pill ${variant}`} style={style}>
      {children}
    </div>
  );
}
