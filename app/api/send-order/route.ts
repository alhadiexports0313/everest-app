import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createHash } from "crypto";

type OrderItem = {
  sizeLabel: string;
  quantity: number;
  unitPricePkr: number;
};

type OrderPayload = {
  locale: "en" | "ur";
  orderId: string;
  createdAt: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
  };
  note?: string;
  items: OrderItem[];
  totals: {
    pkr: number;
    usd?: string | null;
  };
};

const resend = new Resend(process.env.RESEND_API_KEY);
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000;
const rateBucket = new Map<string, number[]>();
const duplicateBucket = new Map<string, number>();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const cleanText = (value: unknown, maxLength: number) =>
  String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const cleanMultiline = (value: unknown, maxLength: number) =>
  String(value ?? "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);

const getClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const existing = rateBucket.get(key) ?? [];
  const next = existing.filter((stamp) => stamp >= windowStart);
  if (next.length >= RATE_MAX) {
    rateBucket.set(key, next);
    return true;
  }
  next.push(now);
  rateBucket.set(key, next);
  return false;
};

const isDuplicate = (key: string) => {
  const now = Date.now();
  const seenAt = duplicateBucket.get(key);
  if (seenAt && now - seenAt < DUPLICATE_WINDOW_MS) {
    return true;
  }
  duplicateBucket.set(key, now);
  return false;
};

const formatPkr = (value: number) =>
  `PKR ${new Intl.NumberFormat("en-PK").format(Math.round(value))}`;

