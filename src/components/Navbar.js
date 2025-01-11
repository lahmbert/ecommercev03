'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faClose,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

const Navbar = ({ cart, setIsOpenCart, isOpenCart, setCart }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    console.log(isOpenCart);

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listeners when component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to run only on mount and unmount

  const pathname = usePathname();

  // Function to get active class
  const getActiveClass = (path) => {
    return pathname === path ? 'text-green-500' : ''; // Adjust the class for active state
  };

  // Function to toggle menu
  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleClick = () => {
    alert('Button clicked!');
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
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
          <div className={getActiveClass('#contact')}>
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
                <div className="absolute z-20 p-8 h-screen w-full sm:w-1/3 top-0 right-0 bg-white">
                  <div className="flex text-black justify-between items-center">
                    <span className="sm:text-2xl text-lg font-bold">
                      Your Cart
                    </span>
                    <span
                      onClick={() => setIsOpenCart(false)}
                      className="text-red-500 cursor-pointer"
                    >
                      <FontAwesomeIcon size="2x" icon={faClose} />
                    </span>
                  </div>

                  {/* Make this part scrollable */}
                  <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                    {cart?.length === 0 ? (
                      <span>Your cart is empty.</span>
                    ) : (
                      cart.map((product, index) => (
                        <div
                          key={index}
                          className="flex py-4 my-4 text-black border-b-2 border-black justify-between items-start"
                        >
                          <div className="flex items-start gap-2 justify-between">
                            <img
                              src={product.link}
                              alt={product.name}
                              className="w-14 h-20"
                            />
                            <div className="flex w-auto flex-col">
                              <div className="flex flex-wrap">
                                {product.name}
                              </div>
                              <div className="w-1/3 flex justify-between pt-4 items-center">
                                <div className="text-xs text-slate-500">
                                  Price: {product.price}
                                </div>
                                <div className="text-xs text-slate-500">
                                  Qty : {product.qty}
                                </div>
                              </div>
                              <div className="text-xs text-slate-500">
                                Total Price : {product.totalPrice}
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={() => removeFromCart(product.id)}
                            className="text-xs cursor-pointer underline text-slate-500"
                          >
                            Remove
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-center pt-2">
                    <Button
                      size="medium"
                      color="default"
                      className="rounded-md"
                      label="Continue"
                    />
                  </div>
                </div>
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
        <div className={getActiveClass('#contact')}>
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
      {isOpenCart ? (
        <div className="absolute z-20 p-8 h-screen w-full sm:w-1/3 top-0 right-0 bg-white">
          <div className="flex text-black justify-between items-center">
            <span className="sm:text-2xl text-lg font-bold">Your Cart</span>
            <span
              onClick={() => setIsOpenCart(false)}
              className="text-red-500 cursor-pointer"
            >
              <FontAwesomeIcon size="2x" icon={faClose} />
            </span>
          </div>

          {/* Make this part scrollable */}
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {cart.length === 0 ? (
              <span>Your cart is empty.</span>
            ) : (
              cart.map((product, index) => (
                <div
                  key={index}
                  className="flex py-4 my-4 text-black border-b-2 border-black justify-between items-start"
                >
                  <div className="grid grid-cols-5  w-full h-full items-start">
                    <div className="col-span-1 flex items-center justify-center h-full w-full">
                      <img
                        src={product.link}
                        alt={product.name}
                        className="h-[90px] object-cover" // Image will cover the space, maintaining aspect ratio
                      />
                    </div>

                    <div className="flex col-span-4 w-full h-full justify-center flex-col">
                      <div className="flex flex-wrap text-lg font-bold capitalize">
                        {product.name}
                      </div>
                      <div className="text-xs pt-4 text-slate-500">
                        Price : {product.price}
                      </div>
                      <div className="text-xs text-slate-500">
                        Qty : {product.qty}
                      </div>
                      <div className="text-xs text-slate-500">
                        Total Price : {product.totalPrice}
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => removeFromCart(product.id)}
                    className="text-xs cursor-pointer underline text-slate-500"
                  >
                    Remove
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center pt-2">
            <Button
              size="medium"
              color="default"
              className="rounded-md"
              label="Continue"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
