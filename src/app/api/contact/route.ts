// ============================================
// CONTACT API ROUTE
// Handles contact form submissions
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/services/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, query } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Validate query
    if (!query || query.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a message (at least 10 characters)" },
        { status: 400 }
      );
    }

    // Save to database
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        email: email.trim().toLowerCase(),
        query: query.trim(),
      });

    if (dbError) {
      console.error("[Contact API] Database error:", dbError);
      return NextResponse.json(
        { success: false, error: "Failed to save your message. Please try again." },
        { status: 500 }
      );
    }

    // Try to send email via Resend (optional - won't fail if Resend not configured)
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const contactEmail = process.env.CONTACT_EMAIL;
      
      if (resendApiKey && contactEmail) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Contact Form <onboarding@resend.dev>",
            to: contactEmail,
            subject: `📬 New Contact Query from ${email}`,
            html: `
              <!DOCTYPE html>
              <html>
                <body style="margin: 0; padding: 0; background-color: #0a192f; font-family: Arial, sans-serif;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a192f; padding: 40px 20px;">
                    <tr>
                      <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; overflow: hidden;">
                          <tr>
                            <td style="background: linear-gradient(90deg, #06b6d4, #3b82f6); padding: 30px 40px;">
                              <h1 style="margin: 0; color: white; font-size: 24px;">📬 New Contact Query</h1>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 40px;">
                              <div style="margin-bottom: 30px;">
                                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase;">From</p>
                                <p style="margin: 0; color: #22d3ee; font-size: 18px; font-weight: 600;">${email}</p>
                              </div>
                              <div style="margin-bottom: 30px;">
                                <p style="margin: 0 0 12px 0; color: #64748b; font-size: 12px; text-transform: uppercase;">Message</p>
                                <div style="background: rgba(30, 41, 59, 0.5); border-left: 4px solid #06b6d4; padding: 20px; border-radius: 0 8px 8px 0;">
                                  <p style="margin: 0; color: #e2e8f0; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${query}</p>
                                </div>
                              </div>
                              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(90deg, #06b6d4, #3b82f6); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600;">Reply to ${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="background: rgba(15, 23, 42, 0.8); padding: 20px 40px; border-top: 1px solid rgba(100, 116, 139, 0.2);">
                              <p style="margin: 0; color: #64748b; font-size: 12px;">Submitted on ${new Date().toLocaleString()}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
              </html>
            `,
          }),
        });
      }
    } catch (emailError) {
      // Log but don't fail - data is already saved
      console.error("[Contact API] Email error (non-fatal):", emailError);
    }

    return NextResponse.json({ success: true, error: null });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

