import { backendClient } from "@/sanity/lib/backendClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { items, metadata, status } = await req.json();

    const order = await backendClient.create({
      _type: "order",

      // ===== GIỮ NGUYÊN =====
      items,
      metadata,
      status: status ?? "processing",
      createdAt: new Date().toISOString(),

      // ===== BỔ SUNG CHO NÚT ĐẶT HÀNG =====
      orderNumber: metadata?.orderNumber,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}
