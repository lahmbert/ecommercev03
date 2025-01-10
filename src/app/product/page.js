'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {
  faChevronDown,
  faChevronLeft,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const ProductPage = () => {
  const categories = ['coffee', 'non coffee'];
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
      <Navbar />
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
      <section className="bg-white h-screen sm:px-[12rem] sm:py-16 p-8">
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
                  <div className="sm:text-sm text-xs ease-in-out text-slate-600 uppercase font-semibold p-2 duration-300 cursor-pointer w-full hover:bg-slate-200 rounded-md">
                    {category}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex flex-row gap-2 items-end borders sm:py-8 py-4 px-2">
          <span className="sm:text-2xl text-lg font-bold">Title</span>
          <span className="sm:text-sm text-xs pb-1 font-bold text-slate-400">
            1 Item
          </span>
        </div>
      </section>
      {/* End Section */}

      <Footer />
    </div>
  );
};

export default ProductPage;
