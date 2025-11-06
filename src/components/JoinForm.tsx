import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const field = { width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" };
const btn  = { padding: "10px 14px", borderRadius: 12, fontWeight: 700, border: "none", cursor: "pointer" } as const;

export default function JoinForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const supaReady = !!supabase;
  const hook = (import.meta as any).env?.VITE_GAS_WEBHOOK_URL as string | undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!supaReady) {
      setMsg("Temporarily offline: database not configured.");
      return;
    }
    if (!fullName.trim() || !email.trim() || !agree) {
      setMsg("Please enter your name, email, and check the waiver box.");
      return;
    }

    setBusy(true);
    try {
      // Insert one row in the simple waivers table
      const { error } = await supabase!
        .from("waivers")
        .insert({ full_name: fullName, email });
      if (error) throw error;

      // Optional: email receipt via Google Apps Script
      if (hook) {
        const html = `
          <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
            <h2>Atlas Ski & Snowboard Club — Waiver Receipt</h2>
            <p><strong>Name:</strong> ${fullName}<br/>
               <strong>Email:</strong> ${email}<br/>
               <strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <p>Thanks for joining the club! Keep an eye on your inbox for event info.</p>
          </div>
        `;
        try {
          await fetch(hook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: email,
              subject: "Atlas Ski Club — Waiver Receipt",
              html
            })
          });
        } catch {/* ignore email errors to not block user */}
      }

      setMsg("You're in! Check your email for a receipt (if provided).");
      setFullName(""); setEmail(""); setAgree(false);
    } catch (err: any) {
      setMsg(err?.message || "Something went wrong. Try again in a minute.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      {!supaReady && (
        <div style={{ padding: 12, borderRadius: 12, background: "#fff7ed", color: "#9a3412" }}>
          Database not connected yet—form is in preview mode. Ask the admin to add env vars.
        </div>
      )}
      {msg && <div style={{ padding: 12, borderRadius: 12, background: "#ecfeff", color: "#155e75" }}>{msg}</div>}

      <div>
        <label style={{ fontSize: 14, color: "#475569" }}>Full name</label>
        <input style={field} value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Jane Doe" />
      </div>

      <div>
        <label style={{ fontSize: 14, color: "#475569" }}>Preferred email</label>
        <input style={field} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" />
      </div>

      <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, color: "#334155" }}>
        <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
        <span>I have read and agree to the club waiver.</span>
      </label>

      <button disabled={busy || !supaReady} style={{ ...btn, background: busy || !supaReady ? "#e5e7eb" : "#0f172a", color: "#fff" }}>
        {busy ? "Submitting…" : "Join & Sign Waiver"}
      </button>
    </form>
  );
}
