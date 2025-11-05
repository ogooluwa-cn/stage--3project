import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, orderId, items, subtotal, shipping, vat, grandTotal } = await request.json();
    
    console.log("📧 Would send email to:", email);
    console.log("📦 Order confirmation for:", name);
    console.log("🆔 Order ID:", orderId);
    console.log("🛒 Items:", items);
    console.log("💰 Total: $", grandTotal);
    
    // This is a mock implementation - in production, integrate with Resend
    // For now, we'll just log and return success
    
    return NextResponse.json({ 
      success: true, 
      message: "Order confirmed - email would be sent in production",
      orderId 
    });
    
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ 
      error: "Failed to process order" 
    }, { status: 500 });
  }
}