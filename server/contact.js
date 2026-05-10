import nodemailer from "nodemailer";

const REQUIRED_FIELDS = [
  "email",
  "name",
  "organisationName",
  "numberOfStudents",
  "contactNumber",
];

class ContactError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = "ContactError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const splitRecipients = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const splitOrigins = (value = "") =>
  value
    .split(",")
    .map((item) => item.trim().replace(/\/$/, ""))
    .filter(Boolean);

const defaultAllowedOrigins = (env) => [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4174",
  "http://127.0.0.1:4174",
  env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "",
  env.VERCEL_BRANCH_URL ? `https://${env.VERCEL_BRANCH_URL}` : "",
  env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "",
].filter(Boolean);

const getAllowedOrigins = (env) => [
  ...defaultAllowedOrigins(env),
  ...splitOrigins(env.CORS_ORIGIN),
  ...splitOrigins(env.CORS_ORIGINS),
];

const isSameHost = (origin, host) => {
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

const applyCorsHeaders = (req, res, env = process.env) => {
  const origin = req.headers?.origin?.replace(/\/$/, "");
  const host = req.headers?.host;
  const allowedOrigins = getAllowedOrigins(env);
  const allowAll = allowedOrigins.includes("*");
  const isAllowed =
    !origin ||
    allowAll ||
    allowedOrigins.includes(origin) ||
    isSameHost(origin, host);

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (origin && isAllowed) {
    res.setHeader("Access-Control-Allow-Origin", allowAll ? "*" : origin);
  }

  return isAllowed;
};

const normalizeContactPayload = (body = {}) => ({
  email: String(body.email ?? "").trim(),
  name: String(body.name ?? "").trim(),
  organisationName: String(body.organisationName ?? "").trim(),
  numberOfStudents: String(body.numberOfStudents ?? "").trim(),
  contactNumber: String(body.contactNumber ?? "").trim(),
});

const validateContactPayload = (body) => {
  const contact = normalizeContactPayload(body);
  const errors = {};

  REQUIRED_FIELDS.forEach((field) => {
    if (!contact[field]) errors[field] = "Required";
  });

  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.email = "Enter a valid email address";
  }

  const students = Number(contact.numberOfStudents);
  if (
    contact.numberOfStudents &&
    (!Number.isInteger(students) || students < 1)
  ) {
    errors.numberOfStudents = "Enter a positive whole number";
  }

  if (
    contact.contactNumber &&
    !/^[+()\d\s-]{7,20}$/.test(contact.contactNumber)
  ) {
    errors.contactNumber = "Enter a valid contact number";
  }

  if (Object.keys(errors).length > 0) {
    throw new ContactError("Please check the form fields.", 400, errors);
  }

  return {
    ...contact,
    numberOfStudents: students,
  };
};

const getMailConfig = (env) => {
  const missing = ["SMTP_USER", "SMTP_APP_PASSWORD", "SEND_TO"].filter(
    (key) => !env[key],
  );

  if (missing.length > 0) {
    throw new ContactError(
      `Contact form email is not configured. Missing: ${missing.join(", ")}`,
      500,
    );
  }

  const recipients = splitRecipients(env.SEND_TO);
  if (recipients.length === 0) {
    throw new ContactError("Contact form email recipients are not configured.", 500);
  }

  const port = Number(env.SMTP_PORT ?? 465);

  return {
    user: env.SMTP_USER,
    password: env.SMTP_APP_PASSWORD,
    fromName: env.SMTP_FROM_NAME || "Evolveus",
    recipients,
    host: env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure:
      env.SMTP_SECURE === undefined
        ? port === 465
        : env.SMTP_SECURE === "true",
  };
};

const emailFieldRows = (fields) =>
  fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 14px 16px; border-bottom: 1px solid #d6cdb8; color: #6b6e73; font-size: 12px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; width: 42%;">
            ${label}
          </td>
          <td style="padding: 14px 16px; border-bottom: 1px solid #d6cdb8; color: #15171a; font-size: 15px; font-weight: 600;">
            ${escapeHtml(value)}
          </td>
        </tr>
      `,
    )
    .join("");

const emailShell = ({ eyebrow, title, intro, body, footer }) => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin: 0; padding: 0; background: #f1ebde;">
      <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent;">
        ${escapeHtml(intro)}
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f1ebde; border-collapse: collapse; width: 100%;">
        <tr>
          <td align="center" style="padding: 32px 14px;">
            <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width: 100%; max-width: 640px; border-collapse: collapse; background: #f7f3ea; border: 1px solid #c4b89e;">
              <tr>
                <td style="padding: 26px 30px 18px; border-bottom: 4px solid #15171a;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                    <tr>
                      <td>
                        <div style="font-family: Georgia, 'Times New Roman', serif; color: #1f4e2c; font-size: 28px; font-weight: 700; line-height: 1;">
                          Evolveus
                        </div>
                        <div style="font-family: Arial, sans-serif; color: #6b6e73; font-size: 10px; font-weight: 700; letter-spacing: 2px; margin-top: 6px; text-transform: uppercase;">
                          Digital Assessment
                        </div>
                      </td>
                      <td align="right" style="font-family: Arial, sans-serif; color: #6b6e73; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                        Est. 2024
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 34px 30px 20px;">
                  <div style="font-family: Arial, sans-serif; color: #8b3a1a; font-size: 11px; font-weight: 700; letter-spacing: 2.2px; text-transform: uppercase; margin-bottom: 18px;">
                    ${escapeHtml(eyebrow)}
                  </div>
                  <h1 style="font-family: Georgia, 'Times New Roman', serif; color: #15171a; font-size: 34px; font-weight: 700; line-height: 1.05; letter-spacing: -1px; margin: 0 0 18px;">
                    ${escapeHtml(title)}
                  </h1>
                  <p style="font-family: Arial, sans-serif; color: #3a3d42; font-size: 16px; line-height: 1.65; margin: 0;">
                    ${intro}
                  </p>
                </td>
              </tr>
              ${body}
              <tr>
                <td style="padding: 26px 30px 30px;">
                  <div style="height: 1px; background: #d6cdb8; margin-bottom: 18px;"></div>
                  <p style="font-family: Arial, sans-serif; color: #6b6e73; font-size: 12px; line-height: 1.6; margin: 0;">
                    ${footer}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

const leadEmailHtml = (contact) => `
  ${emailShell({
    eyebrow: "Schedule a demonstration",
    title: "New demo request",
    intro:
      "A new institution has submitted the Evolveus demonstration form. The submitted details are listed below.",
    body: `
      <tr>
        <td style="padding: 8px 30px 28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background: #faf6ec; border: 1px solid #c4b89e;">
            <tbody>
              ${emailFieldRows([
                ["Name", contact.name],
                ["Email", contact.email],
                ["Organisation", contact.organisationName],
                ["Number of students", contact.numberOfStudents],
                ["Contact number", contact.contactNumber],
              ])}
            </tbody>
          </table>
        </td>
      </tr>
    `,
    footer:
      "Replying to this email will respond directly to the contact email submitted in the form.",
  })}
