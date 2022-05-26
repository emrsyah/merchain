import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react";
import { Helmet } from "react-helmet-async";

const faqItems = [
  {
    title: "Apa itu Merchain",
    body: "Merchain adalah sebuah online store builder, dengan merchain pelaku usaha di Indonesia bisa membuat online storenya sendiri dengan mudah dan cepat.",
  },
  {
    title: "Apakah merchain berbayar?",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet velit ducimus, eum repellat impedit labore quod blanditiis quae repudiandae praesentium. Perspiciatis dicta at sapiente?",
  },
  {
    title: "Apakah merchain perlu tenaga teknis",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet velit ducimus, eum repellat impedit labore quod blanditiis quae repudiandae praesentium. Perspiciatis dicta at sapiente?",
  },
  {
    title: "Bagaimana saya mengatur produk dan orderan?",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet velit ducimus, eum repellat impedit labore quod blanditiis quae repudiandae praesentium. Perspiciatis dicta at sapiente?",
  },
  {
    title: "Apakah saya bisa mengkostumisasi toko saya",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet velit ducimus, eum repellat impedit labore quod blanditiis quae repudiandae praesentium. Perspiciatis dicta at sapiente?",
  },
  {
    title: "Bagaimana cara saya menerima pembayaran",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet velit ducimus, eum repellat impedit labore quod blanditiis quae repudiandae praesentium. Perspiciatis dicta at sapiente?",
  },
];

function Faq() {
  return (
    <>
      <Helmet>
        <title>FAQ | Merchain</title>
      </Helmet>
      <Navbar />
      <div className="flex flex-col items-center mt-8 mb-16">
        <h1 className="font-semibold text-left text-2xl lg:text-4xl">
          Frequently Asked Questions🤔
        </h1>
        <div className="flex flex-col items-start gap-3 mt-8 w-11/12 lg:w-2/3">
          {faqItems.map((faqItem, i) => (
            <Disclosure
              key={i}
              as="div"
              className="border-[1px] border-gray-300 rounded-lg  w-full"
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`text-lg px-6 py-4 font-semibold w-full text-left flex items-center justify-between ${
                      open && "text-purple-600"
                    }`}
                  >
                    {faqItem.title}
                    {open ? (
                      <Icon icon="akar-icons:minus" width="24" />
                    ) : (
                      <Icon icon="bi:plus" width="32" />
                    )}
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="text-gray-500 px-6 pb-4 w-11/12 ">
                      {faqItem.body}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faq;
