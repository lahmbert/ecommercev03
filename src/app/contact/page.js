'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { faMailchimp } from '@fortawesome/free-brands-svg-icons';
import {
  faClock,
  faClockFour,
  faClockRotateLeft,
  faEnvelope,
  faLocation,
  faLocationArrow,
  faLocationPin,
  faLocationPinLock,
  faMailBulk,
  faMapLocation,
  faMapLocationDot,
  faMessage,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const ContactPage = () => {
  const [cart, setCart] = useState([]);

  const [isOpenCart, setIsOpenCart] = useState(false);
  return (
    <div>
      <Navbar
        cart={cart}
        isOpenCart={isOpenCart}
        setIsOpenCart={setIsOpenCart}
        setCart={setCart}
      />
      {/* Banner Section */}
      <section>
        <div className="absolute -z-10 -translate-y-[6.5rem]">
          <img className="" src="/images/innerbg.jpg" />
        </div>
        <div className="capitalize sm:-translate-y-0 -translate-y-14 font-bold sm:text-[3rem] flex justify-center sm:px-[12rem] text-white p-8 py-[5rem]">
          About us
        </div>
      </section>
      {/* End Section */}

      {/* Contact Section */}
      <section className="sm:px-[12rem] px-8 bg-white py-10 sm:py-[6rem]">
        <div className="sm:grid font-semibold grid-cols-3 gap-10">
          <div className="flex gap-8 items-start">
            <span>
              <FontAwesomeIcon
                size="3x"
                className="text-green-500 opacity-50"
                icon={faMapLocationDot}
              />
            </span>
            <span className="">
              <span className="sm:text-2xl text-lg font-bold">
                Address Info
              </span>
              <p className="pt-4 text-slate-500">
                Coffee bean, 343 cafe coffee lane, #2214 cravel street, NY.
              </p>
            </span>
          </div>
          <div className="flex gap-8 items-start">
            <span>
              <FontAwesomeIcon
                size="3x"
                className="text-green-500 opacity-50"
                icon={faClock}
              />
            </span>
            <span className="">
              <span className="sm:text-2xl text-lg font-bold">
                Opening hours
              </span>
              <p className="pt-4 text-slate-500">
                Monday – Friday : 9am - 6pm <br /> Saturday : 10am - 4pm
              </p>
            </span>
          </div>
          <div className="flex gap-8 items-start">
            <span>
              <FontAwesomeIcon
                size="3x"
                className="text-green-500 opacity-50"
                icon={faEnvelope}
              />
            </span>
            <span className="">
              <span className="sm:text-2xl text-lg font-bold">
                Contact info
              </span>
              <p className="pt-4 text-slate-500">
                +1(21) 234 4567
                <br />
                info@support.com
              </p>
            </span>
          </div>
        </div>
        <div className="sm:grid sm:pt-10 grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full rounded-md">
            <iframe
              className="rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.796614047518!2d119.50873557502969!3d-5.136424294840746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee56ab6ae1bd5%3A0xcbed7e0cba6d212e!2sGARASI%20BINCANG%20COFFEE!5e0!3m2!1sen!2sid!4v1736592730310!5m2!1sen!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
          <form>
            <div className="flex bg-slate-100 flex-col border rounded-md h-full space-y-8 justify-center items-end px-4">
              <input
                type="text"
                placeholder="Your Name"
                className="p-2 focus:outline-none border rounded-md w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 focus:outline-none border rounded-md w-full"
              />
              <textarea
                placeholder="Your Message"
                className="p-2 focus:outline-none  border rounded-md w-full"
                rows="4"
              />
              <div className="flex w-1/3 justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* End Section */}
      <Footer />
    </div>
  );
};

export default ContactPage;
