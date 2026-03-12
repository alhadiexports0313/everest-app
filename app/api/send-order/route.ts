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

const buildRows = (items: OrderItem[], isUrdu: boolean) =>
  items
    .map((item) => {
      const subtotal = item.quantity * item.unitPricePkr;
      return `
        <tr>
          <td style="padding:12px 10px;border-bottom:1px solid #e7e2d9;">${escapeHtml(
            isUrdu ? "پریمیم ریزن جار" : "Premium Resin Jar"
          )} — ${escapeHtml(item.sizeLabel)}</td>
          <td style="padding:12px 10px;border-bottom:1px solid #e7e2d9;text-align:center;">${item.quantity}</td>
          <td style="padding:12px 10px;border-bottom:1px solid #e7e2d9;text-align:right;">${formatPkr(
            item.unitPricePkr
          )}</td>
          <td style="padding:12px 10px;border-bottom:1px solid #e7e2d9;text-align:right;">${formatPkr(
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
  const totalHeading = isUrdu ? "کل قیمت" : "TOTAL";
  const websiteHeading = isUrdu ? "ویب سائٹ" : "Website";
  const noteText = payload.note ? escapeHtml(payload.note).replace(/\n/g, "<br/>") : "—";
  const rowHtml = buildRows(payload.items, isUrdu);
  const dir = isUrdu ? "rtl" : "ltr";
  const alignStart = isUrdu ? "right" : "left";
  const alignEnd = isUrdu ? "left" : "right";
  return `
    <div style="margin:0;padding:24px;background:#f7f5f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;direction:${dir};">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e7e2d9;border-radius:16px;overflow:hidden;box-shadow:0 10px 35px rgba(16,24,40,0.08);">
        <div style="padding:22px 24px;background:linear-gradient(135deg,#faf7ef,#f3ecde);border-bottom:1px solid #e7e2d9;">
          <div style="font-size:22px;font-weight:700;letter-spacing:0.6px;color:#1f2937;text-align:center;">${heading}</div>
          <div style="margin-top:14px;display:flex;justify-content:space-between;font-size:13px;color:#4b5563;gap:12px;flex-wrap:wrap;">
            <span>${isUrdu ? "آرڈر آئی ڈی" : "Order ID"}: <strong>${escapeHtml(payload.orderId)}</strong></span>
            <span>${isUrdu ? "تاریخ" : "Date"}: ${dateText}</span>
            <span>${isUrdu ? "وقت" : "Time"}: ${timeText}</span>
          </div>
        </div>
        <div style="padding:22px 24px;">
          <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:10px;">${customerHeading}</div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
            <tr>
              <td style="padding:7px 0;text-align:${alignStart};">${isUrdu ? "نام" : "Name"}</td>
              <td style="padding:7px 0;text-align:${alignEnd};font-weight:600;">${escapeHtml(payload.customer.name)}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;text-align:${alignStart};">${isUrdu ? "فون نمبر" : "Phone"}</td>
              <td style="padding:7px 0;text-align:${alignEnd};font-weight:600;">${escapeHtml(payload.customer.phone)}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;text-align:${alignStart};">${isUrdu ? "ای میل" : "Email"}</td>
              <td style="padding:7px 0;text-align:${alignEnd};font-weight:600;">${escapeHtml(payload.customer.email)}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;text-align:${alignStart};">${isUrdu ? "شہر" : "City"}</td>
              <td style="padding:7px 0;text-align:${alignEnd};font-weight:600;">${escapeHtml(payload.customer.city)}</td>
            </tr>
          </table>
          <div style="height:1px;background:#ece7dd;margin:18px 0;"></div>
          <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:8px;">${notesHeading}</div>
          <div style="font-size:14px;line-height:1.6;color:#4b5563;">${noteText}</div>
          <div style="height:1px;background:#ece7dd;margin:18px 0;"></div>
          <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:10px;">${productsHeading}</div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
            <thead>
              <tr style="background:#faf7ef;">
                <th style="padding:11px 10px;text-align:${alignStart};font-weight:700;border-bottom:1px solid #e7e2d9;">${isUrdu ? "پروڈکٹ" : "Product"}</th>
                <th style="padding:11px 10px;text-align:center;font-weight:700;border-bottom:1px solid #e7e2d9;">${isUrdu ? "Qty" : "Qty"}</th>
                <th style="padding:11px 10px;text-align:right;font-weight:700;border-bottom:1px solid #e7e2d9;">${isUrdu ? "یونٹ قیمت" : "Unit Price"}</th>
                <th style="padding:11px 10px;text-align:right;font-weight:700;border-bottom:1px solid #e7e2d9;">${isUrdu ? "سب ٹوٹل" : "Subtotal"}</th>
              </tr>
            </thead>
            <tbody>${rowHtml}</tbody>
          </table>
          <div style="margin-top:16px;border-top:1px dashed #dacfb8;padding-top:12px;">
            <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:700;color:#111827;">
              <span>${totalHeading}</span>
              <span>${formatPkr(payload.totals.pkr)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-top:6px;">
              <span>USD</span>
              <span>${escapeHtml(payload.totals.usd || "N/A")}</span>
            </div>
          </div>
          <div style="height:1px;background:#ece7dd;margin:18px 0;"></div>
          <div style="font-size:12px;color:#6b7280;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <span>${websiteHeading}</span>
            <span>everestorganicshilajit.com</span>
          </div>
        </div>
      </div>
    </div>
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
