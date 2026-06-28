import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── App Router handler ────────────────────────────────────────────────────────
// NOTE: This route uses FormData (multipart) instead of JSON so file
// attachments can be forwarded directly to the team email.
//
// .env.local required:
//   GMAIL_USER=ravanatecsolutions@gmail.com
//   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
// ──────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name        = (formData.get("name")        as string | null) ?? "";
    const email       = (formData.get("email")       as string | null) ?? "";
    const whatsapp    = (formData.get("whatsapp")    as string | null) ?? "";
    const description = (formData.get("description") as string | null) ?? "";
    const servicesRaw = (formData.get("services")    as string | null) ?? "[]";
    const file        =  formData.get("attachment")  as File | null;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required." },
        { status: 400 }
      );
    }

    let services: string[] = [];
    try { services = JSON.parse(servicesRaw); } catch { /* ignore */ }

    // ── Nodemailer transporter ─────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // ── Optional: convert uploaded File → nodemailer attachment ───────────
    type MailAttachment = { filename: string; content: Buffer; contentType: string };
    let attachments: MailAttachment[] = [];
    let attachmentNote = "";

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      attachments = [
        {
          filename: file.name,
          content: Buffer.from(arrayBuffer),
          contentType: file.type,
        },
      ];
      attachmentNote = `
        <div class="row">
          <div class="lbl">Attachment</div>
          <div class="val" style="display:inline-flex;align-items:center;gap:8px;">
            <span style="color:#00E5CC;">&#128206;</span>
            ${escapeHtml(file.name)}
            <span style="color:#2A4060;font-size:11px;">(${(file.size / 1024).toFixed(1)} KB)</span>
          </div>
        </div>`;
    }

    // ── Email to Ravana Tech team ──────────────────────────────────────────
    const mailToTeam = {
      from: `"Ravana Tech Solutions" <${process.env.GMAIL_USER}>`,
      to: "ravanatecsolutions@gmail.com",
      replyTo: email,
      subject: `[New Inquiry] ${name} — Project Request`,
      attachments,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body  { margin: 0; padding: 0; background: #020810; font-family: 'Helvetica Neue', Arial, sans-serif; }
              .wrap { max-width: 580px; margin: 40px auto; background: #070f1c; border: 1px solid #0d2035; border-radius: 16px; overflow: hidden; }
              .hdr  { background: linear-gradient(135deg, #020810 0%, #0a1929 100%); padding: 36px 40px 28px; border-bottom: 1px solid #0d2035; position: relative; }
              .hdr-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #00E5CC, #7B61FF, transparent); }
              .badge { display: inline-block; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #00E5CC; background: rgba(0,229,204,0.08); border: 1px solid rgba(0,229,204,0.2); border-radius: 100px; padding: 4px 12px; margin-bottom: 12px; }
              .brand { font-size: 26px; font-weight: 800; color: #E0EFFF; letter-spacing: 0.02em; }
              .body { padding: 32px 40px; }
              .row  { margin-bottom: 24px; }
              .lbl  { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #2A4060; margin-bottom: 6px; font-family: monospace; }
              .val  { font-size: 14px; color: #7A9ABE; line-height: 1.6; }
              .val a { color: #00E5CC; text-decoration: none; }
              .msg  { background: #020810; border: 1px solid #0d2035; padding: 18px 20px; border-radius: 10px; border-left: 3px solid #00E5CC; }
              .chip { display: inline-block; font-size: 11px; color: #00E5CC; background: rgba(0,229,204,0.08); border: 1px solid rgba(0,229,204,0.2); border-radius: 6px; padding: 3px 10px; margin: 2px; font-family: monospace; }
              .ftr  { padding: 20px 40px; border-top: 1px solid #0d2035; }
              .ftr p { font-size: 11px; color: #1A2D40; letter-spacing: 0.08em; margin: 0; }
            </style>
          </head>
          <body>
            <div class="wrap">
              <div class="hdr">
                <div class="hdr-accent"></div>
                <div class="badge">New Inquiry</div>
                <div class="brand">Ravana Tech</div>
              </div>
              <div class="body">
                <div class="row">
                  <div class="lbl">Full Name</div>
                  <div class="val">${escapeHtml(name)}</div>
                </div>
                <div class="row">
                  <div class="lbl">Email Address</div>
                  <div class="val"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
                </div>
                ${whatsapp ? `
                <div class="row">
                  <div class="lbl">WhatsApp</div>
                  <div class="val"><a href="https://wa.me/${escapeHtml(whatsapp.replace(/\D/g, ''))}">${escapeHtml(whatsapp)}</a></div>
                </div>` : ""}
                <div class="row">
                  <div class="lbl">Services Requested</div>
                  <div class="val">${services.length ? services.map(s => `<span class="chip">${escapeHtml(s)}</span>`).join("") : '<span style="color:#1A2D40">Not specified</span>'}</div>
                </div>
                ${description ? `
                <div class="row">
                  <div class="lbl">Project Details</div>
                  <div class="val msg">${escapeHtml(description).replace(/\n/g, "<br/>")}</div>
                </div>` : ""}
                ${attachmentNote}
              </div>
              <div class="ftr">
                <p>Sent via ravanatecsolutions.com &nbsp;&middot;&nbsp; Reply directly to respond to ${escapeHtml(name)}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // ── Auto-reply to the client ───────────────────────────────────────────
    const mailToClient = {
      from: `"Ravana Tech Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your message — Ravana Tech Solutions",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body  { margin: 0; padding: 0; background: #020810; font-family: 'Helvetica Neue', Arial, sans-serif; }
              .wrap { max-width: 580px; margin: 40px auto; background: #070f1c; border: 1px solid #0d2035; border-radius: 16px; overflow: hidden; }
              .hdr  { background: linear-gradient(135deg, #020810 0%, #0a1929 100%); padding: 36px 40px 28px; border-bottom: 1px solid #0d2035; position: relative; }
              .hdr-accent { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #00E5CC, #7B61FF, transparent); }
              .badge { display: inline-block; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #00E5CC; background: rgba(0,229,204,0.08); border: 1px solid rgba(0,229,204,0.2); border-radius: 100px; padding: 4px 12px; margin-bottom: 12px; }
              .brand { font-size: 26px; font-weight: 800; color: #E0EFFF; letter-spacing: 0.02em; }
              .body { padding: 36px 40px; }
              .p    { font-size: 14px; color: #4A6080; line-height: 1.9; margin-bottom: 16px; }
              .highlight { color: #7A9ABE; }
              .summary { background: #020810; border: 1px solid #0d2035; border-radius: 10px; padding: 18px 20px; margin-bottom: 24px; }
              .s-row { display: flex; gap: 12px; margin-bottom: 10px; font-size: 13px; }
              .s-lbl { color: #2A4060; font-family: monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; min-width: 100px; padding-top: 2px; flex-shrink: 0; }
              .s-val { color: #7A9ABE; }
              .chip { display: inline-block; font-size: 11px; color: #00E5CC; background: rgba(0,229,204,0.08); border: 1px solid rgba(0,229,204,0.2); border-radius: 6px; padding: 3px 10px; margin: 2px; font-family: monospace; }
              .ftr  { padding: 20px 40px; border-top: 1px solid #0d2035; }
              .ftr p { font-size: 11px; color: #1A2D40; letter-spacing: 0.08em; margin: 0; }
            </style>
          </head>
          <body>
            <div class="wrap">
              <div class="hdr">
                <div class="hdr-accent"></div>
                <div class="badge">Message Received</div>
                <div class="brand">Ravana Tech</div>
              </div>
              <div class="body">
                <p class="p">Hey <span class="highlight">${escapeHtml(name)}</span>,</p>
                <p class="p">Thanks for reaching out! We've received your inquiry and our team will review it shortly. Expect to hear from us <span class="highlight">within 24 hours</span>.</p>

                <div class="summary">
                  ${services.length ? `
                  <div class="s-row">
                    <div class="s-lbl">Services</div>
                    <div class="s-val">${services.map(s => `<span class="chip">${escapeHtml(s)}</span>`).join("")}</div>
                  </div>` : ""}
                  ${whatsapp ? `
                  <div class="s-row">
                    <div class="s-lbl">WhatsApp</div>
                    <div class="s-val">${escapeHtml(whatsapp)}</div>
                  </div>` : ""}
                  ${file && file.size > 0 ? `
                  <div class="s-row">
                    <div class="s-lbl">Attachment</div>
                    <div class="s-val">&#128206; ${escapeHtml(file.name)} received</div>
                  </div>` : ""}
                </div>

                <p class="p">In the meantime, feel free to reach out via WhatsApp or connect with us on social media.</p>
                <p class="p" style="color:#1A2D40;font-size:12px;">— Ravana Tech Solutions Team</p>
              </div>
              <div class="ftr">
                <p>&copy; ${new Date().getFullYear()} Ravana Tech Solutions. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await Promise.all([
      transporter.sendMail(mailToTeam),
      transporter.sendMail(mailToClient),
    ]);

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Error:", err);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// ── HTML escape helper ────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}