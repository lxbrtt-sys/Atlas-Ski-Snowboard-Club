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
      // upsert member by preferred_email
      const { data: existing, error: selErr } = await supabase!
        .from("members")
        .select("id")
        .eq("preferred_email", email)
        .maybeSingle();
      if (selErr) throw selErr;

      let memberId = existing?.id;
      if (!memberId) {
        const { data: ins, error: insErr } = await supabase!
          .from("members")
          .insert({ full_name: fullName, preferred_email: email })
          .select("id")
          .single();
        if (insErr) throw insErr;
        memberId = ins.id;
      }

      const { error: wErr } = await supabase!
        .from("waivers")
        .insert({ member_id: memberId, agreed: true, signature_name: fullName });
      if (wErr) throw wErr;

      const hook = (import.meta as any).env?.VITE_GAS_WEBHOOK_URL;
      if (hook) {
        try {
          await fetch(hook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, club: "Atlas Ski & Snowboard Club", waiverAgreed: true })
          });
        } catch {/* ignore */}
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

      <button
        disabled={busy || !supaReady}
        style={{ ...btn, background: busy || !supaReady ? "#e5e7eb" : "#0f172a", color: "#fff" }}
      >
        {busy ? "Submitting…" : (supaReady ? "Join & Sign Waiver" : "Join (preview)")}
      </button>
    </form>
  );
}
