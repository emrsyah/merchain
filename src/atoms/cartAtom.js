import { atom, selector } from "recoil";

export const cartState = atom({
  key: "cartState",
  default: [],
});

export const cartCount = selector({
  key: 'cartCount',
  get: ({get}) =>{
    const cart = get(cartState)
    return cart.reduce((total, item) => {
      return total + (item.quantity);
    }, 0);
  }
})

// NEW CODE HERE
export const cartTotal = selector({
  key: 'cartTotal',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
});
