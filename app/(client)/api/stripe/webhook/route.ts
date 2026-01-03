import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const runtime = "nodejs"; 

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed.", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ CHỈ XỬ LÝ KHI THANH TOÁN THÀNH CÔNG
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const {
      customer_details,
      amount_total,
      currency,
      metadata,
    } = session;

    await sendAdminEmail({
      orderNumber: metadata?.orderNumber,
      customerName: customer_details?.name,
      customerEmail: customer_details?.email,
      amount: amount_total ? amount_total / 100 : 0,
      currency,
    });
  }

  return NextResponse.json({ received: true });
}

/* ===========================
   SEND EMAIL TO ADMIN
=========================== */
async function sendAdminEmail(data: {
  orderNumber?: string;
  customerName?: string | null;
  customerEmail?: string | null;
  amount: number;
  currency?: string | null;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"NDKStore" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🧾 Đơn hàng mới #${data.orderNumber}`,
    html: `
      <h2>Đơn hàng mới đã được thanh toán</h2>
      <p><strong>Mã đơn:</strong> ${data.orderNumber}</p>
      <p><strong>Khách hàng:</strong> ${data.customerName}</p>
      <p><strong>Email:</strong> ${data.customerEmail}</p>
      <p><strong>Tổng tiền:</strong> ${data.amount} ${data.currency?.toUpperCase()}</p>
      <hr/>
      <p>NDKStore Admin</p>
    `,
  });
}
