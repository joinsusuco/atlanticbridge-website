import { Resend } from "resend";
import { escapeHtml } from "./security";

// Email recipient (notifications go to Gmail)
const NOTIFICATION_EMAIL = "atlanticbridgeus@gmail.com";
const FROM_EMAIL = "Atlantic Bridge <noreply@atlanticbridgeus.com>";

// Lazy initialization of Resend client
let _resend: Resend | null = null;

/**
 * Get the Resend client (lazy initialization)
 * This prevents build-time errors when env vars aren't set
 */
function getResendClient(): Resend {
  if (_resend) {
    return _resend;
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  _resend = new Resend(resendApiKey);
  return _resend;
}

/**
 * Service type display names
 */
const SERVICE_NAMES: Record<string, string> = {
  "product-sourcing": "Product Sourcing",
  "bulk-purchasing": "Bulk Purchasing",
  "vehicle-procurement": "Vehicle Procurement",
  "vehicle-shipping": "Vehicle Shipping",
  "cargo-shipping": "Cargo Shipping",
};

/**
 * Format form data for email display (plain text)
 */
function formatFormData(formData: Record<string, unknown>): string {
  const lines: string[] = [];

  for (const [key, value] of Object.entries(formData)) {
    if (value === null || value === undefined || value === "") continue;

    // Convert camelCase to readable format
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    // Handle arrays
    if (Array.isArray(value)) {
      if (value.length > 0) {
        lines.push(`${label}: ${value.join(", ")}`);
      }
    } else {
      lines.push(`${label}: ${String(value)}`);
    }
  }

  return lines.join("\n");
}

/**
 * Format form data for HTML email display (escaped)
 */
function formatFormDataHtml(formData: Record<string, unknown>): string {
  return escapeHtml(formatFormData(formData));
}

/**
 * Encode value for use in href attributes (mailto:, tel:)
 */
function encodeForHref(value: string): string {
  // Remove any characters that could break out of the href
  return encodeURIComponent(value).replace(/%20/g, "+");
}

/**
 * Send quote notification email
 */
export async function sendQuoteNotification(data: {
  serviceType: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  preferredContact: string;
  additionalNotes?: string;
  formData: Record<string, unknown>;
}): Promise<{ success: boolean; error?: string }> {
  const serviceName = SERVICE_NAMES[data.serviceType] || data.serviceType;

  const subject = `New Quote Request: ${serviceName} from ${data.fullName}`;

  const textContent = `
NEW QUOTE REQUEST
=================

Service Type: ${serviceName}

CONTACT INFORMATION
-------------------
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country}
Preferred Contact: ${data.preferredContact}

SERVICE DETAILS
---------------
${formatFormData(data.formData)}

${data.additionalNotes ? `ADDITIONAL NOTES\n----------------\n${data.additionalNotes}` : ""}

---
This quote request was submitted via the Atlantic Bridge website.
  `.trim();

  // Escape all user data for HTML
  const safeFullName = escapeHtml(data.fullName);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone);
  const safeCountry = escapeHtml(data.country);
  const safePreferredContact = escapeHtml(data.preferredContact);
  const safeAdditionalNotes = data.additionalNotes ? escapeHtml(data.additionalNotes) : "";
  const safeServiceName = escapeHtml(serviceName);

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0a1628; padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="color: #d4af37; margin: 0; font-size: 24px;">New Quote Request</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0;">${safeServiceName}</p>
  </div>

  <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef;">
    <h2 style="color: #0a1628; font-size: 18px; margin: 0 0 16px 0; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Contact Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #666; width: 140px;">Name:</td>
        <td style="padding: 8px 0; font-weight: 600;">${safeFullName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;">Email:</td>
        <td style="padding: 8px 0;"><a href="mailto:${encodeForHref(data.email)}" style="color: #0a1628;">${safeEmail}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;">Phone:</td>
        <td style="padding: 8px 0;"><a href="tel:${encodeForHref(data.phone)}" style="color: #0a1628;">${safePhone}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;">Country:</td>
        <td style="padding: 8px 0;">${safeCountry}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;">Preferred Contact:</td>
        <td style="padding: 8px 0; text-transform: capitalize;">${safePreferredContact}</td>
      </tr>
    </table>
  </div>

  <div style="background: #ffffff; padding: 24px; border: 1px solid #e9ecef; border-top: none;">
    <h2 style="color: #0a1628; font-size: 18px; margin: 0 0 16px 0; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Service Details</h2>
    <pre style="background: #f8f9fa; padding: 16px; border-radius: 4px; font-family: inherit; white-space: pre-wrap; margin: 0;">${formatFormDataHtml(data.formData)}</pre>
  </div>

  ${
    safeAdditionalNotes
      ? `
  <div style="background: #ffffff; padding: 24px; border: 1px solid #e9ecef; border-top: none;">
    <h2 style="color: #0a1628; font-size: 18px; margin: 0 0 16px 0; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Additional Notes</h2>
    <p style="margin: 0; white-space: pre-wrap;">${safeAdditionalNotes}</p>
  </div>
  `
      : ""
  }

  <div style="background: #0a1628; padding: 16px; border-radius: 0 0 8px 8px; text-align: center;">
    <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
      This quote request was submitted via the Atlantic Bridge website.
    </p>
  </div>
</body>
</html>
  `.trim();

  try {
    const { error } = await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: [NOTIFICATION_EMAIL],
      replyTo: data.email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Failed to send quote notification email:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send quote notification email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send contact form notification email
 */
export async function sendContactNotification(data: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const emailSubject = `New Contact: ${data.subject} from ${data.fullName}`;

  const textContent = `
NEW CONTACT MESSAGE
===================

From: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Subject: ${data.subject}

MESSAGE
-------
${data.message}

---
This message was submitted via the Atlantic Bridge website contact form.
  `.trim();

  // Escape all user data for HTML
  const safeFullName = escapeHtml(data.fullName);
  const safeEmail = escapeHtml(data.email);
  const safePhone = data.phone ? escapeHtml(data.phone) : "";
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message);

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0a1628; padding: 24px; border-radius: 8px 8px 0 0;">
    <h1 style="color: #d4af37; margin: 0; font-size: 24px;">New Contact Message</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0;">${safeSubject}</p>
  </div>

  <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef;">
    <h2 style="color: #0a1628; font-size: 18px; margin: 0 0 16px 0; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Contact Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #666; width: 100px;">Name:</td>
        <td style="padding: 8px 0; font-weight: 600;">${safeFullName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;">Email:</td>
        <td style="padding: 8px 0;"><a href="mailto:${encodeForHref(data.email)}" style="color: #0a1628;">${safeEmail}</a></td>
      </tr>
      ${
        data.phone
          ? `
      <tr>
        <td style="padding: 8px 0; color: #666;">Phone:</td>
        <td style="padding: 8px 0;"><a href="tel:${encodeForHref(data.phone)}" style="color: #0a1628;">${safePhone}</a></td>
      </tr>
      `
          : ""
      }
    </table>
  </div>

  <div style="background: #ffffff; padding: 24px; border: 1px solid #e9ecef; border-top: none;">
    <h2 style="color: #0a1628; font-size: 18px; margin: 0 0 16px 0; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">Message</h2>
    <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
  </div>

  <div style="background: #0a1628; padding: 16px; border-radius: 0 0 8px 8px; text-align: center;">
    <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
      This message was submitted via the Atlantic Bridge website contact form.
    </p>
  </div>
</body>
</html>
  `.trim();

  try {
    const { error } = await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: [NOTIFICATION_EMAIL],
      replyTo: data.email,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Failed to send contact notification email:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send newsletter welcome email to new subscriber
 */
export async function sendNewsletterWelcome(email: string): Promise<{ success: boolean; error?: string }> {
  const subject = "Welcome to Atlantic Bridge!";

  const textContent = `
Welcome to Atlantic Bridge!

Thank you for subscribing to our newsletter. You'll now receive updates on:

• Upcoming shipping schedules from USA to The Gambia
• New services and special offers
• Industry news and tips for international shipping
• Exclusive deals for subscribers

If you have any questions, simply reply to this email or visit our website.

Best regards,
The Atlantic Bridge Team

---
Atlantic Bridge
USA to The Gambia Shipping, Export & Sourcing
https://atlanticbridgeus.com

To unsubscribe, reply with "UNSUBSCRIBE" in the subject line.
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
  <div style="background: #0a1628; padding: 32px; border-radius: 8px 8px 0 0; text-align: center;">
    <img src="https://atlanticbridgeus.com/logo.png" alt="Atlantic Bridge" width="80" height="80" style="display: inline-block; margin-bottom: 16px;" />
    <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Welcome Aboard!</h1>
    <p style="color: rgba(255,255,255,0.8); margin: 12px 0 0 0; font-size: 16px;">Thank you for joining Atlantic Bridge</p>
  </div>

  <div style="background: #ffffff; padding: 32px; border: 1px solid #e9ecef;">
    <p style="margin: 0 0 20px 0; font-size: 16px;">
      You're now part of our community! Here's what you can expect from us:
    </p>

    <ul style="margin: 0 0 24px 0; padding-left: 20px;">
      <li style="margin-bottom: 12px;"><strong style="color: #0a1628;">Shipping Schedules</strong> — Get notified about upcoming departures from USA to The Gambia</li>
      <li style="margin-bottom: 12px;"><strong style="color: #0a1628;">Special Offers</strong> — Exclusive deals and discounts for our subscribers</li>
      <li style="margin-bottom: 12px;"><strong style="color: #0a1628;">New Services</strong> — Be the first to know about our latest offerings</li>
      <li style="margin-bottom: 12px;"><strong style="color: #0a1628;">Expert Tips</strong> — Helpful advice for international shipping and sourcing</li>
    </ul>

    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #d4af37;">
      <p style="margin: 0; font-size: 15px;">
        <strong>Need help?</strong> Simply reply to this email or visit <a href="https://atlanticbridgeus.com/contact" style="color: #d4af37;">our contact page</a>.
      </p>
    </div>
  </div>

  <div style="background: #ffffff; padding: 24px; border: 1px solid #e9ecef; border-top: none; text-align: center;">
    <p style="margin: 0 0 16px 0; color: #666;">Ready to ship or source products?</p>
    <a href="https://atlanticbridgeus.com/quote" style="display: inline-block; background: #d4af37; color: #0a1628; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600;">Get a Free Quote</a>
  </div>

  <div style="background: #0a1628; padding: 24px; border-radius: 0 0 8px 8px; text-align: center;">
    <p style="color: rgba(255,255,255,0.9); margin: 0 0 8px 0; font-weight: 600;">Atlantic Bridge</p>
    <p style="color: rgba(255,255,255,0.6); margin: 0 0 16px 0; font-size: 13px;">
      USA to The Gambia — Shipping, Export & Sourcing
    </p>
    <p style="margin: 0;">
      <a href="https://atlanticbridgeus.com" style="color: #d4af37; text-decoration: none; font-size: 14px;">atlanticbridgeus.com</a>
    </p>
    <p style="color: rgba(255,255,255,0.4); margin: 16px 0 0 0; font-size: 11px;">
      To unsubscribe, reply with "UNSUBSCRIBE" in the subject line.
    </p>
  </div>
</body>
</html>
  `.trim();

  try {
    const { error } = await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Failed to send newsletter welcome email:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send newsletter welcome email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