`;

const acknowledgementHtml = (contact) => `
  ${emailShell({
    eyebrow: "Request received",
    title: "We received your demo request",
    intro: `Hi ${escapeHtml(contact.name)}, thank you for contacting Evolveus. We received your request for <strong style="color: #15171a;">${escapeHtml(contact.organisationName)}</strong> and our team will get back to you shortly.`,
    body: `
      <tr>
        <td style="padding: 8px 30px 8px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background: #e3ecdf; border: 1px solid rgba(31, 78, 44, .22);">
            <tr>
              <td style="padding: 18px 20px;">
                <div style="font-family: Arial, sans-serif; color: #1f4e2c; font-size: 12px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; margin-bottom: 8px;">
                  What happens next
                </div>
                <div style="font-family: Arial, sans-serif; color: #3a3d42; font-size: 15px; line-height: 1.65;">
                  We will review your institution size, assessment needs, and contact details before scheduling a focused walkthrough.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 30px 26px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background: #faf6ec; border: 1px solid #c4b89e;">
            <tbody>
              ${emailFieldRows([
                ["Organisation", contact.organisationName],
                ["Number of students", contact.numberOfStudents],
                ["Contact number", contact.contactNumber],
              ])}
            </tbody>
          </table>
        </td>
      </tr>
    `,
    footer: "Regards,<br />The Evolveus team",
  })}
`;

export const sendContactEmails = async (body, env = process.env) => {
  const contact = validateContactPayload(body);
  const config = getMailConfig(env);
  const from = `"${config.fromName.replaceAll('"', "'")}" <${config.user}>`;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.password,
    },
  });

  await Promise.all([
    transporter.sendMail({
      from,
      to: config.recipients,
      replyTo: contact.email,
      subject: `New Evolveus demo request from ${contact.organisationName}`,
      text: [
        "New Evolveus demo request",
        "",
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Organisation: ${contact.organisationName}`,
        `Number of students: ${contact.numberOfStudents}`,
        `Contact number: ${contact.contactNumber}`,
      ].join("\n"),
      html: leadEmailHtml(contact),
    }),
    transporter.sendMail({
      from,
      to: contact.email,
      subject: "We received your Evolveus demo request",
      text: [
        `Hi ${contact.name},`,
        "",
        `Thank you for contacting Evolveus. We received your request for ${contact.organisationName} and will get back to you shortly.`,
        "",
        "Regards,",
        "The Evolveus team",
      ].join("\n"),
      html: acknowledgementHtml(contact),
    }),
  ]);

  return contact;
};

const readJsonBody = async (req) => {
  let raw = "";

  for await (const chunk of req) {
    raw += chunk;
  }

  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    throw new ContactError("Request body must be valid JSON.", 400);
  }
};

const sendJson = (res, statusCode, payload) => {
  if (typeof res.status === "function" && typeof res.json === "function") {
    return res.status(statusCode).json(payload);
  }

  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

export const handleContactRequest = async (req, res) => {
  const originAllowed = applyCorsHeaders(req, res);

  if (!originAllowed) {
    sendJson(res, 403, { ok: false, message: "Origin is not allowed." });
    return;
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, message: "Method not allowed." });
    return;
  }

  try {
    const body = req.body ?? (await readJsonBody(req));
    await sendContactEmails(body);
    sendJson(res, 200, {
      ok: true,
      message: "Your request has been sent. Please check your email for acknowledgement.",
    });
  } catch (error) {
    const statusCode = error instanceof ContactError ? error.statusCode : 502;
    const message =
      statusCode === 400
        ? error.message
        : "Unable to send your request right now. Please try again later.";

    if (statusCode !== 400) {
      console.error("Contact form submission failed:", error);
    }

    sendJson(res, statusCode, {
      ok: false,
      message,
      details: error instanceof ContactError ? error.details : null,
    });
  }
};
