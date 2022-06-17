import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, cartTotal } from "../atoms/cartAtom";
import { storeColor } from "../atoms/storeColor";
import CartItem from "../components/CartItem";
import NavbarStore from "../components/NavbarStore";
import { deleteFromCart } from "../helpers/helperCart";
import rupiahConverter from "../helpers/rupiahConverter";

function Cart() {
  const [cart, setCart] = useRecoilState(cartState);
  const color = useRecoilValue(storeColor);
  const total = useRecoilValue(cartTotal)

  useEffect(() => {
    console.log(cart);
  }, []);

  const deleteHandler = (id) => {
    const newCart = deleteFromCart(cart, id);
    setCart(newCart);
  };

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
                id={c.id}
                key={c.id}
                deleteHandler={deleteHandler}
                color={color}
              />
            ))}
          </div>
        </div>

        <div className=" col-span-2">
          <h5 className="text-xl font-semibold">Pembayaran</h5>
          <div className="border-[1.2px] mt-[10px] border-gray-200 p-2 rounded-md">
            <div className="flex justify-between items-center">
              <p className="text-gray-600 font-medium">Total</p>
              <p className={`font-semibold ${color + "-txt"} `}>{rupiahConverter(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
