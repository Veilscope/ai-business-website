import nodemailer from "nodemailer";

import { brand } from "@/config/brand";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  textNumber?: unknown;
  company?: unknown;
  role?: unknown;
  businessType?: unknown;
  teamSize?: unknown;
  interest?: unknown;
  message?: unknown;
  contactMethod?: unknown;
  website?: unknown;
  formStartedAt?: unknown;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

const MAX_BODY_BYTES = 12_000;
const MIN_FORM_TIME_MS = 3_000;
const MAX_FORM_TIME_MS = 24 * 60 * 60 * 1_000;
const IP_WINDOW_MS = 15 * 60 * 1_000;
const EMAIL_WINDOW_MS = 60 * 60 * 1_000;
const MAX_PER_IP = 3;
const MAX_PER_EMAIL = 2;
const FIELD_LIMITS = {
  name: 120,
  email: 180,
  textNumber: 20,
  company: 120,
  role: 120,
  businessType: 120,
  teamSize: 60,
  interest: 120,
  message: 1_200,
  contactMethod: 20,
} as const;
const TEAM_SIZE_OPTIONS = [
  "1-5",
  "6-10",
  "11-25",
  "26-50",
  "51-100",
  "101-250",
  "251+",
];

const globalForContact = globalThis as typeof globalThis & {
  contactRateBuckets?: Map<string, RateBucket>;
};

const rateBuckets =
  globalForContact.contactRateBuckets ?? new Map<string, RateBucket>();

globalForContact.contactRateBuckets = rateBuckets;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json(
      { message: "This message is too large to send." },
      { status: 413 },
    );
  }

  if (!isSameOrigin(request)) {
    return Response.json(
      { message: "This request could not be verified." },
      { status: 403 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { message: "Send the form as valid JSON." },
      { status: 400 },
    );
  }

  if (asString(payload.website)) {
    return Response.json({ message: "Message received." });
  }

  const formStartedAt = Number(payload.formStartedAt);
  const formAgeMs = Date.now() - formStartedAt;
  if (
    !Number.isFinite(formStartedAt) ||
    formAgeMs < MIN_FORM_TIME_MS ||
    formAgeMs > MAX_FORM_TIME_MS
  ) {
    return Response.json(
      { message: "Please wait a moment and try sending the form again." },
      { status: 400 },
    );
  }

  const submission = normalizePayload(payload);
  const fieldErrors = validateSubmission(submission);
  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      {
        message: "Please fix the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(`ip:${ip}`, MAX_PER_IP, IP_WINDOW_MS)) {
    return Response.json(
      { message: "Too many messages were sent recently. Try again later." },
      { status: 429 },
    );
  }

  if (
    isRateLimited(
      `email:${submission.email.toLowerCase()}`,
      MAX_PER_EMAIL,
      EMAIL_WINDOW_MS,
    )
  ) {
    return Response.json(
      { message: "Too many messages were sent from this email recently." },
      { status: 429 },
    );
  }

  const transportConfig = getTransportConfig();
  if (!transportConfig) {
    return Response.json(
      { message: "Email delivery is not configured yet." },
      { status: 500 },
    );
  }

  try {
    const transporter = nodemailer.createTransport(transportConfig.smtp);
    const emailSubmission = {
      ...submission,
      textNumber: formatUsPhoneNumber(submission.textNumber) || "",
    };

    await transporter.sendMail({
      from: transportConfig.from,
      to: transportConfig.to,
      replyTo: submission.email,
      subject: `New AI Training Denver inquiry from ${submission.name}`,
      text: buildTextEmail(emailSubmission, ip),
      html: buildHtmlEmail(emailSubmission, ip),
    });

    return Response.json({
      message: "Thanks. Your message was sent to AI Training Denver.",
    });
  } catch (error) {
    console.error("Contact form email failed", error);
    return Response.json(
      { message: "The message could not be sent. Please email us directly." },
      { status: 500 },
    );
  }
}

type NormalizedSubmission = ReturnType<typeof normalizePayload>;

function normalizePayload(payload: ContactPayload) {
  return {
    name: trimText(payload.name),
    email: trimText(payload.email),
    textNumber: trimText(payload.textNumber),
    company: trimText(payload.company),
    role: trimText(payload.role),
    businessType: trimText(payload.businessType),
    teamSize: trimText(payload.teamSize),
    interest: trimText(payload.interest),
    message: trimText(payload.message),
    contactMethod: trimText(payload.contactMethod) || "Email",
  };
}

function validateSubmission(submission: NormalizedSubmission) {
  const errors: Partial<Record<keyof NormalizedSubmission, string>> = {};

  validateFieldLengths(submission, errors);

  if (!submission.name) errors.name = "Name is required.";
  if (!submission.email) {
    errors.email = "Email is required.";
  } else if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!submission.interest) errors.interest = "Choose an area of interest.";
  if (
    submission.teamSize &&
    !errors.teamSize &&
    !TEAM_SIZE_OPTIONS.includes(submission.teamSize)
  ) {
    errors.teamSize = "Choose a team size from the list.";
  }
  if (!["Email", "Text"].includes(submission.contactMethod)) {
    errors.contactMethod = "Choose email or text.";
  }
  if (submission.contactMethod === "Text" && !submission.textNumber) {
    errors.textNumber = "Add a mobile number if text is preferred.";
  } else if (
    submission.textNumber &&
    !errors.textNumber &&
    !formatUsPhoneNumber(submission.textNumber)
  ) {
    errors.textNumber = "Enter a valid US phone number.";
  }
  if (!submission.message) {
    errors.message = "Share a short note about what you need.";
  }

  return errors;
}

