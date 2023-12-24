import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  selectedProduct: [],
  filterProductBy: "",
  searchProductBy: "",
  sortProductBy: "",
  getSelectedProduct: [],
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    productList: (state, actions) => {
      state.productList = actions.payload;
    },
    filterProduct: (state, actions) => {
      state.filterProductBy = actions.payload;
    },
    searchProductBy: (state, actions) => {
      state.searchProductBy = actions.payload;
    },
    sortProductBy: (state, actions) => {
      state.sortProductBy = actions.payload;
    },
    setSelectedProduct: (state, actions) => {
      const idProduct = actions.payload;
      state.selectedProduct = state.productList.filter(
        (product) => product.id === idProduct
      );
      state.selectedProduct[0].quantity = 1;
      state.selectedProduct[0].totalPrice =
        state.selectedProduct[0].quantity * state.selectedProduct[0].price;
    },
    decreaseQtyProduct: (state) => {
      state.selectedProduct[0].quantity -= 1;
      state.selectedProduct[0].totalPrice =
        state.selectedProduct[0].quantity * state.selectedProduct[0].price;
    },
    increaseQtyProduct: (state) => {
      state.selectedProduct[0].quantity += 1;
      state.selectedProduct[0].totalPrice =
        state.selectedProduct[0].quantity * state.selectedProduct[0].price;
    },
  },
});

export const {
  productList,
  filterProduct,
  searchProductBy,
  sortProductBy,
  setSelectedProduct,
  decreaseQtyProduct,
  increaseQtyProduct,
} = productListSlice.actions;
export default productListSlice;

export const displayProduct = (state) => state.productList.productList;
export const filters = (state) => state.productList.filterProductBy;
export const keyword = (state) => state.productList.searchProductBy;
export const selectSort = (state) => state.productList.sortProductBy;
export const selectedProduct = (state) => state.productList.selectedProduct;
export const totalPrice = (state) =>
  state.productList.selectedProduct.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );
