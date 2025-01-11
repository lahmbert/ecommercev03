import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAngleUp,
  faCoffee,
  faPaperPlane,
  faPlane,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show or hide the "Scroll to Top" button based on scroll position
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="bg-green-100">
      <div className="sm:px-[12rem] p-8 py-5">
        <div className="container sm:py-4 py-3">
          <div className="sm:grid flex flex-col grid-cols-5 gap-4 sm:gap-10">
            <div className="sm:col-span-2">
              <h2>
                <a
                  href="/"
                  className="text-xl my-4 font-bold text-gray-800 flex items-center"
                >
                  Logo
                </a>
              </h2>
              <p className="text-gray-600">
                We make the delicious coffee for the coffee lovers. We are a
                team of dedicated coffee fans who celebrate exceptional coffee
                brands and roasters by providing our guests the unique
                opportunity to try coffee drinks.
              </p>
              <div className="pt-4 flex gap-4 text-green-500">
                <FontAwesomeIcon
                  size="2x"
                  className="cursor-pointer hover:text-green-800 duration-300"
                  icon={faFacebookSquare}
                />
                <FontAwesomeIcon
                  size="2x"
                  className="cursor-pointer hover:text-green-800 duration-300"
                  icon={faTwitter}
                />
                <FontAwesomeIcon
                  size="2x"
                  className="cursor-pointer hover:text-green-800 duration-300"
                  icon={faInstagram}
                />
              </div>
            </div>
            <div className="sm:col-span-3 flex flex-col sm:grid sm:grid-cols-2 gap-4">
              <div className="">
                <h6 className="my-4 text-lg font-semibold text-gray-800">
                  Get in Touch
                </h6>
                <div className="sm:pr-4">
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700">
                      Address:{' '}
                    </span>
                    <p className="contact-para inline text-gray-600">
                      2005 Stokes Isle Apt. 896, Coffee Cafe Center, USA.
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">
                      E-mail:{' '}
                    </span>
                    <a
                      href="mailto:info@mail.com"
                      className="text-blue-600 hover:underline"
                    >
                      info@mail.com
                    </a>
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold text-gray-700">Phone: </span>
                    <a
                      href="tel:+(21)-255-886-1234"
                      className="text-blue-600 hover:underline"
                    >
                      +(21)-255-886-1234
                    </a>
                  </div>
                </div>
              </div>
              <div className="">
                <h6 className="my-4 text-lg font-semibold text-gray-800">
                  Newsletter
                </h6>
                <p className="text-gray-600 sm:pr-4">
                  Enter your email and receive the latest news from us. We'll
                  never share your email address.
                </p>
                <form action="#" method="post" className="subscribe flex mt-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    required
                    className="p-1 bg-gray-500 text-slate-100 px-2 placeholder:text-slate-100 rounded-l-md focus:outline-none w-full"
                  />
                  <button className="bg-green-500 text-white p-2 px-3 hover:bg-green-600 duration-300 rounded-r-md">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-copies text-center py-4 bg-gray-800 p-8 text-white">
        <div className="container flex sm:text-base justify-center text-sm gap-1 sm:flex-row flex-col">
          <span className="copy-footer-29">
            &copy; 2019 - {new Date().getFullYear()} Garasi Bincang Coffee. All
            rights reserved
          </span>
          <span>
            Designed by{' '}
            <a href="#polleck" className="text-green-500">
              Polleck
            </a>
          </span>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-green-500 text-white px-2 p-1 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
          title="Go to top"
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </button>
      )}
    </section>
  );
};

export default Footer;
