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
    body: "Fitur-fitur pada aplikasi merchain full gratis semuanya, misi kami dalam membuat aplikasi ini adalah memudahkan para umkm lokal agar bisa memasarkan produknya lebih luas dengan memberikan kemudahan dalam membuat online store kekinian dengan berbagai fitur serta tampilannya.",
  },
  {
    title: "Apakah merchain perlu tenaga teknis",
    body: "Tidak, untuk membuat online store di merchain anda hanya perlu menambah-nambahkan produk yang anda jual, untuk tampilan dan hal-hal lainnya sudah kami tangani sehingga anda tidak perlu pusing lagi.",
  },
  {
    title: "Bagaimana saya mengatur produk dan orderan?",
    body: "Anda bisa login dan masuk sebagai admin toko anda, nantinya akan ada navigasi untuk mengarahkan ke page produk dan orderan dimana anda bisa mengatur hal-hal yang anda inginkan",
  },
  {
    title: "Apakah saya bisa mengkostumisasi toko saya",
    body: "Ya, di merchain anda bisa melakukan berbagai kostumisasi pada toko anda mulai dari menambahkan link ke berbagai website anda, menambah bio, hingga mengatur tema warna toko anda.",
  },
  {
    title: "Kenapa saya tidak mendapatkan email verifikasi",
    body: "Anda bisa mengecek bagian spam di email anda apabila tidak menemukan email verifikasi, jika masih belum ada silahkan hubungi developer.",
  },
  {
    title: "Kemana saya bisa menghubungi apabila mengalami kesulitan",
    body: "Anda bisa menghubungi developer lewat email merchaindev@gmail.com atau juga bisa lewat link-link yang ada di bagian footer website ini.",
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
        <h1 className="font-semibold text-center text-2xl lg:text-4xl">
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
                    className={`md:text-lg px-6 py-4 font-semibold w-full text-left flex items-center justify-between ${
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
