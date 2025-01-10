'use client';

import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import {
  faFacebook,
  faInstagram,
  faPagelines,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faGlassMartini } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  const fearureAbout = [
    {
      icon: faCoffee,
      header: 'Aroma, Taste and Flavour',
      desc: 'Coffee has a distinctive aroma, which is easily recognizable. Ut blandit eu leo non. Duis sed dolor amet ipsum sit et init laore leo et.',
    },
    {
      icon: faGlassMartini,
      header: 'Composition of coffee',
      desc: 'Coffee has a distinctive aroma, which is easily recognizable. Ut blandit eu leo non. Duis sed dolor amet ipsum sit et init laore leo et.',
    },
    {
      icon: faPagelines,
      header: 'Physcological Effects',
      desc: 'Coffee has a distinctive aroma, which is easily recognizable. Ut blandit eu leo non. Duis sed dolor amet ipsum sit et init laore leo et.',
    },
  ];

  const ourTeams = [
    {
      image: '/images/team1.jpg',
      name: 'Suzan Lois',
      job: 'Barista at coffeebean',
      link: '#',
    },
    {
      image: '/images/team2.jpg',
      name: 'Dora Caelan',
      job: 'Barista at coffeebean',
      link: '#',
    },
    {
      image: '/images/team3.jpg',
      name: 'Rosanna Pattie',
      job: 'Barista at coffeebean',
      link: '#',
    },
    {
      image: '/images/team4.jpg',
      name: 'Rose Alpha',
      job: 'Barista at coffeebean',
      link: '#',
    },
  ];
  return (
    <div>
      <Navbar />
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

      {/* Section who we are */}
      <section
        className={`sm:px-[12rem] bg-white sm:py-[6rem] sm:-translate-y-0 ease-in-out duration-700 transform transition-all flex items-center p-8`}
      >
        <div className="sm:grid grid-cols-3 w-full flex gap-8 sm:gap-0 flex-wrap h-full">
          <div className="col-span-2 h-full p-5 w-full sm:pr-6 flex flex-col gap-4 justify-center">
            <div className="text-slate-400 uppercase font-bold text-xs sm:text-sm">
              best for you
            </div>
            <div className="sm:text-3xl text-xl text-slate-800 font-bold">
              What we're all about
            </div>
            <div className="text-slate-500 sm:text-base py-6 text-sm">
              We have 25+ years of experience."Our only Aim, Happy Customers. At
              the end of the day, it all comes down to coffee. But to get there
              it takes a dedicated, knowledgeable team with a sustainable
              approach. We make the delicious coffee for the coffee lovers. We
              are a team of dedicated coffee fans who celebrate exceptional
              coffee brands. We provide a variety of services both to our new
              and regular customers. All your favourites, delivered straight to
              you.
            </div>
            <div className="w-1/2">
              <Button
                color="default"
                className="rounded-lg sm:w-auto"
                size="medium"
                label="Learn More"
              />
            </div>
          </div>
          <div className="sm:col-span-1 flex sm:flex-row flex-col items-center justify-around gap-6 text-center">
            <img className="rounded-md" src="/images/about.jpg" />
          </div>
        </div>
      </section>
      {/* End Section */}

      {/* Section Provide */}
      <section
        className={`sm:px-[12rem] sm:py-[6rem] bg-slate-100 ease-in-out duration-700 transform transition-all flex items-center p-8`}
      >
        <div className="flex sm:flex-row rounded-md bg-white flex-col rounded-r-md shadow-md w-full p-0 sm:gap-0 h-full">
          <div className="flex sm:flex-row flex-col items-center w-full justify-around gap-6 text-center">
            <img
              className="sm:rounded-l-md rounded-t-md"
              src="/images/about1.jpg"
            />
          </div>
          <div className="p-5 w-full sm:px-10 flex flex-col gap-4 justify-center">
            <div className="sm:text-4xl text-xl text-slate-800 font-bold">
              We provide a variety of services both to our new and regular
              customers.
            </div>
            <div className="text-slate-500 sm:text-base py-6 text-sm">
              We have 25+ years of experience."Our only Aim, Happy Customers. At
              the end of the day, it all comes down to coffee. But to get there
              it takes a dedicated, knowledgeable team with a sustainable
              approach. We make the delicious coffee for the coffee lovers. We
              are a team of dedicated coffee fans who celebrate exceptional
              coffee brands. We provide a variety of services both to our new
              and regular customers. All your favourites, delivered straight to
              you.
            </div>
            <div className="w-1/2">
              <Button
                color="default"
                className="rounded-lg sm:w-auto"
                size="medium"
                label="Learn More"
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Section */}

      {/* Section Features */}
      <section className="sm:px-[12rem] bg-white z-0 sm:py-24 p-8">
        <div className="flex sm:flex-row flex-col justify-center text-center gap-6">
          {fearureAbout.map((feature, index) => (
            <div key={index} className="flex flex-col gap-6">
              <FontAwesomeIcon
                size="2x"
                className="text-green-500"
                icon={feature.icon}
              />
              <h4>
                <a
                  href="#feature"
                  className="sm:text-2xl text-xl hover:text-green-500 duration-300 font-bold text-slate-700"
                >
                  {feature.header}
                </a>
              </h4>
              <p className="text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* End Section */}

      {/* Near You Section */}
      <section className="relative">
        <div className="relative w-full sm:px-[12rem] flex flex-col justify-center text-white p-8 sm:h-[30rem]">
          {/* Gambar Background */}
          <Image
            className="-z-20"
            src="/images/1.jpg" // Pastikan file ada di folder public/images
            alt="Background Image"
            fill // Gambar akan mengisi seluruh container
            style={{ objectFit: 'cover' }}
            priority // Memuat gambar dengan prioritas tinggi
          />

          {/* Overlay hitam semi-transparan */}
          <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>

          {/* Konten di atas gambar */}
          <div className="flex flex-col z-10">
            <span className="sm:text-sm text-xs text-gray-300 font-bold uppercase py-4">
              Coffee Shop
            </span>
            <span className="sm:text-4xl sm:w-2/3 font-bold text-2xl pr-4">
              All your favourites, delivered straight to you. Start your order
            </span>
            <p className="sm:w-1/2 py-8 text-lg pr-4">
              Because you love coffee, but don't always want the caffeine, look
              for the Swiss Water® logo or ask how your coffee was
              decaffeinated.
            </p>
            <div className="sm:w-1/3 w-1/2">
              <Button size="medium" color="default" label="Find Near You" />
            </div>
          </div>
        </div>
      </section>
      {/* End section */}

      {/* Team Section */}
      <section className="sm:px-[12rem] flex flex-col bg-gray-100  justify-center items-center p-8 sm:py-24">
        <div className="flex flex-col items-center text-center mb-14 w-full justify-center relative">
          {/* Garis */}
          <div className="border-b-4 border-gray-500 w-full absolute top-1/2 -translate-y-1/2"></div>

          {/* Judul Kecil */}
          <div className="sm:text-sm text-xs font-bold bg-gray-100 border-x-4 sm:w-4/12 w-7/12 border-gray-500 px-2 z-10 text-gray-500 uppercase">
            our team
          </div>

          {/* Judul Utama */}
          <div className="sm:text-3xl text-xl font-bold bg-gray-100 sm:w-4/12 w-7/12 border-x-4 border-gray-500 px-4 z-20 text-gray-700 pt-2 capitalize">
            Team Members
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {ourTeams.map((team, index) => (
            <div
              key={index}
              className="relative group flex flex-col text-center"
            >
              {/* Gambar Team */}
              <Image
                src={team.image}
                width={600}
                height={400}
                alt={team.name}
                className="rounded-md sm:w-full sm:h-full"
              />

              {/* Overlay hijau */}
              <div className="absolute inset-0 bg-green-300 sm:h-[81.5%] h-[86.5%] opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-500"></div>

              {/* Ikon media sosial */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex gap-4">
                  {/* Tambahkan ikon sesuai kebutuhan */}
                  <a
                    href={team.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-1 hover:text-green-600"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a
                    href={team.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-1 hover:text-green-600"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a
                    href={team.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white p-1 hover:text-green-600"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>

              {/* Nama dan Job */}
              <span className="pt-8 hover:text-green-500 duration-500 sm:text-xl text-lg font-bold">
                <Link href={team.link}>{team.name}</Link>
              </span>
              <p className="text-slate-500 text-sm sm:text-base">{team.job}</p>
            </div>
          ))}
        </div>
      </section>
      {/* End Section */}
      <Footer />
    </div>
  );
};

export default AboutPage;
