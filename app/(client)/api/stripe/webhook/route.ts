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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("❌ Webhook signature verification failed.", message);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
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
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:30px 0;font-family:Arial,sans-serif;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        
        <!-- HEADER -->
        <tr>
          <td style="background:#0f172a;color:#ffffff;padding:20px;text-align:center;">
            <h1 style="margin:0;font-size:22px;">🛒 NDKStore</h1>
            <p style="margin:5px 0 0;font-size:14px;">Thông báo đơn hàng mới</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:24px;color:#333;">
            <h2 style="margin-top:0;color:#0f172a;">Đơn hàng đã thanh toán thành công 🎉</h2>

            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="border-bottom:1px solid #e5e7eb;"><strong>Mã đơn hàng</strong></td>
                <td style="border-bottom:1px solid #e5e7eb;">${data.orderNumber}</td>
              </tr>
              <tr>
                <td style="border-bottom:1px solid #e5e7eb;"><strong>Khách hàng</strong></td>
                <td style="border-bottom:1px solid #e5e7eb;">${data.customerName}</td>
              </tr>
              <tr>
                <td style="border-bottom:1px solid #e5e7eb;"><strong>Email</strong></td>
                <td style="border-bottom:1px solid #e5e7eb;">${data.customerEmail}</td>
              </tr>
              <tr>
                <td><strong>Tổng tiền</strong></td>
                <td style="color:#16a34a;font-weight:bold;">
                  ${data.amount} ${data.currency?.toUpperCase()}
                </td>
              </tr>
            </table>

            <p style="margin-top:20px;font-size:14px;">
              Vui lòng đăng nhập hệ thống Admin để xử lý đơn hàng.
            </p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#f8fafc;padding:16px;text-align:center;font-size:12px;color:#64748b;">
            © ${new Date().getFullYear()} NDKStore. All rights reserved.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
`
,
  });
}
