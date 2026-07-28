"use client";

import { useState } from "react";

// ─── EDIT THESE ANYTIME (Arun) ────────────────────────────────
const WHATSAPP = "918428337833";   // your WhatsApp number (91 + number, no +)
const SHEET_URL = "https://script.google.com/macros/s/AKfycbwBySRAPjNy4Ur4HCe1mZfpYDuLnXIuxGzA5vtLp2Sg6cGG_ijI3S6uguWiutj4Y_eW/exec";              // paste your Google Apps Script Web App URL here
// UPI QR image lives at /public/upi-qr.png — replace that file with your real QR.
// ──────────────────────────────────────────────────────────────

const FORMATS = {
  perkill: {
    key: "perkill",
    name: "Solo Per Kill Match",
    tagline: "Every kill = cash. Rack them up.",
    entry: 100,
    prizes: [
      ["Per Kill", "₹50"],
      ["1st Place", "₹2,000"],
      ["2nd Place", "₹1,000"],
      ["3rd Place", "₹500"],
    ],
  },
  winner: {
    key: "winner",
    name: "Solo Winner",
    tagline: "Survive to the end. Winner takes the biggest cut.",
    entry: 100,
    prizes: [
      ["1st Place", "₹5,000"],
      ["2nd Place", "₹2,000"],
      ["3rd Place", "₹1,000"],
      ["4th – 5th", "₹200 each"],
    ],
  },
};

type FormatKey = keyof typeof FORMATS;