const formatUsd = (value: string | null | undefined) => {
  if (!value) return "N/A";
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
  if (!Number.isFinite(parsed)) return escapeHtml(String(value));
  return `$${parsed.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const buildRows = (items: OrderItem[], isUrdu: boolean) =>
  items
    .map((item, index) => {
      const subtotal = item.quantity * item.unitPricePkr;
      const rowBg = index % 2 === 0 ? "#ffffff" : "#f8f8f8";
      return `
        <tr style="background:${rowBg};">
          <td style="padding:12px 10px;border-bottom:1px solid #ece7dd;text-align:${
            isUrdu ? "right" : "left"
          };font-weight:600;color:#111827;">${escapeHtml(
            isUrdu ? "پریمیم ریزن جار" : "Premium Resin Jar"
          )}</td>
          <td style="padding:12px 10px;border-bottom:1px solid #ece7dd;text-align:center;color:#374151;">${escapeHtml(
            item.sizeLabel
          )}</td>
          <td style="padding:12px 10px;border-bottom:1px solid #ece7dd;text-align:center;color:#374151;">${
            item.quantity
          }</td>
          <td style="padding:12px 10px;border-bottom:1px solid #ece7dd;text-align:right;color:#374151;">${formatPkr(
            item.unitPricePkr
          )}</td>
          <td style="padding:12px 10px;border-bottom:1px solid #ece7dd;text-align:right;font-weight:600;color:#111827;">${formatPkr(
            subtotal
          )}</td>
        </tr>
      `;
    })
    .join("");

const buildTemplate = (payload: OrderPayload) => {
  const isUrdu = payload.locale === "ur";
  const dateLocale = isUrdu ? "ur-PK" : "en-GB";
  const createdAt = new Date(payload.createdAt);
  const dateText = createdAt.toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const timeText = createdAt.toLocaleTimeString(dateLocale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const heading = isUrdu ? "ایورسٹ آرگینک سلاجیت" : "EVEREST ORGANIC SHILAJIT";
  const customerHeading = isUrdu ? "کسٹمر" : "Customer Information";
  const notesHeading = isUrdu ? "آرڈر نوٹس" : "Order Notes";
  const productsHeading = isUrdu ? "پروڈکٹس" : "Products";
  const totalHeading = isUrdu ? "آرڈر ٹوٹل" : "Order Total";
  const websiteHeading = isUrdu ? "ویب سائٹ" : "Website";
  const tagline = isUrdu
    ? "قدرتی ہمالیائی طاقت"
    : "Premium Himalayan Wellness";
  const noteText = payload.note
    ? escapeHtml(payload.note).replace(/\n/g, "<br/>")
    : "";
  const rowHtml = buildRows(payload.items, isUrdu);
  const dir = isUrdu ? "rtl" : "ltr";
  const alignStart = isUrdu ? "right" : "left";
  const alignEnd = isUrdu ? "left" : "right";
  const notesSection = noteText
    ? `
        <tr>
          <td style="padding:0 24px 18px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#faf7ef;border:1px solid #e9dec7;border-radius:12px;">
              <tr>
                <td style="padding:14px 16px 8px 16px;font-size:14px;font-weight:700;color:#1f2937;text-align:${alignStart};">${notesHeading}</td>
              </tr>
              <tr>
                <td style="padding:0 16px 14px 16px;font-size:13px;line-height:1.7;color:#4b5563;text-align:${alignStart};">${noteText}</td>
              </tr>
            </table>
          </td>
        </tr>
      `
    : "";
  return `
    <!doctype html>
    <html lang="${isUrdu ? "ur" : "en"}" dir="${dir}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background:#f4f1ea;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f4f1ea;">
          <tr>
            <td align="center" style="padding:24px 12px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e8e2d6;box-shadow:0 10px 30px rgba(15,15,15,0.08);">
                <tr>
                  <td style="background:#0f0f0f;padding:26px 24px;text-align:center;">
                    <div style="font-size:22px;line-height:1.1;font-weight:800;color:#d9bf87;letter-spacing:4px;text-transform:uppercase;text-shadow:0 1px 0 rgba(0,0,0,0.85),0 2px 8px rgba(198,163,90,0.25);">~ EOS ~</div>
                    <div style="margin-top:10px;font-size:24px;line-height:1.25;font-weight:800;color:#f0dfb5;letter-spacing:2.6px;text-transform:uppercase;text-shadow:0 1px 0 rgba(0,0,0,0.9),0 2px 10px rgba(198,163,90,0.22);">${isUrdu ? "ایورسٹ آرگینک سلاجیت" : "Everest Organic Shilajit"}</div>
                    <div style="margin-top:8px;font-size:12px;line-height:1.6;color:#c6a35a;letter-spacing:1.2px;text-transform:uppercase;">${tagline}</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;border-collapse:collapse;">
                      <tr>
                        <td style="border-top:1px solid #3a3327;font-size:1px;line-height:1px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 24px 0 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #ebe6da;border-radius:12px;">
                      <tr>
                        <td style="padding:14px 16px 8px 16px;font-size:14px;font-weight:700;color:#111827;text-align:${alignStart};">${isUrdu ? "آرڈر سمری" : "Order Summary"}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 16px 14px 16px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#6b7280;text-align:${alignStart};">${isUrdu ? "آرڈر آئی ڈی" : "Order ID"}</td>
                              <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:700;text-align:${alignEnd};">${escapeHtml(payload.orderId)}</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#6b7280;text-align:${alignStart};">${isUrdu ? "تاریخ" : "Date"}</td>
                              <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;text-align:${alignEnd};">${dateText}</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#6b7280;text-align:${alignStart};">${isUrdu ? "وقت" : "Time"}</td>
                              <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;text-align:${alignEnd};">${timeText}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 16px 12px 16px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                            <tr><td style="border-top:1px solid #eee7da;font-size:1px;line-height:1px;">&nbsp;</td></tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 24px 0 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#fcfcfc;border:1px solid #ebe6da;border-radius:12px;">
                      <tr>
                        <td style="padding:14px 16px 8px 16px;font-size:14px;font-weight:700;color:#111827;text-align:${alignStart};">${customerHeading}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 16px 14px 16px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#6b7280;text-align:${alignStart};">${isUrdu ? "نام" : "Name"}</td>
                              <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;text-align:${alignEnd};">${escapeHtml(payload.customer.name)}</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#6b7280;text-align:${alignStart};">${isUrdu ? "فون نمبر" : "Phone"}</td>
                              <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;text-align:${alignEnd};">${escapeHtml(payload.customer.phone)}</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#6b7280;text-align:${alignStart};">${isUrdu ? "ای میل" : "Email"}</td>
                              <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;text-align:${alignEnd};">${escapeHtml(payload.customer.email)}</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#6b7280;text-align:${alignStart};">${isUrdu ? "شہر" : "City"}</td>
                              <td style="padding:6px 0;font-size:13px;color:#111827;font-weight:600;text-align:${alignEnd};">${escapeHtml(payload.customer.city)}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${notesSection}
                <tr>
                  <td style="padding:0 24px 0 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                      <tr><td style="padding-top:18px;font-size:14px;font-weight:700;color:#111827;text-align:${alignStart};">${productsHeading}</td></tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 24px 0 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;border:1px solid #ebe6da;border-radius:12px;overflow:hidden;">
                      <thead>
                        <tr style="background:#f6f1e7;">
                          <th style="padding:11px 10px;text-align:${alignStart};font-size:12px;color:#1f2937;font-weight:700;border-bottom:1px solid #e8dfce;">${isUrdu ? "پروڈکٹ" : "Product"}</th>
                          <th style="padding:11px 10px;text-align:center;font-size:12px;color:#1f2937;font-weight:700;border-bottom:1px solid #e8dfce;">${isUrdu ? "سائز" : "Size"}</th>
                          <th style="padding:11px 10px;text-align:center;font-size:12px;color:#1f2937;font-weight:700;border-bottom:1px solid #e8dfce;">${isUrdu ? "مقدار" : "Quantity"}</th>
                          <th style="padding:11px 10px;text-align:right;font-size:12px;color:#1f2937;font-weight:700;border-bottom:1px solid #e8dfce;">${isUrdu ? "یونٹ قیمت" : "Unit Price"}</th>
                          <th style="padding:11px 10px;text-align:right;font-size:12px;color:#1f2937;font-weight:700;border-bottom:1px solid #e8dfce;">${isUrdu ? "سب ٹوٹل" : "Subtotal"}</th>
                        </tr>
                      </thead>
                      <tbody>${rowHtml}</tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 24px 24px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #e7dcc4;border-radius:12px;">
                      <tr>
                        <td style="padding:14px 16px 0 16px;text-align:center;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                            <tr><td style="border-top:2px solid #c6a35a;font-size:1px;line-height:1px;">&nbsp;</td></tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 16px 4px 16px;font-size:16px;font-weight:700;color:#111827;text-align:center;">${totalHeading}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 16px 4px 16px;font-size:15px;font-weight:700;color:#111827;text-align:center;">PKR: ${formatPkr(payload.totals.pkr)}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 16px 14px 16px;font-size:13px;color:#6b7280;text-align:center;">USD: ${formatUsd(
                          payload.totals.usd
                        )}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background:#0f0f0f;padding:22px 24px;text-align:center;">
                    <div style="font-size:15px;line-height:1.5;font-weight:700;color:#ffffff;">${heading}</div>
                    <div style="font-size:12px;line-height:1.6;color:#c6a35a;margin-top:3px;">${tagline}</div>
                    <div style="font-size:12px;line-height:1.7;color:#d1d5db;margin-top:14px;">${websiteHeading}</div>
                    <div style="font-size:13px;line-height:1.7;color:#ffffff;">everestorganicshilajit.com</div>
                    <div style="font-size:12px;line-height:1.7;color:#9ca3af;margin-top:12px;">${
                      isUrdu
                        ? "آپ کے آرڈر کا شکریہ۔ ہماری ٹیم جلد آپ سے رابطہ کرے گی۔"
                        : "Thank you for your order. Our team will contact you shortly."
                    }</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

