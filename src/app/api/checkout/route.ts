import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only if API key exists to avoid build-time errors
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { email, name, orderId, address, items, subtotal, shipping, vat, grandTotal } = await request.json();
    
    // Validate required fields
    if (!email || !name || !orderId || !items || !grandTotal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // If Resend is not configured, return a mock success so build/time checks
    if (!resend) {
      console.warn("⚠️ Resend not configured - skipping real email send for order:", orderId);
      return NextResponse.json({
        success: true,
        message: "Email service not configured - email would be sent in production",
        mock: true,
        orderId,
      });
    }

    // Your email sending logic here...
    const { data, error } = await resend.emails.send({
      from: 'Audiophile <onboarding@resend.dev>',
      to: email,
      subject: `Order Confirmation #${orderId}`,
      html: `<h1>Order Confirmed</h1><p>Thank you for your order ${name}!</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Order confirmed and email sent",
      orderId,
      emailId: data?.id
    });
    
  } catch (error) {
    console.error("Email processing error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}