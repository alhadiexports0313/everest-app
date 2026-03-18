import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  fullName: string;
  email: string;
  subject?: string;
  message: string;
  phone?: string;
  orderId?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let payload: ContactPayload | null = null;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = cleanText(payload.fullName, 100);
  const email = cleanText(payload.email, 200);
  const subject = cleanText(payload.subject, 120);
  const message = cleanMultiline(payload.message, 2000);
  const phone = cleanText(payload.phone, 40);
  const orderId = cleanText(payload.orderId, 80);

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const subjectLine = subject || "General Inquiry";
  const textBody = [
    `Full Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone || "N/A"}`,
    `Order ID: ${orderId || "N/A"}`,
    `Subject: ${subjectLine}`,
    "Message:",
    message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: "Everest Organic Shilajit <onboarding@resend.dev>",
    to: ["everestorganicshilajet@gmail.com"],
    subject: `Contact Form – ${subjectLine}`,
    text: textBody,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
