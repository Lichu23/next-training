'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function Home() {
  const [amount, setAmount] = useState('1000.00');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          external_reference: `ORDER-${Date.now()}`,
          description: `Payment of $${amount}`,
          total_amount: amount,
          external_pos_id: 'STOREFAKAPOS001',
          mode: 'static',
          items: [{
            title: 'Custom Payment',
            unit_price: amount,
            quantity: 1,
            unit_measure: 'unit',
            external_code: 'CUSTOM-ITEM'
          }]
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create order');
      
      setOrderId(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Mercado Pago Payment</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (ARS)
            </label>
            <input
              type="number"
              id="amount"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter amount"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating Order...' : 'Generate QR Code'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}

        {orderId && (
          <div className="mt-8 text-center">
            <h2 className="text-lg font-medium mb-4">Scan to Pay</h2>
            <div className="flex justify-center">
              <QRCodeSVG
                value={`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${orderId}`}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Scan this QR code with the Mercado Pago app to complete your payment
            </p>
            <div className="mt-2 p-2 bg-gray-100 rounded text-xs break-all">
              <p className="font-medium">Or open this URL:</p>
              <a 
                href={`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${orderId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${orderId}`}
              </a>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Order ID: {orderId}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}