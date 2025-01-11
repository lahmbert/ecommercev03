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

const ProductPage = () => {
  const [showAlert, setShowAlert] = useState(false); // State for showing the alert
  const [alertMessage, setAlertMessage] = useState(''); // State for the alert message
  const [valueQty, setValueQty] = useState({});

  const ourProduct = [
    {
      id: '01',
      name: 'Product 1',
      price: '80000',
      category: 'non coffee',
      link: '/images/a1.jpg',
      stock: '0',
    },
    {
      id: '02',
      name: 'Product 2',
      price: '80000',
      category: 'non coffee',
      link: '/images/a1.jpg',
      stock: '10',
    },
    {
      id: '03',
      name: 'Product 3',
      price: '80000',
      category: 'non coffee',
      link: '/images/a1.jpg',
      stock: '10',
    },
    {
      id: '04',
      name: 'Product 4',
      price: '80000',
      category: 'non coffee',
      link: '/images/a1.jpg',
      stock: '10',
    },
    {
      id: '05',
      name: 'Product 5',
      price: '80000',
      category: 'coffee',
      link: '/images/a1.jpg',
      stock: '10',
    },
    {
      id: '06',
      name: 'Product 6',
      price: '80000',
      category: 'coffee',
      link: '/images/a1.jpg',
      stock: '10',
    },
    {
      id: '07',
      name: 'Product 7',
      price: '80000',
      category: 'coffee',
      link: '/images/a1.jpg',
      stock: '10',
    },
    {
      id: '08',
      name: 'Product 8',
      price: '80000',
      category: 'coffee',
      link: '/images/a1.jpg',
      stock: '10',
    },
  ];

  const [products, setProducts] = useState(ourProduct);

  const handleQtyChange = (productId, newQty) => {
    // Update valueQty untuk produk tertentu
    setValueQty((prev) => ({
      ...prev,
      [productId]: Math.max(0, newQty), // Pastikan nilai tidak negatif
    }));
  };

  const addToCart = (product, qty) => {
    if (product.stock <= 0) {
      setAlertMessage(`${product.name} is out of stock!`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return; // Jika stok habis, hentikan proses
    }

    // Cek apakah stok mencukupi sebelum menambahkan ke cart
    if (product.stock < qty) {
      setAlertMessage(`Insufficient stock for ${product.name}!`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return; // Jika stok tidak mencukupi, hentikan proses
    }

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Jika produk sudah ada di cart, tambahkan qty dan hitung ulang harga total
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].qty += qty;
      updatedCart[existingProductIndex].totalPrice =
        updatedCart[existingProductIndex].price *
        updatedCart[existingProductIndex].qty;
      setCart(updatedCart);
    } else {
      // Jika produk belum ada di cart, tambahkan dengan qty sesuai input
      const newProduct = {
        ...product,
        qty,
        totalPrice: product.price * qty,
      };
      setCart([...cart, newProduct]);
    }

    // Kurangi stok barang berdasarkan qty yang ditambahkan
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, stock: p.stock - qty } : p
    );
    setProducts(updatedProducts);

    // Tampilkan alert saat produk berhasil ditambahkan
    setAlertMessage(`${product.name} added to the cart!`);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false); // Sembunyikan alert setelah 3 detik
    }, 3000);
  };

  const [cart, setCart] = useState([]);

  const [isOpenCart, setIsOpenCart] = useState(false);

  const [cates, setCates] = useState('all');

  useEffect(() => {
    console.log(cates); // Log when cates state changes
  }, [cates]);

  const categories = [
    {
      id: '01',
      name: 'coffee',
    },
    {
      id: '02',
      name: 'non coffee',
    },
  ];

  const [iconChevron, setIconChevron] = useState(false);

  const handleChevron = () => {
    if (!iconChevron) {
      setIconChevron(true);
    } else {
      setIconChevron(false);
    }
  };
  return (
    <div>
      <Navbar
        cart={cart}
        isOpenCart={isOpenCart}
        setIsOpenCart={setIsOpenCart}
        setCart={setCart}
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
              {categories.map((category, i) => (
                <div key={i} className="py-2">
                  <div
                    onClick={() => {
                      setCates(category.name);
                      setIconChevron(!iconChevron);
                    }}
                    className="sm:text-sm text-xs ease-in-out text-slate-600 uppercase font-semibold p-2 duration-300 cursor-pointer w-full hover:bg-slate-200 rounded-md"
                  >
                    {category.name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex flex-row gap-2 items-end borders sm:py-8 py-4 px-2">
          {/* Alert when product is added */}
          {showAlert && (
            <div className="fixed top-[7rem] align-middle bg-green-500 text-white px-4 py-2 rounded-lg">
              {alertMessage}
            </div>
          )}
          <span className="sm:text-2xl text-lg font-bold">Title</span>
          <span className="sm:text-sm text-xs pb-1 font-bold text-slate-400">
            1 Item
          </span>
        </div>
        <div className="grid sm:grid-cols-4 gap-8">
          {products
            .filter((product) => cates === 'all' || product.category === cates) // Show all products if 'cates' is 'all'
            .map((product) => (
              <div
                key={product.id}
                className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.link}
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
                    />
                  </div>
                  <Button
                    onClick={() =>
                      addToCart(product, valueQty[product.id] || 1)
                    }
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
      </section>
      {/* End Section */}

      <Footer />
    </div>
  );
};

export default ProductPage;
