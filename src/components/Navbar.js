'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';
import supabase from '@/app/lib/Supabase';
import Cart from './Cart';
import { fetchCart } from '@/api/fetchCart';

const Navbar = ({ cart, setCart, setIsOpenCart, isOpenCart }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    fetchCart(setCart);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listeners when component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pathname = usePathname();

  // Function to get active class
  const getActiveClass = (path) => {
    return pathname === path ? 'text-green-500' : ''; // Adjust the class for active state
  };

  // Function to toggle menu
  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const router = useRouter();

  const handleClick = () => {
    return router.push('/auth/register');
  };

  const removeFromCart = async (productId) => {
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

      // Mendapatkan cart_id berdasarkan user_id
      const { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (cartError || !cartData) {
        console.error('No cart found');
        return;
      }

      const cartId = cartData.id;

      // Menghapus item dari cart_items berdasarkan productId dan cartId
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cartId)
        .eq('product_id', productId);

      if (deleteError) {
        console.error('Error deleting item from cart_items:', deleteError);
        return;
      }

      const { data: cartItems } = await supabase
        .from('cart_items')
        .select('id', cartId)
        .single();

      if (cartItems === null) {
        const { error: deleteCart } = await supabase
          .from('cart')
          .delete()
          .eq('id', cartId);
        if (deleteCart) {
          fetchCart(setCart); // Memuat ulang data cart setelah item dihapus
          return;
        }
        setCart(cartItems || []); // Memuat ulang data cart setelah item dihapus
      }

      fetchCart(setCart); // Memuat ulang data cart setelah item dihapus
      // Memanggil fungsi fetchCart untuk memperbarui data cart
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
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
              total_price: totalPrice,
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
                quantity: quantity, // Menggunakan quantity dari cartItems
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
      setTimeout(() => window.location.reload(), 4000);
    }
  };

  const handleEdit = () => {
    return router.push('/cart');
  };

  return (
    <div
      className={`sticky z-40 top-0 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      {/* Desktop & Mobile Navbar */}
      <div
        className={`w-full flex sm:justify-around justify-between items-center sm:px-[5rem] p-8 ${
          isScrolled ? '' : 'text-white'
        } `}
      >
        {/* Mobile Menu Button */}
        <div className="sm:hidden items-center">
          <button
            onClick={handleOpenMenu}
            aria-expanded={isOpenMenu}
            className="font-bold"
          >
            {isOpenMenu ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* Logo */}
        <div className="font-bold">LOGO</div>

        {/* Desktop Links */}
        <div className="sm:flex hidden justify-around items-center leading-loose gap-4">
          <div className={getActiveClass('/')}>
            <Link href="/">Home</Link>
          </div>
          <div className={getActiveClass('/about')}>
            <Link href="/about">About</Link>
          </div>
          <div className={getActiveClass('/product')}>
            <Link href="/product">Product</Link>
          </div>
          <div className={getActiveClass('/blog')}>
            <Link href="/blog">Blog</Link>
          </div>
          <div className={getActiveClass('/contact')}>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Register / Cart Menu */}
        <div className="sm:flex hidden gap-6 items-center justify-around">
          <div className="absolute -translate-x-[1.35rem] -translate-y-[10px] px-[5.5px] py-[1px] bg-green-500 text-[9px] rounded-full">
            {cart.length}
          </div>
          <button className="cursor-pointer">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <div onClick={() => setIsOpenCart(true)} className="cursor-pointer">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
          {isOpenCart && (
            <div className="overflow-auto">
              <div className="absolute sm:flex hidden z-10 h-screen w-full top-0 right-0 bg-black bg-opacity-50">
                <Cart
                  cart={cart}
                  setIsOpenCart={setIsOpenCart}
                  removeFromCart={removeFromCart}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  showMsg={showMsg}
                  errorMsg={errorMsg}
                  successMsg={successMsg}
                  handleContinue={handleContinue}
                  handleEdit={handleEdit}
                />
              </div>
            </div>
          )}
          <div>
            <Button
              label="Register"
              color="default"
              onClick={handleClick}
              size="small"
              className="rounded-md"
            />
          </div>
        </div>

        <div
          onClick={() => setIsOpenCart(true)}
          className="sm:hidden flex cursor-pointer"
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div className="absolute sm:hidden flex top-[26px] right-6 px-[5.5px] py-[1px] bg-green-500 text-[9px] rounded-full">
          {cart.length}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpenMenu ? 'flex' : 'hidden'
        } sm:hidden flex-col gap-2 p-8 py-4 ${
          isScrolled ? 'bg-white border-t-2' : 'text-white bg-transparent'
        } ease-in-out duration-700 font-semibold absolute top-[5.5rem] left-0 w-full z-50`}
      >
        <div className={getActiveClass('#search')}>
          <button>Search</button>
        </div>
        <div className={getActiveClass('/')}>
          <Link href="/">Home</Link>
        </div>
        <div className={getActiveClass('/about')}>
          <Link href="/about">About</Link>
        </div>
        <div className={getActiveClass('/product')}>
          <Link href="/product">Product</Link>
        </div>
        <div className={getActiveClass('/blog')}>
          <Link href="/blog">Blog</Link>
        </div>
        <div className={getActiveClass('/contact')}>
          <Link href="/contact">Contact</Link>
        </div>
        <div
          className={`${getActiveClass(
            '#contact'
          )} justify-center flex pt-2 pb-4`}
        >
          <button className="pb-2 pt-1 w-1/2 rounded-md hover:bg-green-600 duration-300 shadow-md font-semibold text-white bg-green-500">
            <Link href="/auth/login">Log In</Link>
          </button>
        </div>
      </div>
      {isOpenCart && (
        <div className="overflow-auto">
          <div className="absolute sm:hidden flex z-10 h-screen w-full top-0 right-0 bg-black bg-opacity-50">
            <Cart
              cart={cart}
              setIsOpenCart={setIsOpenCart}
              removeFromCart={removeFromCart}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              showMsg={showMsg}
              errorMsg={errorMsg}
              successMsg={successMsg}
              handleContinue={handleContinue}
              handleEdit={handleEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