function validateFieldLengths(
  submission: NormalizedSubmission,
  errors: Partial<Record<keyof NormalizedSubmission, string>>,
) {
  const labels: Record<keyof NormalizedSubmission, string> = {
    name: "Name",
    email: "Email",
    textNumber: "Text number",
    company: "Company",
    role: "Role/title",
    businessType: "Business type",
    teamSize: "Team size",
    interest: "Interest",
    message: "Message",
    contactMethod: "Contact method",
  };

  for (const field of Object.keys(FIELD_LIMITS) as Array<keyof NormalizedSubmission>) {
    const maxLength = FIELD_LIMITS[field];
    if (submission[field].length > maxLength) {
      errors[field] = `${labels[field]} must be ${maxLength} characters or fewer.`;
    }
  }
}

function isRateLimited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = rateBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    cleanupRateBuckets(now);
    return false;
  }

  current.count += 1;
  return current.count > max;
}

function cleanupRateBuckets(now: number) {
  if (rateBuckets.size < 1_000) return;

  for (const [key, bucket] of rateBuckets.entries()) {
    if (bucket.resetAt <= now) rateBuckets.delete(key);
  }
}

function getTransportConfig() {
  const host = envValue("CONTACT_SMTP_HOST", "SMTP_HOST");
  const port = Number(envValue("CONTACT_SMTP_PORT", "SMTP_PORT"));
  const user = envValue("CONTACT_SMTP_USER", "SMTP_USER");
  const pass = envValue("CONTACT_SMTP_PASS", "SMTP_PASS");

  if (!host || !Number.isFinite(port) || !user || !pass) return null;

  const secureValue = envValue("CONTACT_SMTP_SECURE", "SMTP_SECURE");

  return {
    from: envValue("CONTACT_SMTP_FROM") || legacyFromAddress(user),
    to: envValue("CONTACT_TO_EMAIL", "SUPPORT_TO") || brand.contact.email,
    smtp: {
      host,
      port,
      secure:
        secureValue === "true" ||
        (secureValue === undefined && port === 465),
      auth: {
        user,
        pass,
      },
    },
  };
}

function legacyFromAddress(fallbackUser: string) {
  const fromEmail = envValue("FROM_EMAIL");
  const fromName = envValue("FROM_NAME");

  if (fromEmail && fromName) return `${fromName} <${fromEmail}>`;
  if (fromEmail) return fromEmail;

  return `AI Training Denver <${fallbackUser}>`;
}

function envValue(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }

  return undefined;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function getClientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function trimText(value: unknown) {
  return asString(value).trim();
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function formatUsPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  const nationalDigits =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (nationalDigits.length !== 10) return null;

  const areaCode = nationalDigits.slice(0, 3);
  const exchange = nationalDigits.slice(3, 6);
  const lineNumber = nationalDigits.slice(6);
  const startsWithValidDigit = /^[2-9]/;

  if (
    !startsWithValidDigit.test(areaCode) ||
    !startsWithValidDigit.test(exchange)
  ) {
    return null;
  }

  return `(${areaCode})-${exchange}-${lineNumber}`;
}

function buildTextEmail(submission: NormalizedSubmission, ip: string) {
  return [
    "New contact form submission",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Text number: ${submission.textNumber || "Not provided"}`,
    `Company: ${submission.company || "Not provided"}`,
    `Role/title: ${submission.role || "Not provided"}`,
    `Business type: ${submission.businessType || "Not provided"}`,
    `Team size: ${submission.teamSize || "Not provided"}`,
    `Interest: ${submission.interest}`,
    `Preferred contact method: ${submission.contactMethod}`,
    `Source IP: ${ip}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");
}

function buildHtmlEmail(submission: NormalizedSubmission, ip: string) {
  const rows = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Text number", submission.textNumber || "Not provided"],
    ["Company", submission.company || "Not provided"],
    ["Role/title", submission.role || "Not provided"],
    ["Business type", submission.businessType || "Not provided"],
    ["Team size", submission.teamSize || "Not provided"],
    ["Interest", submission.interest],
    ["Preferred contact method", submission.contactMethod],
    ["Source IP", ip],
  ];

  return `
    <h2>New contact form submission</h2>
    <table cellpadding="8" cellspacing="0" border="0">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td><strong>${escapeHtml(label)}</strong></td>
              <td>${escapeHtml(value)}</td>
            </tr>
          `,
        )
        .join("")}
    </table>
    <h3>Message</h3>
    <p>${escapeHtml(submission.message).replace(/\n/g, "<br>")}</p>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
