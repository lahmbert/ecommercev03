'use client';
import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import './globals.css';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCalendarAlt,
  faCoffee,
  faEye,
  faGlassMartini,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvira,
  faFacebook,
  faInstagram,
  faPagelines,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5; // Jumlah slide yang ada
  const totalImgA = 3; // Jumlah slide yang ada

  const ourGallery = [
    '/images/blog1.jpg',
    '/images/blog2.jpg',
    '/images/blog3.jpg',
    '/images/blog4.jpg',
    '/images/blog5.jpg',
    '/images/blog6.jpg',
    '/images/blog1.jpg',
    '/images/blog2.jpg',
  ];

  const ourService = [
    {
      title: 'Types of Coffee',
      icon: faCoffee,
      desc: 'Vivamus a ligula quam. Ut blandit eu leo non. Duis sed dolor amet ipsum sit el init laore leo et.',
    },
    {
      title: 'Beans Varieties',
      icon: faGlassMartini,
      desc: 'Vivamus a ligula quam. Ut blandit eu leo non. Duis sed dolor amet ipsum sit el init laore leo et.',
    },
    {
      title: 'Coffee and Pastry',
      icon: faPagelines,
      desc: 'Vivamus a ligula quam. Ut blandit eu leo non. Duis sed dolor amet ipsum sit el init laore leo et.',
    },
    {
      title: 'Coffee to go',
      icon: faEnvira,
      desc: 'Vivamus a ligula quam. Ut blandit eu leo non. Duis sed dolor amet ipsum sit el init laore leo et.',
    },
  ];

  const banner = [
    {
      header: 'The Morning Essential',
      desc: "Coffee is the perfect companion to start your day. With its rich aroma and robust flavor, it awakens your senses and energizes you for the challenges ahead. Whether brewed strong or mild, it's the ritual that sets the tone for the day.",
    },
    {
      header: 'A World of Flavors',
      desc: 'Coffee is a global treasure, offering diverse tastes from every corner of the world. Ethiopian beans bring fruity and floral notes, while Colombian coffee delivers a nutty sweetness. Each cup is a journey through unique landscapes and cultures.',
    },
    {
      header: 'The Art of Brewing',
      desc: 'From a classic espresso shot to a slow drip pour-over, brewing coffee is a craft that blends precision and passion. Every method brings out different layers of flavor, making each sip a testament to the beauty of experimentation.',
    },
    {
      header: 'A Social Bond',
      desc: "Coffee has a way of bringing people together. From cozy cafés to bustling meetings, it's a catalyst for conversations and connections. Sharing a cup of coffee often leads to shared moments, stories, and memories.",
    },
    {
      header: 'Liquid Comfort',
      desc: "There's something deeply comforting about holding a warm cup of coffee. Its familiar taste soothes the soul, providing a moment of relaxation amidst a busy day. Coffee isn't just a drink; it's a small escape in a cup.",
    },
  ];

  const ouProduct = [
    {
      img: '/images/a1.jpg',
      name: 'Product 1',
      desc: 'Consectur elit, sed do elusmod tempor sed et dolor init',
    },
    {
      img: '/images/a2.jpg',
      name: 'Product 2',
      desc: 'Consectur elit, sed do elusmod tempor sed et dolor init',
    },
    {
      img: '/images/a3.jpg',
      name: 'Product 3',
      desc: 'Consectur elit, sed do elusmod tempor sed et dolor init',
    },
  ];

  const ourTestimonials = [
    {
      image: '/images/team1.jpg',
      name: 'Dennis Wilson',
      desc: 'Lorem ipsum dolor sit amet int consectetur adipisicing elit. Velita beatae laudantium Quas minima sunt natus tempore, maiores aliquid modi felis vitae facere aperiam sequi optio lacinia id ipsum non velit, culpa. voluptate rem ullam dolore nisi est quasi, doloribus tempora.',
      facebook: '#facebook',
      twitter: '#twitter',
      instagram: '#instagram',
    },
    {
      image: '/images/team2.jpg',
      name: 'Tommy Sakura',
      desc: 'Lorem ipsum dolor sit amet int consectetur adipisicing elit. Velita beatae laudantium Quas minima sunt natus tempore, maiores aliquid modi felis vitae facere aperiam sequi optio lacinia id ipsum non velit, culpa. voluptate rem ullam dolore nisi est quasi, doloribus tempora.',
      facebook: '#facebook',
      twitter: '#twitter',
      instagram: '#instagram',
    },
    {
      image: '/images/team3.jpg',
      name: 'Roy Linderson',
      desc: 'Lorem ipsum dolor sit amet int consectetur adipisicing elit. Velita beatae laudantium Quas minima sunt natus tempore, maiores aliquid modi felis vitae facere aperiam sequi optio lacinia id ipsum non velit, culpa. voluptate rem ullam dolore nisi est quasi, doloribus tempora.',
      facebook: '#facebook',
      twitter: '#twitter',
      instagram: '#instagram',
    },
    {
      image: '/images/team4.jpg',
      name: 'Mike Thyson',
      desc: 'Lorem ipsum dolor sit amet int consectetur adipisicing elit. Velita beatae laudantium Quas minima sunt natus tempore, maiores aliquid modi felis vitae facere aperiam sequi optio lacinia id ipsum non velit, culpa. voluptate rem ullam dolore nisi est quasi, doloribus tempora.',
      facebook: '#facebook',
      twitter: '#twitter',
      instagram: '#instagram',
    },
  ];

  const ourBlogs = [
    {
      imgSrc: '/images/blog1.jpg',
      title: 'Advantages and Disadvantages of Coffee',
      description: 'Lorem ipsum dolor sit, amet consectetur elit...',
      date: '07.11.2020',
    },
    {
      imgSrc: '/images/blog4.jpg',
      title: 'Brewing Methods of Coffee',
      description: 'Lorem ipsum dolor sit, amet consectetur elit...',
      date: '07.11.2020',
      freeBadge: true,
    },
    {
      imgSrc: '/images/blog3.jpg',
      title: 'Which Coffee Creamer is healthiest?',
      description: 'Lorem ipsum dolor sit, amet consectetur elit...',
      date: '07.11.2020',
      newBadge: true,
    },
    {
      imgSrc: '/images/blog2.jpg',
      title: 'Is coffee mate coffee creamer?',
      description: 'Lorem ipsum dolor sit, amet consectetur elit...',
      date: '07.11.2020',
    },
    {
      imgSrc: '/images/blog5.jpg',
      title: 'Coffee Roasts from Light to Dark',
      description: 'Lorem ipsum dolor sit, amet consectetur elit...',
      date: '07.11.2020',
    },
    {
      imgSrc: '/images/blog6.jpg',
      title: 'Why we are unique? Who are behind the Taste',
      description: 'Lorem ipsum dolor sit, amet consectetur elit...',
      date: '07.11.2020',
    },
  ];

  const [currentPages, setCurrentPages] = useState(0);
  const itemsPerPage = 2; // Show 2 items at a time

  // Calculate the total number of pages based on the number of blogs and items per page
  const totalPages = Math.ceil(ourBlogs.length / itemsPerPage);

  // Function to move to the next page
  const nextPage = () => {
    setCurrentPages((prevIndex) => (prevIndex + 1) % totalPages);
  };

  // Function to move to the previous page
  const prevPage = () => {
    setCurrentPages((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  // Slice the array to show the correct number of items for the current page
  const displayedBlogs = ourBlogs.slice(
    currentPages * itemsPerPage,
    (currentPages + 1) * itemsPerPage
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlideTesti = () => {
    setCurrentIndex((prev) => (prev + 1) % ourTestimonials.length);
  };

  const prevSlideTesti = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + ourTestimonials.length) % ourTestimonials.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const [cart, setCart] = useState([]);

  const [isOpenCart, setIsOpenCart] = useState(false);

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-gray-50">
      <Navbar
        cart={cart}
        isOpenCart={isOpenCart}
        setIsOpenCart={setIsOpenCart}
        setCart={setCart}
      />
      {/* Banner Section */}
      <section className="-translate-y-[6.3rem] ease-in-out duration-700 ">
        <div
          id="default-carousel"
          className="relative w-full sm:h-[95vh] top-2 sm:top-0 sm:px-0"
        >
          <div className="relative overflow-hidden w-full h-[50vh] sm:h-[100vh]">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {banner.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 relative"
                  style={{ height: 'inherit' }}
                >
                  <img
                    src={`/images/banner${index + 1}.jpg`}
                    className="block w-full sm:h-full h-screen object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                  <div className="absolute sm:-translate-y-0 -translate-y-[11rem] inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 p-4">
                    <header className="text-xl sm:text-4xl font-bold mb-4">
                      {slide.header}
                    </header>
                    <p className="text-xs w-3/4 sm:text-xl mb-6">
                      {slide.desc}
                    </p>
                    <button className="sm:px-6 px-4 p-2 sm:py-3 bg-green-500 duration-300 text-white sm:text-base text-xs font-semibold rounded-lg hover:bg-green-600">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            {banner.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-green-500' : 'bg-white'
                }`}
                aria-current={currentSlide === index ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute top-0 sm:start-0 start-2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute top-0 sm:end-0 end-2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </section>
      {/* End Section */}

      {/* Section who we are */}
      <section
        className={`sm:px-[12rem] sm:h-[80vh] ease-in-out duration-700 transform transition-all -translate-y-[4rem] flex items-center pt-0 p-8`}
      >
        <div className="sm:grid grid-cols-7 flex gap-8 sm:gap-0 flex-wrap h-full">
          <div className="col-span-2 h-full p-4 flex flex-col gap-4 justify-center">
            <div className="text-slate-400 uppercase font-bold text-xs sm:text-sm">
              best for you
            </div>
            <div className="sm:text-3xl text-xl text-slate-800 font-bold">
              Who we are.
            </div>
            <div className="text-slate-500 sm:text-base text-sm">
              We make a delicious coffee for the coffee lovers. We are a team of
              dedicated coffee fans who celebrate exceptional coffee brand and
              roasters.
            </div>
            <div className="w-1/2">
              <Button
                color="default"
                className="rounded-lg"
                size="medium"
                label="Learn More"
              />
            </div>
          </div>
          <div className="col-span-5 flex sm:flex-row flex-col items-center justify-around gap-6 text-center">
            {Array.from({ length: totalImgA }, (_, i) => (
              <div key={i}>
                <img
                  src={`/images/a${i + 1}.jpg`}
                  alt={`Slide ${i + 1}`}
                  className="rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Section */}

      {/* Product Section */}
      <section className="sm:px-[12rem] flex flex-col  justify-center items-center sm:h-[80vh] p-8 sm:py-14">
        <div className="flex flex-col items-center mb-24 w-full justify-center relative">
          <div className="border-b-4 border-slate-500 w-full"></div>
          <div className="absolute sm:-top-5 -top-[.8rem] bg-gray-50 border-x-4 border-gray-500 flex justify-center items-center w-1/2 sm:w-1/4 px-2 left-1/2 transform -translate-x-1/2">
            <span className="text-center sm:text-4xl text-2xl capitalize font-bold">
              Our Product
            </span>
          </div>
        </div>
        <div className="flex flex-wrap sm:grid sm:grid-cols-3 gap-6">
          {ouProduct.map((product, index) => (
            <div key={index} className=" shadow-md bg-white rounded-lg">
              <img
                src={product.img}
                alt={product.name}
                className="w-full rounded-t-lg h-[20rem] object-cover mb-4"
              />
              <div className="p-8">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-600">{product.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* End Section */}

      {/* Service Section */}
      <section className="sm:px-[12rem] sm:h-[87vh] flex items-center sm:py-14 p-8">
        <div className="sm:grid grid-cols-7 flex gap-8 sm:gap-0 flex-wrap h-full">
          <div className="col-span-3 h-full p-4 flex flex-col gap-4 justify-center">
            <div className="text-slate-400 uppercase font-bold sm:text-sm text-xs">
              blend coffee
            </div>
            <div className="sm:text-3xl text-xl text-slate-800 font-bold">
              Our Sevices.
            </div>
            <div className="text-slate-500 text-sm sm:text-base">
              <p className="pb-4">
                Sed vehicula tortor ut sapien maximus, eu gravida turpis
                fermentum. Nulla viverra, velit ac scelerisque ullamcorper,
                libero neque tempor eros, at varius orci libero in felis.
                Integer ac velit leo. Fusce dictum metus ut est faucibus, sed
                egestas purus suscipit.
              </p>
              <p>
                Nam faucibus sollicitudin elit, ut tempor turpis tincidunt non.
                Cras imperdiet, purus at ullamcorper vehicula, lectus justo
                laoreet risus.
              </p>
            </div>
            <div className="w-1/2">
              <Button
                color="default"
                className="rounded-lg"
                size="medium"
                label="Learn More"
              />
            </div>
          </div>
          <div className="sm:grid col-span-4 sm:py-12 flex flex-col justify-center items-center sm:grid-cols-2 gap-6">
            {ourService.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center sm:w-auto justify-center w-6/7 text-center p-4 rounded-lg"
              >
                {/* Icon */}
                <div className="text-green-500">
                  <FontAwesomeIcon icon={service.icon} size="2x" />
                </div>

                {/* Title */}
                <div className="font-bold text-lg py-4 sm:py-6">
                  {service.title}
                </div>

                {/* Description */}
                <p className="text-gray-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* End Section */}

      {/* Galery Section */}
      <section className="sm:px-[12rem] flex flex-col bg-gray-100  justify-center items-center p-8 sm:py-24">
        <div className="flex flex-col items-center text-center mb-14 w-full justify-center relative">
          {/* Garis */}
          <div className="border-b-4 border-gray-500 w-full absolute top-1/2 -translate-y-1/2"></div>

          {/* Judul Kecil */}
          <div className="sm:text-sm text-xs font-bold bg-gray-100 border-x-4 sm:w-4/12 w-7/12 border-gray-500 px-2 z-10 text-gray-500 uppercase">
            coffee gallery
          </div>

          {/* Judul Utama */}
          <div className="sm:text-3xl text-xl font-bold bg-gray-100 sm:w-4/12 w-7/12 border-x-4 border-gray-500 px-4 z-20 text-gray-700 pt-2 capitalize">
            portfolio gallery
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {ourGallery.map((image, index) => (
            <div key={index} className=" p-2">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto rounded"
              />
            </div>
          ))}
        </div>
      </section>
      {/* End Section */}

      {/* Testimonials Section */}
      <section className="sm:px-[12rem] flex flex-col bg-gray-100  justify-center items-center p-8 pb-20">
        <div className="flex flex-col items-center text-center sm:mb-12 mb-10 w-full justify-center relative">
          {/* Garis */}
          <div className="border-b-4 border-gray-500 w-full absolute top-1/2 -translate-y-1/2"></div>

          {/* Judul Kecil */}
          <div className="sm:text-sm text-xs font-bold bg-gray-100 border-x-4 sm:w-2/5 w-7/12 border-gray-500 px-2 z-10 text-gray-500 uppercase">
            Testimonials
          </div>

          {/* Judul Utama */}
          <div className="sm:text-3xl text-xl font-bold bg-gray-100 sm:w-2/5 pb-2 w-7/12 border-x-4 border-gray-500 px-4 z-20 text-gray-700 pt-2 capitalize">
            what our custumers say
          </div>
        </div>
        <div className="relative sm:w-3/4 w-full mx-auto p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-700 ease-in-out">
            <div className="flex justify-center mb-6">
              <img
                src={ourTestimonials[currentIndex].image}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover transition-all duration-700 ease-in-out"
                alt="client-img"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3">
                {ourTestimonials[currentIndex].name}
              </h3>
              <blockquote className="text-gray-600 italic mb-4">
                <q>{ourTestimonials[currentIndex].desc}</q>
              </blockquote>
              <ul className="flex justify-center space-x-6">
                <li>
                  <a
                    href={ourTestimonials[currentIndex].facebook}
                    className="text-blue-600"
                  >
                    <FontAwesomeIcon
                      className="text-green-500 hover:text-gray-600"
                      icon={faFacebook}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={ourTestimonials[currentIndex].twitter}
                    className="text-blue-400"
                  >
                    <FontAwesomeIcon
                      className="text-green-500 hover:text-gray-600"
                      icon={faTwitter}
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={ourTestimonials[currentIndex].instagram}
                    className="text-pink-500"
                  >
                    <FontAwesomeIcon
                      className="text-green-500 hover:text-gray-600"
                      icon={faInstagram}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="absolute sm:top-1/2 top-1/3 left-4 right-4 flex justify-between transform -translate-y-1/2 px-6">
            <button
              className="bg-green-500 text-white p-2 px-3 rounded-full shadow-lg hover:bg-green-600"
              onClick={prevSlideTesti}
            >
              &#8592;
            </button>
            <button
              className="bg-green-500 text-white p-2 px-3 rounded-full shadow-lg hover:bg-green-600"
              onClick={nextSlideTesti}
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>
      {/* End Section */}

      {/* Blogs Section */}
      <section className="sm:px-[12rem] flex flex-col bg-gray-100  justify-center items-center p-8 pb-20">
        <div className="flex flex-col items-center text-center sm:mb-12 mb-10 w-full justify-center relative">
          {/* Garis */}
          <div className="border-b-4 border-gray-500 w-full absolute top-1/2 -translate-y-1/2"></div>

          {/* Judul Kecil */}
          <div className="sm:text-sm text-xs font-bold bg-gray-100 border-x-4 sm:w-2/5 w-7/12 border-gray-500 px-2 z-10 text-gray-500 uppercase">
            our coffee blog
          </div>

          {/* Judul Utama */}
          <div className="sm:text-3xl text-xl font-bold bg-gray-100 sm:w-2/5 pb-2 w-7/12 border-x-4 border-gray-500 px-4 z-20 text-gray-700 pt-2 capitalize">
            latest blog post
          </div>
        </div>
        <div className="relative w-full">
          <div className="sm:grid sm:grid-cols-2 flex flex-wrap w-full justify-center gap-6">
            {displayedBlogs.map((blog, index) => (
              <div
                className="bg-white shadow-lg ease-in-out duration-700 rounded-lg overflow-hidden w-full"
                key={index}
              >
                <div className="relative">
                  <div className="zoom">
                    <a href="#blog-single">
                      <img
                        className="w-full hover:scale-125 duration-500 h-auto"
                        src={blog.imgSrc}
                        alt="Card image cap"
                      />
                    </a>
                  </div>
                  {blog.freeBadge && (
                    <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-2 py-1">
                      Free
                    </div>
                  )}
                  {blog.newBadge && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1">
                      New
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="text-lg font-semibold">
                    <a href="#blog-single">{blog.title}</a>
                  </div>
                  <p className="mt-3 text-gray-600">{blog.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="bg-green-500 hover:bg-green-600 sm:text-base text-sm duration-300 rounded-md px-4 py-2 text-white">
                      <a href="#blog-single" className="text-white">
                        Read more
                      </a>
                    </div>
                    <div className="flex sm:space-x-4 space-x-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          className="text-green-500"
                          icon={faHeart}
                        />
                        <span className="ml-1">24</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          className="text-green-500"
                          icon={faEye}
                        />
                        <span className="ml-1">125</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          className="text-green-500"
                          icon={faCalendarAlt}
                        />
                        <span className="ml-1">{blog.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Optional: Show pagination dots */}
          <div className="flex justify-center  my-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentPages === index ? 'bg-green-500' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentPages(index)}
              ></button>
            ))}
          </div>

          {/* Pagination Button */}
          <div className="flex  justify-center my-5">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-l-md"
              onClick={prevPage}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-r-md"
              onClick={nextPage}
            >
              Next
            </button>
          </div>

          {/* To All BlogPost */}
          <div className="mt-5 text-center">
            <p className="mt-4 flex sm:flex-row flex-col text-gray-500 sm:gap-1 gap-2 justify-center pt-3 ">
              Our team members also write interesting articles on everything
              concerning coffee.
              <a className="text-green-500 font-semibold" href="#blog">
                View All blog posts <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </p>
          </div>
        </div>
      </section>
      {/* End Section */}

      {/* Section selanjutnya */}
      <Footer />
    </div>
  );
}
