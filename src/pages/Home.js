import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center mt-20 flex-col mb-20">
        <div className="flex items-center flex-col">
          <h1 className="lg:text-6xl text-3xl font-bold text-center max-w-4xl leading-[1.15]">
            <span className="text-purple-600">
              Buat online store kamu sendiri{" "}
            </span>
            <br />
            mudah dan cepat.
          </h1>
          <p className="mt-3 lg:text-lg text-center">
            Tingkatkan penjualan, analisa peforma, dan lainnya dengan mudah.
          </p>
          <div className="flex items-center border-2 border-purple-600 rounded-full pr-3 pl-5 py-2 mt-14">
            <p className="lg:text-xl font-medium">merchain.com/</p>
            <form className="flex" action="/signup">
              <input
                type="text"
                className="lg:text-xl outline-none lg:w-36 w-24"
                placeholder="tokokamu"
                required
                name="name"
              />
              <button
                type="submit"
                className="lg:text-lg font-medium hover:bg-purple-700 py-3 px-6 bg-purple-600 text-white rounded-full"
              >
                Buat Gratis
              </button>
            </form>
          </div>
          <p className="mt-4 ">
            <span className="opacity-80">
              Tunggu apalagi, Mulai sekarang - Gratis
            </span>
            🤩🤩🤩!
          </p>
        </div>

        <div className="mt-28 text-center w-full px-16">
          <h2 className="font-semibold text-2xl lg:text-4xl">
            Satu link buat kebutuhan jualan kamu
          </h2>
          <p className="mt-3 lg:text-lg">
            Atur order, analisa penjualan, pendataan customer, semuanya mudah
          </p>
          <div className="grid lg:grid-cols-3 items-center justify-between gap-x-3 w-full mt-10">
            <div className="col-span-1 bg-white text-left p-4 rounded-md shadow-md">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Icon icon="ic:outline-query-stats" width="24" />
                Analisa Toko Kamu
              </div>
              <p className="opacity-80 leading-snug text-left mt-2">
                Ketahui pejualan kamu dengan mudah, udah itu kamu juga bisa tau
                seberapa sering toko mu sering dikunjungi.
              </p>
            </div>

            <div className="col-span-1 bg-white text-left p-4 rounded-md shadow-md">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Icon icon="icon-park:ad-product" width="24" />
                Atur Produk dan Orderan
              </div>
              <p className="opacity-80 leading-snug text-left mt-2">
                Atur produk jualan kamu dengan mudah, selain itu kamu juga bisa
                mengawasi orderan masuk dengan simpel.
              </p>
            </div>

            <div className="col-span-1 bg-white text-left p-4 rounded-md shadow-md">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Icon icon="fluent:paint-brush-16-regular" width="24" />
                Kostumisasi Toko Kamu
              </div>
              <p className="opacity-80 leading-snug text-left mt-2">
                Merchain nyediain berbagai fitur kostumisasi buat toko kamu,
                jadi kamu bisa lebih enak dan bebas ngatur semaunya.
              </p>
            </div>
          </div>
          <Link to='/signup' className="mt-12 p-5 inline-block bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium text-lg lg:text-xl">
            Coba Sekarang - Gratis!
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
