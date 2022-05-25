import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow">
        Home
      </div>
      <Footer />
    </div>
  );
}

export default Home;
