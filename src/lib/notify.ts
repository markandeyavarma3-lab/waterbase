import "server-only";
import { Resend } from "resend";
import { REQUIREMENT_OPTIONS } from "@/lib/leads";
import { siteConfig } from "@/lib/site-config";

type LeadNotification = {
  name: string;
  mobile: string;
  requirement: string;
  location?: string;
  landSize?: string;
};

function requirementLabel(value: string) {
  return REQUIREMENT_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function row(label: string, value: string) {
  return `<tr><td style="padding:4px 12px 4px 0;color:#666">${label}</td><td><strong>${value}</strong></td></tr>`;
}

export async function sendLeadNotification(lead: LeadNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.email;

  // Email not configured yet? Skip quietly — the lead is already saved.
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping lead email notification.");
    return;
  }

  const resend = new Resend(apiKey);
  const label = requirementLabel(lead.requirement);
  const location = lead.location?.trim();
  const landSize = lead.landSize?.trim();

  const textLines = [
    `Name:        ${lead.name}`,
    `Mobile:      ${lead.mobile}`,
    `Requirement: ${label}`,
    location ? `Location:    ${location}` : null,
    landSize ? `Land size:   ${landSize}` : null,
  ].filter(Boolean).join("\n");

  const htmlRows = [
    row("Name", lead.name),
    row("Mobile", lead.mobile),
    row("Requirement", label),
    location ? row("Location", location) : "",
    landSize ? row("Land size", landSize) : "",
  ].join("");

  await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL ?? "Waterbase Leads <onboarding@resend.dev>",
    to,
    subject: `New website lead — ${lead.name} (${label})`,
    text: `New callback request from the website:\n\n${textLines}\n\nCall: tel:${lead.mobile}\nWhatsApp: https://wa.me/91${lead.mobile}`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:480px"><h2 style="color:#15803d;margin:0 0 12px">New website lead</h2><table style="border-collapse:collapse;font-size:15px">${htmlRows}</table><p style="margin:16px 0 0"><a href="tel:${lead.mobile}" style="background:#15803d;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;margin-right:8px">Call back</a><a href="https://wa.me/91${lead.mobile}" style="background:#25d366;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none">WhatsApp</a></p></div>`,
  });
}