const validatePayload = (body: unknown): OrderPayload | null => {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const locale = raw.locale === "ur" ? "ur" : "en";
  const orderId = cleanText(raw.orderId, 64);
  const createdAt = Number(raw.createdAt);
  const customerRaw =
    raw.customer && typeof raw.customer === "object"
      ? (raw.customer as Record<string, unknown>)
      : null;
  const name = cleanText(customerRaw?.name, 120);
  const phone = cleanText(customerRaw?.phone, 40);
  const email = cleanText(customerRaw?.email, 160).toLowerCase();
  const city = cleanText(customerRaw?.city, 160);
  const note = cleanMultiline(raw.note, 1500);
  const itemsRaw = Array.isArray(raw.items) ? raw.items : [];
  const items: OrderItem[] = itemsRaw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const obj = item as Record<string, unknown>;
      const sizeLabel = cleanText(obj.sizeLabel, 80);
      const quantity = Number(obj.quantity);
      const unitPricePkr = Number(obj.unitPricePkr);
      if (!sizeLabel || !Number.isFinite(quantity) || !Number.isFinite(unitPricePkr)) {
        return null;
      }
      return {
        sizeLabel,
        quantity: Math.floor(quantity),
        unitPricePkr: Math.floor(unitPricePkr),
      };
    })
    .filter((item): item is OrderItem => Boolean(item));
  const totalsRaw =
    raw.totals && typeof raw.totals === "object"
      ? (raw.totals as Record<string, unknown>)
      : {};
  const totalPkr = Number(totalsRaw.pkr);
  const totalUsd = cleanText(totalsRaw.usd, 40);
  if (!orderId || !Number.isFinite(createdAt) || !name || !phone || !email || !city) {
    return null;
  }
  if (!emailRegex.test(email)) return null;
  if (items.length === 0) return null;
  if (!Number.isFinite(totalPkr) || totalPkr <= 0) return null;
  const hasInvalidQty = items.some((item) => item.quantity < 1 || item.quantity > 500);
  if (hasInvalidQty) return null;
  return {
    locale,
    orderId,
    createdAt,
    customer: {
      name,
      phone,
      email,
      city,
    },
    note,
    items,
    totals: {
      pkr: Math.floor(totalPkr),
      usd: totalUsd || null,
    },
  };
};

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }
  const ipKey = getClientIp(request);
  if (isRateLimited(ipKey)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
  const body = await request.json().catch(() => null);
  const payload = validatePayload(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Invalid order payload." },
      { status: 400 }
    );
  }
  const duplicateKey = createHash("sha256")
    .update(
      `${payload.orderId}|${payload.customer.email}|${JSON.stringify(payload.items)}|${payload.totals.pkr}`
    )
    .digest("hex");
  if (isDuplicate(duplicateKey)) {
    return NextResponse.json({ error: "Duplicate order request." }, { status: 409 });
  }
  const subject =
    payload.locale === "ur"
      ? `نیا آرڈر — ${payload.orderId}`
      : `New Order – Everest Organic Shilajit (${payload.orderId})`;
  const html = buildTemplate(payload);
  const { error } = await resend.emails.send({
    from: "Everest Organic Shilajit <onboarding@resend.dev>",
    to: ["everestorganicshilajet@gmail.com"],
    subject,
    html,
  });
  if (error) {
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true });
}
