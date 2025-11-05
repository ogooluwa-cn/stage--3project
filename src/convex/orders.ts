import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    city: v.string(),
    zipCode: v.string(),
    country: v.string(),
    paymentMethod: v.string(),
    eMoneyNumber: v.optional(v.string()),
    eMoneyPIN: v.optional(v.string()),
    items: v.array(v.object({
      id: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string(),
    })),
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "confirmed",
      orderDate: Date.now(),
    });
    return orderId;
  },
});

export const getOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    
    if (!order) {
      return null;
    }

    return {
      _id: order._id,
      customerName: order.customerName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      zipCode: order.zipCode,
      country: order.country,
      paymentMethod: order.paymentMethod,
      eMoneyNumber: order.eMoneyNumber,
      eMoneyPIN: order.eMoneyPIN,
      items: order.items,
      subtotal: order.subtotal,
      shipping: order.shipping,
      vat: order.vat,
      grandTotal: order.grandTotal,
      status: order.status,
      orderDate: order.orderDate,
    };
  },
});