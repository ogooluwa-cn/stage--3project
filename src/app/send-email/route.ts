import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only if API key exists
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { email, name, orderId, items, subtotal, shipping, vat, grandTotal, address, city, zipCode, country } = await request.json();
    
    console.log("📧 Attempting to send email to:", email);
    
    // Validate required fields
    if (!email || !name || !orderId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!resend || !process.env.RESEND_API_KEY) {
      console.warn("⚠️ Resend not configured - email would be sent to:", email);
      return NextResponse.json({ 
        success: true, 
        message: "Email service not configured - email would be sent in production",
        mock: true
      });
    }

    // Format items for email
    const itemsHtml = items.map((item: any) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px 0;">
          <div style="display: flex; align-items: center;">
            <div style="width: 50px; height: 50px; background: #f5f5f5; border-radius: 8px; margin-right: 15px;"></div>
            <div>
              <strong>${item.name}</strong>
              <div style="color: #666; font-size: 14px;">
                Qty: ${item.quantity} × $${item.price}
              </div>
            </div>
          </div>
        </td>
        <td style="padding: 10px 0; text-align: right; font-weight: bold;">
          $${(item.quantity * item.price).toFixed(2)}
        </td>
      </tr>
    `).join('');

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #D87D4A; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .total-section { background: #D87D4A; color: white; padding: 15px; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase, ${name}!</p>
          </div>
          
          <div class="content">
            <div style="text-align: center; margin-bottom: 30px;">
              <p>Your order has been confirmed and is being processed. Here are your order details:</p>
              <h2>Order #${orderId}</h2>
            </div>

            <div class="order-details">
              <h3 style="margin-top: 0;">Items Ordered</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
              </table>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
              <div class="order-details">
                <h3 style="margin-top: 0;">Shipping Address</h3>
                <p>${name}<br>
                ${address}<br>
                ${city}, ${zipCode}<br>
                ${country}</p>
              </div>
              
              <div class="order-details">
                <h3 style="margin-top: 0;">Order Total</h3>
                <p>Subtotal: $${subtotal.toFixed(2)}<br>
                Shipping: $${shipping.toFixed(2)}<br>
                VAT: $${vat.toFixed(2)}<br>
                <strong>Grand Total: $${grandTotal.toFixed(2)}</strong></p>
              </div>
            </div>

            <div class="total-section">
              <h3 style="margin: 0; text-align: center;">Grand Total: $${grandTotal.toFixed(2)}</h3>
            </div>

            <div class="footer">
              <p>We'll send you a shipping confirmation email with tracking information once your order ships.</p>
              <p>If you have any questions, please contact our customer service team.</p>
              <p><br>Best regards,<br><strong>The Audiophile Team</strong></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send actual email
    const { data, error } = await resend.emails.send({
      from: 'Audiophile <onboarding@resend.dev>',
      to: email,
      subject: `Order Confirmation #${orderId} - Audiophile`,
      html: emailHtml,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 }
      );
    }

    console.log("✅ Email sent successfully:", data?.id);
    return NextResponse.json({ 
      success: true, 
      message: "Order confirmed and email sent",
      orderId,
      emailId: data?.id
    });
    
  } catch (error) {
    console.error("❌ Email processing error:", error);
    return NextResponse.json(
      { error: "Failed to process email request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Email API is running",
    configured: !!process.env.RESEND_API_KEY 
  });
}