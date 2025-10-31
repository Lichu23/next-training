// app/api/orders/route.ts
import { NextResponse } from "next/server";

interface OrderItem {
  title?: string;
  unit_price: number | string;
  quantity?: number | string;
  unit_measure?: string;
  external_code?: string;
  external_categories?: Array<{ id: string }>;
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const { 
      external_reference, 
      description, 
      total_amount, 
      items, 
      external_pos_id,
      mode = "static" // Default to static QR
    } = (await request.json().catch(() => null)) || {};

    // Validate required fields
    if (!external_reference || !description || !total_amount || !items?.length || !external_pos_id) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: [
            "external_reference",
            "description",
            "total_amount",
            "items",
            "external_pos_id",
          ],
        },
        { status: 400 }
      );
    }

    // Prepare items with proper types
    const orderItems = items.map((item: OrderItem) => ({
      title: String(item.title || ""),
      unit_price: String(Number(item.unit_price || 0).toFixed(2)),
      quantity: Math.max(1, Math.round(Number(item.quantity) || 1)),
      unit_measure: item.unit_measure || "unit",
      external_code: item.external_code || undefined,
      external_categories: item.external_categories || undefined
    }));

    // Prepare request body for Mercado Pago
    const mpRequest = {
      type: "qr",
      total_amount: String(Number(total_amount).toFixed(2)),
      description: String(description),
      external_reference: String(external_reference),
      expiration_time: "PT16M", // 16 minutes expiration
      config: {
        qr: {
          external_pos_id: String(external_pos_id),
          mode: ["static", "dynamic", "hybrid"].includes(mode) ? mode : "static"
        }
      },
      transactions: {
        payments: [
          {
            amount: String(Number(total_amount).toFixed(2))
          }
        ]
      },
      items: orderItems
    };

    console.log("=== ORDER REQUEST ===");
    console.log(JSON.stringify(mpRequest, null, 2));

    // Create order in Mercado Pago
    const response = await fetch('https://api.mercadopago.com/v1/orders', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': crypto.randomUUID()
      },
      body: JSON.stringify(mpRequest),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("=== ORDER ERROR ===");
      console.error(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        error: responseData,
      }, null, 2));

      return NextResponse.json(
        {
          error: "Failed to create order",
          details: responseData,
        },
        { status: response.status || 500 }
      );
    }

    console.log("=== ORDER CREATED ===");
    console.log(JSON.stringify(responseData, null, 2));

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("=== UNHANDLED ERROR ===");
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}