export default function Home() {
  const [selected, setSelected] = useState<FormatKey | null>(null);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-scan" />
        <div className="hero-inner">
          <div className="eyebrow mono">
            <span className="live-dot" /> DAILY · 8:00 PM · MOBILE ONLY
          </div>
          <h1 className="title">
            BGMI<br />
            <span className="title-accent">KILL CASH</span>
          </h1>
          <p className="subtitle">
            Drop in every night at 8 PM. Solo matches, real cash prizes.
            Pick your format, scan &amp; pay, and get your room ID on WhatsApp.
          </p>
          <a href="#join" className="cta">CHOOSE YOUR MATCH →</a>
          <div className="hero-badges mono">
            <span className="badge">₹5,000 TOP PRIZE</span>
            <span className="badge">INSTANT UPI PAYOUT</span>
            <span className="badge">SOLO ONLY</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="block">
        <div className="block-inner">
          <div className="section-tag mono">// HOW IT WORKS</div>
          <div className="steps">
            {[
              ["01", "Pick a match", "Choose Per Kill or Winner format below."],
              ["02", "Scan & pay", "Scan the UPI QR and pay ₹100. Screenshot it."],
              ["03", "Fill the form", "Enter your BGMI details + upload payment proof."],
              ["04", "Get room ID", "Room ID & password on WhatsApp before 8 PM."],
            ].map(([n, t, d]) => (
              <div className="step" key={n}>
                <div className="step-n mono">{n}</div>
                <div className="step-t">{t}</div>
                <div className="step-d">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMAT SELECT + FORM */}
      <section className="block block-alt" id="join">
        <div className="block-inner">
          <div className="section-tag mono">// CHOOSE YOUR MATCH</div>
          <div className="fmt-cards">
            {(Object.keys(FORMATS) as FormatKey[]).map((k) => {
              const f = FORMATS[k];
              const active = selected === k;
              return (
                <button
                  key={k}
                  className={`fmt-card ${active ? "fmt-active" : ""}`}
                  onClick={() => setSelected(k)}
                >
                  <div className="fmt-name">{f.name}</div>
                  <div className="fmt-tag">{f.tagline}</div>
                  <div className="fmt-entry mono">ENTRY ₹{f.entry}</div>
                  <div className="fmt-prizes">
                    {f.prizes.map(([label, val]) => (
                      <div className="fmt-prize" key={label}>
                        <span className="fp-label">{label}</span>
                        <span className="fp-val mono">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="fmt-pick mono">{active ? "✓ SELECTED" : "TAP TO SELECT"}</div>
                </button>
              );
            })}
          </div>

          {selected && <RegForm format={FORMATS[selected]} />}
        </div>
      </section>

      {/* RULES */}
      <section className="block">
        <div className="block-inner">
          <div className="section-tag mono">// RULES</div>
          <ol className="rules">
            <li><strong>Mobile only.</strong> No emulators. Random checks apply — cheaters are removed with no refund.</li>
            <li><strong>Match starts 8:00 PM daily.</strong> Room ID &amp; password sent on WhatsApp 15 minutes before.</li>
            <li><strong>Entry is non-refundable</strong> once the room opens. Be on time.</li>
            <li><strong>No teaming or hacking.</strong> Instant disqualification.</li>
            <li><strong>Record your gameplay</strong> if possible — needed for any dispute.</li>
            <li><strong>Prizes paid via UPI</strong> within 24 hours of match completion.</li>
          </ol>
        </div>
      </section>

      <footer className="foot mono">
        BGMI KILL CASH · DAILY 8PM · Organized independently. Not affiliated with Krafton/BGMI.
      </footer>

      <style>{styles}</style>
    </main>
  );
}

function RegForm({ format }: { format: typeof FORMATS[FormatKey] }) {
  const [form, setForm] = useState({
    name: "", bgmiId: "", ign: "", phone: "", email: "", city: "", txnId: "",
  });
  const [screenshot, setScreenshot] = useState<string>("");
  const [screenshotName, setScreenshotName] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Screenshot too large. Keep it under 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setScreenshot(reader.result as string);
      setScreenshotName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.bgmiId || !form.ign || !form.phone || !form.email || !form.city || !form.txnId) {
      setError("Fill every field before submitting.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    if (!screenshot) {
      setError("Upload your payment screenshot.");
      return;
    }

    setSending(true);

    // 1) Save to Google Sheet (if configured)
    if (SHEET_URL) {
      try {
        await fetch(SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            match: format.name,
            ...form,
            screenshot,        // base64 image → saved to Drive by the script
            screenshotName,
          }),
        });
      } catch {
        // no-cors gives an opaque response; we can't read it, so we proceed.
      }
    }

    // 2) Also open WhatsApp with text details (screenshot can't auto-attach)
    const msg =
      `*BGMI KILL CASH — Registration*%0A` +
      `Match: ${format.name}%0A` +
      `Name: ${form.name}%0A` +
      `BGMI ID: ${form.bgmiId}%0A` +
      `IGN: ${form.ign}%0A` +
      `Phone: ${form.phone}%0A` +
      `Email: ${form.email}%0A` +
      `City: ${form.city}%0A` +
      `Txn ID: ${form.txnId}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");

    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success">
        <div className="success-icon mono">✓</div>
        <h3>Registration received, {form.name.split(" ")[0]}.</h3>
        <p className="mono">
          Your details are saved. WhatsApp opened with your info — hit send and
          attach your payment screenshot there too. We&apos;ll verify and share
          the room ID on <strong>{form.phone}</strong> before 8 PM.
        </p>
      </div>
    );
  }

  return (
    <div className="reg">
      <div className="reg-head">
        <span className="reg-title">{format.name} — Registration</span>
        <span className="reg-entry mono">₹{format.entry}</span>
      </div>

      <div className="pay-block">
        <div className="qr-wrap">
          {/* Replace /public/upi-qr.png with your real UPI QR */}
          <img src="/upi-qr.png" alt="UPI QR code" className="qr-img" />
          <div className="qr-cap mono">SCAN &amp; PAY ₹{format.entry}</div>
        </div>
        <div className="pay-note mono">
          <strong>1.</strong> Scan the QR with any UPI app and pay ₹{format.entry}.<br />
          <strong>2.</strong> Take a screenshot of the payment.<br />
          <strong>3.</strong> Fill the form &amp; upload that screenshot below.
        </div>
      </div>

      <div className="fields">
        <Field label="Full Name" val={form.name} onChange={(v) => update("name", v)} placeholder="Your name" />
        <Field label="BGMI ID (Numeric)" val={form.bgmiId} onChange={(v) => update("bgmiId", v)} placeholder="512345678" />
        <Field label="In-Game Name (IGN)" val={form.ign} onChange={(v) => update("ign", v)} placeholder="YourIGN" />
        <Field label="Phone (WhatsApp)" val={form.phone} onChange={(v) => update("phone", v)} placeholder="10-digit number" />
        <Field label="Email" val={form.email} onChange={(v) => update("email", v)} placeholder="you@email.com" />
        <Field label="City" val={form.city} onChange={(v) => update("city", v)} placeholder="Your city" />
        <Field label="Payment Txn ID" val={form.txnId} onChange={(v) => update("txnId", v)} placeholder="UPI reference no." />
        <label className="field">
          <span className="field-label mono">Payment Screenshot</span>
          <div className="file-btn">
            <input type="file" accept="image/*" onChange={onFile} className="file-input" />
            <span className="file-label mono">
              {screenshotName ? `✓ ${screenshotName}` : "TAP TO UPLOAD SCREENSHOT"}
            </span>
          </div>
        </label>
      </div>

      {error && <div className="err mono">{error}</div>}
      <button className="cta cta-full" onClick={handleSubmit} disabled={sending}>
        {sending ? "SUBMITTING…" : "SUBMIT REGISTRATION →"}
      </button>
    </div>
  );
}

function Field({ label, val, onChange, placeholder }: {
  label: string; val: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <label className="field">
      <span className="field-label mono">{label}</span>
      <input className="input" value={val} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

const styles = `
.hero {
  position: relative; padding: 100px 20px 80px; overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: radial-gradient(130% 90% at 50% -15%, rgba(242,169,0,0.14), transparent 60%), var(--bg);
}
.hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 44px 44px; opacity: 0.28;
  mask-image: radial-gradient(70% 65% at 50% 30%, #000, transparent 82%);
  transform: perspective(600px) rotateX(0deg);
}
.hero-glow {
  position: absolute; top: -30%; left: 50%; transform: translateX(-50%);
  width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(193,68,14,0.18), transparent 70%);
  filter: blur(20px); pointer-events: none;
}
.hero-scan {
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px);
  opacity: 0.4; mix-blend-mode: overlay;
}
.hero-inner { position: relative; max-width: 780px; margin: 0 auto; text-align: center; z-index: 1; }
.eyebrow {
  font-size: 12px; letter-spacing: 3px; color: var(--amber);
  border: 1px solid var(--line); background: rgba(13,15,10,0.6); display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 16px; border-radius: 2px; margin-bottom: 28px;
}
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 8px #4ade80; animation: pulse 1.6s infinite; }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
.title { font-size: clamp(54px, 15vw, 112px); line-height: 0.84; font-weight: 800; letter-spacing: -2px; margin: 0; text-transform: uppercase; }
.title-accent {
  color: transparent; -webkit-text-stroke: 2px var(--amber);
  text-shadow: 0 0 45px rgba(242,169,0,0.4), 0 0 12px rgba(242,169,0,0.3);
}
.subtitle { color: var(--muted); font-size: 17px; max-width: 500px; margin: 28px auto 0; line-height: 1.55; }
.cta {
  display: inline-block; background: var(--amber); color: #1a1400; font-weight: 700; letter-spacing: 1px;
  padding: 15px 34px; border-radius: 3px; text-decoration: none; border: none; cursor: pointer; font-size: 15px;
  transition: transform .12s, box-shadow .12s; margin-top: 34px;
}
.cta:hover { transform: translateY(-2px); box-shadow: 0 8px 34px rgba(242,169,0,0.4); }
.cta:disabled { opacity: 0.6; cursor: wait; }
.cta-full { width: 100%; margin-top: 22px; }
.hero-badges { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 34px; }
.badge { font-size: 11px; letter-spacing: 1px; color: var(--muted); border: 1px solid var(--line); background: var(--panel); padding: 7px 13px; border-radius: 20px; }

