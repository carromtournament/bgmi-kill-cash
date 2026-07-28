"use client";

import { useState } from "react";

// ─── EDIT THESE ANYTIME (Arun) ────────────────────────────────
const UPI_ID = "yourname@upi";        // ← put your real UPI ID here
const WHATSAPP = "919876543210";      // ← your WhatsApp number (with 91, no +)

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
// ──────────────────────────────────────────────────────────────

type FormatKey = keyof typeof FORMATS;

export default function Home() {
  const [selected, setSelected] = useState<FormatKey | null>(null);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="eyebrow mono">DAILY · 8:00 PM · MOBILE ONLY</div>
          <h1 className="title">
            BGMI<br />
            <span className="title-accent">KILL CASH</span>
          </h1>
          <p className="subtitle">
            Drop in every night at 8 PM. Solo matches, real cash prizes.
            Pick your format, pay, and get your room ID on WhatsApp.
          </p>
          <a href="#join" className="cta">CHOOSE YOUR MATCH →</a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="block">
        <div className="block-inner">
          <div className="section-tag mono">// HOW IT WORKS</div>
          <div className="steps">
            {[
              ["01", "Pick a match", "Choose Per Kill or Winner format below."],
              ["02", "Pay entry", "Send ₹100 to our UPI and note the transaction ID."],
              ["03", "Fill the form", "Enter your BGMI details + payment reference."],
              ["04", "Get room ID", "We send the room ID & password on WhatsApp before 8 PM."],
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
            <li><strong>Match starts 8:00 PM daily.</strong> Room ID & password sent on WhatsApp 15 minutes before.</li>
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
    name: "", bgmiId: "", ign: "", phone: "", txnId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const handleSubmit = () => {
    setError("");
    if (!form.name || !form.bgmiId || !form.ign || !form.phone || !form.txnId) {
      setError("Fill every field, including your payment transaction ID.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    // Sends registration to your WhatsApp as a pre-filled message.
    const msg =
      `*BGMI KILL CASH — Registration*%0A` +
      `Match: ${format.name}%0A` +
      `Name: ${form.name}%0A` +
      `BGMI ID: ${form.bgmiId}%0A` +
      `IGN: ${form.ign}%0A` +
      `Phone: ${form.phone}%0A` +
      `Txn ID: ${form.txnId}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="success">
        <div className="success-icon mono">✓</div>
        <h3>Registration sent, {form.name.split(" ")[0]}.</h3>
        <p className="mono">
          Your details opened in WhatsApp — hit send to confirm. We&apos;ll verify
          your payment and share the room ID on <strong>{form.phone}</strong> before 8 PM.
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
      <div className="pay-note mono">
        Pay <strong>₹{format.entry}</strong> to UPI: <strong>{UPI_ID}</strong>,
        then enter your transaction ID below. Submitting opens WhatsApp with your
        details pre-filled — just hit send.
      </div>
      <div className="fields">
        <Field label="Full Name" val={form.name} onChange={(v) => update("name", v)} placeholder="Your name" />
        <Field label="BGMI ID (Numeric)" val={form.bgmiId} onChange={(v) => update("bgmiId", v)} placeholder="512345678" />
        <Field label="In-Game Name (IGN)" val={form.ign} onChange={(v) => update("ign", v)} placeholder="YourIGN" />
        <Field label="Phone (WhatsApp)" val={form.phone} onChange={(v) => update("phone", v)} placeholder="10-digit number" />
        <Field label="Payment Txn ID" val={form.txnId} onChange={(v) => update("txnId", v)} placeholder="UPI reference no." />
      </div>
      {error && <div className="err mono">{error}</div>}
      <button className="cta cta-full" onClick={handleSubmit}>
        SUBMIT & SEND ON WHATSAPP →
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
  position: relative; padding: 90px 20px 70px; overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: radial-gradient(120% 80% at 50% -10%, rgba(242,169,0,0.12), transparent 60%), var(--bg);
}
.hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 44px 44px; opacity: 0.25;
  mask-image: radial-gradient(70% 60% at 50% 30%, #000, transparent 80%);
}
.hero-inner { position: relative; max-width: 760px; margin: 0 auto; text-align: center; }
.eyebrow {
  font-size: 12px; letter-spacing: 3px; color: var(--amber);
  border: 1px solid var(--line); display: inline-block; padding: 6px 14px; border-radius: 2px; margin-bottom: 26px;
}
.title { font-size: clamp(52px, 15vw, 104px); line-height: 0.86; font-weight: 800; letter-spacing: -2px; margin: 0; text-transform: uppercase; }
.title-accent { color: transparent; -webkit-text-stroke: 2px var(--amber); text-shadow: 0 0 40px rgba(242,169,0,0.3); }
.subtitle { color: var(--muted); font-size: 17px; max-width: 480px; margin: 26px auto 0; line-height: 1.5; }
.cta {
  display: inline-block; background: var(--amber); color: #1a1400; font-weight: 700; letter-spacing: 1px;
  padding: 15px 34px; border-radius: 3px; text-decoration: none; border: none; cursor: pointer; font-size: 15px;
  transition: transform .12s, box-shadow .12s; margin-top: 34px;
}
.cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(242,169,0,0.35); }
.cta-full { width: 100%; margin-top: 22px; }

.block { padding: 64px 20px; }
.block-alt { background: var(--bg-2); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.block-inner { max-width: 760px; margin: 0 auto; }
.section-tag { color: var(--amber); font-size: 13px; letter-spacing: 2px; margin-bottom: 24px; }

.steps { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.step { border: 1px solid var(--line); background: var(--panel); padding: 20px; border-radius: 3px; }
.step-n { color: var(--amber); font-size: 13px; font-weight: 700; margin-bottom: 10px; }
.step-t { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
.step-d { color: var(--muted); font-size: 14px; line-height: 1.5; }

.fmt-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.fmt-card {
  text-align: left; border: 1px solid var(--line); background: var(--panel); border-radius: 4px;
  padding: 22px; cursor: pointer; transition: border-color .15s, transform .12s; color: var(--text); font: inherit;
}
.fmt-card:hover { transform: translateY(-2px); border-color: var(--muted); }
.fmt-active { border-color: var(--amber); box-shadow: 0 0 0 1px var(--amber), 0 8px 30px rgba(242,169,0,0.15); }
.fmt-name { font-size: 19px; font-weight: 700; color: var(--amber-2); }
.fmt-tag { color: var(--muted); font-size: 13px; margin: 6px 0 16px; line-height: 1.4; }
.fmt-entry { font-size: 13px; letter-spacing: 1px; color: var(--text); border-top: 1px solid var(--line); padding-top: 14px; }
.fmt-prizes { margin: 12px 0 16px; display: grid; gap: 7px; }
.fmt-prize { display: flex; justify-content: space-between; font-size: 14px; }
.fp-label { color: var(--muted); }
.fp-val { color: var(--text); font-weight: 600; }
.fmt-pick { font-size: 11px; letter-spacing: 1.5px; color: var(--amber); border-top: 1px solid var(--line); padding-top: 12px; }

.reg { margin-top: 26px; border: 1px solid var(--amber); background: var(--panel); border-radius: 4px; padding: 24px; }
.reg-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; }
.reg-title { font-size: 17px; font-weight: 700; color: var(--amber-2); }
.reg-entry { font-size: 15px; color: var(--text); }
.pay-note { border: 1px dashed var(--amber); background: rgba(242,169,0,0.06); padding: 14px 16px; border-radius: 3px; font-size: 13px; margin-bottom: 22px; line-height: 1.6; }
.pay-note strong { color: var(--amber-2); }
.fields { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field-label { font-size: 11px; letter-spacing: 1.5px; color: var(--muted); text-transform: uppercase; }
.input { background: var(--bg); border: 1px solid var(--line); color: var(--text); padding: 12px 14px; border-radius: 3px; font-size: 15px; outline: none; transition: border-color .15s; }
.input:focus { border-color: var(--amber); }
.input::placeholder { color: #55583f; }
.err { color: #ff8a5c; font-size: 13px; margin-top: 14px; }

.success { text-align: center; padding: 40px 10px; margin-top: 26px; border: 1px solid var(--amber); background: var(--panel); border-radius: 4px; }
.success-icon { width: 60px; height: 60px; border: 2px solid var(--amber); color: var(--amber); border-radius: 50%; display: grid; place-items: center; margin: 0 auto 20px; font-size: 28px; }
.success h3 { font-size: 22px; margin: 0 0 12px; }
.success p { color: var(--muted); font-size: 14px; line-height: 1.6; max-width: 420px; margin: 0 auto; }
.success strong { color: var(--amber-2); }

.rules { counter-reset: r; list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
.rules li { counter-increment: r; position: relative; padding: 16px 16px 16px 54px; border: 1px solid var(--line); background: var(--panel); border-radius: 3px; font-size: 15px; line-height: 1.5; }
.rules li::before { content: counter(r, decimal-leading-zero); position: absolute; left: 16px; top: 15px; font-family: var(--font-geist-mono); color: var(--amber); font-size: 13px; font-weight: 700; }
.rules strong { color: var(--amber-2); }

.foot { text-align: center; padding: 30px 20px; color: var(--muted); font-size: 11px; letter-spacing: 1px; border-top: 1px solid var(--line); }

@media (max-width: 560px) {
  .fields, .steps, .fmt-cards { grid-template-columns: 1fr; }
  .title { letter-spacing: -1px; }
}
`;
