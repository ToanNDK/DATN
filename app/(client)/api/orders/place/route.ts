import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { Metadata } from "@/actions/createCheckoutSession";

/**
 * Address type khớp với schema `address` trong Sanity
 */
interface AddressInput {
  name: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  default?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      cartItems,
      metadata,
      totalPrice,
      currency,
      address,
    }: {
      cartItems: {
        productId: string;
        quantity: number;
      }[];
      metadata: Metadata;
      totalPrice: number;
      currency: string;
      address: AddressInput;
    } = body;

    // 🧾 Tạo mã đơn hàng
    const orderNumber = `ORD-${Date.now()}`;

    /**
     * Chuẩn hóa danh sách sản phẩm cho Sanity
     */
    const sanityProducts = cartItems.map((item) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: item.productId,
      },
      quantity: item.quantity,
    }));

    /**
     * Chuẩn hóa address để lưu snapshot vào order
     * (không reference, tránh user sửa sau)
     */
    const orderAddress = {
      _type: "address",
      name: address.name,
      email: address.email ?? metadata.customerEmail,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      default: address.default ?? false,
      createdAt: new Date().toISOString(),
    };

    // 👉 TẠO ORDER (STATUS = PROCESSING)
    const order = await backendClient.create({
      _type: "order",
      orderNumber,
      customerName: metadata.customerName,
      email: metadata.customerEmail,
      clerkUserId: metadata.clerkUserId,
      currency,
      products: sanityProducts,
      totalPrice,
      status: "processing",
      orderDate: new Date().toISOString(),
      address: orderAddress,
    });

    /**
     * 👉 TRỪ STOCK SẢN PHẨM
     */
    for (const item of cartItems) {
      const product = await backendClient.getDocument(item.productId);

      if (!product || typeof product.stock !== "number") continue;

      const newStock = Math.max(product.stock - item.quantity, 0);

      await backendClient
        .patch(item.productId)
        .set({ stock: newStock })
        .commit();
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Place order error:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}
