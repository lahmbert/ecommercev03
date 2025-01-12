'use client';
import { fetchOrder } from '@/api/fetchOrder';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';

const OrderPage = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // Inisialisasi dengan array kosong
  const [loading, setLoading] = useState(true); // Menambahkan state loading
  const [error, setError] = useState(null); // Menambahkan state error

  useEffect(() => {
    // Menambahkan loading state
    fetchOrder(setOrders)
      .then(() => setLoading(false))
      .catch((err) => {
        setError('Error fetching orders');
        setLoading(false);
      });
  }, []);

  // Jika loading masih true
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Loading orders...</p>
      </div>
    );
  }

  // Jika terjadi error
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  // Jika orders kosong atau bukan array
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">No orders found.</p>
      </div>
    );
  }

  // Fungsi untuk membuat pesan checkout ke WhatsApp
  const createWhatsAppMessage = () => {
    let message = `*Your Order Details*%0A%0A`;

    orders.forEach((order) => {
      message += `*Order ID:* ${order.id}%0A`;
      message += `*Status:* ${order.status}%0A`;
      message += `*Total Price:* Rp ${order.total_price.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}%0A`;
      message += `*Order Items:*%0A`;

      order.order_items?.forEach((item) => {
        message += `- ${item.products.name} (Qty: ${
          item.quantity
        }) - Rp ${item.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}%0A`;
      });

      message += '%0A'; // Add spacing between orders
    });

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '085334679379'; // Ganti dengan nomor WhatsApp yang menerima pesan
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div>
      <Navbar
        cart={cart}
        setCart={setCart}
        isOpenCart={isOpenCart}
        setIsOpenCart={setIsOpenCart}
      />
      <section>
        <div className="absolute -z-10 -translate-y-[6.5rem]">
          <img className="" src="/images/innerbg.jpg" />
        </div>
        <div className="capitalize font-bold sm:text-[3rem] sm:-translate-y-0 -translate-y-14 flex justify-center sm:px-[12rem] text-white p-8 py-[5rem]">
          Your Order
        </div>
      </section>
      <section className="sm:px-[12rem] p-8 bg-white">
        <div className="p-4">
          <div className="flex flex-row gap-2 items-end borders sm:py-8 py-4 px-2">
            {/* Judul Order */}
            <span className="sm:text-2xl text-lg font-bold uppercase">
              Your Order
            </span>
            <span className="sm:text-sm text-xs pb-1 font-bold text-slate-400">
              {orders.length} {orders.length === 1 ? 'Item' : 'Items'}{' '}
              {/* Menggunakan kondisi plural */}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Order ID</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-right">Total Price</th>
                  <th className="border px-4 py-2 text-left">Order Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2 text-right">
                      Rp{' '}
                      {order.total_price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="space-y-4">
                        {order.order_items?.length > 0 ? (
                          order.order_items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4 border-b pb-2"
                            >
                              <img
                                src={item.products.image_url}
                                alt={item.products.name}
                                className="w-12 h-12 object-cover border rounded"
                              />
                              <div>
                                <p className="font-medium">
                                  {item.products.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Price: Rp{' '}
                                  {item.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-600">
                            No items found.
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tombol Checkout */}
          <div className="flex justify-center mt-6">
            <a
              href={createWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Checkout via WhatsApp
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OrderPage;
