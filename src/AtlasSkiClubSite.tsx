import React from "react";
import JoinForm from "./components/JoinForm";

const card: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 16,
  background: "#fff",
};

const btn = (bg: string, color = "#0f172a"): React.CSSProperties => ({
  padding: "8px 12px",
  borderRadius: 12,
  background: bg,
  color,
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
});

export default function AtlasSkiClubSite() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", color: "#0f172a" }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, background: "#fff", borderBottom: "1px solid #e5e7eb", zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700 }}>Atlas Ski & Snowboard Club</div>
          <nav style={{ display: "flex", gap: 16, fontSize: 14 }}>
            <a href="#events" style={{ color: "#0f172a", textDecoration: "none" }}>Events</a>
            <a href="#media" style={{ color: "#0f172a", textDecoration: "none" }}>Media</a>
            <a href="#join" style={{ color: "#0f172a", textDecoration: "none", fontWeight: 600 }}>Join</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: "#0f172a", color: "#fff", padding: "64px 16px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Atlas Ski & Snowboard Club</h1>
          <p style={{ color: "#cbd5e1", fontSize: 16, marginBottom: 24 }}>
            Connecting Atlas crews through mountain adventures.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#events" style={btn("#fff", "#0f172a")}>View Events</a>
            <a href="#join" style={btn("#1e293b", "#fff")}>Join (Waiver)</a>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" style={{ background: "#f8fafc" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Events</h2>
          <div style={{ display: "grid", gap: 16 }}>
            <div style={card}>
              <h3 style={{ marginBottom: 4 }}>Season Kickoff — Breckenridge</h3>
              <p style={{ color: "#475569", marginBottom: 8 }}>Info only; RSVP on federation sites.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <a href="https://www.naasf.com/" target="_blank" style={btn("#facc15", "#000")}>NAASF</a>
                <a href="https://airlineski.com/" target="_blank" style={btn("#38bdf8", "#000")}>Airline Ski</a>
              </div>
            </div>
            <div style={card}>
              <h3 style={{ marginBottom: 4 }}>Anchorage Crew Ride Day</h3>
              <p style={{ color: "#475569", marginBottom: 8 }}>Info only; RSVP on federation sites.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <a href="https://www.naasf.com/" target="_blank" style={btn("#facc15", "#000")}>NAASF</a>
                <a href="https://airlineski.com/" target="_blank" style={btn("#38bdf8", "#000")}>Airline Ski</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA */}
      <section id="media">
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Media</h2>
          <p style={{ color: "#475569" }}>Cloudinary uploads coming soon.</p>
        </div>
      </section>

      {/* JOIN / WAIVER FORM */}
      <section id="join" style={{ background: "#f8fafc" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Join the Club</h2>
          <p style={{ color: "#475569", marginBottom: 16 }}>
            Fill this out to be added to the roster and sign the waiver.
          </p>
          <JoinForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f172a", color: "#94a3b8", padding: "24px 16px", textAlign: "center", fontSize: 14 }}>
        Atlas Ski & Snowboard Club © 2025 | Atlas Air Worldwide Crew Initiative
      </footer>
    </div>
  );
}
