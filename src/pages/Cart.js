import { Icon } from "@iconify/react";
import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartAtom";
import CartItem from "../components/CartItem";
import NavbarStore from "../components/NavbarStore";
import rupiahConverter from "../helpers/rupiahConverter";

function Cart() {
  const [cart, setCart] = useRecoilState(cartState);

  useEffect(() => {
    console.log(cart);
  }, []);

  return (
    <>
      <Helmet>
        <title>Keranjang Belanja - Merchain</title>
      </Helmet>
      <NavbarStore />
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 my-6 gap-2 md:gap-6 poppins">
        <div className="col-span-3">
          <h5 className="text-xl font-semibold">Belanjaan</h5>
          <div className="border-[1.2px] border-gray-200 mt-[10px] px-3 py-4 rounded-md flex flex-col gap-4">
            {cart.map((c) => (
              <CartItem
                image={c.product.image}
                name={c.product.name}
                price={c.product.price}
                quantity={c.quantity}
              />
            ))}
          </div>
        </div>

        <div className=" col-span-2">
          <h5 className="text-xl font-semibold">Pembayaran</h5>
          <div className="border-[1.2px] mt-[10px] border-gray-200 p-2 rounded-md">
            hi
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
