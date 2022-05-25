import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex items-center mt-8 flex-col">
        <h1 className="text-5xl font-bold text-center max-w-3xl leading-[1.15]">
          <span className="text-purple-600">
            Buat online store kamu sendiri{" "}
          </span>
          mudah dan cepat.
        </h1>
        <p className="mt-3 opacity-80">
          Tingkatkan penjualan, analisa peforma, dan lainnya dengan mudah.
        </p>
        <div className="flex items-center border-2 border-purple-600 rounded-full pr-3 pl-5 py-2 mt-10">
          <p className="text-xl font-medium">merchain.com/</p>
          <form>
            <input
              type="text"
              className="text-xl outline-none w-40"
              placeholder="tokokamu"
              required
            />
            <button type="submit" className="text-lg font-medium hover:bg-purple-700 py-3 px-6 bg-purple-600 text-white rounded-full">
              Buat Gratis
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
