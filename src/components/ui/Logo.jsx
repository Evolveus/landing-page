export default function Logo({ light = false }) {
  return (
    <div className="logo" style={light ? { color: "#fff" } : {}}>
      <div className="logo-icon">
        <img
          src="/evolveus_logo_v1.svg"
          alt="Evolveus logo"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      Evolveus
    </div>
  );
}
