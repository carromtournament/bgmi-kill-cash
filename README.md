# BGMI Kill Cash — Daily Tournament Site

Simple registration site for daily BGMI solo tournaments (8 PM).
Two formats: Solo Per Kill Match & Solo Winner. Mobile-first, static, free to host.

## Step 1 — Add your details
Open `app/page.tsx`. At the very top, edit two lines:

    const UPI_ID = "yourname@upi";      // your real UPI ID
    const WHATSAPP = "919876543210";    // your WhatsApp number (91 + number, no +)

That's it — prizes, entry fees, and rules are already set from your plan.
To change any prize/fee later, edit the FORMATS object right below those lines.

## Step 2 — Run it on your computer (to preview)
    npm install
    npm run dev
Open http://localhost:3000

## Step 3 — Put it online for free (Vercel)
1. Make a free account at github.com and create a new repository.
2. Upload this whole folder to that repository.
3. Go to vercel.com, sign in with GitHub, click "Add New Project".
4. Pick your repository → click Deploy.
5. In ~1 minute you get a free link like  bgmi-kill-cash.vercel.app
6. Share that link on WhatsApp. Done.

## How registration works (no database needed)
- Player picks a format, pays ₹100 to your UPI, fills the form.
- On submit, their details open in WhatsApp, pre-filled, sent to YOUR number.
- You verify the payment and reply with the room ID before 8 PM.

## Later (when you grow)
- Auto slot counter / registered players list → needs Google Sheet or database.
- Razorpay auto-payment → skips manual verification.
Keep it simple for now; add these once you have steady players.
