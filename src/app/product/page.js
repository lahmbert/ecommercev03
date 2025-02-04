'use client';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {
  faChevronDown,
  faChevronLeft,
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import supabase from '../lib/Supabase';
import { fetchCategoeries } from '@/api/fetchcategory';
import { fetchProducts } from '@/api/fetchproduct';
import { fetchCart } from '@/api/fetchCart';

const ProductPage = () => {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cates, setCates] = useState('all');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [iconChevron, setIconChevron] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert
  const [alertMessage, setAlertMessage] = useState(''); // State for the alert message
  const [valueQty, setValueQty] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const handleChevron = () => {
    if (!iconChevron) {
      setIconChevron(true);
    } else {
      setIconChevron(false);
    }
  };

  const handleQtyChange = (productId, newQty) => {
    // Update valueQty untuk produk tertentu
    setValueQty((prev) => ({
      ...prev,
      [productId]: Math.max(0, newQty), // Pastikan nilai tidak negatif
    }));
  };

  const addToCart = async (product, qty) => {
    try {
      // Mengambil informasi pengguna dari Supabase Auth
      const { data: globalUser, error: globalUserError } =
        await supabase.auth.getUser();
      if (globalUserError) {
        setAlertMessage('Please Login First!.');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }
      const userEmail = globalUser.user.email; // Mendapatkan email pengguna

      // Mendapatkan user_id dari tabel users berdasarkan email
      const { data: publicUser, error: publicUserError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (publicUserError) {
        console.error('Error fetching users items:', publicUserError);
        return;
      }

      const userId = publicUser.id; // ID pengguna

      // Cek apakah produk habis
      if (product.stock <= 0) {
        setAlertMessage(`${product.name} is out of stock!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }

      // Cek apakah kuantitas melebihi stok
      if (product.stock < qty) {
        setAlertMessage(`Insufficient stock for ${product.name}!`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }

      // Cek apakah user sudah memiliki cart
      let { data: cartData, error: cartError } = await supabase
        .from('cart')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (cartError || !cartData) {
        // Jika tidak ada cart, buat cart baru
        const { error: newCartError } = await supabase
          .from('cart')
          .insert([{ user_id: userId }])
          .single();

        if (newCartError) {
          console.error('Error creating cart:', newCartError);
          return;
        }

        let { data: newCartData, error: newCartDataError } = await supabase
          .from('cart')
          .select('id')
          .eq('user_id', userId)
          .single();

        if (newCartDataError) {
          console.error('Cart Belum Masuk', newCartDataError);
        }
        cartData = newCartData;
      }

      // Cek apakah produk sudah ada di cart
      const { data: cartItems, error: cartItemsError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('cart_id', cartData.id)
        .eq('product_id', product.id)
        .single();

      if (cartItemsError && cartItemsError.code !== 'PGRST116') {
        return;
      }

      // Jika produk sudah ada, perbarui kuantitas
      if (cartItems) {
        const updatedQuantity = cartItems.quantity + qty;

        const { error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: updatedQuantity })
          .eq('id', cartItems.id);

        if (updateError) {
          console.error('Error updating cart item:', updateError);
          return;
        }
      } else {
        // Jika produk belum ada di cart, tambahkan produk baru

        const { error: insertError } = await supabase
          .from('cart_items')
          .insert([
            {
              cart_id: cartData.id,
              product_id: product.id,
              quantity: qty,
            },
          ]);

        if (insertError) {
          console.error('Error adding cart item:', insertError);
          return;
        }
      }

      // Update state cart dengan data terbaru

      // Tampilkan pesan bahwa produk berhasil ditambahkan ke cart
      setAlertMessage(`${product.name} added to the cart!`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      fetchCart(setCart);
    } catch (err) {
      console.error('Error adding to cart:', err);
      setAlertMessage('Something went wrong. Please try again.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      const fetchCategories = await fetchCategoeries();
      setCategories(fetchCategories);
      setLoading(false);
    };

    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadCategories();
    loadProducts(); // Log when cates state changes
  }, [cates]);

  const itemsPerPage = 8; // Tentukan jumlah produk per halaman
  const [currentPage, setCurrentPage] = useState(1); // Halaman yang aktif

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProducts = products.filter(
    (product) => cates === 'all' || product.category_id === cates
  );

  // Menghitung jumlah total halaman
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Mengambil produk yang akan ditampilkan pada halaman saat ini
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Fungsi untuk berpindah ke halaman sebelumnya
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fungsi untuk berpindah ke halaman berikutnya
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Menampilkan produk yang sesuai dengan halaman aktif
  const currentPageProducts = getCurrentPageProducts();

  return (
    <div>
      <Navbar
        cart={cart}
        setCart={setCart}
        isOpenCart={isOpenCart}
        products={products}
        setIsOpenCart={setIsOpenCart}
        setProducts={setProducts}
      />
      {/* Inner Section */}
      <section>
        <div className="absolute -z-10 -translate-y-[6.5rem]">
          <img className="" src="/images/innerbg.jpg" />
        </div>
        <div className="capitalize font-bold sm:text-[3rem] sm:-translate-y-0 -translate-y-14 flex justify-center sm:px-[12rem] text-white p-8 py-[5rem]">
          Our Product
        </div>
      </section>
      {/* End Section */}

      {/* Fetch Product Section */}
      <section className="bg-white sm:px-[12rem] sm:py-16 p-8">
        <div className="border-slate-300 flex sm:gap-8 gap-4 justify-between px-2 items-center border-b-2 py-2">
          <div className="border-x border-slate-600  items-center w-[15rem]  sm:w-[20rem] px-4 flex justify-between">
            <div className="uppercase sm:text-sm text-xs font-bold text-slate-700">
              Categories
            </div>
            <div>
              <FontAwesomeIcon
                onClick={handleChevron}
                className="cursor-pointer text-slate-500 ease-in-out duration-500"
                icon={iconChevron ? faChevronDown : faChevronLeft}
              />
            </div>
          </div>
          <div className="w-full flex gap-2 items-center">
            <input
              className="w-full text-slate-600 p-1 focus:outline-none"
              placeholder="Input Search..."
            />
            <FontAwesomeIcon
              className="cursor-pointer text-slate-700"
              icon={faSearch}
            />
          </div>
        </div>
        <div>
          {iconChevron && categories.length > 0 ? (
            <div className="absolute ease-in-out duration-500 flex bg-white rounded-sm mx-2 p-4 sm:w-[15.5rem] w-[9rem] shadow-md border flex-col">
              {['all', ...categories].map((category, i) => (
                <div key={i} className="py-2">
                  <div
                    onClick={() => {
                      setCates(category === 'all' ? 'all' : category.id); // Menangani kategori 'all'
                      setIconChevron(!iconChevron);
                    }}
                    className="sm:text-sm text-xs ease-in-out text-slate-600 uppercase font-semibold p-2 duration-300 cursor-pointer w-full hover:bg-slate-200 rounded-md"
                  >
                    {category === 'all' ? 'All Categories' : category.name}{' '}
                    {/* Menampilkan nama kategori */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            loading
          )}
        </div>
        <div className="flex flex-row gap-2 items-end borders sm:py-8 py-4 px-2">
          {/* Alert when product is added */}
          {showAlert && (
            <div className="fixed top-[7rem] align-middle bg-green-500 text-white px-4 py-2 rounded-lg">
              {alertMessage}
            </div>
          )}
          <span className="sm:text-2xl text-lg font-bold uppercase">
            {cates === 'all'
              ? 'all product'
              : cates === 1
              ? 'coffee'
              : 'non coffee'}
          </span>
          <span className="sm:text-sm text-xs pb-1 font-bold text-slate-400">
            {
              products.filter(
                (product) => cates === 'all' || product.category_id === cates
              ).length
            }{' '}
            Items
          </span>
        </div>
        <div className="grid sm:grid-cols-4 gap-8">
          {currentPageProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image_url}
                className="w-full rounded-t-lg h-[20rem] object-cover"
                alt={product.name}
              />
              <div className="p-4 flex flex-col gap-3">
                <span className="text-xl font-bold text-gray-800">
                  {product.name}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  Stock: {product.stock}
                </span>
                <div className="flex items-center justify-between py-2">
                  <span className="text-base font-semibold text-green-600">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    className="focus:outline-none bg-gray-100 rounded-sm sm:pl-4 text-sm w-16 border border-gray-300 text-center"
                    value={valueQty[product.id] || 1}
                    onChange={(e) =>
                      handleQtyChange(product.id, parseInt(e.target.value))
                    }
                    min={1}
                    max={product.stock}
                  />
                </div>
                <Button
                  onClick={() => addToCart(product, valueQty[product.id] || 1)}
                  color="default"
                  className="rounded-md bg-green-500 mb-4 hover:bg-green-600 text-white capitalize py-2"
                  size="small"
                  label={
                    <div className="flex gap-2 items-center justify-center">
                      <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
                    </div>
                  }
                />
              </div>
            </div>
          ))}
        </div>
        {/* Navigasi Paginasi */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white disabled:hover:bg-green-500 rounded-md"
            label="Previous"
            color="default"
          />
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white disabled:hover:bg-green-500 rounded-md"
            label="Next"
            color="default"
          />
        </div>
      </section>
      {/* End Section */}

      <Footer />
    </div>
  );
};

export default ProductPage;
