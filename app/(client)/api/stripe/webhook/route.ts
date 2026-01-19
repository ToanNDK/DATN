import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/* ===========================
   STRIPE
=========================== */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/* ===========================
   EMAIL TRANSPORTER
=========================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ===========================
   TYPES
=========================== */
type EmailProduct = {
  name: string;
  quantity: number;
  price: number;
  currency: string;
};

/* ===========================
   WEBHOOK HANDLER
=========================== */
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
    console.error("❌ Webhook verification failed:", message);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  /* ✅ CHỈ XỬ LÝ KHI THANH TOÁN THÀNH CÔNG */
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    /* 🔥 LẤY DANH SÁCH SẢN PHẨM */
    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      { limit: 100 }
    );

    const products: EmailProduct[] = lineItems.data.map((item) => ({
      name: item.description ?? "Sản phẩm",
      quantity: item.quantity ?? 1,
      price: item.amount_total ? item.amount_total / 100 : 0,
      currency: session.currency?.toUpperCase() ?? "VND",
    }));

    const emailData = {
      orderNumber: session.metadata?.orderNumber,
      customerName: session.customer_details?.name ?? "Quý khách",
      customerEmail: session.customer_details?.email ?? "",
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency?.toUpperCase() ?? "VND",
      products,
    };

    // 📩 Gửi mail Admin
    await sendAdminEmail(emailData);

    // 📩 Gửi mail Khách hàng
    if (emailData.customerEmail) {
      await sendCustomerEmail(emailData);
    }
  }

  return NextResponse.json({ received: true });
}

/* ===========================
   SEND EMAIL TO ADMIN
=========================== */
async function sendAdminEmail(data: {
  orderNumber?: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  products: EmailProduct[];
}) {
  const productRows = data.products
    .map(
      (p) => `
<tr>
  <td>${p.name}</td>
  <td align="center">${p.quantity}</td>
  <td align="right">${p.price} ${p.currency}</td>
</tr>
`
    )
    .join("");

  await transporter.sendMail({
    from: `"NDKStore" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🧾 Đơn hàng mới #${data.orderNumber}`,
    html: `
<table width="100%" style="background:#f4f6f8;padding:30px;font-family:Arial;">
  <tr>
    <td align="center">
      <table width="600" style="background:#fff;border-radius:8px;">
        <tr>
          <td style="background:#0f172a;color:#fff;padding:20px;text-align:center;">
            <h2>🛒 NDKStore</h2>
            <p>Đơn hàng mới</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <p><strong>Mã đơn hàng:</strong> ${data.orderNumber}</p>
            <p><strong>Khách hàng:</strong> ${data.customerName}</p>
            <p><strong>Email:</strong> ${data.customerEmail}</p>
            
            <table width="100%" cellpadding="8" style="border-collapse:collapse;">
              <tr style="background:#f1f5f9;">
                <th align="left">Sản phẩm</th>
                <th align="center">SL</th>
                <th align="right">Giá</th>
              </tr>
              ${productRows}
              <tr>
                <td colspan="2" align="right"><strong>Tổng cộng</strong></td>
                <td align="right" style="font-weight:bold;color:#16a34a;">
                  ${data.amount} ${data.currency}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`,
  });
}

/* ===========================
   SEND EMAIL TO CUSTOMER
=========================== */
async function sendCustomerEmail(data: {
  orderNumber?: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  products: EmailProduct[];
}) {
  const productRows = data.products
    .map(
      (p) => `
<tr>
  <td style="border-bottom:1px solid #e5e7eb;">${p.name}</td>
  <td align="center" style="border-bottom:1px solid #e5e7eb;">${p.quantity}</td>
  <td align="right" style="border-bottom:1px solid #e5e7eb;">
    ${p.price} ${p.currency}
  </td>
</tr>
`
    )
    .join("");

  await transporter.sendMail({
    from: `"NDKStore" <${process.env.EMAIL_USER}>`,
    to: data.customerEmail,
    subject: `✅ Xác nhận đơn hàng #${data.orderNumber}`,
    html: `
<table width="100%" style="background:#f4f6f8;padding:30px;font-family:Arial;">
  <tr>
    <td align="center">
      <table width="600" style="background:#fff;border-radius:8px;">
        <tr>
          <td style="background:#16a34a;color:#fff;padding:20px;text-align:center;">
            <h2>🎉 Thanh toán thành công</h2>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <p>Xin chào <strong>${data.customerName}</strong>,</p>
            <p>Dưới đây là chi tiết đơn hàng của bạn:</p>

            <table width="100%" cellpadding="8" style="border-collapse:collapse;">
              <tr style="background:#f1f5f9;">
                <th align="left">Sản phẩm</th>
                <th align="center">SL</th>
                <th align="right">Thành tiền</th>
              </tr>

              ${productRows}

              <tr>
                <td colspan="2" align="right" style="padding-top:12px;">
                  <strong>Tổng cộng</strong>
                </td>
                <td align="right" style="padding-top:12px;font-weight:bold;color:#16a34a;">
                  ${data.amount} ${data.currency}
                </td>
              </tr>
            </table>

            <p style="margin-top:20px;">Cảm ơn bạn đã mua hàng tại <strong>NDKStore</strong>.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
`,
  });
}
