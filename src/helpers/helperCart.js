export const addToCart = (cart, item, quantity) => {
  const newCart = [...cart];
  const foundIndex = cart.findIndex((x) => x.id === item.id);

  // Increase quantity if existing
  if (foundIndex >= 0) {
    newCart[foundIndex] = {
      ...cart[foundIndex],
      quantity: cart[foundIndex].quantity + quantity,
    };
    return newCart;
  }

  // Add new item
  newCart.push({
    id: item.id,
    product: item,
    quantity: quantity,
  });
  return newCart;
};

export const deleteFromCart = (cart, id) =>{
  const newCart = [...cart]
  const foundIndex = cart.findIndex((x) => x.id === id);
  if(foundIndex >= 0){
    newCart.splice(foundIndex, 1)
  }
  return newCart;
}
