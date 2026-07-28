/**
 * BGMI KILL CASH — Google Sheet backend
 * ---------------------------------------
 * This code runs on Google, NOT in your website.
 * It receives each registration and saves it to your Sheet,
 * and saves the payment screenshot to a Drive folder.
 *
 * SETUP (full steps are in README.md → "Google Sheet setup"):
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script. Delete anything there, paste THIS whole file.
 * 3. Deploy → New deployment → Web app → Execute as: Me →
 *    Who has access: Anyone → Deploy. Copy the Web App URL.
 * 4. Paste that URL into app/page.tsx as SHEET_URL, then push to GitHub.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registrations")
             || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Registrations");

    // Add header row once
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Match", "Name", "BGMI ID", "IGN",
        "Phone", "Email", "City", "Txn ID", "Screenshot"
      ]);
    }

    // Save the screenshot to Drive and get a link
    var screenshotLink = "";
    if (data.screenshot) {
      try {
        var parts = data.screenshot.split(",");
        var contentType = parts[0].match(/:(.*?);/)[1];
        var bytes = Utilities.base64Decode(parts[1]);
        var blob = Utilities.newBlob(bytes, contentType, data.screenshotName || "payment.png");

        // Put screenshots in a folder called "BGMI Payments"
        var folders = DriveApp.getFoldersByName("BGMI Payments");
        var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder("BGMI Payments");
        var file = folder.createFile(blob);
        file.setName((data.name || "player") + " - " + new Date().toISOString());
        screenshotLink = file.getUrl();
      } catch (imgErr) {
        screenshotLink = "ERROR saving image: " + imgErr;
      }
    }

    sheet.appendRow([
      new Date(),
      data.match || "",
      data.name || "",
      data.bgmiId || "",
      data.ign || "",
      data.phone || "",
      data.email || "",
      data.city || "",
      data.txnId || "",
      screenshotLink
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
