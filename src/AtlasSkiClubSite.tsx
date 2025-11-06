import React from "react";

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 16,
  background: "#fff"
};

const btn = (bg: string, color = "#0f172a"): React.CSSProperties => ({
  padding: "8px 12px",
  borderRadius: 12,
  background: bg,
  color,
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block"
});

export default function AtlasSkiClubSite() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", color: "#0f172a" }}>
      <header style={{ position: "sticky", top: 0, background: "#fff", borderBottom: "1px solid #e5e7eb", zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700 }}>Atlas Ski & Snowboard Club</div>
          <nav style={{ display: "flex", gap: 16, fontSize: 14 }}>
            <a href="#home" style={{ color: "#475569", textDecoration: "none" }}>Home</a>
            <a href="#events" style={{ color: "#475569", textDecoration: "none" }}>Events</a>
            <a href="#media" style={{ color: "#475569", textDecoration: "none" }}>Media</a>
            <a href="#join" style={{ color: "#111827", fontWeight: 600, textDecoration: "none" }}>Join</a>
          </nav>
        </div>
      </header>

      <section id="home" style={{ background: "linear-gradient(180deg,#0c2e66,#0c2e66)", color: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 16px" }}>
          <h1 style={{ fontSize: 40, margin: 0 }}>Atlas Ski & Snowboard Club</h1>
          <p style={{ fontSize: 18, opacity: 0.9, marginTop: 12 }}>
            Connecting Atlas crews through mountain adventures.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#events" style={btn("#fff", "#111827")}>View Events</a>
            <a href="#join" style={{ ...btn("transparent", "#fff"), border: "1px solid #ffffff80" }}>
              Join (Waiver soon)
            </a>
          </div>
        </div>
      </section>

      <section id="events" style={{ background: "#f8fafc" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Events</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            <div style={card}>
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>Season Kickoff – Breckenridge</h3>
              <p style={{ margin: 0, color: "#475569" }}>Info only; RSVP on federation sites.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <a href="https://www.naasf.com/" target="_blank" rel="noreferrer" style={btn("#F2B215")}>NAASF</a>
                <a href="https://airlineski.com/" target="_blank" rel="noreferrer" style={btn("#0f172a", "#fff")}>Airline Ski</a>
              </div>
            </div>
            <div style={card}>
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>Anchorage Crew Ride Day</h3>
              <p style={{ margin: 0, color: "#475569" }}>Info only; RSVP on federation sites.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <a href="https://www.naasf.com/" target="_blank" rel="noreferrer" style={btn("#F2B215")}>NAASF</a>
                <a href="https://airlineski.com/" target="_blank" rel="noreferrer" style={btn("#0f172a", "#fff")}>Airline Ski</a>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#64748b", marginTop: 12 }}>
            We’ll add Add-to-Calendar, Supabase login + roster, and uploads next.
          </p>
        </div>
      </section>

      <section id="media">
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Media</h2>
          <p style={{ color: "#475569" }}>Cloudinary uploads coming soon.</p>
        </div>
      </section>

      <section id="join" style={{ background: "#f8fafc" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Join the Club</h2>
          <p style={{ color: "#475569" }}>
            Waiver e-signature + email receipt + roster save will be enabled next.
          </p>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 16px", display: "flex", justifyContent: "space-between", gap: 12, fontSize: 14, color: "#475569", flexWrap: "wrap" }}>
          <div>© {new Date().getFullYear()} Atlas Ski & Snowboard Club</div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="https://www.naasf.com/" target="_blank" rel="noreferrer" style={{ color: "#0f172a", textDecoration: "none" }}>NAASF</a>
            <a href="https://airlineski.com/" target="_blank" rel="noreferrer" style={{ color: "#0f172a", textDecoration: "none" }}>Airline Ski</a>
            <a href="#join" style={{ color: "#0f172a", textDecoration: "none" }}>Join</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