.block { padding: 66px 20px; }
.block-alt { background: var(--bg-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.block-inner { max-width: 780px; margin: 0 auto; }
.section-tag { color: var(--amber); font-size: 13px; letter-spacing: 2px; margin-bottom: 26px; }

.steps { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.step { border: 1px solid var(--line); background: var(--panel); padding: 22px; border-radius: 4px; transition: transform .12s, border-color .12s; }
.step:hover { transform: translateY(-2px); border-color: var(--muted); }
.step-n { color: var(--amber); font-size: 13px; font-weight: 700; margin-bottom: 12px; }
.step-t { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
.step-d { color: var(--muted); font-size: 14px; line-height: 1.5; }

.fmt-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.fmt-card {
  text-align: left; border: 1px solid var(--line); background: var(--panel); border-radius: 5px;
  padding: 24px; cursor: pointer; transition: border-color .15s, transform .12s, box-shadow .15s; color: var(--text); font: inherit;
}
.fmt-card:hover { transform: translateY(-3px); border-color: var(--muted); box-shadow: 0 12px 30px rgba(0,0,0,0.4); }
.fmt-active { border-color: var(--amber); box-shadow: 0 0 0 1px var(--amber), 0 12px 34px rgba(242,169,0,0.18); }
.fmt-name { font-size: 20px; font-weight: 700; color: var(--amber-2); }
.fmt-tag { color: var(--muted); font-size: 13px; margin: 6px 0 16px; line-height: 1.4; }
.fmt-entry { font-size: 13px; letter-spacing: 1px; color: var(--text); border-top: 1px solid var(--line); padding-top: 14px; }
.fmt-prizes { margin: 12px 0 16px; display: grid; gap: 7px; }
.fmt-prize { display: flex; justify-content: space-between; font-size: 14px; }
.fp-label { color: var(--muted); }
.fp-val { color: var(--text); font-weight: 600; }
.fmt-pick { font-size: 11px; letter-spacing: 1.5px; color: var(--amber); border-top: 1px solid var(--line); padding-top: 12px; }

.reg { margin-top: 28px; border: 1px solid var(--amber); background: var(--panel); border-radius: 5px; padding: 26px; }
.reg-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; }
.reg-title { font-size: 18px; font-weight: 700; color: var(--amber-2); }
.reg-entry { font-size: 15px; color: var(--text); }

.pay-block { display: flex; gap: 18px; align-items: center; margin-bottom: 24px; flex-wrap: wrap; }
.qr-wrap { text-align: center; flex-shrink: 0; }
.qr-img { width: 150px; height: 150px; border-radius: 6px; border: 2px solid var(--amber); display: block; }
.qr-cap { font-size: 11px; letter-spacing: 1px; color: var(--amber); margin-top: 8px; }
.pay-note { flex: 1; min-width: 200px; border: 1px dashed var(--amber); background: rgba(242,169,0,0.06); padding: 16px; border-radius: 4px; font-size: 13px; line-height: 1.9; }
.pay-note strong { color: var(--amber-2); }

.fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field-label { font-size: 11px; letter-spacing: 1.5px; color: var(--muted); text-transform: uppercase; }
.input { background: var(--bg); border: 1px solid var(--line); color: var(--text); padding: 12px 14px; border-radius: 3px; font-size: 15px; outline: none; transition: border-color .15s; }
.input:focus { border-color: var(--amber); }
.input::placeholder { color: #55583f; }

.file-btn { position: relative; border: 1px solid var(--line); background: var(--bg); border-radius: 3px; padding: 12px 14px; cursor: pointer; transition: border-color .15s; overflow: hidden; }
.file-btn:hover { border-color: var(--amber); }
.file-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.file-label { font-size: 12px; letter-spacing: 1px; color: var(--amber); }

.err { color: #ff8a5c; font-size: 13px; margin-top: 14px; }

.success { text-align: center; padding: 44px 14px; margin-top: 28px; border: 1px solid var(--amber); background: var(--panel); border-radius: 5px; }
.success-icon { width: 64px; height: 64px; border: 2px solid var(--amber); color: var(--amber); border-radius: 50%; display: grid; place-items: center; margin: 0 auto 22px; font-size: 30px; }
.success h3 { font-size: 22px; margin: 0 0 12px; }
.success p { color: var(--muted); font-size: 14px; line-height: 1.7; max-width: 440px; margin: 0 auto; }
.success strong { color: var(--amber-2); }

.rules { counter-reset: r; list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
.rules li { counter-increment: r; position: relative; padding: 16px 16px 16px 54px; border: 1px solid var(--line); background: var(--panel); border-radius: 3px; font-size: 15px; line-height: 1.5; }
.rules li::before { content: counter(r, decimal-leading-zero); position: absolute; left: 16px; top: 15px; font-family: var(--font-geist-mono); color: var(--amber); font-size: 13px; font-weight: 700; }
.rules strong { color: var(--amber-2); }

.foot { text-align: center; padding: 32px 20px; color: var(--muted); font-size: 11px; letter-spacing: 1px; border-top: 1px solid var(--line); }

@media (max-width: 560px) {
  .fields, .steps, .fmt-cards { grid-template-columns: 1fr; }
  .title { letter-spacing: -1px; }
  .pay-block { justify-content: center; }
}
`;
