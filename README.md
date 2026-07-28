# BGMI Kill Cash — Daily Tournament Site

Daily BGMI solo tournaments (8 PM). Two formats: Solo Per Kill & Solo Winner.
Mobile-first, free to host. Registrations save to a Google Sheet + open on WhatsApp.

═══════════════════════════════════════════════════════
 WHAT YOU MUST DO (3 things)
═══════════════════════════════════════════════════════

## 1. Put your real QR code
Replace the file  public/upi-qr.png  with your own UPI QR image.
Keep the same name (upi-qr.png). That's the QR players scan to pay.

## 2. Set up the Google Sheet (so registrations get saved)
   a. Go to sheets.google.com → make a blank Sheet. Name it anything.
   b. Top menu: Extensions → Apps Script.
   c. Delete whatever code is there. Open the file  google-apps-script.js
      from this project, copy ALL of it, paste into Apps Script.
   d. Click Deploy (top right) → New deployment.
   e. Click the gear ⚙ → choose "Web app".
   f. Settings:
        Execute as:      Me
        Who has access:  Anyone
   g. Click Deploy. It asks for permission the first time → Allow.
   h. Copy the "Web app URL" it gives you (ends in /exec).

## 3. Add your details to the site
Open  app/page.tsx . At the very top edit:

    const WHATSAPP = "919876543210";   // your WhatsApp number (91 + number, no +)
    const SHEET_URL = "";              // paste the Web app URL from step 2h here

Save, then push to GitHub. Vercel redeploys automatically in ~1 minute.

═══════════════════════════════════════════════════════
 HOW A REGISTRATION FLOWS
═══════════════════════════════════════════════════════
Player picks a format → scans QR, pays ₹100 → fills form + uploads
payment screenshot → hits submit.
  • Their data + screenshot are saved to your Google Sheet / Drive.
  • WhatsApp also opens with their text details sent to your number.
    (The screenshot can't auto-attach to WhatsApp — but it's already in
     your Sheet's Drive folder "BGMI Payments", so you have it.)
You verify the payment and reply with the room ID before 8 PM.

═══════════════════════════════════════════════════════
 EDITING PRIZES / FEES LATER
═══════════════════════════════════════════════════════
In app/page.tsx, edit the FORMATS object near the top. All numbers live there.

═══════════════════════════════════════════════════════
 RUN LOCALLY (optional preview)
═══════════════════════════════════════════════════════
    npm install
    npm run dev      → http://localhost:3000
