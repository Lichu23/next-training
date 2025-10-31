// app/api/stores/route.ts
import { NextResponse } from "next/server";
import { MercadoPagoConfig } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
});

export async function POST(request: Request) {
  try {
    const { name, external_id, location, business_hours } =
      await request.json();

    // Validate required fields
    if (!name || !external_id || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create store in Mercado Pago
    const response = await fetch(
      `https://api.mercadopago.com/users/${process.env.MERCADOPAGO_USER_ID}/stores`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          external_id,
          location: {
            ...location,
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude),
          },
          business_hours,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Error creating store:", error);
      return NextResponse.json(
        { error: "Failed to create store", details: error },
        { status: response.status }
      );
    }

    const store = await response.json();

    console.log("✅ Store created:", {
      store_id: store.id,
      external_id: external_id,
      store_response: store,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("🔄 Creating POS with:", {
      store_id: store.id,
      external_id: `${external_id}POS001`,
    });

    // Create POS for the store
    const posResponse = await fetch("https://api.mercadopago.com/pos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `POS ${name}`,
        fixed_amount: true,
        store_id: store.id, // Use the numeric store ID
        external_id: `${external_id}POS001`,
        category: 621102,
      }),
    });

    if (!posResponse.ok) {
      const error = await posResponse.json();
      console.error("Error creating POS:", error);
      return NextResponse.json(
        { error: "Failed to create POS", details: error },
        { status: posResponse.status }
      );
    }

    const pos = await posResponse.json();

    return NextResponse.json({
      store,
      pos,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
