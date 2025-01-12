'use client';
import { fetchOrder, deleteOrder, deleteOrderItem } from '@/api/fetchOrder'; // Asumsi API deleteOrder dan deleteOrderItem
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

  // Fungsi untuk menghapus item pesanan
  const handleDeleteItem = (orderId, itemId) => {
    deleteOrderItem(orderId, itemId)
      .then(() => {
        // Update orders setelah item dihapus
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  order_items: order.order_items.filter(
                    (item) => item.id !== itemId
                  ),
                }
              : order
          )
        );
      })
      .catch((err) => {
        console.error('Error deleting item:', err);
      });
  };

  // Fungsi untuk menghapus seluruh pesanan setelah item dihapus
  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId)
      .then(() => {
        // Update orders setelah pesanan dihapus
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
      })
      .catch((err) => {
        console.error('Error deleting order:', err);
      });
  };

  // Fungsi untuk membuat pesan checkout ke WhatsApp
  const createWhatsAppMessage = () => {
    const phoneNumber = '6285334679379'; // Ganti dengan nomor WhatsApp yang sesuai
    let message = `*Your Order Details*%0A%0A`;

    message += `*===========================*%0A`;

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
        message += `  - *${item.products.name}* (Qty: ${
          item.quantity
        }) - Rp ${item.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}%0A`;
      });

      message += `*===========================*%0A`; // Add a separator after each order
      message += '%0A'; // Add spacing between orders
    });

    // Return the full URL with phone number and message
    return `https://wa.me/${phoneNumber}?text=${message}`;
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
          <div className="flex flex-row gap-2 items-end sm:py-8 py-4 px-2">
            {/* Judul Order */}
            <span className="sm:text-2xl text-lg font-bold uppercase">
              Your Order
            </span>
            <span className="sm:text-sm text-xs pb-1 font-bold text-slate-400">
              {orders.length} {orders.length === 1 ? 'Item' : 'Items'}
              {/* Menggunakan kondisi plural */}
            </span>
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-8 shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="mb-4">
                    <span className="text-lg font-semibold">Total Price:</span>
                    <span className="text-xl font-bold text-green-500">
                      Rp{' '}
                      {order.total_price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <span className="font-semibold text-sm flex gap-2 text-gray-600">
                    Status:
                    <p
                      className={`${
                        order.status === 'pending'
                          ? 'text-yellow-500'
                          : order.status === 'on process'
                          ? 'text-green-500'
                          : 'text-blue-500'
                      } capitalize`}
                    >
                      {order.status}
                    </p>
                  </span>
                </div>

                <div className="space-y-4">
                  {order.order_items?.length > 0 ? (
                    order.order_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.products.image_url}
                            alt={item.products.name}
                            className="w-16 h-16 object-cover border rounded"
                          />
                          <div>
                            <p className="font-medium">{item.products.name}</p>
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
                        {/* Tombol Delete Item, hanya tampil jika status pending atau on process */}
                        {(order.status === 'pending' ||
                          order.status === 'on process') && (
                          <button
                            className="text-red-500 text-sm"
                            onClick={() => handleDeleteItem(order.id, item.id)}
                          >
                            Delete Item
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">No items found.</p>
                  )}
                </div>

                {/* Tombol Delete Order, hanya tampil jika status pending atau on process */}
                {(order.status === 'pending' ||
                  order.status === 'on process') && (
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 text-white px-6 py-2 rounded-lg"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete Order
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tombol Checkout hanya tampil jika status pending */}
          {orders.some((order) => order.status === 'pending') && (
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
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OrderPage;
