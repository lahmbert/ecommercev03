'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
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
          <div className="cursor-pointer">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div className="cursor-pointer">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
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

        <div className="font-bold sm:hidden flex">Login</div>
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
    </div>
  );
};

export default Navbar;
