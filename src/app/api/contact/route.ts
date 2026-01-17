import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, enquiryType, message } = body;

        // Validate required fields
        if (!name || !email || !enquiryType || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Email content
        const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Enquiry Type: ${enquiryType}

Message:
${message}

---
Sent from your portfolio contact form
        `.trim();

        // Using Resend API (you'll need to set RESEND_API_KEY in environment)
        // Alternative: Use Formspree, EmailJS, or Nodemailer
        const RESEND_API_KEY = process.env.RESEND_API_KEY;

        if (RESEND_API_KEY) {
            const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${RESEND_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from: "Portfolio Contact <onboarding@resend.dev>",
                    to: ["vandanbsheth9@gmail.com"],
                    subject: `[Portfolio] New ${enquiryType} from ${name}`,
                    text: emailContent,
                    reply_to: email,
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                console.error("Resend API error:", error);
                return NextResponse.json(
                    { error: "Failed to send email" },
                    { status: 500 }
                );
            }
        } else {
            // Fallback: Log to console if no API key (for development)
            console.log("=== CONTACT FORM SUBMISSION ===");
            console.log(emailContent);
            console.log("================================");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
