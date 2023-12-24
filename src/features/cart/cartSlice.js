import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      const newItems = actions.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === newItems.id
      );

      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity += newItems.quantity;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity *
          state.cartItems[selectCartIndex].price;
      } else if (newItems.quantity && newItems.totalPrice) {
        state.cartItems.push({ ...newItems });
      } else {
        state.cartItems.push({
          ...newItems,
          quantity: 1,
          totalPrice: newItems.price,
        });
      }
    },
    incrementQty: (state, actions) => {
      const newQty = actions.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === newQty.id
      );
      if (newQty.id !== -1) {
        state.cartItems[selectCartIndex].quantity += 1;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity *
          state.cartItems[selectCartIndex].price;
      }
    },
    decrementQty: (state, actions) => {
      const newQty = actions.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === newQty.id
      );

      if (selectCartIndex !== -1) {
        state.cartItems[selectCartIndex].quantity -= 1;
        state.cartItems[selectCartIndex].totalPrice =
          state.cartItems[selectCartIndex].quantity *
          state.cartItems[selectCartIndex].price;
      }
    },
    deleteAItem: (state, action) => {
      const deletedItem = action.payload;
      const selectCartIndex = state.cartItems.findIndex(
        (product) => product.id === deletedItem.id
      );
      state.cartItems.splice(selectCartIndex, 1);
    },
  },
});

export const { addToCart, incrementQty, decrementQty, deleteAItem } =
  cartSlice.actions;
export default cartSlice;

export const selectedCartItem = (state) => state.cart.cartItems;
export const selectedTotalCartItem = (state) => state.cart.cartItems.length;
export const totapPrice = (state) =>
  state.cart.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
