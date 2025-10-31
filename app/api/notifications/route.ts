// app/api/notifications/route.ts
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' 
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received notification:', data);

    if (data.action === 'payment.created' || data.action === 'payment.updated') {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: data.data.id });
      
      // Update your database with payment status
      console.log('Payment data:', paymentData);

      // Here you would typically update your database
      // with the payment status
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing notification:', error);
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}