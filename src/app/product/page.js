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
  const ourProduct = [
    {
      id: '01',
      name: 'Product 1',
      price: '80000',
      category: 'non coffee',
      link: '/images/a1.jpg',
      stock: '10',
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

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // If product exists, update its qty and total price
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].qty += 1;
      updatedCart[existingProductIndex].totalPrice =
        updatedCart[existingProductIndex].price *
        updatedCart[existingProductIndex].qty;
      setCart(updatedCart);
    } else {
      // If product doesn't exist, add it to the cart with qty 1 and calculate total price
      const newProduct = {
        ...product,
        qty: 1,
        totalPrice: parseInt(product.price, 10),
      };
      setCart([...cart, newProduct]);
    }

    // Show the alert when product is added
    setAlertMessage(`${product.name} added to the cart!`);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false); // Hide the alert after 3 seconds
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
          {ourProduct
            .filter((product) => cates === 'all' || product.category === cates) // Show all products if 'cates' is 'all'
            .map((product) => (
              <div key={product.id} className="border rounded-lg shadow-md">
                <img
                  src={product.link}
                  className="w-full rounded-t-md h-[20rem]"
                  alt={product.name}
                />
                <div className="p-4 flex flex-col">
                  <span className="sm:text-2xl text-xl font-bold">
                    {product.name}
                  </span>
                  <span className="pt-2 text-sm font-semibold text-slate-400">
                    Stock: {product.stock}
                  </span>
                  <div className="flex items-center py-4 justify-between">
                    <span className="sm:text-sm text-xs font-semibold">
                      Rp {product.price}
                    </span>
                    <Button
                      onClick={() => addToCart(product)}
                      color="default"
                      className="rounded-md capitalize"
                      size="small"
                      label={<FontAwesomeIcon icon={faShoppingCart} />}
                    />
                  </div>
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
