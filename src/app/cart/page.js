'use client';
import { fetchCart } from '@/api/fetchCart';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useEffect, useRef, useState } from 'react';
import supabase from '../lib/Supabase';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const router = useRouter();

  const prevCartRef = useRef();

  useEffect(() => {
    fetchCart(setCart);
  }, []);

  const handleQuantityChange = (id, value) => {
    // Logika untuk memperbarui kuantitas produk secara lokal
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(value) || 1 } : item
      )
    );
  };

  const handleContinue = async (cartItems) => {
    try {
      // Mendapatkan user yang sedang login
      const { data: globalUser, error: globalUserError } =
        await supabase.auth.getUser();
      if (globalUserError) {
        console.error('Error fetching user:', globalUserError);
        return;
      }

      if (!globalUser || !globalUser.user) {
        console.error('No user is logged in.');
        return;
      }

      const userEmail = globalUser.user.email;

      // Mendapatkan user_id dari tabel users berdasarkan email
      const { data: publicUser, error: publicUserError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (publicUserError || !publicUser) {
        console.error(
          'Error fetching user data:',
          publicUserError || 'No user found'
        );
        return;
      }

      const userId = publicUser.id;

      // Cek atau buat order untuk user
      let { data: orderData, error: orderDataError } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!orderData || orderDataError) {
        const { error: addOrderError } = await supabase
          .from('orders')
          .insert([
            {
              user_id: userId,
              total_price: cartItems.reduce(
                (sum, item) => sum + item.products.price * item.quantity,
                0
              ),
            },
          ])
          .single();

        if (addOrderError) {
          console.error('Error creating order:', addOrderError);
          return;
        }

        let { data: newOrder, error: newOrderError } = await supabase
          .from('orders')
          .select('id')
          .eq('user_id', userId)
          .single();

        if (newOrderError) {
          console.error('Error retrieving new order:', newOrderError);
          return;
        }
        orderData = newOrder;
      }

      // Proses setiap item di cart
      for (const item of cartItems) {
        const { products, quantity } = item;

        // Cek apakah produk sudah ada di order_items
        let { data: orderItem, error: orderItemError } = await supabase
          .from('order_items')
          .select('id, quantity')
          .eq('order_id', orderData.id)
          .eq('product_id', products.id)
          .single();

        if (orderItemError && orderItemError.code !== 'PGRST116') {
          console.error('Error fetching order item:', orderItemError);
          return;
        }

        if (orderItem) {
          // Jika produk sudah ada, perbarui kuantitas
          const updatedQuantity = orderItem.quantity + quantity;

          const { error: updateError } = await supabase
            .from('order_items')
            .update({ quantity: updatedQuantity })
            .eq('id', orderItem.id);

          if (updateError) {
            console.error('Error updating order item:', updateError);
            return;
          }
        } else {
          // Jika belum ada, tambahkan produk ke order_items
          const { error: insertError } = await supabase
            .from('order_items')
            .insert([
              {
                order_id: orderData.id,
                product_id: products.id,
                quantity: quantity,
                price: products.price,
              },
            ]);

          if (insertError) {
            console.error('Error inserting order item:', insertError);
            return;
          }
        }
      }

      let { data: userCart, error: userCartError } = await supabase
        .from('cart')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (!userCart || userCartError) {
        console.error('cart anda tidak ada:', userCartError);
        return;
      }

      const userCartId = userCart.id;

      const { error: deleteCartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', userCartId);

      if (deleteCartError) {
        console.error('Error deleting cart:', deleteCartError);
        return;
      }

      const { error: cartItemError } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', userId);

      if (cartItemError) {
        console.error('Error deleting cart items:', cartItemError);
        return;
      }
      setSuccessMsg(`Pesanan anda telah ditambahkan`);
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 3000);

      router.push('/order');
    } catch (error) {
      console.error('Error processing cart:', error);
      setErrorMsg('Something went wrong. Please try again.');
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 3000);
    }
  };

  const handleRemove = async (id) => {
    try {
      // Logika untuk menghapus item dari server
      const { error } = await supabase.from('cart_items').delete().eq('id', id);

      if (error) {
        console.error('Error removing cart item:', error);
      } else {
        // Perbarui state cart lokal
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        console.log('Cart item removed successfully');
      }
    } catch (err) {
      console.error('Error:', err);
    }
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
          Your Cart
        </div>
      </section>
      <section className="sm:px-[12rem] px-8 sm:py-20 bg-white">
        <div className="flex gap-4 items-end">
          <span className="sm:text-2xl text-lg font-bold uppercase">
            Your Cart
          </span>
          <span className="sm:text-sm text-xs pb-1 font-bold text-slate-400">
            {''}
            Items
          </span>
          {showMsg && (
            <div>
              <div className="fixed top-[7rem] align-middle bg-red-500  text-white px-4 py-2 rounded-lg">
                {errorMsg}
              </div>
              <div className="fixed top-[7rem] align-middle bg-green-500  text-white px-4 py-2 rounded-lg">
                {successMsg}
              </div>
            </div>
          )}
        </div>
        {cart?.length !== 0 ? (
          <div className="w-full my-20 overflow-auto border p-4">
            <table className="w-full table-auto overflow-auto text-left">
              <thead>
                <tr>
                  <th className="border-b p-6 sm:text-lg text-sm font-semibold">
                    Description
                  </th>
                  <th className="border-b p-6 sm:text-lg text-sm font-semibold">
                    Price
                  </th>
                  <th className="border-b p-6 sm:text-lg text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="border-b p-6 sm:text-lg text-sm font-semibold">
                    Total
                  </th>
                  <th className="border-b p-6 sm:text-lg text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={idx} className="">
                    <td className="p-6 border-b items-center gap-2 flex sm:flex-row flex-col">
                      <div>
                        <img
                          src={item.products.image_url}
                          alt={item.products.name}
                          className="w-[3rem]"
                        />
                      </div>
                      <div className="sm:text-xl font-bold text-md">
                        {item.products.name}
                      </div>
                    </td>
                    <td className="p-6 border-b">
                      Rp{' '}
                      {item.products.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="p-6 border-b">
                      <input
                        type="number"
                        min={1}
                        max={item.products.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="w-16 border border-gray-300 rounded-sm text-center"
                      />
                    </td>
                    <td className="p-6 border-b">
                      Rp{' '}
                      {(item.products.price * item.quantity).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>
                    <td className="p-6 border-b gap-2">
                      <Button
                        label="Remove"
                        color="danger"
                        size="medium"
                        className="rounded-md"
                        onClick={() => handleRemove(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex w-full sm:justify-end sm:px-[5.6rem] px-4">
              <Button
                color="default"
                label="Continue"
                size="medium"
                className="rounded-md mt-6 mb-2"
                onClick={() => handleContinue(cart)}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-20 text-2xl font-bold">
            Your Cart is Empty
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default CartPage;
